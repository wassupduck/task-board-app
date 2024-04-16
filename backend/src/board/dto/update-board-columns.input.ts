import { Field, ID, InputType } from '@nestjs/graphql';
import { NewBoardColumnInput } from './new-board-column.input.js';

@InputType()
class UpdateBoardColumnPatchInput {
  @Field(() => String, { nullable: true })
  name?: string | null;
}

@InputType()
class UpdateBoardColumnInput {
  @Field(() => ID)
  id!: string;
  @Field(() => UpdateBoardColumnPatchInput)
  patch!: UpdateBoardColumnPatchInput;
}

@InputType()
class UpdateBoardColumnsPatchAdditionInput {
  @Field(() => NewBoardColumnInput)
  column!: NewBoardColumnInput;
  @Field(() => ID, {
    nullable: true,
    description:
      'Alias for the ID of the created column. ' +
      'Can be referenced in the "UpdateBoardColumnsPatchInput.columnOrder" ' +
      'array to add and order columns in a single request.',
  })
  idAlias?: string | null;
}

@InputType()
class UpdateBoardColumnsPatchInput {
  @Field(() => [UpdateBoardColumnsPatchAdditionInput], { nullable: true })
  additions?: UpdateBoardColumnsPatchAdditionInput[] | null;
  @Field(() => [UpdateBoardColumnInput], { nullable: true })
  updates?: UpdateBoardColumnInput[] | null;
  @Field(() => [ID], { nullable: true })
  deletions?: string[] | null;
  @Field(() => [ID], { nullable: true })
  columnOrder?: string[] | null;
}

@InputType()
export class UpdateBoardColumnsInput {
  @Field(() => ID)
  boardId!: string;
  @Field(() => UpdateBoardColumnsPatchInput)
  patch!: UpdateBoardColumnsPatchInput;
}
