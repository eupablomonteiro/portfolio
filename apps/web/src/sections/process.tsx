"use client";

import { motion } from "framer-motion";
import { Badge, Text } from "@/components/ui";
import { Character } from "@/components/character";
import { GraphicCutout, GraphicLine } from "@/components/graphics";
import { Search, ClipboardList, Code2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const steps: Step[] = [
  {
    title: "Entender",
    description:
      "Antes de qualquer linha de código, eu preciso entender o problema. Pergunto, investigo e só então defino o caminho.",
    icon: Search,
    color: "var(--color-portfolio-primary)",
    bg: "bg-portfolio-primary/10",
  },
  {
    title: "Planejar",
    description:
      "Escopo claro, arquitetura simples e decisões que valem a pena. Um bom planejamento economiza semanas de retrabalho.",
    icon: ClipboardList,
    color: "var(--color-portfolio-green)",
    bg: "bg-portfolio-green/15",
  },
  {
    title: "Construir",
    description:
      "Código limpo, componentizado e revisado a cada passo. Pequenos avanços diários em vez de mudanças gigantes de última hora.",
    icon: Code2,
    color: "var(--color-portfolio-gold)",
    bg: "bg-portfolio-gold/20",
  },
  {
    title: "Entregar",
    description:
      "Deploy, testes e monitoramento. E depois: refatorar, medir, evoluir. O ciclo recomeça — e o produto cresce junto.",
    icon: Rocket,
    color: "var(--color-portfolio-text)",
    bg: "bg-portfolio-text/5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function Process() {
  return (
    <section id="process" className="relative py-24 overflow-hidden paper-texture">
      <GraphicLine className="absolute top-16 right-[6%] w-24 text-portfolio-primary" />

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-14 flex flex-col items-start gap-4"
        >
          <Badge variant="green">processo</Badge>
          <h2 className="font-heading text-4xl font-bold tracking-tight md:text-[48px]">
            Como eu <span className="text-portfolio-primary">trabalho</span>
          </h2>
          <Text variant="muted" className="max-w-md">
            Um método simples, repetido todos os dias: entender, planejar,
            construir, entregar.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative lg:col-span-8"
          >
            <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-portfolio-primary/40 via-portfolio-green/40 to-portfolio-text/30" />

            {steps.map((step) => (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="relative mb-10 pl-20 last:mb-0"
              >
                <div
                  className={`absolute left-0 top-0 flex h-[52px] w-[52px] items-center justify-center rounded-16 border-[1.5px] border-portfolio-text bg-portfolio-surface shadow-solid-sm ${step.bg}`}
                >
                  <step.icon size={22} style={{ color: step.color }} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-portfolio-text">
                  {step.title}
                </h3>
                <Text variant="muted" className="mt-2 max-w-lg">
                  {step.description}
                </Text>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center gap-8 lg:col-span-4 lg:items-end"
          >
            <div className="relative">
              <div
                className="absolute -inset-3 -rotate-2 rounded-16 bg-portfolio-green/30"
                aria-hidden="true"
              />
              <div className="relative rounded-16 border-2 border-portfolio-text bg-portfolio-surface p-6 shadow-solid">
                <Character pose="wave" className="h-44" />
              </div>
            </div>
            <GraphicCutout className="text-portfolio-text">
              <span className="font-mono text-xs font-semibold">
                um passo de cada vez
              </span>
            </GraphicCutout>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
