import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }).trim(),
  password: z.string().min(8, "Be at least 8 characters long").trim(),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
