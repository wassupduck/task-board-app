import { z } from 'zod';

export const newUserInputSchema = z.object({
  username: z.string().trim().min(4).max(15),
  password: z.string().trim().min(6).max(20),
});
