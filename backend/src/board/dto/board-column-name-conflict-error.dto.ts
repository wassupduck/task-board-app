import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../common/dto/error-response.js';

@ObjectType('BoardColumnNameConflictError', {
  implements: () => ErrorResponse,
})
export class BoardColumnNameConflictErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
