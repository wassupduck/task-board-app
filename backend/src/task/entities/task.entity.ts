import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field()
  position!: string;
  boardColumnId!: string;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
