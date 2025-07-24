import { createEnv } from "@t3-oss/env-nextjs";
import dotenv from "dotenv";
import z from "zod/v4";

dotenv.config();

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url().startsWith("postgresql://"),
    JWT_SECRET: z.string().min(32).max(256),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    EMAIL_USER: z.string().email().optional(),
    EMAIL_PASS: z.string().optional(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  emptyStringAsUndefined: true,
});
