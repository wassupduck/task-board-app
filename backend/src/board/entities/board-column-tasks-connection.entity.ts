import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BoardColumnTasksConnection {
  @Field(() => Int)
  totalCount!: number;
  boardColumnId!: string;
}
