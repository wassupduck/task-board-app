import { Field, InputType } from '@nestjs/graphql';
import { NewUserInput } from './new-user.input.js';

@InputType()
export class SignupInput {
  @Field(() => NewUserInput)
  user!: NewUserInput;
}
