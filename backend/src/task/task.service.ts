import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task } from './entities/task.entity.js';
import { TaskSubtasksConnection } from './entities/task-subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTaskByIdForUser(id: string, userId: string): Promise<Task | null> {
    return this.taskRepository.getTaskByIdForUser(id, userId);
  }

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByBoardId(boardId);
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.taskRepository.getTasksInColumns(columnIds);
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<TaskSubtasksConnection[]> {
    return this.taskRepository.getSubtasksConnectionsByTaskIds(taskIds);
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.taskRepository.getSubtasksByTaskIds(taskIds);
  }

  async updateSubtaskCompletedByIdForUser(
    id: string,
    completed: boolean,
    userId: string,
  ): Promise<Subtask> {
    return this.taskRepository.updateSubtaskCompletedByIdForUser(
      id,
      completed,
      userId,
    );
  }

  async createTask(
    task: Pick<Task, 'title' | 'boardColumnId'> & {
      description?: Task['description'];
    },
  ): Promise<Task> {
    // TODO: Check user owns board column.
    return this.taskRepository.createTask(task);
  }

  async updateTask(
    id: string,
    fieldsToUpdate: Partial<
      Pick<Task, 'title' | 'description' | 'boardColumnId'>
    >,
  ): Promise<Task> {
    // TODO: Check user owns board column.
    return this.taskRepository.updateTask(id, fieldsToUpdate);
  }
}
