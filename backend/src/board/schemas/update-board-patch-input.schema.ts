import { z } from 'zod';
import { newBoardInputSchema } from './new-board-input.schema.js';

const board = newBoardInputSchema.shape;

// TODO: Write partialSchema function to automate this transformation.
// I.e nullish + transform
// Note that some fields will be updatable to null and therefore wont
// need the tranform - this should be configurable.
export const updateBoardPatchInputSchema = z.object({
  name: board.name.nullish().transform((x) => x ?? undefined),
});
