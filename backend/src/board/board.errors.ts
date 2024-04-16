export class BoardNameConflictError extends Error {
  constructor(public readonly boardName: string) {
    super(`Board with name: "${boardName}" already exists`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BoardColumnNameConflictError extends Error {
  constructor(public readonly columnName: string) {
    super(`Column with name: "${columnName}" already exists for board`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
