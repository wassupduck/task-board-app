import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BoardService } from './board.service.js';
import { Board } from './entities/board.entity.js';
import { Task, TaskService } from '../task/index.js';
import { BoardColumnsConnection } from './entities/board-columns-connection.entity.js';
import { CreateBoardInput } from './dto/create-board.input.js';
import { CreateBoardResponse } from './dto/create-board-response.dto.js';
import { CreateBoardSuccess } from './dto/create-board-success.dto.js';
import { ValidationError } from '../common/errors/validation-error.js';
import { InvalidInputErrorResponse } from '../common/dto/invalid-input-error.js';
import { BoardNameConflictErrorResponse } from './dto/board-name-conflict-error.dto.js';
import { BoardNameConflictError } from './board.errors.js';

@Resolver(Board)
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => [Board])
  async boards(): Promise<Board[]> {
    const userId = '1'; // TODO
    return this.boardService.getBoardsForUser(userId);
  }

  @Query(() => Board, { nullable: true })
  async board(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Board | null> {
    const userId = '1'; // TODO
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

  @Mutation(() => CreateBoardResponse)
  async createBoard(
    @Args('input') input: CreateBoardInput,
  ): Promise<typeof CreateBoardResponse> {
    const userId = '1'; // TODO

    let board;
    try {
      board = await this.boardService.createBoard(input, userId);
    } catch (error) {
      if (error instanceof ValidationError) {
        return new InvalidInputErrorResponse(error.message);
      } else if (error instanceof BoardNameConflictError) {
        return new BoardNameConflictErrorResponse(error.message);
      }
      throw error;
    }

    return new CreateBoardSuccess(board);
  }
}
