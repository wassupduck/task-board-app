import { z } from 'zod';
import { newSubtaskInputSchema } from './new-subtask-input.schema.js';

export const newTaskInputSchema = z.object({
  title: z.string().trim().min(1).max(50),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? ''),
  boardColumnId: z.string().trim().min(1),
  subtasks: z
    .array(newSubtaskInputSchema)
    .superRefine((subtasks, ctx) => {
      // Validate no duplicate subtasks
      const seen = new Set<string>();
      for (const [idx, subtask] of subtasks.entries()) {
        if (seen.has(subtask.title)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Duplicate subtask',
            path: [idx, 'title'],
          });
        } else {
          seen.add(subtask.title);
        }
      }
    })
    .nullish()
    .transform((x) => x ?? undefined),
});
