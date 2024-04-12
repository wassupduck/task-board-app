import { Inject, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository.js';
import { Board } from './entities/board.entity.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { CreateBoardInput } from './dto/create-board.input.js';
import { DatabaseClient, DatabaseTransactor } from '../database/index.js';
import { createBoardInputSchema } from './schemas/create-board-input.schema.js';
import { ValidationError } from '../common/errors/validation-error.js';

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

  async createBoard(input: CreateBoardInput, userId: string): Promise<Board> {
    const validation = createBoardInputSchema.safeParse(input);
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
}
