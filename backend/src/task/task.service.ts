import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task } from './entities/task.entity.js';
import { SubtasksConnection } from './entities/subtasks-connection.entity.js';
import { Subtask } from './entities/subtask.entity.js';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByBoardId(boardId);
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.taskRepository.getTasksInColumns(columnIds);
  }

  async getSubtasksConnectionsByTaskIds(
    taskIds: string[],
  ): Promise<SubtasksConnection[]> {
    return this.taskRepository.getSubtasksConnectionsByTaskIds(taskIds);
  }

  async getSubtasksByTaskIds(taskIds: string[]): Promise<Subtask[]> {
    return this.taskRepository.getSubtasksByTaskIds(taskIds);
  }
}
