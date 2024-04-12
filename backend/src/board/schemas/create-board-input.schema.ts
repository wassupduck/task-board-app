import { z } from 'zod';

export const createBoardInputSchema = z.object({
  name: z.string().trim().min(1).max(20),
  columns: z.optional(
    z.array(
      z.object({
        name: z.string().trim().min(1).max(20),
      }),
    ),
  ),
});
