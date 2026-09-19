import { z } from "zod";

export const experienceSchema = z.object({
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug inválido"),
  company: z.string().min(3, "A empresa é obrigatória"),
  role: z.string().min(3, "O cargo é obrigatório"),
  period: z.string().min(3, "O período é obrigatório"),
  location: z.string().min(2, "O local é obrigatório"),
  bullets: z.array(z.string().min(3)).min(1, "Adicione ao menos um bullet"),
  techs: z.array(z.string().min(1)).min(1, "As tecnologias são obrigatórias"),
  order: z.coerce.number().int("A ordem deve ser um número inteiro").min(0).default(0),
});
export type ExperienceInput = z.infer<typeof experienceSchema>;

export const updateExperienceSchema = experienceSchema
  .omit({ slug: true })
  .partial()
  .extend({ id: z.string().uuid("ID inválido") });
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
