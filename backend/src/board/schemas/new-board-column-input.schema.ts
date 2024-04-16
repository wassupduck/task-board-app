import { z } from 'zod';

export const boardColumnNameSchema = z.string().trim().min(1).max(20);

export const newBoardColumnInputSchema = z.object({
  name: boardColumnNameSchema,
});
