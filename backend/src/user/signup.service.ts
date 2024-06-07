import { Inject, Injectable } from '@nestjs/common';
import starterData from './starter-data.js';
import { DatabaseClient, DatabaseTransactor } from '../database/index.js';
import { TaskService } from '../task/index.js';
import { BoardService } from '../board/board.service.js';
import { UserService } from './user.service.js';
import { NewUserInput } from './dto/new-user.input.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class SignupService {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
    @Inject(DatabaseClient) private readonly db: DatabaseTransactor,
  ) {}

  async signup(newUser: NewUserInput): Promise<User> {
    return await this.db.inTransaction(async () => {
      const user = await this.userService.createUser(newUser);
      await this.createStarterBoards(user.id);
      return user;
    });
  }

  private async createStarterBoards(userId: string): Promise<void> {
    const starterBoards = starterData.boards;
    const boards = await this.boardService.createBoardsForUser(
      starterBoards,
      userId,
    );
    const starterTasks = starterBoards.flatMap((board, boardIdx) =>
      board.columns.flatMap((column, columnIdx) =>
        column.tasks.map((task) => ({
          ...task,
          boardColumnId: boards[boardIdx].columns[columnIdx].id,
        })),
      ),
    );
    await this.taskService.createTasks(starterTasks);
  }
}
