import { createUnionType } from '@nestjs/graphql';
import { LoginSuccess } from './login-success.dto.js';
import { UnauthorizedErrorResponse } from './unauthorized-error.dto.js';

export const LoginResponse = createUnionType({
  name: 'LoginResponse',
  types: () => [LoginSuccess, UnauthorizedErrorResponse] as const,
});
