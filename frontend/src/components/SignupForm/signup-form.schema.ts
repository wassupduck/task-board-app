import * as z from "zod";

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(4, { message: "Username must be at least 4 characters" })
      .max(15, { message: "Username must be less than 16 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password must be less than 21 characters" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
