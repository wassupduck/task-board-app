import { z } from 'zod';
import { boardNameSchema } from './new-board-input.schema.js';

// TODO: Write partialSchema function to automate this transformation.
// I.e nullish + transform
// Note that some fields will be updatable to null and therefore wont
// need the tranform - this should be configurable.
export const updateBoardPatchInputSchema = z.object({
  name: boardNameSchema.nullish().transform((x) => x ?? undefined),
});
