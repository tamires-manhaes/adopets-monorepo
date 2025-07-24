import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  JWT_SECRET: z.string().min(32).max(256),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),
});

export const env = envSchema.parse(process.env);
