import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import {
  selectSubtasksByTaskIds,
  selectSubtasksConnectionsByTaskIds,
  selectTasksByBoardId,
  selectTasksByColumnIds,
} from './task.queries.js';
import { Task } from './entities/task.entity.js';
import { SubtasksConnection } from './entities/subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.db.queryAll(selectTasksByBoardId, { boardId });
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.db.queryAll(selectTasksByColumnIds, { columnIds });
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<SubtasksConnection[]> {
    return this.db.queryAll(selectSubtasksConnectionsByTaskIds, { taskIds });
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.db.queryAll(selectSubtasksByTaskIds, { taskIds });
  }
}
