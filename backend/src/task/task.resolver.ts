import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity.js';
import { BoardColumn } from '../board/index.js';
import { Loaders } from '../loader/index.js';
import { SubtasksConnection } from './entities/subtasks-connection.entity.js';

@Resolver(Task)
export class TaskResolver {
  constructor() {}

  @ResolveField(() => BoardColumn)
  async column(
    @Parent() task: Task,
    @Context('loaders') { boardLoaders }: Loaders,
  ): Promise<BoardColumn> {
    const column = await boardLoaders.boardColumnByIdLoader.load(
      task.boardColumnId,
    );
    if (!column) {
      // TODO: Error handling
      throw new Error('column not found');
    }
    return column;
  }

  @ResolveField(() => SubtasksConnection)
  async subtasks(
    @Parent() task: Task,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<SubtasksConnection> {
    return taskLoaders.subtasksConnectionLoader.load(task.id);
  }
}
