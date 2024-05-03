import { z } from 'zod';

export const newUserInputSchema = z.object({
  username: z.string().trim().min(5).max(20),
  password: z.string().trim().min(5).max(20),
});
