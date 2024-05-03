export class UserUsernameConflictError extends Error {
  constructor(public readonly username: string) {
    super(`User with username: "${username}" already exists`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
