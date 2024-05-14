import { createUnionType } from '@nestjs/graphql';
import { UpdateTaskSubtasksSuccess } from './update-task-subtasks-success.dto.js';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';
import { NotFoundErrorResponse } from '../../common/dto/not-found-error.js';
import { SubtaskTitleConflictErrorResponse } from './subtask-title-conflict-error.dto.js';

export const UpdateTaskSubtasksResponse = createUnionType({
  name: 'UpdateTaskSubtasksResponse',
  types: () =>
    [
      UpdateTaskSubtasksSuccess,
      InvalidInputErrorResponse,
      NotFoundErrorResponse,
      SubtaskTitleConflictErrorResponse,
    ] as const,
});
