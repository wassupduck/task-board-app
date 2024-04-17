import { Field, ObjectType } from '@nestjs/graphql';
import { Subtask } from '../entities/subtask.entity.js';

@ObjectType()
export class UpdateSubtaskCompletedSuccess {
  @Field(() => Subtask)
  subtask: Subtask;

  constructor(subtask: Subtask) {
    this.subtask = subtask;
  }
}
