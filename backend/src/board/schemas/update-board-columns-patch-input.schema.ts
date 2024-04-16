import { z } from 'zod';
import { newBoardColumnInputSchema } from './new-board-column-input.schema.js';
import { updateBoardColumnInput } from './update-board-column-input.schema.js';

export const updateBoardColumnsPatchInputSchema = z.object({
  additions: z
    .array(
      z.object({
        column: newBoardColumnInputSchema,
        idAlias: z
          .string()
          .min(1)
          .nullish()
          .transform((x) => x ?? undefined),
      }),
    )
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
  updates: z
    .array(updateBoardColumnInput)
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
  deletions: z
    .array(z.string())
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
  columnOrder: z
    .array(z.string())
    .nullish()
    .transform((x) => x ?? undefined)
    .default([]),
});
