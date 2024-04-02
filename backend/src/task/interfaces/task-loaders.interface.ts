import DataLoader from 'dataloader';
import { Task } from '../entities/task.entity.js';

export interface TaskLoaders {
  tasksInColumnLoader: DataLoader<string, Task[], string>;
}
