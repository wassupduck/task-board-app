import { z } from 'zod';

export const updateTaskPatchInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .nullish()
    .transform((x) => x ?? undefined),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  boardColumnId: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
});
