"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, Heading, Text } from "@/components/ui";
import { ExternalLink, GitCompare, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DoodleDotGrid,
  DoodleBrushStroke,
  DoodleChevrons,
} from "@/components/decorative";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "Plataforma completa de e-commerce com catálogo, carrinho, checkout e painel administrativo.",
    techs: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    color: "var(--color-portfolio-blue)",
    links: { github: "#", live: "#" },
  },
  {
    title: "Dashboard Analytics",
    description:
      "Painel de análise de dados com gráficos interativos, filtros avançados e exportação de relatórios.",
    techs: ["React", "TypeScript", "Recharts", "Node.js"],
    color: "var(--color-portfolio-green)",
    links: { github: "#", live: "#" },
  },
  {
    title: "API RESTful",
    description:
      "API completa para gerenciamento de conteúdo com autenticação, autorização e documentação Swagger.",
    techs: ["Node.js", "Express", "PostgreSQL", "Swagger"],
    color: "var(--color-portfolio-accent)",
    links: { github: "#", live: "#" },
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function Projects() {
  const [[current, direction], setPage] = useState([0, 0]);

  function paginate(dir: number) {
    const next = current + dir;
    if (next < 0 || next >= projects.length) return;
    setPage([next, dir]);
  }

  const project = projects[current];
  if (!project) return null;

  return (
    <section
      id="projects"
      className="relative bg-portfolio-bg-alt py-24 paper-texture overflow-hidden"
    >
      <DoodleDotGrid className="absolute top-8 left-[5%] w-14 h-14 hidden md:block" />
      <DoodleChevrons className="absolute top-16 right-[6%] w-10 h-10 hidden md:block opacity-50" />
      <DoodleDotGrid className="absolute bottom-12 left-[6%] w-16 h-16 hidden md:block" />
      <DoodleBrushStroke className="absolute bottom-20 right-[4%] w-28 h-6 hidden lg:block" />
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <Badge variant="yellow" className="mb-4">
            projetos
          </Badge>
          <Heading as="h2">
            <span className="text-portfolio-primary">Trabalhos</span> recentes
          </Heading>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
            className="my-3 h-0.5 rounded-full bg-portfolio-accent origin-center"
          />
          <Text variant="muted" className="mt-3 max-w-sm">
            Alguns projetos que fiz com carinho e bastante café.
          </Text>
        </motion.div>

        <div className="relative mx-auto max-w-[540px]">
          <div className="overflow-hidden rounded-[--radius-lg]">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.article
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="group relative overflow-hidden bg-portfolio-card shadow-sm ring-1 ring-portfolio-border/50"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden"
                  style={{ backgroundColor: project.color + "15" }}
                >
                  <svg
                    viewBox="0 0 400 300"
                    className="h-full w-full p-8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect x="60" y="40" width="280" height="200" rx="12" stroke={project.color} strokeWidth="1.5" opacity="0.4" />
                    <rect x="80" y="60" width="120" height="80" rx="6" fill={project.color} fillOpacity="0.1" stroke={project.color} strokeWidth="1" strokeOpacity="0.3" />
                    <rect x="80" y="150" width="120" height="6" rx="3" fill={project.color} fillOpacity="0.2" />
                    <rect x="80" y="162" width="80" height="6" rx="3" fill={project.color} opacity="0.15" />
                    <rect x="220" y="60" width="100" height="30" rx="6" fill={project.color} fillOpacity="0.1" stroke={project.color} strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx="240" cy="110" r="20" stroke={project.color} strokeWidth="1.5" opacity="0.3" />
                    <path d="M230 120 L 250 100" stroke={project.color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                    <rect x="220" y="140" width="100" height="6" rx="3" fill={project.color} opacity="0.2" />
                    <rect x="220" y="152" width="70" height="6" rx="3" fill={project.color} opacity="0.15" />
                    <rect x="220" y="164" width="85" height="6" rx="3" fill={project.color} opacity="0.12" />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-portfolio-text/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-portfolio-card text-portfolio-text transition-transform hover:scale-110"
                        aria-label="Ver código no Github"
                      >
                        <GitCompare size={18} />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-portfolio-card text-portfolio-text transition-transform hover:scale-110"
                        aria-label="Ver projeto ao vivo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-portfolio-bg-alt px-2.5 py-0.5 text-xs text-portfolio-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Heading as="h3" className="mb-2 text-lg">
                    {project.title}
                  </Heading>
                  <Text variant="muted">{project.description}</Text>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(-1)}
            disabled={current === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-portfolio-card shadow-md ring-1 ring-portfolio-border/50 transition-all hover:bg-portfolio-bg-alt disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Projeto anterior"
          >
            <ChevronLeft size={20} className="text-portfolio-text" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={current === projects.length - 1}
            className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-portfolio-card shadow-md ring-1 ring-portfolio-border/50 transition-all hover:bg-portfolio-bg-alt disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Próximo projeto"
          >
            <ChevronRight size={20} className="text-portfolio-text" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > current ? 1 : -1])}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-portfolio-primary"
                    : "w-2 bg-portfolio-border hover:bg-portfolio-text-muted"
                }`}
                aria-label={`Ir para projeto ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
