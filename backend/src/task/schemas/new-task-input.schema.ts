import { z } from 'zod';

export const newTaskInputSchema = z.object({
  title: z.string().trim().min(1),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? ''),
  boardColumnId: z.string().trim().min(1),
});
