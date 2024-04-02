import DataLoader from 'dataloader';
import { Task } from '../entities/task.entity.js';
import { SubtasksConnection } from '../entities/subtasks-connection.entity.js';
import { Subtask } from '../entities/subtask.entity.js';

export interface TaskLoaders {
  tasksInColumnLoader: DataLoader<string, Task[], string>;
  subtasksConnectionLoader: DataLoader<string, SubtasksConnection, string>;
  subtasksByTaskIdLoader: DataLoader<string, Subtask[], string>;
}
