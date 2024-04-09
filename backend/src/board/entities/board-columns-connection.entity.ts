import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardColumnsConnection {
  @Field(() => Int)
  totalCount!: number;
  boardId!: string;
}
