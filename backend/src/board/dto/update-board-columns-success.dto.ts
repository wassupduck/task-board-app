import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '../entities/board.entity.js';

@ObjectType()
export class UpdateBoardColumnsSuccess {
  @Field(() => Board)
  board: Board;

  constructor(board: Board) {
    this.board = board;
  }
}
