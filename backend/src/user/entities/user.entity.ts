import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;
  @Field()
  username!: string;
  passwordHash!: string;
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
