import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../common/dto/error-response.js';

@ObjectType('UserUsernameConflictError', {
  implements: () => ErrorResponse,
})
export class UserUsernameConflictErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
