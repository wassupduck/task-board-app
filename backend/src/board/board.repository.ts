import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database/index.js';
import { Board } from './entities/board.entity.js';
import {
  selectAllBoardsForUser,
  selectBoardByIdForUser,
  selectBoardColumnsByBoardId,
  selectBoardColumnsByIds,
  selectBoardColumnsConnection,
} from './board.queries.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';

@Injectable()
export class BoardRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getBoardsForUser(userId: string): Promise<Board[]> {
    return this.db.queryAll(selectAllBoardsForUser, { userId });
  }

  async getBoardByIdForUser(id: string, userId: string): Promise<Board | null> {
    return this.db.queryOneOrNone(selectBoardByIdForUser, { id, userId });
  }

  async getBoardColumns(boardId: string): Promise<BoardColumn[]> {
    return this.db.queryAll(selectBoardColumnsByBoardId, { boardId });
  }

  async getBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return this.db.queryAll(selectBoardColumnsByIds, { ids });
  }

  async getBoardColumnsConnection(
    boardId: string,
  ): Promise<BoardColumnsConnection> {
    return this.db.queryOne(selectBoardColumnsConnection, { boardId });
  }
}
