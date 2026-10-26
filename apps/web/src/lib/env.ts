import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SUPABASE_URL: z.string().min(1, "SUPABASE_URL is required").optional(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1, "SUPABASE_PUBLISHABLE_KEY is required").optional(),
  SUPABASE_SERVICE_KEY: z.string().min(1).optional(),
  GITHUB_ID: z.string().min(1, "GITHUB_ID is required"),
  GITHUB_SECRET: z.string().min(1, "GITHUB_SECRET is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET is required"),
  GITHUB_ALLOWED_EMAIL: z.string().email(),
});

export const env = envSchema.parse(process.env);
