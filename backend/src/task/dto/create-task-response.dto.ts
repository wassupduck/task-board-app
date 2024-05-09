import { createUnionType } from '@nestjs/graphql';
import { CreateTaskSuccess } from './create-task-success.dto.js';
import { BoardColumnNotFoundErrorResponse } from './board-column-not-found-error.dto.js';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';

export const CreateTaskResponse = createUnionType({
  name: 'CreateTaskResponse',
  types: () =>
    [
      CreateTaskSuccess,
      InvalidInputErrorResponse,
      BoardColumnNotFoundErrorResponse,
    ] as const,
});
