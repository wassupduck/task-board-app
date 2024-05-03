import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../common/dto/error-response.js';

@ObjectType('UnauthorizedError', {
  implements: () => ErrorResponse,
})
export class UnauthorizedErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
