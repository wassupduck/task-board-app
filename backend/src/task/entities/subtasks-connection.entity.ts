import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubtasksConnection {
  @Field(() => Int)
  totalCount!: number;
  @Field(() => Int)
  completedCount!: number;
  @HideField()
  taskId!: string;
}
