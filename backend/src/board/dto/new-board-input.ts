import { Field, InputType } from '@nestjs/graphql';
import { NewBoardColumnInput } from './new-board-column.input.js';

@InputType()
export class NewBoardInput {
  @Field()
  name!: string;
  @Field(() => [NewBoardColumnInput], { nullable: true })
  columns?: NewBoardColumnInput[] | null;
}
