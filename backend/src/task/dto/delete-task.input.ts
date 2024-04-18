import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTaskInput {
  @Field(() => ID)
  id!: string;
}
