import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from './error-response.js';

@ObjectType('InvalidInputError', {
  implements: () => ErrorResponse,
})
export class InvalidInputErrorResponse extends ErrorResponse {
  // TODO: Include issues with input
  constructor(message: string) {
    super(message);
  }
}
