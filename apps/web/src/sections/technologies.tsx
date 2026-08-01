"use client";

import { motion } from "framer-motion";
import { Text } from "@/components/ui";
import Image from "next/image";
import pabloTecnologiaImage from "@/assets/pablo-tecnologia-section.png";
import { GraphicLine, GraphicScribble } from "@/components/graphics";
import { BadgeComments } from "@/components/badgeComments";
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
  caption: string;
}

const technologies: Tech[] = [
  {
    name: "React",
    icon: SiReact,
    caption: "Interfaces componentizadas, do mock ao produto.",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    caption: "App Router, renderização híbrida e performance.",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    caption: "Tipos que evitam bugs antes de existirem.",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    caption: "A base. Todo dia, em todo lugar.",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    caption: "APIs e servidores com a mesma linguagem do front.",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    caption: "Dados relacionais com integridade e confiança.",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    caption: "ORM type-safe, schema claro e migrações simples.",
  },
  {
    name: "Docker",
    icon: SiDocker,
    caption: "Ambientes consistentes, do dev ao deploy.",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    caption: "Estilo rápido, consistente e sem CSS sujo.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export function Technologies() {
  return (
    <section id="technologies" className="relative py-24 overflow-hidden">
      <GraphicScribble className="absolute top-16 right-[4%] h-9 w-9 text-portfolio-green" />
      <GraphicLine className="absolute bottom-24 left-[3%] w-24 text-portfolio-primary" />

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4"
        >
          <BadgeComments comment="Tecnologias" />

          <h2 className="font-heading text-4xl font-bold tracking-tight md:text-[48px]">
            As ferramentas que{" "}
            <span className="text-portfolio-primary">escolho</span> para
            construir
          </h2>
          <Text variant="muted" className="max-w-md">
            Frameworks mudam. A capacidade de aprender permanece — e é isso que
            eu levo de cada tecnologia.
          </Text>
        </motion.div>

        <Image
          src={pabloTecnologiaImage}
          width={2888}
          height={1816}
          alt="Pablo Monteiro espiando por trás de um cartão de tecnologias"
          sizes="(min-width: 768px) 680px, 100vw"
          className="relative z-0 mx-auto h-auto w-full max-w-[680px] rounded-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 -mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((tech, i) => (
            <TechCard key={tech.name} tech={tech} featured={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechCard({ tech, featured }: { tech: Tech; featured?: boolean }) {
  const Icon = tech.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={`group rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border transition-all duration-150 hover:shadow-solid-sm ${
        featured ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="flex items-start gap-4 p-7">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-12 bg-portfolio-primary/10 transition-transform duration-150 group-hover:scale-105`}
        >
          <Icon size={28} className="text-portfolio-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-portfolio-text">
            {tech.name}
          </h3>
          <Text variant="muted" className="mt-1.5">
            {tech.caption}
          </Text>
        </div>
      </div>
    </motion.div>
  );
}
