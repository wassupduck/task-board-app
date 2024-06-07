import { Inject, Injectable } from '@nestjs/common';
import { NewTaskWithId, TaskRepository } from './task.repository.js';
import { Task } from './entities/task.entity.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';
import { UpdateTaskPatchInput } from './dto/update-task.input.js';
import { updateTaskPatchInputSchema } from './schemas/update-task-patch-input.schema.js';
import { ValidationError } from '../common/errors/validation-error.js';
import { emptyPatch } from '../common/helpers/empty-patch.js';
import { NotFoundError } from '../common/errors/not-found-error.js';
import { newTaskInputSchema } from './schemas/new-task-input.schema.js';
import { BoardService } from '../board/index.js';
import { NewTaskInput } from './dto/new-task.input.js';
import { BoardColumnNotFoundError } from './task.errors.js';
import { DatabaseClient, DatabaseTransactor } from '../database/index.js';
import { UpdateTaskSubtasksPatchInput } from './dto/update-task-subtasks.input.js';
import { updateTaskSubtasksPatchInputSchema } from './schemas/update-task-subtasks-patch-input.schema.js';
import { MoveTaskMoveInput } from './dto/move-task.input.js';
import { randomUUID } from 'crypto';
import { z } from 'zod';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly boardService: BoardService,
    @Inject(DatabaseClient) private readonly db: DatabaseTransactor,
  ) {}

  async getTaskByIdAsUser(id: string, userId: string): Promise<Task | null> {
    return this.taskRepository.getTaskByIdAsUser(id, userId);
  }

  async getTasksByColumnIds(columnIds: string[]): Promise<Task[]> {
    return this.taskRepository.getTasksByColumnIds(columnIds);
  }

  async createTaskAsUser(
    newTaskInput: NewTaskInput,
    userId: string,
  ): Promise<[Task, Subtask[]]> {
    // Parse and validate input
    const validationResult =
      await newTaskInputSchema.safeParseAsync(newTaskInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newTask = validationResult.data;

    return await this.db.inTransaction(async () => {
      // Check user can create task in board column.
      // Lock board column to prevent concurrent insertions/moves of tasks.
      // Note: This is overly restrictive but simple
      const boardColumn =
        await this.boardService.getForUpdateBoardColumnByIdAsUser(
          newTask.boardColumnId,
          userId,
        );
      if (!boardColumn) {
        throw new BoardColumnNotFoundError(newTask.boardColumnId);
      }

      const lastTaskInBoardColumn =
        await this.taskRepository.getLastTaskInBoardColumn(boardColumn.id);

      const newTaskPosition = nextPosition(
        lastTaskInBoardColumn?.position ?? '0',
      );

      // Create task
      const task = await this.taskRepository.createTask({
        ...newTask,
        position: newTaskPosition,
      });

      // Create subtasks
      let subtasks: Subtask[] = [];
      if (newTask.subtasks && newTask.subtasks.length > 0) {
        subtasks = await this.taskRepository.createSubtasks(
          newTask.subtasks.map((subtask, idx) => ({
            ...subtask,
            taskId: task.id,
            position: idx,
          })),
        );
      }

      return [task, subtasks];
    });
  }

  async createTasks(
    newTaskInputs: NewTaskInput[],
  ): Promise<{ task: Task; subtasks: Subtask[] }[]> {
    if (newTaskInputs.length === 0) {
      return [];
    }

    // Parse and validate input
    const validationResult = await newTaskInputSchema
      .array()
      .safeParseAsync(newTaskInputs);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newTasks = validationResult.data;
    const newTasksByBoardColumnId = Map.groupBy(
      newTasks,
      ({ boardColumnId }) => boardColumnId,
    );
    const boardColumnIds = [...newTasksByBoardColumnId.keys()];

    return await this.db.inTransaction(async () => {
      await this.boardService.getForUpdateBoardColumnsByIds(boardColumnIds);
      const lastTaskInColumns =
        await this.taskRepository.getLastTaskInBoardColumns(boardColumnIds);

      const tasksToCreate: (NewTaskWithId &
        Pick<z.infer<typeof newTaskInputSchema>, 'subtasks'>)[] = [];
      for (const [boardColumnId, newTasks] of newTasksByBoardColumnId) {
        const lastTaskInColumn = lastTaskInColumns[boardColumnId];
        let position = lastTaskInColumn?.position ?? '0';
        for (const newTask of newTasks) {
          position = nextPosition(position);
          tasksToCreate.push({
            id: randomUUID(),
            ...newTask,
            position,
            boardColumnId,
          });
        }
      }

      const subtasksToCreate = tasksToCreate.flatMap((task) =>
        (task.subtasks ?? []).map((subtask, idx) => ({
          ...subtask,
          taskId: task.id,
          position: idx,
        })),
      );

      const tasks = await this.taskRepository.createTasks(tasksToCreate);
      const subtasks =
        subtasksToCreate.length > 0
          ? await this.taskRepository.createSubtasks(subtasksToCreate)
          : [];

      const subtasksByTaskId = Map.groupBy(subtasks, ({ taskId }) => taskId);
      return tasks.map((task) => ({
        task,
        subtasks: subtasksByTaskId.get(task.id) ?? [],
      }));
    });
  }

  async updateTaskAsUser(
    id: string,
    patchInput: UpdateTaskPatchInput,
    userId: string,
  ): Promise<Task> {
    // Parse and validate patch
    const validationResult =
      await updateTaskPatchInputSchema.safeParseAsync(patchInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    // Check user can edit task
    const task = await this.getTaskByIdAsUser(id, userId);
    if (!task) {
      throw new NotFoundError(`Task not found ${id}`);
    }

    const patch = validationResult.data;
    if (emptyPatch(patch)) {
      // No change
      return task;
    }

    return await this.db.inTransaction(async () => {
      if (patch.boardColumnId !== undefined) {
        await this._moveTaskAsUser(
          task,
          { boardColumnId: patch.boardColumnId },
          userId,
        );
        delete patch.boardColumnId;
      }

      // Update task
      return await this.taskRepository.updateTask(id, patch);
    });
  }

  async deleteTaskAsUser(id: string, userId: string): Promise<void> {
    await this.taskRepository.deleteTaskAsUser(id, userId);
  }

  async moveTaskAsUser(
    id: string,
    moveInput: MoveTaskMoveInput,
    userId: string,
  ): Promise<Task> {
    const destination = {
      boardColumnId: moveInput.to.boardColumnId ?? undefined,
      positionAfter: moveInput.to.positionAfter ?? undefined,
    };

    // Check user can edit task
    const task = await this.getTaskByIdAsUser(id, userId);
    if (!task) {
      throw new NotFoundError(`Task not found ${id}`);
    }

    return await this._moveTaskAsUser(task, destination, userId);
  }

  private async _moveTaskAsUser(
    task: Task,
    destination: { boardColumnId?: string; positionAfter?: string },
    userId: string,
  ): Promise<Task> {
    // Moves a task to a different board column and/or repositions it after
    // the task at or above `positionAfter`

    // Early return if no change
    if (
      (destination.boardColumnId === undefined ||
        destination.boardColumnId === task.boardColumnId) &&
      (destination.positionAfter === undefined ||
        destination.positionAfter === task.position)
    ) {
      return task;
    }

    return this.db.inTransaction(async () => {
      if (destination.boardColumnId !== undefined) {
        // Check user can move task to board column.
        // Lock board column to prevent concurrent insertions/moves of tasks.
        // Note: This is overly restrictive but simple
        const boardColumn =
          await this.boardService.getForUpdateBoardColumnByIdAsUser(
            destination.boardColumnId,
            userId,
          );
        if (!boardColumn) {
          throw new BoardColumnNotFoundError(destination.boardColumnId);
        }
      }

      const boardColumnId = destination.boardColumnId ?? task.boardColumnId;

      const { taskAboveOrAtPosition, taskBelowPosition } =
        await this.taskRepository.getTasksSurroundingBoardColumnPosition(
          boardColumnId,
          destination.positionAfter ?? '0',
        );

      if (
        taskAboveOrAtPosition?.id === task.id ||
        taskBelowPosition?.id === task.id
      ) {
        // Task is already at the desired position
        return task;
      }

      let newPosition: string;
      if (!taskAboveOrAtPosition && !taskBelowPosition) {
        newPosition = '1';
      } else if (taskAboveOrAtPosition && !taskBelowPosition) {
        newPosition = nextPosition(taskAboveOrAtPosition.position);
      } else if (!taskAboveOrAtPosition && taskBelowPosition) {
        newPosition = prevPosition(taskBelowPosition.position);
      } else if (taskAboveOrAtPosition && taskBelowPosition) {
        newPosition = midPosition(
          taskAboveOrAtPosition.position,
          taskBelowPosition.position,
        );
      } else {
        throw new Error('unreachable');
      }

      return await this.taskRepository.updateTask(task.id, {
        boardColumnId: boardColumnId,
        position: newPosition,
      });
    });
  }

  async getTaskSubtasksConnections(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.taskRepository.getTaskSubtasksConnections(taskIds);
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.taskRepository.getSubtasksByTaskIds(taskIds);
  }

  async updateSubtaskCompletedAsUser(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    return this.taskRepository.updateSubtaskCompletedAsUser(
      id,
      completed,
      userId,
    );
  }

  async updateTaskSubtasksAsUser(
    taskId: string,
    patchInput: UpdateTaskSubtasksPatchInput,
    userId: string,
  ): Promise<Task> {
    // Parse and validate input
    const validationResult =
      await updateTaskSubtasksPatchInputSchema.safeParseAsync(patchInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const task = await this.getTaskByIdAsUser(taskId, userId);
    if (!task) {
      throw new NotFoundError(`Task not found: ${taskId}`);
    }

    const patch = validationResult.data;

    await this.db.inTransaction(async () => {
      if (patch.deletions.length > 0) {
        await this.taskRepository.deleteSubtasksForTask(
          taskId,
          patch.deletions,
        );
      }

      if (patch.updates.length > 0) {
        await this.taskRepository.updateSubtasksForTask(
          taskId,
          patch.updates.map(({ id, patch }) => ({ id, ...patch })),
        );
      }

      if (patch.additions.length > 0) {
        await this.taskRepository.appendSubtasksForTask(
          taskId,
          patch.additions.map(({ subtask }) => subtask),
        );
      }
    });

    return task;
  }
}

function prevPosition(position: string) {
  const out = [];
  // Copy leading 0's to `out`
  let i = 0;
  while (i < position.length && position[i] === '0') {
    out.push('0');
    i++;
  }

  if (i >= position.length) {
    // Position is all 0s
    throw new Error('No position before 0');
  }
  // Subtract 1 from first non-0 character
  out.push(
    position[i] === '1' ? '0z' : (parseInt(position[i], 36) - 1).toString(36),
  );

  return out.join('');
}

function midPosition(smaller: string, larger: string) {
  // Returns a string that is lexigraphically (approximately) halfway between the
  // `smaller` and `larger` string. The function will keep the returned string
  // length to minimum.
  if (smaller > larger) {
    [smaller, larger] = [larger, smaller];
  } else if (smaller === larger) {
    throw new Error('No midpoint for equal positions');
  }

  const maxLength = Math.max(smaller.length, larger.length);
  smaller = smaller.padEnd(maxLength, '0');
  larger = larger.padEnd(maxLength, '0');

  const out: string[] = [];
  // Copy characters from `smaller` string until the first difference
  let i = 0;
  while (smaller[i] === larger[i]) {
    out.push(smaller[i]);
    i++;
  }

  // First difference is at `i`
  // Find the character halfway between characters at `i` in smaller and larger
  let mid = Math.floor(
    (parseInt(smaller[i], 36) + parseInt(larger[i], 36)) / 2,
  ).toString(36);

  if (mid > smaller[i]) {
    // The two different characters are not lexographically consecutive
    // append mid character and return `out`
    out.push(mid);
    return out.join('');
  }

  // The two different characters are lexographically consecutive
  // First copy smaller character to `out`
  out.push(smaller[i]);
  // If next characters are z's copy them to `out` too
  i++;
  while (i < maxLength && smaller[i] === 'z') {
    out.push('z');
    i++;
  }
  // Append the character halfway between the first non-z character
  // (or '0' if `i` >= `maxLength`) and the end of the alphabet
  mid = Math.floor(
    (parseInt(smaller[i] ?? '0', 36) + (parseInt('z', 36) + 1)) / 2,
  ).toString(36);
  out.push(mid);

  return out.join('');
}

function nextPosition(position: string) {
  if (position.length === 0) {
    throw new Error('position length must be greater than 0');
  }

  const out = [];
  // Copy leading z's to `out`
  let i = 0;
  while (i < position.length && position[i] === 'z') {
    out.push('z');
    i++;
  }
  // Add 1 to first non-z character
  out.push(
    i >= position.length ? '1' : (parseInt(position[i], 36) + 1).toString(36),
  );

  return out.join('');
}
