import { z } from 'zod';
import { newBoardColumnInputSchema } from './new-board-column-input.schema.js';

export const boardNameSchema = z.string().trim().min(1).max(20);

export const newBoardInputSchema = z.object({
  name: boardNameSchema,
  columns: z
    .array(newBoardColumnInputSchema)
    .nullish()
    .transform((x) => x ?? undefined),
});
