export class BoardNameConflictError extends Error {
  constructor(
    public readonly name: string,
    public readonly userId: string,
  ) {
    super(`Board with name: "${name}" already exists for user: ${userId}`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BoardColumnNameConflictError extends Error {
  constructor(
    public readonly name: string,
    public readonly boardId: string,
  ) {
    super(`Column with name: "${name}" already exists for board: ${boardId}`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
