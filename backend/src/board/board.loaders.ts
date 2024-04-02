import Dataloader from 'dataloader';
import { BoardService } from './board.service.js';
import { BoardColumn } from './entities/board-column.entity.js';
import { FactoryProvider } from '@nestjs/common';
import { BoardLoaders } from './interfaces/board-loaders.interface.js';
import { BOARD_LOADERS_FACTORY } from './board.constants.js';

export function createBoardLoaders(boardService: BoardService): BoardLoaders {
  const boardColumnByIdLoader = new Dataloader(
    async (ids: readonly string[]) => {
      const columns = await boardService.getBoardColumnsByIds(ids as string[]);
      const columnsById: Partial<Record<string, BoardColumn>> =
        Object.fromEntries(columns.map((column) => [column.id, column]));
      return ids.map((id) => columnsById[id] ?? null);
    },
  );

  return {
    boardColumnByIdLoader,
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
