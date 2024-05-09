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

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByBoardId(boardId);
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

    // Check user can create task for board column
    const boardColumn = await this.boardService.getBoardColumnByIdAsUser(
      newTask.boardColumnId,
      userId,
    );
    if (!boardColumn) {
      throw new BoardColumnNotFoundError(newTask.boardColumnId);
    }

    return await this.db.inTransaction(async () => {
      // Create task
      const task = await this.taskRepository.createTask(newTask);

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

    if (patch.boardColumnId !== undefined) {
      // Check user can move task to board column
      const boardColumn = await this.boardService.getBoardColumnByIdAsUser(
        patch.boardColumnId,
        userId,
      );
      if (!boardColumn) {
        throw new BoardColumnNotFoundError(patch.boardColumnId);
      }
    }

    // Update task
    return await this.taskRepository.updateTask(id, patch);
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    await this.taskRepository.deleteTaskAsUser(id, userId);
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.taskRepository.getSubtasksConnectionsByTaskIds(taskIds);
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    console.log('here');
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
}
