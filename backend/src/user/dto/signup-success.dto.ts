import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity.js';

@ObjectType()
export class SignupSuccess {
  @Field(() => User)
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
