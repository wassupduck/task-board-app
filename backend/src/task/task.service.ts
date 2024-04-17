import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task } from './entities/task.entity.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';
import { UpdateTaskPatchInput } from './dto/update-task.input.js';
import { updateTaskPatchInputSchema } from './schemas/update-task-patch-input.schema.js';
import { ValidationError } from '../common/errors/validation-error.js';
import { emptyPatch } from '../common/helpers/empty-patch.js';
import { NotFoundError } from '../common/errors/not-found-error.js';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTaskByIdForUser(id: string, userId: string): Promise<Task | null> {
    return this.taskRepository.getTaskByIdForUser(id, userId);
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByBoardId(boardId);
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.taskRepository.getTasksInColumns(columnIds);
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.taskRepository.getSubtasksConnectionsByTaskIds(taskIds);
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.taskRepository.getSubtasksByTaskIds(taskIds);
  }

  async updateSubtaskCompletedByIdForUser(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    return this.taskRepository.updateSubtaskCompletedByIdForUser(
      id,
      completed,
      userId,
    );
  }

  async createTask(
    task: Pick<Task, 'title' | 'boardColumnId'> & {
      description?: Task['description'];
    },
  ): Promise<Task> {
    // TODO: Check user owns board column.
    return this.taskRepository.createTask(task);
  }

  async updateTask(
    id: string,
    patch: UpdateTaskPatchInput,
    userId: string,
  ): Promise<Task> {
    // Parse and validate patch
    const validation = updateTaskPatchInputSchema.safeParse(patch);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    // Check user can edit task
    const task = await this.getTaskByIdForUser(id, userId);
    if (!task) {
      throw new NotFoundError(`Task not found ${id}`);
    }

    const update = validation.data;
    if (emptyPatch(update)) {
      // No change
      return task;
    }

    return await this.taskRepository.updateTask(id, update);
  }
}
