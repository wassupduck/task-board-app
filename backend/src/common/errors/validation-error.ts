export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
