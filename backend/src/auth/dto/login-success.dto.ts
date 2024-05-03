import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/index.js';

@ObjectType()
export class LoginSuccess {
  @Field(() => User)
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}
