export class BoardNameConflictError extends Error {
  constructor(public readonly boardName: string) {
    super(`Board with name: "${boardName}" already exists`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
