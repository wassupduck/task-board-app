import {
  Args,
  Context,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardService } from './board.service.js';
import { Board } from './entities/board.entity.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { Task, TaskService } from '../task/index.js';
import { Loaders } from 'src/loader/loaders.interface.js';

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

  @ResolveField(() => [BoardColumn])
  async columns(
    @Parent() board: Board,
    @Context('loaders') { boardLoaders }: Loaders,
  ): Promise<BoardColumn[]> {
    const columns = await this.boardService.getBoardColumns(board.id);
    columns.forEach((column) =>
      boardLoaders.boardColumnByIdLoader.prime(column.id, column),
    );
    return columns;
  }

  @ResolveField(() => [Task])
  async tasks(@Parent() board: Board): Promise<Task[]> {
    return this.taskService.getTasksByBoardId(board.id);
  }
}
