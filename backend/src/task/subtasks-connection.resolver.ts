import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loaders } from '../loader/index.js';
import { SubtasksConnection } from './entities/subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';

@Resolver(SubtasksConnection)
export class SubtasksConnectionResolver {
  constructor() {}

  @ResolveField(() => [Subtask])
  async nodes(
    @Parent() { taskId }: SubtasksConnection,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<Subtask[]> {
    return taskLoaders.subtasksByTaskIdLoader.load(taskId);
  }
}
