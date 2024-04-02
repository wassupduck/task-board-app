import Dataloader from 'dataloader';
import { TaskService } from './task.service.js';
import { FactoryProvider } from '@nestjs/common';
import { TaskLoaders } from './interfaces/task-loaders.interface.js';
import { TASK_LOADERS_FACTORY } from './task.constants.js';

export function createTaskLoaders(taskService: TaskService): TaskLoaders {
  const tasksInColumnLoader = new Dataloader(
    async (columnIds: readonly string[]) => {
      const tasks = await taskService.getTasksInColumns(columnIds as string[]);
      const tasksByColumnId = Object.groupBy(
        tasks,
        ({ boardColumnId }) => boardColumnId,
      );
      return columnIds.map((columnId) => tasksByColumnId[columnId] ?? []);
    },
  );

  return {
    tasksInColumnLoader,
  };
}

export const taskLoadersFactoryProvider: FactoryProvider<() => TaskLoaders> = {
  provide: TASK_LOADERS_FACTORY,
  useFactory: async (taskService: TaskService) => {
    return () => createTaskLoaders(taskService);
  },
  inject: [TaskService],
};
