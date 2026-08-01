"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { buttonVariants } from "@/components/ui";
import { Character } from "@/components/character";
import { GraphicLine, GraphicScribble, GraphicStar } from "@/components/graphics";
import { GitBranch, Briefcase, Mail, ArrowDown } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const buttonVariantsMotion = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const socials = [
  { href: "https://GitBranch.com/eupablomonteiro", icon: GitBranch, label: "GitBranch" },
  {
    href: "https://Briefcase.com/in/eupablomonteiro",
    icon: Briefcase,
    label: "Briefcase",
  },
  { href: "mailto:contato@pablomonteiro.dev", icon: Mail, label: "Email" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const characterY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-auto items-center overflow-hidden pb-24 pt-32 paper-texture"
    >
      <GraphicScribble className="absolute top-24 right-[8%] h-10 w-10 text-portfolio-primary" />
      <GraphicStar className="absolute top-40 left-[4%] h-5 w-5 text-portfolio-gold" />
      <GraphicLine className="absolute bottom-32 left-[6%] w-28 text-portfolio-green" />
      <GraphicStar className="absolute bottom-24 right-[6%] h-6 w-6 text-portfolio-primary/60" />

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-12 gap-10 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-12 flex flex-col items-start gap-7 lg:col-span-7"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm font-medium text-portfolio-primary"
          >
            {"// "} Desenvolvedor de Software
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-[80px]"
          >
            A vontade que
            <br />
            vira{" "}
            <span className="relative inline-block text-portfolio-primary">
              software.
              <GraphicScribble className="absolute -bottom-2 left-0 h-7 w-full text-portfolio-gold" />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg leading-relaxed text-portfolio-text-secondary"
          >
            Sou Pablo Monteiro, desenvolvedor fullstack. Eu acredito que grandes resultados
            nascem da força de vontade - e é assim que eu construo cada projeto.
            Tenho alguns anos de experiência com desenvolvimento web atuando sozinho em grandes projetos como freelancer. 
          </motion.p>

          <motion.div
            variants={buttonVariantsMotion}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Vamos Conversar
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-2"
          >
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
          className="col-span-12 flex justify-center lg:col-span-5"
        >
          <motion.div style={{ y: characterY }} className="mx-auto w-[60vw] max-w-[220px] sm:max-w-[320px] lg:max-w-[380px]">
            <Character pose="hero" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <ArrowDown
          size={20}
          className="text-portfolio-text-secondary animate-bounce"
        />
      </motion.div>
    </section>
  );
}
