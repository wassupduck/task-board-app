export class BoardColumnNotFoundError extends Error {
  constructor(public readonly id: string) {
    super(`Board column not found: ${id}`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SubtaskTitleConflictError extends Error {
  constructor(
    public readonly title: string,
    public readonly taskId: string,
  ) {
    super(`Subtask with title: "${title}" already exists for task: ${taskId}`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
