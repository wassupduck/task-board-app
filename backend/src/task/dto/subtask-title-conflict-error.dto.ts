import { ObjectType } from '@nestjs/graphql';
import { ErrorResponse } from '../../common/dto/error-response.js';

@ObjectType('SubtaskTitleConflictError', {
  implements: () => ErrorResponse,
})
export class SubtaskTitleConflictErrorResponse extends ErrorResponse {
  constructor(message: string) {
    super(message);
  }
}
