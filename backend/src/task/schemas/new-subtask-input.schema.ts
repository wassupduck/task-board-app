import { z } from 'zod';

export const newSubtaskInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
});
