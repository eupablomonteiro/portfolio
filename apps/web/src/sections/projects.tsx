"use client";

import { motion } from "framer-motion";
import { Heading, Text } from "@/components/ui";
import { GraphicScribble, GraphicStar } from "@/components/graphics";
import { ExternalLink, GitBranch } from "lucide-react";
import { BadgeComments } from "@/components/badgeComments";
import Image from "next/image";
import pabloProjetosSection from "@/assets/pablo-projetos-section.png";

interface Project {
  title: string;
  description: string;
  techs: string[];
  color: string;
  wide?: boolean;
  links: { github: string; live: string };
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "Loja completa com catálogo, carrinho, checkout com Stripe e painel administrativo.",
    techs: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    color: "var(--color-portfolio-primary)",
    wide: true,
    links: { github: "#", live: "#" },
  },
  {
    title: "Dashboard Analytics",
    description:
      "Painel de métricas com gráficos interativos, filtros e exportação de relatórios.",
    techs: ["React", "TypeScript", "Recharts", "Node.js"],
    color: "var(--color-portfolio-green)",
    links: { github: "#", live: "#" },
  },
  {
    title: "API RESTful",
    description:
      "API de gerenciamento de conteúdo com autenticação, autorização e Swagger.",
    techs: ["Node.js", "Express", "PostgreSQL", "Swagger"],
    color: "var(--color-portfolio-gold)",
    links: { github: "#", live: "#" },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-portfolio-surface py-24 overflow-hidden"
    >
      <GraphicStar className="absolute top-16 left-[5%] h-5 w-5 text-portfolio-gold" />
      <GraphicScribble className="absolute bottom-20 right-[4%] h-10 w-10 text-portfolio-primary/50" />

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4"
        >
          <BadgeComments comment="Projetos" />

          <Heading as="h2">
            O que eu já <span className="text-portfolio-primary">construí</span>
          </Heading>
          <Text variant="muted" className="max-w-md">
            Poucos projetos, bem resolvidos. Cada um me ensinou algo que o
            anterior não ensinou.
          </Text>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-none absolute -top-8 left-0 z-10 w-[180px] sm:-top-10 sm:w-[240px] lg:-top-14 lg:w-[320px]"
          >
            <Image
              src={pabloProjetosSection}
              alt="Pablo Monteiro apresentando seus projetos"
              width={2020}
              height={3932}
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 240px, 180px"
              className="h-auto w-full"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                wide={project.wide}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={`group relative overflow-hidden rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border transition-all duration-150 hover:shadow-solid-sm ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden`}
        style={{ backgroundColor: project.color + "12" }}
      >
        <ProjectArt color={project.color} wide={wide} />

        <div className="absolute right-5 top-5 flex gap-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-12 bg-portfolio-surface shadow-solid-sm ring-1 ring-portfolio-border transition-transform hover:scale-105"
            aria-label="Ver código no GitHub"
          >
            <GitBranch size={18} className="text-portfolio-text" />
          </a>
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-12 bg-portfolio-surface shadow-solid-sm ring-1 ring-portfolio-border transition-transform hover:scale-105"
            aria-label="Ver projeto ao vivo"
          >
            <ExternalLink size={18} className="text-portfolio-text" />
          </a>
        </div>
      </div>

      <div className="p-7">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="rounded-12 bg-portfolio-bg px-2.5 py-1 text-xs font-medium text-portfolio-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
        <Heading as="h3" className="mb-2 text-2xl">
          {project.title}
        </Heading>
        <Text variant="muted">{project.description}</Text>
      </div>
    </motion.article>
  );
}

function ProjectArt({ color, wide }: { color: string; wide?: boolean }) {
  return (
    <svg
      viewBox={wide ? "0 0 800 340" : "0 0 400 340"}
      className="h-auto w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="80"
        y="50"
        width={wide ? 640 : 240}
        height="240"
        rx="16"
        stroke={color}
        strokeWidth="2"
        opacity="0.35"
      />
      <rect
        x="104"
        y="74"
        width={wide ? 200 : 80}
        height="130"
        rx="10"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <circle
        cx={wide ? 150 : 130}
        cy={wide ? 150 : 150}
        r="26"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M136 162 Q 150 150, 164 162"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <rect
        x={wide ? 130 : 120}
        y="176"
        width="50"
        height="6"
        rx="3"
        fill={color}
        opacity="0.3"
      />
      <rect
        x={wide ? 330 : 210}
        y="74"
        width={wide ? 200 : 80}
        height="130"
        rx="10"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <path
        d="M350 120 L 370 100 L 390 120 L 410 100 L 430 120"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M350 140 L 370 120 L 390 140 L 410 120 L 430 140"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      <rect
        x={wide ? 560 : 210}
        y="120"
        width="10"
        height="60"
        rx="4"
        fill={color}
        opacity="0.35"
      />
      <rect
        x={wide ? 580 : 230}
        y="100"
        width="10"
        height="80"
        rx="4"
        fill={color}
        opacity="0.2"
      />
      <rect
        x={wide ? 600 : 250}
        y="140"
        width="10"
        height="40"
        rx="4"
        fill={color}
        opacity="0.3"
      />
      {wide && (
        <path
          d="M140 250 Q 260 220, 380 250 Q 500 280, 620 250 Q 700 235, 720 245"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
      )}
    </svg>
  );
}
