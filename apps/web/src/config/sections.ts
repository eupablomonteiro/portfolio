import type { SectionId } from "@/types";

export const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "technologies", label: "Tecnologias" },
  { id: "projects", label: "Projetos" },
  { id: "journey", label: "Jornada" },
  { id: "contact", label: "Contato" },
] as const;
