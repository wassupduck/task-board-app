import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import { Board } from './entities/board.entity.js';
import { selectAllBoardsForUser } from './board.queries.js';

@Injectable()
export class BoardRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getBoardsForUser(userId: string): Promise<Board[]> {
    return this.db.queryAll(selectAllBoardsForUser, { userId });
  }
}
