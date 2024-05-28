import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
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

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.taskRepository.getTasksInColumns(columnIds);
  }

  async createTask(
    input: NewTaskInput,
    userId: string,
  ): Promise<[Task, Subtask[]]> {
    // Parse and validate input
    const validation = newTaskInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newTask = validation.data;

    return await this.db.inTransaction(async () => {
      // Check user can move task to board column.
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

      const lastTaskInColumn =
        await this.taskRepository.getLastTaskInBoardColumn(boardColumn.id);

      const position = midPosition(
        lastTaskInColumn?.position ?? '0',
        'z'.padEnd((lastTaskInColumn?.position.length ?? 1) + 1, 'z'),
      );

      // Create task
      const task = await this.taskRepository.createTask({
        ...newTask,
        position,
      });

      // Create subtasks
      let subtasks: Subtask[] = [];
      if (newTask.subtasks && newTask.subtasks.length > 0) {
        subtasks = await this.taskRepository.createTaskSubtasks(
          task.id,
          newTask.subtasks,
        );
      }

      return [task, subtasks];
    });
  }

  async updateTask(
    id: string,
    input: UpdateTaskPatchInput,
    userId: string,
  ): Promise<Task> {
    // Parse and validate patch
    const validation = updateTaskPatchInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    // Check user can edit task
    const task = await this.getTaskByIdAsUser(id, userId);
    if (!task) {
      throw new NotFoundError(`Task not found ${id}`);
    }

    const patch = validation.data;
    if (emptyPatch(patch)) {
      // No change
      return task;
    }

    return await this.db.inTransaction(async () => {
      if (patch.boardColumnId !== undefined) {
        await this._moveTask(
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

  async deleteTask(id: string, userId: string): Promise<void> {
    await this.taskRepository.deleteTaskAsUser(id, userId);
  }

  async moveTask(
    id: string,
    input: MoveTaskMoveInput,
    userId: string,
  ): Promise<Task> {
    const destination = {
      boardColumnId: input.to.boardColumnId ?? undefined,
      positionAfter: input.to.positionAfter ?? undefined,
    };

    // Check user can edit task
    const task = await this.getTaskByIdAsUser(id, userId);
    if (!task) {
      throw new NotFoundError(`Task not found ${id}`);
    }

    return await this._moveTask(task, destination, userId);
  }

  private async _moveTask(
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

      const lowPosition = taskAboveOrAtPosition?.position ?? '0';
      const highPosition =
        taskBelowPosition?.position ?? 'z'.padEnd(lowPosition.length + 1, 'z');

      const newPosition = midPosition(lowPosition, highPosition);

      return await this.taskRepository.updateTask(task.id, {
        boardColumnId: boardColumnId,
        position: newPosition,
      });
    });
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.taskRepository.getSubtasksConnectionsByTaskIds(taskIds);
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.taskRepository.getSubtasksByTaskIds(taskIds);
  }

  async updateSubtaskCompletedById(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    return this.taskRepository.updateSubtaskCompletedByIdAsUser(
      id,
      completed,
      userId,
    );
  }

  async updateTaskSubtasks(
    taskId: string,
    input: UpdateTaskSubtasksPatchInput,
    userId: string,
  ): Promise<Task> {
    // Parse and validate input
    const validation = updateTaskSubtasksPatchInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const task = await this.getTaskByIdAsUser(taskId, userId);
    if (!task) {
      throw new NotFoundError(`Task not found: ${taskId}`);
    }

    const patch = validation.data;

    await this.db.inTransaction(async () => {
      if (patch.deletions.length > 0) {
        await this.taskRepository.deleteTaskSubtasks(taskId, patch.deletions);
      }

      if (patch.updates.length > 0) {
        await this.taskRepository.updateTaskSubtasks(
          taskId,
          patch.updates.map(({ id, patch }) => ({ id, ...patch })),
        );
      }

      if (patch.additions.length > 0) {
        await this.taskRepository.createTaskSubtasks(
          taskId,
          patch.additions.map(({ subtask }) => subtask),
        );
      }
    });

    return task;
  }
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
