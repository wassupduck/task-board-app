import { createUnionType } from '@nestjs/graphql';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { UpdateSubtaskCompletedSuccess } from './update-subtask-completed-success.dto.js';

export const UpdateSubtaskCompletedResponse = createUnionType({
  name: 'UpdateSubtaskCompletedResponse',
  types: () => [UpdateSubtaskCompletedSuccess, NotFoundErrorResponse] as const,
});
