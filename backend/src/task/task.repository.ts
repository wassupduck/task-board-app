import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import {
  deleteTaskAsUser,
  insertSubtasks,
  insertTask,
  selectSubtasksByTaskIds,
  selectSubtasksConnectionsByTaskIds,
  selectTaskByIdAsUser,
  selectTasksByBoardId,
  selectTasksByColumnIds,
  updateSubtaskCompletedByIdAsUser,
  updateTask,
} from './task.queries.js';
import { Task } from './entities/task.entity.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';
import { NotFoundError } from '../common/errors/not-found-error.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getTaskByIdAsUser(id: string, userId: string): Promise<Task | null> {
    return this.db.queryOneOrNone(selectTaskByIdAsUser, { id, userId });
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.db.queryAll(selectTasksByBoardId, { boardId });
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.db.queryAll(selectTasksByColumnIds, { columnIds });
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

  async deleteTaskAsUser(id: string, userId: string) {
    const deletedTask = await this.db.queryOneOrNone(deleteTaskAsUser, {
      id,
      userId,
    });
    if (!deletedTask) {
      throw new NotFoundError(`Task not found: ${id}`);
    }
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.db.queryAll(selectSubtasksConnectionsByTaskIds, { taskIds });
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.db.queryAll(selectSubtasksByTaskIds, { taskIds });
  }

  async updateSubtaskCompletedByIdAsUser(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    const subtask = await this.db.queryOneOrNone(
      updateSubtaskCompletedByIdAsUser,
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

  async createTaskSubtasks(
    taskId: string,
    subtasks: Pick<Subtask, 'title'>[],
  ): Promise<Subtask[]> {
    return await this.db.queryAll(insertSubtasks, {
      subtasks: subtasks.map((subtask) => ({
        ...subtask,
        taskId,
      })),
    });
  }
}
