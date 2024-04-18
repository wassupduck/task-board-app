import { createUnionType } from '@nestjs/graphql';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { DeleteBoardSuccess } from './delete-board-success.dto.js';

export const DeleteBoardResponse = createUnionType({
  name: 'DeleteBoardResponse',
  types: () => [DeleteBoardSuccess, NotFoundErrorResponse] as const,
});
