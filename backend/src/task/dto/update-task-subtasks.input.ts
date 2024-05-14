import { Field, ID, InputType } from '@nestjs/graphql';
import { NewSubtaskInput } from './new-subtask.input.js';

@InputType()
class AddTaskSubtaskInput {
  @Field(() => NewSubtaskInput)
  subtask!: NewSubtaskInput;
}

@InputType()
class UpdateTaskSubtaskPatchInput {
  @Field(() => String, { nullable: true })
  title?: string | null;
  @Field(() => Boolean, { nullable: true })
  completed?: boolean | null;
}

@InputType()
class UpdateTaskSubtaskInput {
  @Field(() => ID)
  id!: string;
  @Field(() => UpdateTaskSubtaskPatchInput)
  patch!: UpdateTaskSubtaskPatchInput;
}

@InputType()
export class UpdateTaskSubtasksPatchInput {
  @Field(() => [AddTaskSubtaskInput], { nullable: true })
  additions?: AddTaskSubtaskInput[] | null;
  @Field(() => [UpdateTaskSubtaskInput], { nullable: true })
  updates?: UpdateTaskSubtaskInput[] | null;
  @Field(() => [ID], { nullable: true })
  deletions?: string[] | null;
}

@InputType()
export class UpdateTaskSubtasksInput {
  @Field(() => ID)
  taskId!: string;
  @Field(() => UpdateTaskSubtasksPatchInput)
  patch!: UpdateTaskSubtasksPatchInput;
}
