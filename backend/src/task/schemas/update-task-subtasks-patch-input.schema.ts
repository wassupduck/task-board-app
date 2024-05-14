import { z } from 'zod';
import { newSubtaskInputSchema } from './new-subtask-input.schema.js';

const subtask = newSubtaskInputSchema.shape;

const addTaskSubtaskInput = z.object({
  subtask: newSubtaskInputSchema,
});

const updateTaskSubtaskPatchInput = z.object({
  title: subtask.title.nullish().transform((x) => x ?? undefined),
  completed: z
    .boolean()
    .nullish()
    .transform((x) => x ?? undefined),
});

const updateTaskSubtaskInput = z.object({
  id: z.string(),
  patch: updateTaskSubtaskPatchInput,
});

export const updateTaskSubtasksPatchInputSchema = z.object({
  additions: z
    .array(addTaskSubtaskInput)
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
  updates: z
    .array(updateTaskSubtaskInput)
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
  deletions: z
    .array(z.string())
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
});
