import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import { Board } from './entities/board.entity.js';
import {
  deleteBoardAsUser,
  deleteBoardColumns,
  IInsertBoardColumnsResult,
  insertBoard,
  insertBoardColumns,
  selectBoardByIdAsUser,
  selectBoardColumnsByBoardId,
  selectBoardColumnsByIds,
  selectBoardColumnsConnection,
  selectBoardColumnTasksConnections,
  selectBoardsByUserId,
  selectForUpdateBoardByIdAsUser,
  selectForUpdateBoardColumnByIdAsUser,
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
import { getDuplicateKeyValues } from '../database/helpers/unique-violation-error-duplicate-key-values.js';
import { BoardColumnTasksConnection } from './entities/board-column-tasks-connection.entity.js';

type NewBoard = Pick<Board, 'name' | 'appUserId'>;
type EditBoard = Partial<Pick<Board, 'name'>>;
type NewBoardColumn = Pick<BoardColumn, 'name' | 'position'>;
type EditBoardColumn = Partial<Pick<BoardColumn, 'name' | 'position'>>;

export type AliasToIdMapping = { [key: string]: string | undefined };

@Injectable()
export class BoardRepository {
  constructor(private readonly db: DatabaseClient) {}

  async getBoardsByUserId(userId: string): Promise<Board[]> {
    return await this.db.queryAll(selectBoardsByUserId, { userId });
  }

  async getBoardByIdAsUser(id: string, userId: string): Promise<Board | null> {
    return await this.db.queryOneOrNone(selectBoardByIdAsUser, { id, userId });
  }

  async getForUpdateBoardByIdAsUser(
    id: string,
    userId: string,
  ): Promise<Board | null> {
    return await this.db.queryOneOrNone(selectForUpdateBoardByIdAsUser, {
      id,
      userId,
    });
  }

  async getBoardColumnsConnection(
    boardId: string,
  ): Promise<BoardColumnsConnection> {
    return await this.db.queryOne(selectBoardColumnsConnection, { boardId });
  }

  async getForUpdateBoardColumnByIdAsUser(
    id: string,
    userId: string,
  ): Promise<BoardColumn | null> {
    return await this.db.queryOneOrNone(selectForUpdateBoardColumnByIdAsUser, {
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

  async getBoardColumnTasksConnections(
    boardColumnIds: string[],
  ): Promise<BoardColumnTasksConnection[]> {
    return await this.db.queryAll(selectBoardColumnTasksConnections, {
      boardColumnIds,
    });
  }

  async createBoard(board: NewBoard): Promise<Board> {
    try {
      return await this.db.queryOne(insertBoard, { board });
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

  async updateBoard(id: string, fieldsToUpdate: EditBoard): Promise<Board> {
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
    columns: (NewBoardColumn & { idAlias?: string })[],
  ): Promise<[BoardColumn[], AliasToIdMapping]> {
    let newColumns: IInsertBoardColumnsResult[];
    try {
      newColumns = await this.db.queryAll(insertBoardColumns, {
        columns: columns.map((column) => ({
          ...column,
          idAlias: column.idAlias,
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
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const duplicateColummName = duplicateKeyValues?.['name'] ?? 'unknown';
        throw new BoardColumnNameConflictError(duplicateColummName);
      }
      throw error;
    }

    const aliasToIdMapping = newColumns.reduce((acc, column) => {
      if (column.idAlias !== null) {
        acc[column.idAlias] = column.id;
      }
      return acc;
    }, {} as AliasToIdMapping);

    return [newColumns, aliasToIdMapping];
  }

  async deleteBoardColumns(
    boardId: string,
    columnIds: string[],
  ): Promise<void> {
    await this.db.queryAll(deleteBoardColumns, { boardId, columnIds });
  }

  async updateBoardColumns(
    boardId: string,
    columns: ({ id: string } & EditBoardColumn)[],
  ): Promise<BoardColumn[]> {
    return this.db.queryAll(updateBoardColumns, {
      boardId,
      columns: columns.map((column) => ({
        id: column.id,
        name: column.name,
        position: column.position?.toString(),
      })),
    });
  }

  async deleteBoardAsUser(id: string, userId: string) {
    const deletedBoard = await this.db.queryOneOrNone(deleteBoardAsUser, {
      id,
      userId,
    });
    if (!deletedBoard) {
      throw new NotFoundError(`Board not found: ${id}`);
    }
  }
}
