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
import { CreateTaskInput } from './dto/create-task.input.js';
import { UpdateTaskInput } from './dto/update-task.input.js';
import { UpdateSubtaskCompletedInput } from './dto/update-subtask-completed.input.js';
import { Subtask } from './entities/subtask.entity.js';
import { UpdateSubtaskCompletedResponse } from './dto/update-subtask-completed-response.dto.js';
import { UpdateSubtaskCompletedSuccess } from './dto/update-subtask-completed-success.dto.js';
import { responseFromCommonError } from '../common/errors/response-from-common-error.js';
import { UpdateTaskResponse } from './dto/update-task-response.dto.js';
import { UpdateTaskSuccess } from './dto/update-task-success.dto.js';

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
      throw new Error('Task column not found');
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

  @Mutation(() => UpdateTaskResponse)
  async updateTask(
    @Args('input') input: UpdateTaskInput,
  ): Promise<typeof UpdateTaskResponse> {
    const userId = '1'; // TODO

    let task: Task;
    try {
      task = await this.taskService.updateTask(input.id, input.patch, userId);
    } catch (error) {
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new UpdateTaskSuccess(task);
  }

  @Mutation(() => UpdateSubtaskCompletedResponse)
  async updateSubtaskCompleted(
    @Args('input') input: UpdateSubtaskCompletedInput,
  ): Promise<typeof UpdateSubtaskCompletedResponse> {
    const userId = '1'; // TODO

    let subtask: Subtask;
    try {
      subtask = await this.taskService.updateSubtaskCompletedByIdForUser(
        input.id,
        input.completed,
        userId,
      );
    } catch (error) {
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new UpdateSubtaskCompletedSuccess(subtask);
  }
}
