import { z } from 'zod';

export const newTaskInputSchema = z.object({
  title: z.string().min(1),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? ''),
  boardColumnId: z.string(),
});
