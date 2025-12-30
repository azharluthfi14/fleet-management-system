import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SESSION_TTL_HOURS: z.coerce.number().int().positive(),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    SESSION_TTL_HOURS: process.env.SESSION_TTL_HOURS,
  });

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error);
    throw new Error("Invalid environment variables");
  }

  const { SESSION_TTL_HOURS, ...rest } = parsed.data;

  return {
    ...rest,
    SESSION_TTL_HOURS: SESSION_TTL_HOURS * 60 * 60 * 1000,
  };
};

export const env = parseEnv();

export type Env = z.infer<typeof envSchema>;
