import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import {
  appendSubtasks,
  deleteTaskAsUser,
  deleteTaskSubtasks,
  insertSubtasks,
  insertTask,
  insertTasks,
  selectLastTaskInBoardColumn,
  selectLastTaskInBoardColumns,
  selectSubtasksByTaskIds,
  selectTaskByIdAsUser,
  selectTasksByColumnIds,
  selectTasksSurroundingBoardColumnPosition,
  selectTaskSubtasksConnections,
  updateSubtaskCompletedAsUser,
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

export type NewTask = Pick<
  Task,
  'title' | 'description' | 'boardColumnId' | 'position'
>;
export type NewTaskWithId = NewTask & Pick<Task, 'id'>;
export type EditTask = Partial<
  Pick<Task, 'title' | 'description' | 'boardColumnId' | 'position'>
>;
export type NewSubtask = Pick<Subtask, 'title' | 'taskId' | 'position'> &
  Partial<Pick<Subtask, 'completed'>>;
export type NewSubtaskWithId = NewSubtask & Pick<Subtask, 'id'>;
export type EditSubtask = Partial<Pick<Subtask, 'title' | 'completed'>>;

@Injectable()
export class TaskRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getTaskByIdAsUser(id: string, userId: string): Promise<Task | null> {
    return this.db.queryOneOrNone(selectTaskByIdAsUser, { id, userId });
  }

  async getTasksByColumnIds(columnIds: string[]): Promise<Task[]> {
    return this.db.queryAll(selectTasksByColumnIds, { columnIds });
  }

  async getTasksSurroundingBoardColumnPosition(
    boardColumnId: string,
    position: string,
  ): Promise<{
    taskAboveOrAtPosition: Task | null;
    taskBelowPosition: Task | null;
  }> {
    const tasks = await this.db.queryAll(
      selectTasksSurroundingBoardColumnPosition,
      { boardColumnId, position },
    );

    let taskAboveOrAtPosition: Task | null = null;
    let taskBelowPosition: Task | null = null;
    if (tasks[0] !== undefined) {
      const task = tasks[0] as Task;
      if (task.position <= position) {
        taskAboveOrAtPosition = task;
        if (tasks[1] !== undefined) {
          taskBelowPosition = tasks[1] as Task;
        }
      } else {
        taskBelowPosition = task;
      }
    }

    return {
      taskAboveOrAtPosition,
      taskBelowPosition,
    };
  }

  async getLastTaskInBoardColumn(boardColumnId: string): Promise<Task | null> {
    return this.db.queryOneOrNone(selectLastTaskInBoardColumn, {
      boardColumnId,
    });
  }

  async getLastTaskInBoardColumns(
    boardColumnIds: string[],
  ): Promise<{ [boardColumnId: string]: Task | undefined }> {
    const tasks = await this.db.queryAll(selectLastTaskInBoardColumns, {
      boardColumnIds,
    });
    return Object.fromEntries(tasks.map((task) => [task.boardColumnId, task]));
  }

  async createTask(task: NewTask): Promise<Task> {
    return this.db.queryOne(insertTask, { task });
  }

  async createTasks(tasks: NewTaskWithId[]): Promise<Task[]> {
    return this.db.queryAll(insertTasks, {
      tasks,
      returnOrder: tasks.map((task, idx) => ({
        id: task.id,
        idx: idx.toString(),
      })),
    });
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

  async getTaskSubtasksConnections(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.db.queryAll(selectTaskSubtasksConnections, { taskIds });
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.db.queryAll(selectSubtasksByTaskIds, { taskIds });
  }

  async createSubtasks(subtasks: NewSubtask[]): Promise<Subtask[]> {
    // TODO: Subtasks should be guaranteed to be retuned in the same
    // order they are appear in the input.
    try {
      return await this.db.queryAll(insertSubtasks, {
        subtasks: subtasks.map((subtask) => ({
          ...subtask,
          completed: subtask.completed ?? false,
        })),
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'subtask_task_id_title_unique_idx'
      ) {
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const taskId = duplicateKeyValues?.['task_id'] ?? 'unknown';
        const duplicateTitle = duplicateKeyValues?.['title'] ?? 'unknown';
        throw new SubtaskTitleConflictError(duplicateTitle, taskId);
      }
      throw error;
    }
  }

  /**
   * Creates subtasks positioned after the current last subtask for a task.
   *
   * The task must be locked for exclusive access for calling.
   */
  async appendSubtasksForTask(
    taskId: string,
    subtasks: Omit<NewSubtask, 'taskId' | 'position'>[],
  ): Promise<Subtask[]> {
    try {
      return await this.db.queryAll(appendSubtasks, {
        taskId,
        subtasks: subtasks.map((subtask, idx) => ({
          ...subtask,
          completed: subtask.completed ? 'true' : 'false',
          _idx: idx.toString(),
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
        throw new SubtaskTitleConflictError(duplicateTitle, taskId);
      }
      throw error;
    }
  }

  async updateSubtasksForTask(
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
        throw new SubtaskTitleConflictError(duplicateTitle, taskId);
      }
      throw error;
    }
  }

  async updateSubtaskCompletedAsUser(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    const subtask = await this.db.queryOneOrNone(updateSubtaskCompletedAsUser, {
      id,
      userId,
      completed,
    });
    if (!subtask) {
      throw new NotFoundError(`Subtask not found: ${id}`);
    }
    return subtask;
  }

  async deleteSubtasksForTask(
    taskId: string,
    subtaskIds: string[],
  ): Promise<void> {
    await this.db.queryAll(deleteTaskSubtasks, { taskId, subtaskIds });
  }
}
