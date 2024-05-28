import { createUnionType } from '@nestjs/graphql';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { BoardColumnNotFoundErrorResponse } from './board-column-not-found-error.dto.js';
import { MoveTaskSuccess } from './move-task-success.dto.js';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';

export const MoveTaskResponse = createUnionType({
  name: 'MoveTaskResponse',
  types: () =>
    [
      MoveTaskSuccess,
      InvalidInputErrorResponse,
      BoardColumnNotFoundErrorResponse,
      NotFoundErrorResponse,
    ] as const,
});
