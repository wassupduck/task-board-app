import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import {
  deleteTaskAsUser,
  deleteTaskSubtasks,
  insertSubtasks,
  insertTask,
  selectSubtasksByTaskIds,
  selectSubtasksConnectionsByTaskIds,
  selectTaskByIdAsUser,
  selectTasksByBoardId,
  selectTasksByColumnIds,
  updateSubtaskCompletedByIdAsUser,
  updateTask,
  updateTaskSubtasks,
} from './task.queries.js';
import { Task } from './entities/task.entity.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';
import { NotFoundError } from '../common/errors/not-found-error.js';
import { SubtaskTitleConflictError } from './task.errors.js';
import { getDuplicateKeyValues } from '../database/helpers/unique-violation-error-duplicate-key-values.js';
import { UniqueViolationError } from 'db-errors';

type NewTask = Pick<Task, 'title' | 'description' | 'boardColumnId'>;
type EditTask = Partial<Pick<Task, 'title' | 'description' | 'boardColumnId'>>;
type NewSubtask = Pick<Subtask, 'title'>;
type EditSubtask = Partial<Pick<Subtask, 'title' | 'completed'>>;

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

  async createTask(task: NewTask): Promise<Task> {
    return this.db.queryOne(insertTask, { task });
  }

  async updateTask(id: string, fieldsToUpdate: EditTask): Promise<Task> {
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

  async createTaskSubtasks(
    taskId: string,
    subtasks: NewSubtask[],
  ): Promise<Subtask[]> {
    try {
      return await this.db.queryAll(insertSubtasks, {
        subtasks: subtasks.map((subtask) => ({
          ...subtask,
          taskId,
        })),
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'subtask_task_id_title_unique_idx'
      ) {
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const duplicateTitle = duplicateKeyValues?.['title'] ?? 'unknown';
        throw new SubtaskTitleConflictError(duplicateTitle);
      }
      throw error;
    }
  }

  async updateTaskSubtasks(
    taskId: string,
    subtasks: ({ id: string } & EditSubtask)[],
  ): Promise<Subtask[]> {
    try {
      return await this.db.queryAll(updateTaskSubtasks, {
        taskId,
        subtasks: subtasks.map((subtask) => ({
          id: subtask.id,
          title: subtask.title,
          completed: subtask.completed?.toString(),
        })),
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'subtask_task_id_title_unique_idx'
      ) {
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const duplicateTitle = duplicateKeyValues?.['title'] ?? 'unknown';
        throw new SubtaskTitleConflictError(duplicateTitle);
      }
      throw error;
    }
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

  async deleteTaskSubtasks(
    taskId: string,
    subtaskIds: string[],
  ): Promise<void> {
    await this.db.queryOneOrNone(deleteTaskSubtasks, { taskId, subtaskIds });
  }
}
