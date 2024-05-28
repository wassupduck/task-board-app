import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class MoveTaskMoveDestinationInput {
  @Field(() => ID, { nullable: true })
  boardColumnId?: string | null;
  @Field(() => String, { nullable: true })
  positionAfter?: string | null;
}

@InputType()
export class MoveTaskMoveInput {
  @Field(() => MoveTaskMoveDestinationInput)
  to!: MoveTaskMoveDestinationInput;
}

@InputType()
export class MoveTaskInput {
  @Field(() => ID)
  id!: string;
  @Field(() => MoveTaskMoveInput)
  move!: MoveTaskMoveInput;
}
