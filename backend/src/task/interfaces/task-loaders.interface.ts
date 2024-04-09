import DataLoader from 'dataloader';
import { Task } from '../entities/task.entity.js';
import { TaskSubtasksConnection } from '../entities/task-subtasks-connection.entity.js';
import { Subtask } from '../entities/subtask.entity.js';

export interface TaskLoaders {
  tasksInColumnLoader: DataLoader<string, Task[], string>;
  taskSubtasksConnectionLoader: DataLoader<
    string,
    TaskSubtasksConnection,
    string
  >;
  subtasksByTaskIdLoader: DataLoader<string, Subtask[], string>;
}
