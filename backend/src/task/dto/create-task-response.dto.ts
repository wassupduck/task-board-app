import { createUnionType } from '@nestjs/graphql';
import { CreateTaskSuccess } from './create-task-success.dto.js';
import { BoardColumnNotFoundErrorResponse } from './board-column-not-found-error.dto.js';

export const CreateTaskResponse = createUnionType({
  name: 'CreateTaskResponse',
  types: () => [CreateTaskSuccess, BoardColumnNotFoundErrorResponse] as const,
});
