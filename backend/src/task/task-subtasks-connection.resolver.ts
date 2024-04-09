import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loaders } from '../loader/index.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';

@Resolver(TaskSubtasksConnection)
export class TaskSubtasksConnectionResolver {
  constructor() {}

  @ResolveField(() => [Subtask])
  async nodes(
    @Parent() { taskId }: TaskSubtasksConnection,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<Subtask[]> {
    return taskLoaders.subtasksByTaskIdLoader.load(taskId);
  }
}
