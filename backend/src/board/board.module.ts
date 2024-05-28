import { forwardRef, Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver.js';
import { BoardService } from './board.service.js';
import { BoardRepository } from './board.repository.js';
import { TaskModule } from '../task/index.js';
import { BoardColumnResolver } from './board-column.resolver.js';
import { boardLoadersFactoryProvider } from './board.loaders.js';
import { BOARD_LOADERS_FACTORY } from './board.constants.js';
import { BoardColumnsConnectionResolver } from './board-columns-connection.resolver.js';
import { BoardColumnTasksConnectionResolver } from './board-column-tasks-connection-resolver.js';

@Module({
  imports: [forwardRef(() => TaskModule)],
  providers: [
    BoardResolver,
    BoardColumnsConnectionResolver,
    BoardColumnResolver,
    BoardColumnTasksConnectionResolver,
    BoardService,
    BoardRepository,
    boardLoadersFactoryProvider,
  ],
  exports: [BOARD_LOADERS_FACTORY, BoardService],
})
export class BoardModule {}
