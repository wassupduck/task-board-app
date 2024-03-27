import { Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './board.service.js';
import { Board } from './entities/board.entity.js';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  async boards(): Promise<Board[]> {
    const userId = '1';
    return this.boardService.getBoardsForUser(userId);
  }
}
