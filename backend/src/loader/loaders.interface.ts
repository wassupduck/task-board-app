import { TaskLoaders } from '../task/index.js';
import { BoardLoaders } from '../board/index.js';

export interface Loaders {
  taskLoaders: TaskLoaders;
  boardLoaders: BoardLoaders;
}
