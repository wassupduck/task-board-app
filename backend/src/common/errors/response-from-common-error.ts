import { ErrorResponse } from '../dto/error-response.js';
import { InvalidInputErrorResponse } from '../dto/invalid-input-error.js';
import { NotFoundErrorResponse } from '../dto/not-found-error.js';
import { NotFoundError } from './not-found-error.js';
import { ValidationError } from './validation-error.js';

export function responseFromCommonError(error: unknown): ErrorResponse | null {
  if (error instanceof ValidationError) {
    return new InvalidInputErrorResponse(error.message);
  } else if (error instanceof NotFoundError) {
    return new NotFoundErrorResponse(error.message);
  }
  return null;
}
