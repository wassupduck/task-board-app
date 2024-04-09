import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import {
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
    // TODO: Error handling
    if (subtask === null) {
      throw new Error(`Subtask not found: ${id}`);
    }
    return subtask;
  }

  async createTask(
    task: Pick<Task, 'title' | 'boardColumnId'> & {
      description?: Task['description'];
    },
  ): Promise<Task> {
    return this.db.queryOne(insertTask, {
      task: { ...task, description: task.description ?? '' },
    });
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
    // TODO: Error handling
    if (task === null) {
      throw new Error(`task not found ${id}`);
    }
    return task;
  }
}
