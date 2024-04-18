import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import {
  deleteTaskForUser,
  insertTask,
  selectSubtasksByTaskIds,
  selectSubtasksConnectionsByTaskIds,
  selectTaskByIdForUser,
  selectTasksByBoardId,
  selectTasksByColumnIds,
  updateSubtaskCompletedByIdForUser,
  updateTask,
} from './task.queries.js';
import { Task } from './entities/task.entity.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';
import { NotFoundError } from '../common/errors/not-found-error.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getTaskByIdForUser(id: string, userId: string): Promise<Task | null> {
    return this.db.queryOneOrNone(selectTaskByIdForUser, { id, userId });
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.db.queryAll(selectTasksByBoardId, { boardId });
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.db.queryAll(selectTasksByColumnIds, { columnIds });
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.db.queryAll(selectSubtasksConnectionsByTaskIds, { taskIds });
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.db.queryAll(selectSubtasksByTaskIds, { taskIds });
  }

  async updateSubtaskCompletedByIdForUser(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    const subtask = await this.db.queryOneOrNone(
      updateSubtaskCompletedByIdForUser,
      {
        id,
        userId,
        completed,
      },
    );
    if (!subtask) {
      throw new NotFoundError(`Subtask not found: ${id}`);
    }
    return subtask;
  }

  async createTask(
    task: Pick<Task, 'title' | 'description' | 'boardColumnId'>,
  ): Promise<Task> {
    return this.db.queryOne(insertTask, { task });
  }

  async updateTask(
    id: string,
    fieldsToUpdate: Partial<
      Pick<Task, 'title' | 'description' | 'boardColumnId'>
    >,
  ): Promise<Task> {
    const task = await this.db.queryOneOrNone(updateTask, {
      id,
      ...fieldsToUpdate,
    });
    if (!task) {
      throw new NotFoundError(`Task not found: ${id}`);
    }
    return task;
  }

  async deleteTaskForUser(id: string, userId: string) {
    const deletedTask = await this.db.queryOneOrNone(deleteTaskForUser, {
      id,
      userId,
    });
    if (!deletedTask) {
      throw new NotFoundError(`Task not found: ${id}`);
    }
  }
}
