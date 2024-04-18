import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteTaskSuccess {
  @Field(() => ID)
  deletedId!: string;

  constructor(id: string) {
    this.deletedId = id;
  }
}
