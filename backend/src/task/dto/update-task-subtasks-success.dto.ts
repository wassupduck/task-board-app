import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity.js';

@ObjectType()
export class UpdateTaskSubtasksSuccess {
  @Field(() => Task)
  task: Task;

  constructor(task: Task) {
    this.task = task;
  }
}
