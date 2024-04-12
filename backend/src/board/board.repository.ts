import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import { Board } from './entities/board.entity.js';
import {
  insertBoard,
  insertBoardColumns,
  selectAllBoardsForUser,
  selectBoardByIdForUser,
  selectBoardColumnsByBoardId,
  selectBoardColumnsByIds,
  selectBoardColumnsConnection,
} from './board.queries.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { UniqueViolationError } from 'db-errors';
import { BoardNameConflictError } from './board.errors.js';

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

  async createBoard(
    board: Pick<Board, 'name'>,
    userId: string,
  ): Promise<Board> {
    try {
      return await this.db.queryOne(insertBoard, {
        board: { ...board, userId },
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'board_app_user_id_name_unique_idx'
      ) {
        throw new BoardNameConflictError(board.name);
      }
      throw error;
    }
  }

  async createBoardColumns(
    boardId: string,
    columns: Pick<BoardColumn, 'name' | 'position'>[],
  ): Promise<BoardColumn[]> {
    return this.db.queryAll(insertBoardColumns, {
      columns: columns.map((column) => ({
        ...column,
        boardId,
      })),
    });
  }
}
