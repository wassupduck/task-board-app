import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field()
  name!: string;
  @Field(() => [CreateBoardInputColumnInput], { nullable: true })
  columns?: CreateBoardInputColumnInput[] | null;
}

@InputType()
export class CreateBoardInputColumnInput {
  @Field()
  name!: string;
}
