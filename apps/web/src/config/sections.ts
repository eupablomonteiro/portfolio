import type { SectionId } from "@/types";

export const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Início" },
  { id: "technologies", label: "Stack" },
  { id: "projects", label: "Projetos" },
  { id: "contact", label: "Contato" },
] as const;
