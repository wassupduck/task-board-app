export class BoardColumnNotFoundError extends Error {
  constructor(public readonly columnId: string) {
    super(`Board column not found: ${columnId}`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SubtaskTitleConflictError extends Error {
  constructor(public readonly subtaskTitle: string) {
    super(`Subtask with title: "${subtaskTitle}" already exists for task`);
    // https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
