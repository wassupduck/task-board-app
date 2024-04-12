import { wrapError as _wrapError } from 'db-errors';

export class DatabaseError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function wrapError(message: string, error: unknown) {
  if (error instanceof Error) {
    return new DatabaseError(
      `${message}${error.message ? `: ${error.message}` : ''}`,
      { cause: _wrapError(error) },
    );
  }
  return new DatabaseError(message, {
    cause: error,
  });
}
