import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "O título é obrigatório"),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Slug inválido"),
  description: z.string().min(10, "A descrição é obrigatória"),
  techs: z.array(z.string().min(1)).min(1, "As tecnologias são obrigatórias"),
  github: z.string().url("O link do GitHub deve ser uma URL válida"),
  live: z.string().url("O link do projeto deve ser uma URL válida").optional().or(z.literal("")),
  order: z.coerce.number().int("A ordem deve ser um número inteiro").min(0).default(0),
  published: z.coerce.boolean().default(false),
});
export type ProjectInput = z.infer<typeof projectSchema>;

export const updateProjectSchema = projectSchema
  .omit({ slug: true })
  .partial()
  .extend({ id: z.string().uuid("ID válido") });
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
