import { createUnionType } from '@nestjs/graphql';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { UpdateTaskSuccess } from './update-task-success.dto.js';
import { BoardColumnNotFoundErrorResponse } from './board-column-not-found-error.dto.js';

export const UpdateTaskResponse = createUnionType({
  name: 'UpdateTaskResponse',
  types: () =>
    [
      UpdateTaskSuccess,
      BoardColumnNotFoundErrorResponse,
      NotFoundErrorResponse,
    ] as const,
});
