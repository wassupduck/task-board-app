import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class MutationResponse {
  @Field()
  success!: boolean;
  @Field()
  message!: string;
}
