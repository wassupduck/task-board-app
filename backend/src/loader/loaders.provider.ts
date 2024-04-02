import { FactoryProvider } from '@nestjs/common';
import { Loaders } from './loaders.interface.js';
import { LOADERS_FACTORY } from './loader.constants.js';
import { TASK_LOADERS_FACTORY, TaskLoaders } from '../task/index.js';
import { BOARD_LOADERS_FACTORY, BoardLoaders } from '../board/index.js';

export const loadersFactoryProvider: FactoryProvider<() => Loaders> = {
  provide: LOADERS_FACTORY,
  useFactory: async (
    createTaskLoaders: () => TaskLoaders,
    createBoardLoaders: () => BoardLoaders,
  ) => {
    return () => ({
      taskLoaders: createTaskLoaders(),
      boardLoaders: createBoardLoaders(),
    });
  },
  inject: [TASK_LOADERS_FACTORY, BOARD_LOADERS_FACTORY],
};
