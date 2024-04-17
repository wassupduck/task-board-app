import { Field, ID, InputType } from '@nestjs/graphql';

// GraphQL is a mess when it comes to optional fields and
// nullability.
// For more info see: https://github.com/graphql/graphql-spec/issues/542
// and the related duplicate issue.
// And: https://github.com/graphql/graphql-js/issues/133
// To ensure input type is typed correctly manually make fields nullable.
// TODO: Find a better approach.
@InputType()
export class UpdateTaskPatchInput {
  @Field(() => String, { nullable: true })
  title?: string | null;
  @Field(() => String, { nullable: true })
  description?: string | null;
  @Field(() => ID, { nullable: true })
  boardColumnId?: string | null;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => ID)
  id!: string;
  @Field(() => UpdateTaskPatchInput)
  patch!: UpdateTaskPatchInput;
}
