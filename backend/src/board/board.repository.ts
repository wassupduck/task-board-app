import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import { Board } from './entities/board.entity.js';
import {
  deleteBoardColumns,
  IInsertBoardColumnsResult,
  insertBoard,
  insertBoardColumns,
  selectAllBoardsForUser,
  selectBoardByIdForUser,
  selectBoardColumnByIdForUser,
  selectBoardColumnsByBoardId,
  selectBoardColumnsByIds,
  selectBoardColumnsConnection,
  selectForUpdateBoardByIdForUser,
  updateBoard,
  updateBoardColumns,
} from './board.queries.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { UniqueViolationError } from 'db-errors';
import {
  BoardColumnNameConflictError,
  BoardNameConflictError,
} from './board.errors.js';
import { NotFoundError } from '../common/errors/not-found-error.js';

@Injectable()
export class BoardRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getBoardsForUser(userId: string): Promise<Board[]> {
    return await this.db.queryAll(selectAllBoardsForUser, { userId });
  }

  async getBoardByIdForUser(id: string, userId: string): Promise<Board | null> {
    return await this.db.queryOneOrNone(selectBoardByIdForUser, { id, userId });
  }

  async getForUpdateBoardByIdForUser(
    id: string,
    userId: string,
  ): Promise<Board | null> {
    return await this.db.queryOneOrNone(selectForUpdateBoardByIdForUser, {
      id,
      userId,
    });
  }

  async getBoardColumnByIdForUser(
    id: string,
    userId: string,
  ): Promise<BoardColumn | null> {
    return await this.db.queryOneOrNone(selectBoardColumnByIdForUser, {
      id,
      userId,
    });
  }

  async getBoardColumns(boardId: string): Promise<BoardColumn[]> {
    return await this.db.queryAll(selectBoardColumnsByBoardId, { boardId });
  }

  async getBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return await this.db.queryAll(selectBoardColumnsByIds, { ids });
  }

  async getBoardColumnsConnection(
    boardId: string,
  ): Promise<BoardColumnsConnection> {
    return await this.db.queryOne(selectBoardColumnsConnection, { boardId });
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

  async updateBoard(
    id: string,
    fieldsToUpdate: Partial<Pick<Board, 'name'>>,
  ): Promise<Board> {
    let board: Board | null;
    try {
      board = await this.db.queryOneOrNone(updateBoard, {
        id,
        ...fieldsToUpdate,
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'board_app_user_id_name_unique_idx'
      ) {
        throw new BoardNameConflictError(fieldsToUpdate.name!);
      }
      throw error;
    }
    if (!board) {
      throw new NotFoundError(`Board not found: ${id}`);
    }
    return board;
  }

  async createBoardColumns(
    boardId: string,
    columns: (Pick<BoardColumn, 'name' | 'position'> & { idAlias?: string })[],
  ): Promise<[BoardColumn[], { [key: string]: string | undefined }]> {
    let newColumns: IInsertBoardColumnsResult[];
    try {
      newColumns = await this.db.queryAll(insertBoardColumns, {
        columns: columns.map((column) => ({
          ...column,
          idAlias: column.idAlias ?? null,
          position: column.position.toString(),
          boardId,
        })),
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'board_column_board_id_name_unique_idx'
      ) {
        let columnName = 'unknown';
        if (
          'detail' in error.cause.nativeError &&
          typeof error.cause.nativeError.detail === 'string'
        ) {
          const re = /Key \(board_id, name\)=\(.*, (.*)\) already exists./;
          columnName =
            error.cause.nativeError.detail.match(re)?.[1] ?? columnName;
        }
        throw new BoardColumnNameConflictError(columnName);
      }
      throw error;
    }

    const idAliasMapping = newColumns.reduce(
      (acc, column) => {
        if (column.idAlias !== null) {
          acc[column.idAlias] = column.id;
        }
        return acc;
      },
      {} as { [key: string]: string | undefined },
    );

    return [newColumns, idAliasMapping];
  }

  async deleteBoardColumns(
    boardId: string,
    columnIds: string[],
  ): Promise<void> {
    await this.db.queryAll(deleteBoardColumns, { boardId, columnIds });
  }

  async updateBoardColumns(
    boardId: string,
    columns: ({ id: string } & Partial<
      Pick<BoardColumn, 'name' | 'position'>
    >)[],
  ): Promise<BoardColumn[]> {
    return this.db.queryAll(updateBoardColumns, {
      boardId,
      columns: columns.map((column) => ({
        ...column,
        name: column.name ?? null,
        position: column.position?.toString() ?? null,
      })),
    });
  }
}
