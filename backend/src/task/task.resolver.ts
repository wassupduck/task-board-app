import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Task } from './entities/task.entity.js';
import { BoardColumn } from '../board/index.js';
import { Loaders } from '../loader/index.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { TaskService } from './task.service.js';
import { UpdateSubtaskCompletedMutationResponse } from './dto/update-subtask-completed-mutation-response.js';
import { CreateTaskInput } from './dto/create-task.input.js';
import { UpdateTaskInput } from './dto/update-task.input.js';

@Resolver(Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task, { nullable: true })
  async task(@Args('id', { type: () => ID }) id: string): Promise<Task | null> {
    const userId = '1';
    return this.taskService.getTaskByIdForUser(id, userId);
  }

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

  @ResolveField(() => TaskSubtasksConnection)
  async subtasks(
    @Parent() task: Task,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<TaskSubtasksConnection> {
    return taskLoaders.taskSubtasksConnectionLoader.load(task.id);
  }

  @Mutation(() => Task)
  async createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    // TODO: Mutation response type and error handling
    return this.taskService.createTask({
      ...input,
      description: input.description ?? undefined,
    });
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateTaskInput,
  ): Promise<Task> {
    // TODO: Mutation response type and error handling
    return await this.taskService.updateTask(id, {
      title: input.title ?? undefined,
      description: input.description ?? undefined,
      boardColumnId: input.boardColumnId ?? undefined,
    });
  }

  @Mutation(() => UpdateSubtaskCompletedMutationResponse)
  async updateSubtaskCompleted(
    @Args('id', { type: () => ID }) id: string,
    @Args('completed') completed: boolean,
  ): Promise<UpdateSubtaskCompletedMutationResponse> {
    const userId = '1';
    let subtask;

    try {
      subtask = await this.taskService.updateSubtaskCompletedByIdForUser(
        id,
        completed,
        userId,
      );
    } catch (err) {
      // TODO: Error handling
      return {
        success: false,
        message: 'subtask not found',
      };
    }

    return {
      success: true,
      message: 'successfully updated subtask completed status',
      subtask: subtask,
    };
  }
}
