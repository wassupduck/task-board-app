import { Field, HideField, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardColumn {
  @Field(() => ID)
  id!: string;
  name!: string;
  @Field(() => Int)
  position!: number;
  @HideField()
  boardId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
