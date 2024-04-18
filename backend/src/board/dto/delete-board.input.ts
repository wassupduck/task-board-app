import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteBoardInput {
  @Field(() => ID)
  id!: string;
}
