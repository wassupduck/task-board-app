import { Inject, Injectable } from '@nestjs/common';
import { BoardRepository, NewBoardColumnWithId } from './board.repository.js';
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
import { randomUUID } from 'crypto';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    @Inject(DatabaseClient) private readonly db: DatabaseTransactor,
  ) {}

  async getBoardsByUserId(userId: string): Promise<Board[]> {
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

  async getBoardColumnsByBoardId(boardId: string): Promise<BoardColumn[]> {
    return this.boardRepository.getBoardColumnsByBoardId(boardId);
  }

  async getBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return this.boardRepository.getBoardColumnsByIds(ids);
  }

  async getForUpdateBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return this.boardRepository.getForUpdateBoardColumnsByIds(ids);
  }

  async getBoardColumnTasksConnections(
    boardColumnIds: string[],
  ): Promise<BoardColumnTasksConnection[]> {
    return await this.boardRepository.getBoardColumnTasksConnections(
      boardColumnIds,
    );
  }

  async createBoardAsUser(
    newBoardInput: NewBoardInput,
    userId: string,
  ): Promise<Board> {
    const validationResult =
      await newBoardInputSchema.safeParseAsync(newBoardInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newBoard = validationResult.data;

    return await this.db.inTransaction(async () => {
      const board = await this.boardRepository.createBoard({
        ...newBoard,
        appUserId: userId,
      });

      if (newBoard.columns && newBoard.columns.length > 0) {
        const newColumns = newBoard.columns.map((column, idx) => ({
          id: randomUUID(),
          ...column,
          position: idx,
          boardId: board.id,
        }));
        await this.boardRepository.createBoardColumns(newColumns);
      }

      return board;
    });
  }

  /**
   * Create boards for a user.
   *
   * This function is guaranteed to return the newly created boards
   * and board columns in the same order as the input array.
   */
  async createBoardsForUser(
    newBoardInputs: NewBoardInput[],
    userId: string,
  ): Promise<{ board: Board; columns: BoardColumn[] }[]> {
    if (newBoardInputs.length === 0) {
      return [];
    }

    const validationResult = await newBoardInputSchema
      .array()
      .safeParseAsync(newBoardInputs);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    const newBoards = validationResult.data.map((board) => ({
      id: randomUUID(),
      ...board,
      appUserId: userId,
    }));
    const newColumns = newBoards.flatMap((board) =>
      (board.columns ?? []).map((column, idx) => ({
        id: randomUUID(),
        ...column,
        position: idx,
        boardId: board.id,
      })),
    );

    return await this.db.inTransaction(async () => {
      const boards = await this.boardRepository.createBoards(newBoards);
      const columns =
        newColumns.length > 0
          ? await this.boardRepository.createBoardColumns(newColumns)
          : [];

      const columnsByBoardId = Map.groupBy(columns, ({ boardId }) => boardId);
      return boards.map((board) => ({
        board,
        columns: columnsByBoardId.get(board.id) ?? [],
      }));
    });
  }

  async updateBoardAsUser(
    id: string,
    patchInput: UpdateBoardPatchInput,
    userId: string,
  ): Promise<Board> {
    // Parse and validate patch
    const validationResult =
      await updateBoardPatchInputSchema.safeParseAsync(patchInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    // Check user can edit board
    const board = await this.getBoardByIdAsUser(id, userId);
    if (!board) {
      throw new NotFoundError(`Board not found: ${id}`);
    }

    const patch = validationResult.data;
    if (emptyPatch(patch)) {
      // No change
      return board;
    }

    return await this.boardRepository.updateBoard(id, patch);
  }

  async updateBoardColumnsAsUser(
    boardId: string,
    patchInput: UpdateBoardColumnsPatchInput,
    userId: string,
  ): Promise<Board> {
    // Parse and validate input
    const validationResult =
      await updateBoardColumnsPatchInputSchema.safeParseAsync(patchInput);
    if (!validationResult.success) {
      // TODO: Better validation errors
      const issue = validationResult.error.issues[0];
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

      const patch = validationResult.data;
      if (emptyPatch(patch)) {
        // No change
        return board;
      }

      // Delete columns
      if (patch.deletions.length > 0) {
        await this.boardRepository.deleteColumnsForBoard(
          boardId,
          patch.deletions,
        );
      }

      // Update columns
      if (patch.updates.length > 0) {
        await this.boardRepository.updateColumnsForBoard(
          boardId,
          patch.updates.map(({ id, patch }) => ({ id, ...patch })),
        );
      }

      if (!(patch.additions.length > 0 || patch.columnOrder.length > 0)) {
        return board;
      }

      // Current columns in position order
      const currColumns =
        await this.boardRepository.getBoardColumnsByBoardId(boardId);

      // Add new columns
      const createdColumns: BoardColumn[] = [];
      const aliasToIdMapping = new Map<string, string>();
      if (patch.additions.length > 0) {
        const offset = currColumns.length;
        const newColumns: NewBoardColumnWithId[] = [];
        for (const [idx, addition] of patch.additions.entries()) {
          const id = randomUUID();
          if (addition.idAlias !== undefined) {
            aliasToIdMapping.set(addition.idAlias, id);
          }
          newColumns.push({
            id,
            ...addition.column,
            // Position after existing columns (initially)
            position: offset + idx,
            boardId: board.id,
          });
        }

        // New columns in position sorted order
        createdColumns.push(
          ...(
            await this.boardRepository.createBoardColumns(newColumns)
          ).toSorted((a, b) => a.position - b.position),
        );
      }

      // Update column order
      if (patch.columnOrder.length > 0) {
        // All columns in position order
        const allColumns = currColumns.concat(createdColumns);
        const allColumnIds = new Set(allColumns.map(({ id }) => id));

        const newColumnOrder = patch.columnOrder
          .map((idOrAlias) =>
            allColumnIds.has(idOrAlias)
              ? idOrAlias
              : aliasToIdMapping.get(idOrAlias),
          )
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
          await this.boardRepository.updateColumnsForBoard(
            boardId,
            columnPositionUpdates,
          );
        }
      }

      return board;
    });
  }

  async deleteBoardAsUser(id: string, userId: string): Promise<void> {
    await this.boardRepository.deleteBoardAsUser(id, userId);
  }
}
