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
import { CreateTaskResponse } from './dto/create-task-response.dto.js';
import { CreateTaskSuccess } from './dto/create-task-success.dto.js';
import {
  BoardColumnNotFoundError,
  SubtaskTitleConflictError,
} from './task.errors.js';
import { BoardColumnNotFoundErrorResponse } from './dto/board-column-not-found-error.dto.js';
import { DeleteTaskResponse } from './dto/delete-task-response.dto.js';
import { DeleteTaskInput } from './dto/delete-task.input.js';
import { DeleteTaskSuccess } from './dto/delete-task-success.dto.js';
import { CurrentUser } from '../auth/index.js';
import { UpdateTaskSubtasksResponse } from './dto/update-task-subtasks-response.dto.js';
import { UpdateTaskSubtasksInput } from './dto/update-task-subtasks.input.js';
import { UpdateTaskSubtasksSuccess } from './dto/update-task-subtasks-success.dto.js';
import { SubtaskTitleConflictErrorResponse } from './dto/subtask-title-conflict-error.dto.js';
import { MoveTaskInput } from './dto/move-task.input.js';
import { MoveTaskResponse } from './dto/move-task-response.dto.js';
import { MoveTaskSuccess } from './dto/move-task-success.dto.js';

@Resolver(Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task, { nullable: true })
  async task(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser('id') userId: string,
  ): Promise<Task | null> {
    return this.taskService.getTaskByIdAsUser(id, userId);
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

  @Mutation(() => CreateTaskResponse)
  async createTask(
    @Args('input') input: CreateTaskInput,
    @CurrentUser('id') userId: string,
    @Context('loaders') { taskLoaders }: Loaders,
  ): Promise<typeof CreateTaskResponse> {
    let task: Task, subtasks: Subtask[];
    try {
      [task, subtasks] = await this.taskService.createTaskAsUser(
        input.task,
        userId,
      );
    } catch (error) {
      if (error instanceof BoardColumnNotFoundError) {
        return new BoardColumnNotFoundErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    if (subtasks.length > 0) {
      taskLoaders.subtasksByTaskIdLoader.prime(task.id, subtasks);
    }

    return new CreateTaskSuccess(task);
  }

  @Mutation(() => UpdateTaskResponse)
  async updateTask(
    @Args('input') input: UpdateTaskInput,
    @CurrentUser('id') userId: string,
  ): Promise<typeof UpdateTaskResponse> {
    let task: Task;
    try {
      task = await this.taskService.updateTaskAsUser(
        input.id,
        input.patch,
        userId,
      );
    } catch (error) {
      if (error instanceof BoardColumnNotFoundError) {
        return new BoardColumnNotFoundErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new UpdateTaskSuccess(task);
  }

  @Mutation(() => DeleteTaskResponse)
  async deleteTask(
    @Args('input') input: DeleteTaskInput,
    @CurrentUser('id') userId: string,
  ): Promise<typeof DeleteTaskResponse> {
    try {
      await this.taskService.deleteTaskAsUser(input.id, userId);
    } catch (error) {
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new DeleteTaskSuccess(input.id);
  }

  @Mutation(() => MoveTaskResponse)
  async moveTask(
    @Args('input') input: MoveTaskInput,
    @CurrentUser('id') userId: string,
  ): Promise<typeof MoveTaskResponse> {
    let task: Task;
    try {
      task = await this.taskService.moveTaskAsUser(
        input.id,
        input.move,
        userId,
      );
    } catch (error) {
      if (error instanceof BoardColumnNotFoundError) {
        return new BoardColumnNotFoundErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new MoveTaskSuccess(task);
  }

  @Mutation(() => UpdateTaskSubtasksResponse)
  async updateTaskSubtasks(
    @Args('input') input: UpdateTaskSubtasksInput,
    @CurrentUser('id') userId: string,
  ): Promise<typeof UpdateTaskSubtasksResponse> {
    let task: Task;
    try {
      task = await this.taskService.updateTaskSubtasksAsUser(
        input.taskId,
        input.patch,
        userId,
      );
    } catch (error) {
      if (error instanceof SubtaskTitleConflictError) {
        return new SubtaskTitleConflictErrorResponse(error.message);
      }
      const commonErrorResponse = responseFromCommonError(error);
      if (commonErrorResponse) return commonErrorResponse;
      throw error;
    }

    return new UpdateTaskSubtasksSuccess(task);
  }

  @Mutation(() => UpdateSubtaskCompletedResponse)
  async updateSubtaskCompleted(
    @Args('input') input: UpdateSubtaskCompletedInput,
    @CurrentUser('id') userId: string,
  ): Promise<typeof UpdateSubtaskCompletedResponse> {
    let subtask: Subtask;
    try {
      subtask = await this.taskService.updateSubtaskCompletedAsUser(
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
