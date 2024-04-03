import { Field, ObjectType } from '@nestjs/graphql';
import { Subtask } from '../entities/subtask.entity.js';
import { MutationResponse } from '../../common/entities/mutation-response.entity.js';

@ObjectType({
  implements: () => [MutationResponse],
})
export class UpdateSubtaskCompletedMutationResponse extends MutationResponse {
  @Field({ nullable: true })
  subtask?: Subtask;
}
