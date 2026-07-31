"use client";

import { motion } from "framer-motion";
import { Badge, buttonVariants, Heading, Text } from "@/components/ui";
import { Code2, Briefcase, Mail, FileDown } from "lucide-react";
import {
  DoodleBrackets,
  DoodleDotGrid,
  DoodleBrushStroke,
  DoodleChevrons,
  DoodleTS,
  DoodleJS,
  DoodleNode,
  DoodleNext,
  DoodleRedis,
  Docker,
} from "@/components/decorative";

const links = [
  {
    href: "https://github.com/pablohenrique",
    icon: Code2,
    label: "Github",
    variant: "outline" as const,
  },
  {
    href: "https://linkedin.com/in/pablohenrique",
    icon: Briefcase,
    label: "LinkedIn",
    variant: "outline" as const,
  },
  {
    href: "mailto:contato@pablohenrique.dev",
    icon: Mail,
    label: "Email",
    variant: "outline" as const,
  },
  {
    href: "/curriculo.pdf",
    icon: FileDown,
    label: "Currículo",
    variant: "primary" as const,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <DoodleBrushStroke className="absolute top-12 left-[5%] w-24 h-6 hidden md:block opacity-40" />
      <DoodleChevrons className="absolute top-20 right-[5%] w-10 h-10 hidden md:block opacity-50" />
      <DoodleBrackets className="absolute bottom-16 left-[6%] w-14 h-10 hidden lg:block" />
      <DoodleDotGrid className="absolute bottom-12 right-[4%] w-16 h-16 hidden md:block" />

      <DoodleTS className="absolute top-8 right-[8%] w-9 h-9 hidden md:block opacity-50" />
      <DoodleJS className="absolute top-36 left-[7%] w-9 h-9 hidden md:block opacity-45" />
      <DoodleNode className="absolute bottom-36 right-[8%] w-9 h-9 hidden md:block opacity-40" />
      <DoodleNext className="absolute bottom-48 left-[4%] w-9 h-9 hidden lg:block opacity-45" />
      <DoodleRedis className="absolute top-1/2 left-[2%] w-9 h-9 hidden lg:block opacity-40" />
      <Docker className="absolute top-1/2 right-[3%] w-9 h-9 hidden lg:block opacity-35" />
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-16 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <div
            className="relative aspect-square w-full max-w-[380px]"
            role="img"
            aria-label="Ilustração de contato"
          >
            <svg
              viewBox="0 0 380 380"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="60" y="40" width="260" height="200" rx="16" fill="var(--color-portfolio-card)" stroke="var(--color-portfolio-blue)" strokeWidth="1.5" strokeOpacity="0.3" />
              <rect x="80" y="60" width="220" height="30" rx="4" fill="var(--color-portfolio-bg-alt)" stroke="var(--color-portfolio-blue)" strokeWidth="1" strokeOpacity="0.3" />
              <rect x="100" y="105" width="180" height="12" rx="6" fill="var(--color-portfolio-green)" fillOpacity="0.3" />
              <rect x="100" y="125" width="140" height="12" rx="6" fill="var(--color-portfolio-blue)" fillOpacity="0.3" />
              <rect x="100" y="145" width="160" height="12" rx="6" fill="var(--color-portfolio-accent)" fillOpacity="0.25" stroke="var(--color-portfolio-accent)" strokeWidth="1" strokeOpacity="0.15" />
              <rect x="100" y="170" width="80" height="30" rx="6" fill="var(--color-portfolio-primary)" fillOpacity="0.15" stroke="var(--color-portfolio-primary)" strokeWidth="1" strokeOpacity="0.3" />

              <path d="M60 250 L 190 290 L 320 250" stroke="var(--color-portfolio-yellow)" strokeWidth="1.5" opacity="0.4" />
              <path d="M190 290 L 190 340" stroke="var(--color-portfolio-yellow)" strokeWidth="1.5" opacity="0.4" />

              <circle cx="190" cy="350" r="8" fill="var(--color-portfolio-accent)" opacity="0.25" />

              <path d="M40 180 Q 30 160, 50 150 Q 60 145, 55 165" stroke="var(--color-portfolio-green)" strokeWidth="1.5" opacity="0.4" />
              <path d="M330 170 Q 350 150, 340 140 Q 335 135, 325 150" stroke="var(--color-portfolio-yellow)" strokeWidth="1.5" opacity="0.4" />
              <path d="M120 80 Q 130 70, 140 75" stroke="var(--color-portfolio-green)" strokeWidth="1" opacity="0.4" />
              <path d="M250 75 Q 260 65, 270 70" stroke="var(--color-portfolio-yellow)" strokeWidth="1" opacity="0.4" />

              <circle cx="50" cy="40" r="3" fill="var(--color-portfolio-accent)" opacity="0.3" />
              <circle cx="330" cy="55" r="4" fill="var(--color-portfolio-blue)" opacity="0.2" />
              <circle cx="55" cy="360" r="3" fill="var(--color-portfolio-green)" opacity="0.25" />
              <circle cx="330" cy="370" r="4" fill="var(--color-portfolio-accent)" opacity="0.2" />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <Badge variant="yellow">contato</Badge>
          <Heading as="h2">
            <span className="text-portfolio-primary">Vamos</span> trabalhar juntos?
          </Heading>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
            className="h-0.5 rounded-full bg-portfolio-accent origin-left"
          />
          <Text variant="muted" className="max-w-md">
            Estou aberto a novas oportunidades como dev júnior. Se você tem um
            projeto bacana, quer trocar uma ideia ou conhecer meu trabalho, me
            chama que a gente conversa.
          </Text>
          <div className="flex flex-wrap gap-3 pt-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={
                    link.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={buttonVariants({
                    variant: link.variant,
                    size: "md",
                  })}
                >
                  <Icon size={16} />
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
