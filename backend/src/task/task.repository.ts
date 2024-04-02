import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import {
  selectTasksByBoardId,
  selectTasksByColumnIds,
} from './task.queries.js';
import { Task } from './entities/task.entity.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.db.queryAll(selectTasksByBoardId, { boardId });
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.db.queryAll(selectTasksByColumnIds, { columnIds });
  }
}
