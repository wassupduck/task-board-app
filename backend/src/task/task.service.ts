import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository.js';
import { Task } from './entities/task.entity.js';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getTasksByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepository.getTasksByBoardId(boardId);
  }

  async getTasksInColumns(columnIds: string[]): Promise<Task[]> {
    return this.taskRepository.getTasksInColumns(columnIds);
  }
}
