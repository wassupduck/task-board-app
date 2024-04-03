import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string | null;
  @Field(() => ID)
  boardColumnId!: string;
}
