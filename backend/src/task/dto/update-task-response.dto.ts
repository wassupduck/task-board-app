import { createUnionType } from '@nestjs/graphql';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { UpdateTaskSuccess } from './update-task-success.dto.js';

export const UpdateTaskResponse = createUnionType({
  name: 'UpdateTaskResponse',
  types: () => [UpdateTaskSuccess, NotFoundErrorResponse] as const,
});
