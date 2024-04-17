import { z } from 'zod';

export const newBoardColumnInputSchema = z.object({
  name: z.string().trim().min(1).max(20),
});
