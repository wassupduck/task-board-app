import { createUnionType } from '@nestjs/graphql';
import { CreateBoardSuccess } from './create-board-success.dto.js';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';
import { BoardNameConflictErrorResponse } from './board-name-conflict-error.dto.js';

export const CreateBoardResponse = createUnionType({
  name: 'CreateBoardResponse',
  types: () =>
    [
      CreateBoardSuccess,
      InvalidInputErrorResponse,
      BoardNameConflictErrorResponse,
    ] as const,
});
