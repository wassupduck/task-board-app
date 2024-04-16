import { Field, InputType } from '@nestjs/graphql';
import { NewBoardInput } from './new-board-input.js';

@InputType()
export class CreateBoardInput {
  @Field(() => NewBoardInput)
  board!: NewBoardInput;
}
