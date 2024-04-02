import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BoardColumn } from './entities/board-column.entity.js';
import { Task } from '../task/index.js';
import { Loaders } from '../loader/index.js';

@Resolver(BoardColumn)
export class BoardColumnResolver {
  constructor() {}

  @ResolveField(() => [Task])
  async tasks(
    @Parent() column: BoardColumn,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<Task[]> {
    return taskLoaders.tasksInColumnLoader.load(column.id);
  }
}
