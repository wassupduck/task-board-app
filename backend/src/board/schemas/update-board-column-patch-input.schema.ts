import { z } from 'zod';
import { newBoardColumnInputSchema } from './new-board-column-input.schema.js';

const boardColumn = newBoardColumnInputSchema.shape;

export const updateBoardColumnPatchInputSchema = z.object({
  name: boardColumn.name.nullish().transform((x) => x ?? undefined),
});
