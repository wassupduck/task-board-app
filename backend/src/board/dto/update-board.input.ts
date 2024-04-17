import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardPatchInput {
  @Field(() => String, { nullable: true })
  name?: string | null;
}

@InputType()
export class UpdateBoardInput {
  @Field(() => ID)
  id!: string;
  @Field(() => UpdateBoardPatchInput)
  patch!: UpdateBoardPatchInput;
}
