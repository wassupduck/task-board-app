import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskSubtasksConnection {
  @Field(() => Int)
  totalCount!: number;
  @Field(() => Int)
  completedCount!: number;
  taskId!: string;
}
