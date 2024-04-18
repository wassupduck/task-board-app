import { createUnionType } from '@nestjs/graphql';
import { DeleteTaskSuccess } from './delete-task-success.dto.js';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';

export const DeleteTaskResponse = createUnionType({
  name: 'DeleteTaskResponse',
  types: () => [DeleteTaskSuccess, NotFoundErrorResponse] as const,
});
