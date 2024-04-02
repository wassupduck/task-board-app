import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subtask {
  @Field(() => ID)
  id!: string;
  title!: string;
  completed!: boolean;
  @HideField()
  taskId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
