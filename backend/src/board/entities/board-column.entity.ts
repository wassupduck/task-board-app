import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardColumn {
  @Field(() => ID)
  id!: string;
  @Field()
  name!: string;
  @Field(() => Int)
  position!: number;
  boardId!: string;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
