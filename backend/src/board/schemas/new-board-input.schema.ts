import { z } from 'zod';
import { newBoardColumnInputSchema } from './new-board-column-input.schema.js';

export const newBoardInputSchema = z.object({
  name: z.string().trim().min(1).max(20),
  columns: z
    .array(newBoardColumnInputSchema)
    .nullish()
    .transform((x) => x ?? undefined),
});
