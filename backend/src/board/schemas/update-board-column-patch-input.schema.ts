import { z } from 'zod';
import { boardColumnNameSchema } from './new-board-column-input.schema.js';

export const updateBoardColumnPatchInputSchema = z.object({
  name: boardColumnNameSchema.nullish().transform((x) => x ?? undefined),
});
