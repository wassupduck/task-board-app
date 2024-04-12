import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../common/dto/error-response.js';

@ObjectType('BoardNameConflictError', {
  implements: () => ErrorResponse,
})
export class BoardNameConflictErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
