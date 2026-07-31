"use client";

import { motion } from "framer-motion";
import { Badge, Text } from "@/components/ui";
import { ClipboardList, Layout, Code2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  DoodleChevrons,
  DoodleUnderscore,
  DoodleDotGrid,
  DoodleTS,
  DoodleNext,
  DoodleSQL,
  DoodlePrisma,
  DoodleAPI,
} from "@/components/decorative";

interface ProcessStep {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  bg: string;
}

const steps: ProcessStep[] = [
  {
    title: "Planejamento",
    description:
      "Entendo o problema, defino requisitos, planejo a arquitetura e escolho as melhores ferramentas para cada projeto.",
    icon: ClipboardList,
    accent: "var(--color-portfolio-blue)",
    bg: "bg-portfolio-blue/10",
  },
  {
    title: "Arquitetura",
    description:
      "Estruturei o código pensando em escalabilidade, manutenibilidade e performance desde o primeiro commit.",
    icon: Layout,
    accent: "var(--color-portfolio-green)",
    bg: "bg-portfolio-green/10",
  },
  {
    title: "Desenvolvimento",
    description:
      "Escrevo código limpo e componentizado, seguindo as melhores práticas da comunidade e priorizando a experiência do usuário.",
    icon: Code2,
    accent: "var(--color-portfolio-accent)",
    bg: "bg-portfolio-accent/10",
  },
  {
    title: "Deploy",
    description:
      "Realizo deploy contínuo com monitoramento, garantindo que a aplicação esteja sempre disponível e performando bem.",
    icon: Rocket,
    accent: "var(--color-portfolio-primary)",
    bg: "bg-portfolio-primary/10",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Process() {
  return (
    <section className="relative bg-portfolio-bg-alt py-24 paper-texture overflow-hidden">
      <DoodleChevrons className="absolute top-10 left-[4%] w-10 h-10 hidden md:block" />
      <DoodleUnderscore className="absolute top-1/3 right-[4%] w-16 h-8 hidden lg:block" />
      <DoodleDotGrid className="absolute bottom-16 left-[6%] w-14 h-14 hidden md:block" />
      <DoodleDotGrid className="absolute bottom-24 right-[5%] w-12 h-12 hidden md:block opacity-60" />

      <DoodleTS className="absolute top-6 right-[8%] w-9 h-9 hidden md:block opacity-50" />
      <DoodleNext className="absolute top-1/2 left-[3%] w-9 h-9 hidden lg:block opacity-45" />
      <DoodleSQL className="absolute bottom-28 right-[7%] w-9 h-9 hidden md:block opacity-40" />
      <DoodlePrisma className="absolute bottom-10 left-[8%] w-9 h-9 hidden md:block opacity-45" />
      <DoodleAPI className="absolute top-1/3 left-[1%] w-9 h-9 hidden lg:block opacity-40" />
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <Badge variant="green" className="mb-4">
            processo
          </Badge>
          <Text variant="handwritten" className="mb-2 text-portfolio-accent">
            como eu trabalho
          </Text>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-portfolio-text md:text-4xl">
            <span className="text-portfolio-primary">Meu</span> processo de desenvolvimento
          </h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
            className="my-3 h-0.5 rounded-full bg-portfolio-accent origin-center"
          />
          <Text variant="muted" className="mt-3 max-w-md">
            Como eu transformo uma ideia em algo que funciona de verdade.
          </Text>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => (
            <ProcessCard key={step.title} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProcessCard({ step }: { step: ProcessStep }) {
  const Icon = step.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -6,
        rotate: -1,
        boxShadow:
          "0 12px 24px rgba(0,0,0,0.08)",
        transition: { duration: 0.3 },
      }}
      className="group rounded-[--radius-lg] bg-portfolio-card p-6 shadow-sm ring-1 ring-portfolio-border/50"
    >
      <div
        className={`mb-5 inline-flex rounded-[--radius-md] p-3 ${step.bg}`}
      >
        <Icon size={24} style={{ color: step.accent }} />
      </div>
      <h3 className="mb-2 font-heading text-lg font-semibold text-portfolio-text">
        {step.title}
      </h3>
      <Text variant="muted">{step.description}</Text>
    </motion.div>
  );
}
