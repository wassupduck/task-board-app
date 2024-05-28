import Dataloader from 'dataloader';
import { BoardService } from './board.service.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { FactoryProvider } from '@nestjs/common';
import { BoardLoaders } from './interfaces/board-loaders.interface.js';
import { BOARD_LOADERS_FACTORY } from './board.constants.js';
import { BoardColumnTasksConnection } from './entities/board-column-tasks-connection.entity.js';

export function createBoardLoaders(boardService: BoardService): BoardLoaders {
  const boardColumnByIdLoader = new Dataloader(
    async (ids: readonly string[]) => {
      const columns = await boardService.getBoardColumnsByIds(ids as string[]);
      const columnsById: Partial<Record<string, BoardColumn>> =
        Object.fromEntries(columns.map((column) => [column.id, column]));
      return ids.map((id) => columnsById[id] ?? null);
    },
  );

  const boardColumnTasksConnectionLoader = new Dataloader(
    async (boardColumnIds: readonly string[]) => {
      const tasksConnections =
        await boardService.getBoardColumnTasksConnections(
          boardColumnIds as string[],
        );
      const tasksConnectionsByBoardColumnId: Partial<
        Record<string, BoardColumnTasksConnection>
      > = Object.fromEntries(
        tasksConnections.map((tasksConnection) => [
          tasksConnection.boardColumnId,
          tasksConnection,
        ]),
      );
      return boardColumnIds.map(
        (boardColumnId) =>
          tasksConnectionsByBoardColumnId[boardColumnId] ??
          new Error(`Board column not found: ${boardColumnId}`),
      );
    },
  );

  return {
    boardColumnByIdLoader,
    boardColumnTasksConnectionLoader,
  };
}

export const boardLoadersFactoryProvider: FactoryProvider<() => BoardLoaders> =
  {
    provide: BOARD_LOADERS_FACTORY,
    useFactory: async (boardService: BoardService) => {
      return () => createBoardLoaders(boardService);
    },
    inject: [BoardService],
  };
