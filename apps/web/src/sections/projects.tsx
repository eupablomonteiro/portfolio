"use client";

import { StackingCards, type StackingProject } from "@/components/ui/stacking-card";

const projects: StackingProject[] = [
  {
    title: "E-commerce Platform",
    description: "Loja completa com catálogo, carrinho, checkout Stripe e painel administrativo com controle de estoque. Foco em performance e conversão.",
    techs: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    github: "#",
    live: "#",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Dashboard Analytics",
    description: "Painel de métricas com gráficos interativos, filtros avançados e exportação PDF/CSV para 200+ usuários.",
    techs: ["React", "TypeScript", "Recharts", "Node.js"],
    github: "#",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "API RESTful",
    description: "API de conteúdo com autenticação JWT, autorização por role e documentação Swagger completa.",
    techs: ["Node.js", "Express", "PostgreSQL", "Swagger"],
    github: "#",
    live: "#",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Landing Page Conversão",
    description: "Página focada em conversão com SEO técnico e Core Web Vitals no verde, A/B testing integrado.",
    techs: ["Next.js", "Tailwind CSS", "Vercel"],
    github: "#",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
  },
];

export function Projects() {
  return <StackingCards projects={projects} />;
}
