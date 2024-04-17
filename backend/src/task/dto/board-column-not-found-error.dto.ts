import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../common/dto/error-response.js';

@ObjectType('BoardColumnNotFoundError', {
  implements: () => ErrorResponse,
})
export class BoardColumnNotFoundErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
