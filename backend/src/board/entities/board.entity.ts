import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Board {
  @Field(() => ID)
  id!: string;
  @Field()
  name!: string;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
