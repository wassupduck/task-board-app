import { createUnionType } from '@nestjs/graphql';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';
import { BoardNameConflictErrorResponse } from './board-name-conflict-error.dto.js';
import { UpdateBoardSuccess } from './update-board-success.dto.js';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';

export const UpdateBoardResponse = createUnionType({
  name: 'UpdateBoardResponse',
  types: () =>
    [
      UpdateBoardSuccess,
      InvalidInputErrorResponse,
      BoardNameConflictErrorResponse,
      NotFoundErrorResponse,
    ] as const,
});
