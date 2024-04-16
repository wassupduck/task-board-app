import { z } from 'zod';
import { updateBoardColumnPatchInputSchema } from './update-board-column-patch-input.schema.js';

export const updateBoardColumnInput = z.object({
  id: z.string(),
  patch: updateBoardColumnPatchInputSchema,
});
