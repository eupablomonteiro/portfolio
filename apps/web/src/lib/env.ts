import { z } from "zod";

const envSchema = z.object({
  GITHUB_ID: z.string().min(1, "GITHUB_ID is required"),
  GITHUB_SECRET: z.string().min(1, "GITHUB_SECRET is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET is required"),
  GITHUB_ALLOWED_EMAIL: z.string().email(),
});

export const env = envSchema.parse(process.env);