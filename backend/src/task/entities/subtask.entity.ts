import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subtask {
  @Field(() => ID)
  id!: string;
  @Field()
  title!: string;
  @Field()
  completed!: boolean;
  @Field(() => String)
  position!: number;
  taskId!: string;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
