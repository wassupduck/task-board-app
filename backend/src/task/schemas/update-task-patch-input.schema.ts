import { z } from 'zod';
import { newTaskInputSchema } from './new-task-input.schema.js';

const task = newTaskInputSchema.shape;

export const updateTaskPatchInputSchema = z.object({
  title: task.title.nullish().transform((x) => x ?? undefined),
  description: task.description.nullish().transform((x) => x ?? undefined),
  boardColumnId: task.boardColumnId.nullish().transform((x) => x ?? undefined),
});
