import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from '../task/index.js';
import { Loaders } from '../loader/index.js';
import { BoardColumnTasksConnection } from './entities/board-column-tasks-connection.entity.js';

@Resolver(BoardColumnTasksConnection)
export class BoardColumnTasksConnectionResolver {
  constructor() {}

  @ResolveField(() => [Task])
  async nodes(
    @Parent() { boardColumnId }: BoardColumnTasksConnection,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<Task[]> {
    return await taskLoaders.tasksInColumnLoader.load(boardColumnId);
  }
}
