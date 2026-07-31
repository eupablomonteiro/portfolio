"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui";
import {
  DoodleChevrons,
  DoodleDotGrid,
  DoodleBrackets,
} from "@/components/decorative";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiTailwindcss,
  SiReact,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface Tech {
  name: string;
  icon: IconType;
  description: string;
  time: string;
  level: number;
  color: "blue" | "green" | "yellow" | "default";
}

const technologies: Tech[] = [
  {
    name: "React",
    icon: SiReact,
    description: "Biblioteca para interfaces de usuário modernas e componentizadas.",
    time: "3 anos",
    level: 5,
    color: "blue",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    description: "Framework React com renderização híbrida e otimizações.",
    time: "2 anos",
    level: 4,
    color: "blue",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    description: "Superset do JavaScript com tipagem estática.",
    time: "3 anos",
    level: 5,
    color: "blue",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    description: "Runtime JavaScript para construção de APIs e servidores.",
    time: "2 anos",
    level: 4,
    color: "green",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    description: "Banco de dados relacional robusto e escalável.",
    time: "2 anos",
    level: 3,
    color: "blue",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    description: "ORM moderno e type-safe para Node.js e TypeScript.",
    time: "2 anos",
    level: 4,
    color: "green",
  },
  {
    name: "Docker",
    icon: SiDocker,
    description: "Plataforma de conteinerização para ambientes consistentes.",
    time: "1 ano",
    level: 3,
    color: "default",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    description: "Framework CSS utility-first para estilização rápida.",
    time: "2 anos",
    level: 4,
    color: "blue",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const colorMap = {
  blue: "var(--color-portfolio-blue)",
  green: "var(--color-portfolio-green)",
  yellow: "var(--color-portfolio-yellow)",
  default: "var(--color-portfolio-text-muted)",
};

const bgMap = {
  blue: "bg-portfolio-blue/10",
  green: "bg-portfolio-green/10",
  yellow: "bg-portfolio-yellow/10",
  default: "bg-portfolio-bg-alt",
};

export function Technologies() {
  return (
    <section id="technologies" className="relative py-24 overflow-hidden">
      <DoodleChevrons className="absolute top-12 left-[5%] w-10 h-10 hidden md:block opacity-60" />
      <DoodleChevrons className="absolute top-1/3 right-[4%] w-12 h-12 hidden lg:block" />
      <DoodleDotGrid className="absolute bottom-16 left-[6%] w-16 h-16 hidden md:block" />
      <DoodleBrackets className="absolute bottom-1/3 right-[5%] w-14 h-10 hidden lg:block" />
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <Badge variant="green" className="mb-4">
            tecnologias
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-portfolio-text md:text-4xl">
            <span className="text-portfolio-primary">Ferramentas</span> que domino
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
            className="my-3 h-0.5 rounded-full bg-portfolio-accent origin-center"
          />
          <p className="mt-3 max-w-sm text-portfolio-text-muted">
            As ferramentas que uso no dia a dia pra botar projeto de pé.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {technologies.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: Tech }) {
  const Icon = tech.icon;
  const accent = colorMap[tech.color];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group rounded-[--radius-lg] bg-portfolio-card p-6 shadow-sm ring-1 ring-portfolio-border/50 transition-shadow duration-300 hover:shadow-md"
    >
      <div
        className={`mb-4 inline-flex items-center justify-center rounded-[--radius-md] p-3 ${bgMap[tech.color]}`}
      >
        <Icon size={24} style={{ color: accent }} />
      </div>
      <h3 className="mb-1 font-heading text-lg font-semibold text-portfolio-text">
        {tech.name}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-portfolio-text-muted">
        {tech.description}
      </p>
      <div className="flex items-center justify-between text-xs text-portfolio-text-muted">
        <span>{tech.time}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="inline-block h-1.5 w-4 rounded-full transition-colors duration-200"
              style={{
                backgroundColor:
                  i < tech.level
                    ? i === tech.level - 1
                      ? "var(--color-portfolio-accent)"
                      : accent
                    : "var(--color-portfolio-border)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
