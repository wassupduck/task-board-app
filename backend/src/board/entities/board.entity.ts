import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Board {
  @Field(() => ID)
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
