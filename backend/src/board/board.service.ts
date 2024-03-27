import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository.js';
import { Board } from './entities/board.entity.js';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getBoardsForUser(userId: string): Promise<Board[]> {
    return this.boardRepository.getBoardsForUser(userId);
  }
}
