import { createUnionType } from '@nestjs/graphql';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';
import { UpdateBoardColumnsSuccess } from './update-board-columns-success.dto.js';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { BoardColumnNameConflictErrorResponse } from './board-column-name-conflict-error.dto.js';

export const UpdateBoardColumnsResponse = createUnionType({
  name: 'UpdateBoardColumnsResponse',
  types: () =>
    [
      UpdateBoardColumnsSuccess,
      InvalidInputErrorResponse,
      BoardColumnNameConflictErrorResponse,
      NotFoundErrorResponse,
    ] as const,
});
