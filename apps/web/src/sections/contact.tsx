"use client";

import { motion } from "framer-motion";
import { Badge, buttonVariants, Heading, Text } from "@/components/ui";
import { Character } from "@/components/character";
import { GraphicScribble, GraphicStar } from "@/components/graphics";
import { Mail, Briefcase, FileDown } from "lucide-react";
import { BadgeComments } from "@/components/badgeComments";

const links = [
  {
    href: "mailto:contato@pablomonteiro.dev",
    icon: Mail,
    label: "Email",
    variant: "primary" as const,
  },
  {
    href: "https://Briefcase.com/in/eupablomonteiro",
    icon: Briefcase,
    label: "Briefcase",
    variant: "secondary" as const,
  },
  {
    href: "/curriculo.pdf",
    icon: FileDown,
    label: "Currículo",
    variant: "secondary" as const,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <GraphicScribble className="absolute top-16 left-[5%] h-9 w-9 text-portfolio-green" />
      <GraphicStar className="absolute bottom-20 right-[8%] h-5 w-5 text-portfolio-gold" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-10 px-6">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="col-span-12 flex flex-col items-start gap-5 lg:col-span-7"
        >
          <BadgeComments comment="Contato" />

          <Heading as="h2">
            Vamos <span className="text-portfolio-primary">trabalhar</span>{" "}
            juntos?
          </Heading>
          <Text variant="muted" className="max-w-md">
            Estou em busca da minha primeira oportunidade como dev júnior. Se
            você tem um projeto bacana, uma vaga aberta ou só quer trocar uma
            ideia sobre desenvolvimento, minha caixa de entrada está sempre
            aberta.
          </Text>
          <div className="flex flex-wrap gap-4 pt-2">
            {links.map(({ href, icon: Icon, label, variant }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className={buttonVariants({ variant, size: "lg" })}
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
          className="col-span-12 flex items-center justify-center lg:col-span-5"
        >
          <div className="relative">
            <div
              className="absolute -inset-3 rotate-2 rounded-16 bg-portfolio-primary/15"
              aria-hidden="true"
            />
            <div className="relative rounded-16 border-2 border-portfolio-text bg-portfolio-surface p-8 shadow-solid">
              <Character pose="wave" className="h-48" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
