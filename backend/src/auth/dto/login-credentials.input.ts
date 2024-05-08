import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginCredentialsInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}
