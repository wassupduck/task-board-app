import { Field, ID, InputType } from '@nestjs/graphql';
import { NewSubtaskInput } from './new-subtask.input.js';

@InputType()
export class NewTaskInput {
  @Field()
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string | null;
  @Field(() => ID)
  boardColumnId!: string;
  @Field(() => [NewSubtaskInput], { nullable: true })
  subtasks?: NewSubtaskInput[] | null;
}
