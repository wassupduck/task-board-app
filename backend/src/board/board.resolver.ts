import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardService } from './board.service.js';
import { Board } from './entities/board.entity.js';
import { Task, TaskService } from '../task/index.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';

@Resolver(Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => [Board])
  async boards(): Promise<Board[]> {
    const userId = '1';
    return this.boardService.getBoardsForUser(userId);
  }

  @Query(() => Board, { nullable: true })
  async board(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Board | null> {
    const userId = '1';
    return this.boardService.getBoardByIdForUser(id, userId);
  }

  @ResolveField(() => BoardColumnsConnection)
  async columns(@Parent() board: Board): Promise<BoardColumnsConnection> {
    return this.boardService.getBoardColumnsConnection(board.id);
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() board: Board): Promise<Task[]> {
    return this.taskService.getTasksByBoardId(board.id);
  }
}
