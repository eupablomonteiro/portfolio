"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { buttonVariants, Heading, Text } from "@/components/ui";
import { GraphicScribble, GraphicStar, GraphicLine } from "@/components/graphics";
import { Mail } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import PabloCracha from "@/assets/pablo-monteiro-cracha.png";
import Image from "next/image";

const links = [
  {
    href: "mailto:pablo.monteirorgt19@gmail.com",
    icon: Mail,
    isIconify: false as const,
    label: "Enviar e-mail",
    variant: "primary" as const,
  },
  {
    href: "https://linkedin.com/in/eupablomonteiro",
    icon: "simple-icons:linkedin",
    isIconify: true as const,
    label: "Falar no LinkedIn",
    variant: "secondary" as const,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-250, 250], [6, -6]), { stiffness: 80, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-250, 250], [-8, 8]), { stiffness: 80, damping: 18 });
  const transX = useSpring(useTransform(mouseX, [-250, 250], [-10, 10]), { stiffness: 100, damping: 20 });
  const transY = useSpring(useTransform(mouseY, [-250, 250], [-8, 8]), { stiffness: 100, damping: 20 });
  const glowX = useTransform(transX, [-10, 10], [-70, 70]);
  const glowY = useTransform(transY, [-8, 8], [-50, 50]);

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
      id="contact"
      className="relative py-24 overflow-hidden paper-texture"
    >
      <GraphicScribble className="absolute top-16 left-[5%] h-9 w-9 text-portfolio-green" />
      <GraphicStar className="absolute bottom-20 right-[8%] h-5 w-5 text-portfolio-gold" />
      <GraphicLine className="absolute top-28 right-[12%] w-20 text-portfolio-primary/20 hidden lg:block" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-10 px-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="col-span-12 flex flex-col items-start gap-5 lg:col-span-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-portfolio-text/10 bg-portfolio-surface px-3 py-1.5 shadow-solid-sm">
            <span className="h-2 w-2 rounded-full bg-portfolio-primary shadow-[0_0_8px_rgba(225,87,115,0.6)] animate-pulse" />
            <span className="font-mono text-xs font-semibold text-portfolio-text">Disponível para contratação</span>
          </div>

          <Heading as="h2">
            <span className="text-portfolio-primary">Conectar</span>
          </Heading>

          <Text variant="muted" className="max-w-xl text-base leading-relaxed">
            Pronto para oportunidades em <span className="font-semibold text-portfolio-text">full-stack, backend e frontend</span>, além de colaborações e projetos freelance.
          </Text>

          <p className="font-heading text-xl font-bold text-portfolio-text">Pronto para construir algo incrível?</p>

          <ul className="flex flex-wrap gap-3 pt-1">
            {["Remoto", "Freelance", "Início imediato"].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 rounded-full bg-portfolio-primary/10 px-3 py-1.5 text-xs font-semibold text-portfolio-primary ring-1 ring-portfolio-primary/20">
                <span className="text-portfolio-primary">✓</span> {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 pt-2">
            {links.map(({ href, icon, label, variant, isIconify }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={buttonVariants({ variant, size: "lg" })}
              >
                {isIconify ? <Icon icon={icon as string} width={18} height={18} /> : (() => { const LucideIcon = icon as React.ElementType; return <LucideIcon size={18} />; })()}
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="col-span-12 flex items-center justify-center lg:col-span-6"
        >
          <div className="relative" style={{ perspective: 1200 }}>
            <motion.div
              style={{ rotateX, rotateY, x: transX, y: transY, transformStyle: "preserve-3d" }}
              className="relative will-change-transform"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotateZ: [0, 0.6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute -inset-8 -z-10 rounded-[32px]"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 50% 40%, rgba(225,87,115,0.16), transparent 70%), radial-gradient(50% 45% at 60% 65%, rgba(214,183,107,0.12), transparent 70%), radial-gradient(45% 40% at 40% 70%, rgba(140,156,138,0.12), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute -inset-8 rotate-[8deg] rounded-[22px] bg-portfolio-primary/12" aria-hidden="true" />
                <div className="absolute -inset-8 -rotate-[10deg] rounded-[22px] bg-portfolio-gold/12" aria-hidden="true" />

                <div className="relative overflow-visible rounded-3xl border-4 border-portfolio">
                  <Image
                    src={PabloCracha}
                    alt="Crachá Pablo Monteiro - Desenvolvedor Fullstack"
                    width={2364}
                    height={4016}
                    loading="lazy"
                    quality={100}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 340px, 300px"
                    className="relative z-10 h-auto w-[300px] sm:w-[340px] lg:w-[380px] object-contain select-none rounded-3xl"
                    style={{ transform: "translateZ(24px)" }}
                  />
                  <motion.div
                    style={{ x: glowX, y: glowY } as unknown as React.CSSProperties}
                    className="pointer-events-none absolute left-1/2 top-1/2 -ml-20 -mt-20 h-40 w-40 rounded-full z-0"
                  >
                    <div
                      className="h-full w-full rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(225,87,115,0.14), transparent 70%)" }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                <div
                  className="pointer-events-none absolute -bottom-6 left-1/2 h-6 w-[65%] -translate-x-1/2 rounded-full"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(35,35,35,0.16), transparent 70%)" }}
                  aria-hidden="true"
                />
              </motion.div>
            </motion.div>

            <GraphicStar className="absolute -top-2 -right-2 h-4 w-4 text-portfolio-gold z-20" />
            <GraphicScribble className="absolute -bottom-3 -left-4 h-6 w-6 text-portfolio-primary/40 z-20 hidden sm:block" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
