import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository.js';
import { Board } from './entities/board.entity.js';
import { BoardColumn } from './entities/board-column.entity.js';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

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
}
