import DataLoader from 'dataloader';
import { BoardColumn } from '../entities/board-column.entity.js';

export interface BoardLoaders {
  boardColumnByIdLoader: DataLoader<string, BoardColumn | null, string>;
}
