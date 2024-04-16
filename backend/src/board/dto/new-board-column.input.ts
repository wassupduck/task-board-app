import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewBoardColumnInput {
  @Field()
  name!: string;
}
