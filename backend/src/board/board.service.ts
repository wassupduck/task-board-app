import { Inject, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository.js';
import { Board } from './entities/board.entity.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { DatabaseClient, DatabaseTransactor } from '../database/index.js';
import { newBoardInputSchema } from './schemas/new-board-input.schema.js';
import { ValidationError } from '../common/errors/validation-error.js';
import { UpdateBoardPatchInput } from './dto/update-board.input.js';
import { UpdateBoardColumnsInput } from './dto/update-board-columns.input.js';
import { updateBoardPatchInputSchema } from './schemas/update-board-patch-input.schema.js';
import { NotFoundError } from '../common/errors/not-found-error.js';
import { updateBoardColumnsPatchInputSchema } from './schemas/update-board-columns-patch-input.schema.js';
import { emptyPatch } from '../common/helpers/empty-patch.js';
import { NewBoardInput } from './dto/new-board-input.js';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    @Inject(DatabaseClient) private readonly db: DatabaseTransactor,
  ) {}

  async getBoardsForUser(userId: string): Promise<Board[]> {
    return this.boardRepository.getBoardsForUser(userId);
  }

  async getBoardByIdForUser(id: string, userId: string): Promise<Board | null> {
    return this.boardRepository.getBoardByIdForUser(id, userId);
  }

  async getBoardColumns(boardId: string): Promise<BoardColumn[]> {
    return this.boardRepository.getBoardColumns(boardId);
  }

  async getBoardColumnsByIds(ids: string[]): Promise<BoardColumn[]> {
    return this.boardRepository.getBoardColumnsByIds(ids);
  }

  async getBoardColumnsConnection(
    boardId: string,
  ): Promise<BoardColumnsConnection> {
    return this.boardRepository.getBoardColumnsConnection(boardId);
  }

  async createBoard(input: NewBoardInput, userId: string): Promise<Board> {
    const validation = newBoardInputSchema.safeParse(input);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    return await this.db.inTransaction(async () => {
      const board = await this.boardRepository.createBoard(input, userId);

      if (input.columns && input.columns.length > 0) {
        await this.boardRepository.createBoardColumns(
          board.id,
          input.columns.map((column, position) => ({ ...column, position })),
        );
      }

      return board;
    });
  }

  async updateBoard(
    id: string,
    patch: UpdateBoardPatchInput,
    userId: string,
  ): Promise<Board> {
    // Parse and validate patch
    const validation = updateBoardPatchInputSchema.safeParse(patch);
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    // Check user can edit board
    const board = await this.getBoardByIdForUser(id, userId);
    if (!board) {
      throw new NotFoundError(`Board not found: ${id}`);
    }

    const update = validation.data;
    if (emptyPatch(update)) {
      // No change
      return board;
    }

    return await this.boardRepository.updateBoard(id, update);
  }

  async updateBoardColumns(
    input: UpdateBoardColumnsInput,
    userId: string,
  ): Promise<Board> {
    const boardId = input.boardId;

    // Parse and validate patch
    const validation = updateBoardColumnsPatchInputSchema.safeParse(
      input.patch,
    );
    if (!validation.success) {
      // TODO: Better validation errors
      const issue = validation.error.issues[0];
      throw new ValidationError(`${issue.path.join('.')}: ${issue.message}`);
    }

    return await this.db.inTransaction(async () => {
      // Fetch board for update to prevent concurrent column position updates
      // And check user can edit board
      const board = await this.boardRepository.getForUpdateBoardByIdForUser(
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

      // TODO: Tidy up below

      // Delete columns
      if (patch.deletions.length > 0) {
        await this.boardRepository.deleteBoardColumns(boardId, patch.deletions);
      }

      // Old columns in position order
      const prevColumns = await this.boardRepository.getBoardColumns(boardId);

      // Add new columns
      let addedColumns: BoardColumn[] = [];
      let idAliasMapping: { [key: string]: string | undefined } = {};
      if (patch.additions.length > 0) {
        const columnsToAdd = patch.additions.map((addition, idx) => ({
          ...addition.column,
          idAlias: addition.idAlias,
          // Position in order starting at 0.
          // This will conflict with exiting columns
          // but will be corrected in an update below.
          // Unique constraint on position column is "deferrable initially deferred"
          // so this is ok until the end of the transaction
          position: idx,
        }));

        [addedColumns, idAliasMapping] =
          // New columns will be returned in position order
          await this.boardRepository.createBoardColumns(boardId, columnsToAdd);
      }

      const updates: {
        [key: string]:
          | Partial<Pick<BoardColumn, 'name' | 'position'>>
          | undefined;
      } = {};

      // Reorder columns i.e update column positions
      if (
        patch.deletions.length > 0 ||
        patch.additions.length > 0 ||
        patch.columnOrder.length > 0
      ) {
        // Columns
        const columns = [...prevColumns, ...addedColumns];
        const columnIds = new Set(columns.map(({ id }) => id));

        let newColumnOrder: string[] = [];
        if (patch.columnOrder.length > 0) {
          newColumnOrder = patch.columnOrder
            .map((idOrAlias) => {
              return columnIds.has(idOrAlias)
                ? idOrAlias
                : idAliasMapping[idOrAlias];
            })
            .filter((c) => c !== undefined) as string[];
          const orderedColumnIds = new Set(newColumnOrder);
          for (const column of columns) {
            if (!orderedColumnIds.has(column.id)) {
              newColumnOrder.push(column.id);
            }
          }
        } else {
          newColumnOrder = columns.map(({ id }) => id);
        }

        newColumnOrder.forEach((columnId, idx) => {
          updates[columnId] = { position: idx };
        });
      }

      // Apply column updates
      if (patch.updates && patch.updates.length > 0) {
        for (const { id: columnId, patch: columnPatch } of patch.updates) {
          updates[columnId] = {
            ...(updates[columnId] ?? {}),
            ...columnPatch,
          };
        }
      }

      // Update columns
      if (Object.keys(updates).length > 0) {
        await this.boardRepository.updateBoardColumns(
          boardId,
          Object.entries(updates).map(([columnId, patch]) => ({
            id: columnId,
            ...patch,
          })),
        );
      }

      return board;
    });
  }
}
