import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum password 8 characters"),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
