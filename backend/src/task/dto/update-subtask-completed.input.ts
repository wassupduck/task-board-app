import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSubtaskCompletedInput {
  @Field(() => ID)
  id!: string;
  @Field()
  completed!: boolean;
}
