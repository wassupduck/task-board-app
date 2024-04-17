import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { TaskRepository } from './task.repository.js';
import { TaskResolver } from './task.resolver.js';
import { taskLoadersFactoryProvider } from './task.loaders.js';
import { TASK_LOADERS_FACTORY } from './task.constants.js';
import { TaskSubtasksConnectionResolver } from './task-subtasks-connection.resolver.js';
import { BoardModule } from '../board/index.js';

@Module({
  imports: [forwardRef(() => BoardModule)],
  providers: [
    TaskService,
    TaskRepository,
    TaskResolver,
    TaskSubtasksConnectionResolver,
    taskLoadersFactoryProvider,
  ],
  exports: [TaskService, TASK_LOADERS_FACTORY],
})
export class TaskModule {}
