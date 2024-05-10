import * as z from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be less than 51 characters" }),
  description: z.string().optional(),
  boardColumnId: z.string(),
  subtasks: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z
          .string()
          .trim()
          .max(50, { message: "Subtask must be less than 51 characters" }),
      })
    )
    .superRefine((subtasks, ctx) => {
      // Validate no duplicate subtasks
      // Exclude empty entries
      const seen = new Set<string>();
      for (const [idx, subtask] of subtasks.entries()) {
        if (subtask.title.length === 0) {
          continue;
        }
        if (seen.has(subtask.title)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate subtask",
            path: [idx, "title"],
          });
        } else {
          seen.add(subtask.title);
        }
      }
    })
    .superRefine((subtasks, ctx) => {
      // Validate no interspersed empty entries
      const lastNonEmptySubtaskIdx = subtasks.findLastIndex(
        ({ title }) => title.length > 0
      );

      const invalidEmptySubtaskIdxs = subtasks
        .slice(0, lastNonEmptySubtaskIdx + 1)
        .map(({ title }, idx) => (title.length === 0 ? idx : null))
        .filter((i) => i !== null);

      for (const idx of invalidEmptySubtaskIdxs) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Title is required",
          path: [idx, "title"],
        });
      }
    })
    .transform((subtasks) => subtasks?.filter(({ title }) => title.length > 0)),
});
