import DataLoader from 'dataloader';
import { BoardColumn } from '../entities/board-column.entity.js';
import { BoardColumnTasksConnection } from '../entities/board-column-tasks-connection.entity.js';

export interface BoardLoaders {
  boardColumnByIdLoader: DataLoader<string, BoardColumn | null, string>;
  boardColumnTasksConnectionLoader: DataLoader<
    string,
    BoardColumnTasksConnection,
    string
  >;
}
