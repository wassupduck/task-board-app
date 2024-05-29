import { Inject, Injectable } from '@nestjs/common';
import { AliasToIdMapping, BoardRepository } from './board.repository.js';
import { Board } from './entities/board.entity.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { DatabaseClient, DatabaseTransactor } from '../database/index.js';
import { newBoardInputSchema } from './schemas/new-board-input.schema.js';
import { ValidationError } from '../common/errors/validation-error.js';
import { UpdateBoardPatchInput } from './dto/update-board.input.js';
import { UpdateBoardColumnsPatchInput } from './dto/update-board-columns.input.js';
import { updateBoardPatchInputSchema } from './schemas/update-board-patch-input.schema.js';
import { NotFoundError } from '../common/errors/not-found-error.js';
import { updateBoardColumnsPatchInputSchema } from './schemas/update-board-columns-patch-input.schema.js';
import { emptyPatch } from '../common/helpers/empty-patch.js';
import { NewBoardInput } from './dto/new-board.input.js';
import { BoardColumnTasksConnection } from './entities/board-column-tasks-connection.entity.js';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    @Inject(DatabaseClient) private readonly db: DatabaseTransactor,
  ) {}

  async getUserBoards(userId: string): Promise<Board[]> {
    return this.boardRepository.getBoardsByUserId(userId);
  }

  async getBoardByIdAsUser(id: string, userId: string): Promise<Board | null> {
    return this.boardRepository.getBoardByIdAsUser(id, userId);
  }

  async getBoardColumnsConnection(
    boardId: string,
  ): Promise<BoardColumnsConnection> {
    return this.boardRepository.getBoardColumnsConnection(boardId);
  }

  async getForUpdateBoardColumnByIdAsUser(
    id: string,
    userId: string,
  ): Promise<BoardColumn | null> {
    return await this.boardRepository.getForUpdateBoardColumnByIdAsUser(
      id,
      userId,
    );
  }

  async getBoardColumns(boardId: string): Promise<BoardColumn[]> {
    return this.boardRepository.getBoardColumns(boardId);
  }

  async getBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return this.boardRepository.getBoardColumnsByIds(ids);
  }

  async getBoardColumnTasksConnections(
    boardColumnIds: string[],
  ): Promise<BoardColumnTasksConnection[]> {
    return await this.boardRepository.getBoardColumnTasksConnections(
      boardColumnIds,
    );
  }

  async createBoard(input: NewBoardInput, userId: string): Promise<Board> {
    const validation = newBoardInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newBoard = validation.data;

    return await this.db.inTransaction(async () => {
      const board = await this.boardRepository.createBoard({
        ...newBoard,
        appUserId: userId,
      });

      if (newBoard.columns && newBoard.columns.length > 0) {
        await this.boardRepository.createBoardColumns(
          board.id,
          newBoard.columns.map((column, position) => ({ ...column, position })),
        );
      }

      return board;
    });
  }

  async updateBoard(
    id: string,
    input: UpdateBoardPatchInput,
    userId: string,
  ): Promise<Board> {
    // Parse and validate patch
    const validation = updateBoardPatchInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    // Check user can edit board
    const board = await this.getBoardByIdAsUser(id, userId);
    if (!board) {
      throw new NotFoundError(`Board not found: ${id}`);
    }

    const patch = validation.data;
    if (emptyPatch(patch)) {
      // No change
      return board;
    }

    return await this.boardRepository.updateBoard(id, patch);
  }

  async updateBoardColumns(
    boardId: string,
    input: UpdateBoardColumnsPatchInput,
    userId: string,
  ): Promise<Board> {
    // Parse and validate input
    const validation = updateBoardColumnsPatchInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    return await this.db.inTransaction(async () => {
      // Fetch board for update to prevent concurrent column position updates
      // And check user can edit board
      const board = await this.boardRepository.getForUpdateBoardByIdAsUser(
        boardId,
        userId,
      );
      if (!board) {
        throw new NotFoundError(`Board not found: ${boardId}`);
      }

      const patch = validation.data;
      if (emptyPatch(patch)) {
        // No change
        return board;
      }

      // Delete columns
      if (patch.deletions.length > 0) {
        await this.boardRepository.deleteBoardColumns(boardId, patch.deletions);
      }

      // Update columns
      if (patch.updates.length > 0) {
        await this.boardRepository.updateBoardColumns(
          boardId,
          patch.updates.map(({ id, patch }) => ({ id, ...patch })),
        );
      }

      if (!(patch.additions.length > 0 || patch.columnOrder.length > 0)) {
        return board;
      }

      // Current columns in position order
      const prevColumns = await this.boardRepository.getBoardColumns(boardId);

      // Add new columns
      let addedColumns: BoardColumn[] = [];
      let aliasToIdMapping: AliasToIdMapping = {};
      if (patch.additions.length > 0) {
        const offset = prevColumns.length;
        const columnsToAdd = patch.additions.map((addition, idx) => ({
          ...addition.column,
          idAlias: addition.idAlias,
          // Position after existing columns (initially)
          position: offset + idx,
        }));

        [addedColumns, aliasToIdMapping] =
          // New columns will be returned in position order
          await this.boardRepository.createBoardColumns(boardId, columnsToAdd);
      }

      // Update column order
      if (patch.columnOrder.length > 0) {
        // All columns in position order
        const allColumns = prevColumns.concat(addedColumns);
        const allColumnIds = new Set(allColumns.map(({ id }) => id));

        const newColumnOrder = patch.columnOrder
          .map((idOrAlias) => {
            return allColumnIds.has(idOrAlias)
              ? idOrAlias
              : aliasToIdMapping[idOrAlias];
          })
          .filter((c) => c !== undefined) as string[];
        const orderedColumnIds = new Set(newColumnOrder);
        // Loop over all columns in position order and append
        // any that were not ordered in the patch
        for (const column of allColumns) {
          if (!orderedColumnIds.has(column.id)) {
            newColumnOrder.push(column.id);
          }
        }

        const columnPositionUpdates: { id: string; position: number }[] = [];
        const newColumnPositions = Object.fromEntries(
          newColumnOrder.map((id, idx) => [id, idx]),
        );
        for (const column of allColumns) {
          const newPosition = newColumnPositions[column.id];
          if (newPosition !== column.position) {
            columnPositionUpdates.push({
              id: column.id,
              position: newPosition,
            });
          }
        }
        if (columnPositionUpdates.length > 0) {
          await this.boardRepository.updateBoardColumns(
            boardId,
            columnPositionUpdates,
          );
        }
      }

      return board;
    });
  }

  async deleteBoard(id: string, userId: string): Promise<void> {
    await this.boardRepository.deleteBoardAsUser(id, userId);
  }
}
