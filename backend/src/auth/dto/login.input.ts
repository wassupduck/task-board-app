import { Field, InputType } from '@nestjs/graphql';
import { LoginCredentialsInput } from './login-credentials.input.js';

@InputType()
export class LoginInput {
  @Field(() => LoginCredentialsInput)
  credentials!: LoginCredentialsInput;
}
