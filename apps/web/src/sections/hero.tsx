"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { buttonVariants } from "@/components/ui";
import { Character } from "@/components/character";
import { GraphicLine, GraphicScribble, GraphicStar } from "@/components/graphics";
import { Mail, ArrowDown } from "lucide-react";
import { Icon } from "@iconify/react";

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
  { href: "https://github.com/eupablomonteiro", icon: "simple-icons:github", label: "GitHub", isIconify: true } as const,
  {
    href: "https://linkedin.com/in/eupablomonteiro",
    icon: "simple-icons:linkedin",
    label: "LinkedIn",
    isIconify: true,
  } as const,
  { href: "mailto:contato@pablomonteiro.dev", icon: Mail, label: "Gmail" } as const,
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 80, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 80, damping: 18 });
  const transX = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 20 });
  const transY = useSpring(useTransform(mouseY, [-300, 300], [-6, 6]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative flex min-h-auto items-end overflow-hidden pt-32 pb-0 paper-texture"
    >
      <GraphicScribble className="absolute top-24 right-[8%] h-10 w-10 text-portfolio-primary" />
      <GraphicStar className="absolute top-40 left-[4%] h-5 w-5 text-portfolio-gold" />
      <GraphicLine className="absolute bottom-32 left-[6%] w-28 text-portfolio-green" />
      <GraphicStar className="absolute bottom-24 right-[6%] h-6 w-6 text-portfolio-primary/60" />

      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-end justify-center gap-x-16 gap-y-14 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full min-w-[280px] max-w-[640px] flex-1 flex-col items-start gap-7 self-center pb-8"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-portfolio-text/10 bg-portfolio-surface px-3 py-1.5 shadow-solid-sm"
          >
            <span className="h-2 w-2 rounded-full bg-portfolio-primary shadow-[0_0_8px_rgba(225,87,115,0.6)]" />
            <span className="font-mono text-xs font-semibold text-portfolio-text">
              Disponível para novas oportunidades
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <h1 className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-[72px]">
              Pablo Monteiro
            </h1>
            <p className="font-heading text-2xl font-bold tracking-tight text-portfolio-primary md:text-3xl">
              Desenvolvedor de Software Fullstack
            </p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-lg leading-relaxed text-portfolio-text-secondary"
          >
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
            {socials.map(({ href, icon, label }) => {
              const isIconify = typeof icon === "string";
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
                >
                  {isIconify ? (
                    <Icon icon={icon as string} width={18} height={18} />
                  ) : (
                    (() => {
                      const LucideIcon = icon as React.ElementType;
                      return <LucideIcon size={18} />;
                    })()
                  )}
                  {label}
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          style={{ rotateX, rotateY, x: transX, y: transY }}
          className="shrink-0 self-end will-change-transform"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto w-[60vw] max-w-[220px] translate-y-[1px] sm:max-w-[320px] lg:max-w-[380px]"
          >
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

// npx @21st-dev/cli add uilayout.contact/stacking-card