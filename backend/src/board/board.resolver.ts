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
import { BoardNameConflictErrorResponse } from './dto/board-name-conflict-error.dto.js';
import {
  BoardColumnNameConflictError,
  BoardNameConflictError,
} from './board.errors.js';
import { UpdateBoardInput } from './dto/update-board.input.js';
import { UpdateBoardResponse } from './dto/update-board-response.dto.js';
import { UpdateBoardSuccess } from './dto/update-board-success.dto.js';
import { UpdateBoardColumnsResponse } from './dto/update-board-columns-response.dto.js';
import { UpdateBoardColumnsInput } from './dto/update-board-columns.input.js';
import { UpdateBoardColumnsSuccess } from './dto/update-board-columns-success.dto.js';
import { responseFromCommonError } from '../common/errors/response-from-common-error.js';
import { BoardColumnNameConflictErrorResponse } from './dto/board-column-name-conflict-error.dto.js';

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

    let board: Board;
    try {
      board = await this.boardService.createBoard(input.board, userId);
    } catch (error) {
      if (error instanceof BoardNameConflictError) {
        return new BoardNameConflictErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new CreateBoardSuccess(board);
  }

  @Mutation(() => UpdateBoardResponse)
  async updateBoard(
    @Args('input') input: UpdateBoardInput,
  ): Promise<typeof UpdateBoardResponse> {
    const userId = '1'; // TODO

    let board: Board;
    try {
      board = await this.boardService.updateBoard(input, userId);
    } catch (error) {
      if (error instanceof BoardNameConflictError) {
        return new BoardNameConflictErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new UpdateBoardSuccess(board);
  }

  @Mutation(() => UpdateBoardColumnsResponse)
  async updateBoardColumns(
    @Args('input') input: UpdateBoardColumnsInput,
  ): Promise<typeof UpdateBoardColumnsResponse> {
    const userId = '1'; // TODO

    let board: Board;
    try {
      board = await this.boardService.updateBoardColumns(input, userId);
    } catch (error) {
      if (error instanceof BoardColumnNameConflictError) {
        return new BoardColumnNameConflictErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new UpdateBoardColumnsSuccess(board);
  }
}
