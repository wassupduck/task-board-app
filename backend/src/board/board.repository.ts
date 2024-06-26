import { Injectable } from '@nestjs/common';
import { DatabaseClient, DatabaseError } from '../database/index.js';
import { Board } from './entities/board.entity.js';
import {
  deleteBoardAsUser,
  deleteBoardColumns,
  insertBoard,
  insertBoardColumns,
  insertBoards,
  selectBoardByIdAsUser,
  selectBoardColumnsByBoardId,
  selectBoardColumnsByIds,
  selectBoardColumnsConnection,
  selectBoardColumnTasksConnections,
  selectBoardsByUserId,
  selectForUpdateBoardByIdAsUser,
  selectForUpdateBoardColumnByIdAsUser,
  selectForUpdateBoardColumnsByIds,
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

export type NewBoard = Pick<Board, 'name' | 'appUserId'>;
export type NewBoardWithId = NewBoard & Pick<Board, 'id'>;
export type EditBoard = Partial<Pick<Board, 'name'>>;
export type NewBoardColumn = Pick<BoardColumn, 'name' | 'position' | 'boardId'>;
export type NewBoardColumnWithId = NewBoardColumn & Pick<BoardColumn, 'id'>;
export type EditBoardColumn = Partial<Pick<BoardColumn, 'name' | 'position'>>;

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

  async getBoardColumnsByBoardId(boardId: string): Promise<BoardColumn[]> {
    return await this.db.queryAll(selectBoardColumnsByBoardId, { boardId });
  }

  async getBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return await this.db.queryAll(selectBoardColumnsByIds, { ids });
  }

  async getForUpdateBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return await this.db.queryAll(selectForUpdateBoardColumnsByIds, { ids });
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
        throw new BoardNameConflictError(board.name, board.appUserId);
      }
      throw error;
    }
  }

  /**
   * Creates boards and returns them in the same order as `newBoards`.
   */
  async createBoards(newBoards: NewBoardWithId[]): Promise<Board[]> {
    let boards: Board[];
    try {
      boards = await this.db.queryAll(insertBoards, { boards: newBoards });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'board_app_user_id_name_unique_idx'
      ) {
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const userId = duplicateKeyValues?.['app_user_id'] ?? 'unknown';
        const duplicateName = duplicateKeyValues?.['name'] ?? 'unknown';
        throw new BoardNameConflictError(duplicateName, userId);
      }
      throw error;
    }
    // Board name is unique so can be used to order results
    const boardByName = Object.fromEntries(
      boards.map((board) => [board.name, board]),
    );
    return newBoards.map(({ name }) => boardByName[name]);
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
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const userId = duplicateKeyValues?.['app_user_id'] ?? 'unknown';
        throw new BoardNameConflictError(fieldsToUpdate.name!, userId);
      }
      throw error;
    }
    if (!board) {
      throw new NotFoundError(`Board not found: ${id}`);
    }
    return board;
  }

  /**
   * Creates board columns and returns them in the same order as `newColumns`.
   */
  async createBoardColumns(
    newColumns: NewBoardColumnWithId[],
  ): Promise<BoardColumn[]> {
    let columns: BoardColumn[];
    try {
      columns = await this.db.queryAll(insertBoardColumns, {
        columns: newColumns,
      });
    } catch (error) {
      if (
        error instanceof DatabaseError &&
        error.cause instanceof UniqueViolationError &&
        error.cause.constraint === 'board_column_board_id_name_unique_idx'
      ) {
        const duplicateKeyValues = getDuplicateKeyValues(error.cause);
        const boardId = duplicateKeyValues?.['board_id'] ?? 'unknown';
        const colummName = duplicateKeyValues?.['name'] ?? 'unknown';
        throw new BoardColumnNameConflictError(colummName, boardId);
      }
      throw error;
    }
    // Column (boardId, name) is unique so can be used to order results
    const columnLookupKey = ({
      boardId,
      name,
    }: {
      boardId: string;
      name: string;
    }) => `${boardId}_${name}`;
    const columnLookup = Object.fromEntries(
      columns.map((column) => [columnLookupKey(column), column]),
    );
    return newColumns.map(
      (newColumn) => columnLookup[columnLookupKey(newColumn)],
    );
  }

  async deleteColumnsForBoard(
    boardId: string,
    columnIds: string[],
  ): Promise<void> {
    await this.db.queryAll(deleteBoardColumns, { boardId, columnIds });
  }

  async updateColumnsForBoard(
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
