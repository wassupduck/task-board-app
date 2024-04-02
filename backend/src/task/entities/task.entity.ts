import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;
  title!: string;
  description!: string;
  @HideField()
  boardColumnId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
