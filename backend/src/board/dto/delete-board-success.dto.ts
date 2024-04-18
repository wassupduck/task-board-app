import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteBoardSuccess {
  @Field(() => ID)
  deletedId!: string;

  constructor(id: string) {
    this.deletedId = id;
  }
}
