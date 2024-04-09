import Dataloader from 'dataloader';
import { TaskService } from './task.service.js';
import { FactoryProvider } from '@nestjs/common';
import { TaskLoaders } from './interfaces/task-loaders.interface.js';
import { TASK_LOADERS_FACTORY } from './task.constants.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';

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

  const taskSubtasksConnectionLoader = new Dataloader(
    async (taskIds: readonly string[]) => {
      const subtasksConnections =
        await taskService.getSubtasksConnectionsByTaskIds(taskIds as string[]);
      const subtasksConnectionsByTaskId: Partial<
        Record<string, TaskSubtasksConnection>
      > = Object.fromEntries(
        subtasksConnections.map((subtasksConnection) => [
          subtasksConnection.taskId,
          subtasksConnection,
        ]),
      );
      return taskIds.map(
        (taskId) =>
          subtasksConnectionsByTaskId[taskId] ??
          new Error(`Task not found: ${taskId}`),
      );
    },
  );

  const subtasksByTaskIdLoader = new Dataloader(
    async (taskIds: readonly string[]) => {
      const subtasks = await taskService.getSubtasksByTaskIds(
        taskIds as string[],
      );
      const subtasksByTaskId = Object.groupBy(subtasks, ({ taskId }) => taskId);
      return taskIds.map((taskId) => subtasksByTaskId[taskId] ?? []);
    },
  );

  return {
    tasksInColumnLoader,
    taskSubtasksConnectionLoader,
    subtasksByTaskIdLoader,
  };
}

export const taskLoadersFactoryProvider: FactoryProvider<() => TaskLoaders> = {
  provide: TASK_LOADERS_FACTORY,
  useFactory: async (taskService: TaskService) => {
    return () => createTaskLoaders(taskService);
  },
  inject: [TaskService],
};
