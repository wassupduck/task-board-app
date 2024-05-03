import { createUnionType } from '@nestjs/graphql';
import { SignupSuccess } from './signup-success.dto.js';
import { InvalidInputErrorResponse } from '../../common/dto/invalid-input-error.js';
import { UserUsernameConflictErrorResponse } from './user-username-conflict-error.dto.js';

export const SignupResponse = createUnionType({
  name: 'SignupResponse',
  types: () =>
    [
      SignupSuccess,
      InvalidInputErrorResponse,
      UserUsernameConflictErrorResponse,
    ] as const,
});
