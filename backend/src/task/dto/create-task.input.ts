import { Field, InputType } from '@nestjs/graphql';
import { NewTaskInput } from './new-task.input.js';

@InputType()
export class CreateTaskInput {
  @Field(() => NewTaskInput)
  task!: NewTaskInput;
}
