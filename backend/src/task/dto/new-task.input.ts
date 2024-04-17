import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class NewTaskInput {
  @Field()
  title!: string;
  @Field(() => String, { nullable: true })
  description?: string | null;
  @Field(() => ID)
  boardColumnId!: string;
}
