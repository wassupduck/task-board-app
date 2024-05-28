import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BoardColumn } from './entities/board-column.entity.js';
import { Loaders } from '../loader/index.js';
import { BoardColumnTasksConnection } from './entities/board-column-tasks-connection.entity.js';

@Resolver(BoardColumn)
export class BoardColumnResolver {
  constructor() {}

  @ResolveField(() => BoardColumnTasksConnection)
  async tasks(
    @Parent() column: BoardColumn,
    @Context('loaders') { boardLoaders }: Loaders,
  ): Promise<BoardColumnTasksConnection> {
    return await boardLoaders.boardColumnTasksConnectionLoader.load(column.id);
  }
}
