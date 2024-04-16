import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from './error-response.js';

// TODO: Should not found be a valid response?
@ObjectType('NotFoundError', {
  implements: () => ErrorResponse,
})
export class NotFoundErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
