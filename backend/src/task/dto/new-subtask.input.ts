import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewSubtaskInput {
  @Field()
  title!: string;
  @Field(() => Boolean, { nullable: true })
  completed?: boolean;
}
