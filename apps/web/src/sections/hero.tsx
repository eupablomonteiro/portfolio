"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui";
import { ArrowDown } from "lucide-react";
import {
  DoodleBrackets,
  DoodleDotGrid,
  DoodleBrushStroke,
  DoodleTS,
  DoodleJS,
  DoodleNode,
  DoodleNext,
  DoodleSQL,
  DoodlePrisma,
  DoodleReact,
  DoodleTailwind,
} from "@/components/decorative";
import Image from "next/image";
import pablo from "@/assets/pablo-base.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pb-24 pt-32"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(184,92,75,0.04) 0%, transparent 100%), radial-gradient(ellipse 60% 50% at 100% 50%, rgba(217,140,63,0.04) 0%, transparent 100%)",
      }}
    >
      <DoodleBrackets className="absolute top-20 left-[6%] w-12 h-10 hidden md:block" />
      <DoodleBrackets className="absolute top-28 right-[8%] w-10 h-8 hidden md:block opacity-60" />
      <DoodleBrackets className="absolute bottom-40 left-[4%] w-14 h-12 hidden lg:block" />
      <DoodleDotGrid className="absolute bottom-28 right-[6%] w-16 h-16 hidden md:block" />
      <DoodleBrushStroke className="absolute top-1/3 left-[2%] w-28 h-8 hidden lg:block" />

      <DoodleTS className="absolute top-40 left-[12%] w-9 h-9 hidden md:block opacity-60" />
      <DoodleJS className="absolute top-16 right-[14%] w-9 h-9 hidden md:block opacity-50" />
      <DoodleNode className="absolute bottom-60 left-[8%] w-9 h-9 hidden lg:block opacity-50" />
      <DoodleNext className="absolute top-1/2 right-[3%] w-9 h-9 hidden lg:block opacity-50" />
      <DoodleSQL className="absolute bottom-20 left-[12%] w-9 h-9 hidden md:block opacity-40" />
      <DoodlePrisma className="absolute bottom-48 right-[12%] w-9 h-9 hidden md:block opacity-45" />
      <DoodleReact className="absolute top-32 left-[15%] w-9 h-9 hidden md:block opacity-45" />
      <DoodleTailwind className="absolute bottom-36 right-[15%] w-9 h-9 hidden md:block opacity-40" />
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16 lg:items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={itemVariants}
            className="font-handwritten text-lg text-portfolio-accent"
          >
            olá, eu sou
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            <span className="text-portfolio-primary">Pablo</span>
            <br />
            <span className="text-portfolio-text">Henrique</span>
            <span className="text-portfolio-accent">.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-heading text-xl font-semibold md:text-2xl"
          >
            <span className="text-portfolio-primary">Desenvolvedor</span>{" "}
            <span className="text-portfolio-accent">Full Stack</span>
            <span className="text-portfolio-primary">.</span>
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="max-w-md text-portfolio-text-muted leading-relaxed"
          >
            Sou desenvolvedor full stack e apaixonado por transformar ideias em
            produtos digitais bem resolvidos. Curto código limpo, interfaces
            bonitas e aquele senso de &quot;ficou pronto&quot; no final do projeto.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Entrar em Contato
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="relative flex items-center justify-center"
        >
          <HeroIllustration />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <ArrowDown
          size={20}
          className="text-portfolio-text-muted animate-bounce"
        />
      </motion.div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div
      className="relative flex aspect-[3/4] w-full max-w-[400px] items-center justify-center"
      role="img"
      aria-label="Ilustração do desenvolvedor"
    >
      <Image src={pablo} alt="Ilustração do desenvolvedor" fill className="object-cover" />
    </div>
  );
}
