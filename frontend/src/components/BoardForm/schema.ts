import * as z from "zod";

export const boardFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name must be less than 20 characters" }),
  columns: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z
          .string()
          .trim()
          .max(20, { message: "Name must be less than 20 characters" }),
      })
    )
    .superRefine((columns, ctx) => {
      // Validate no duplicate column names
      // Exclude empty columns
      const seen = new Set<string>();
      for (const [idx, column] of columns.entries()) {
        if (column.name.length === 0) {
          continue;
        }
        if (seen.has(column.name)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate column",
            path: [idx, "name"],
          });
        } else {
          seen.add(column.name);
        }
      }
    })
    .superRefine((columns, ctx) => {
      // Validate no interspersed empty columns
      const lastNonEmptyColumnIdx = columns.findLastIndex(
        ({ name }) => name.length > 0
      );

      const invalidEmptyColumnIdxs = columns
        .slice(0, lastNonEmptyColumnIdx + 1)
        .map(({ name }, idx) => (name.length === 0 ? idx : null))
        .filter((i) => i !== null);

      for (const idx of invalidEmptyColumnIdxs) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Name is required",
          path: [idx, "name"],
        });
      }
    })
    .transform((columns) => columns.filter(({ name }) => name.length > 0)),
});
