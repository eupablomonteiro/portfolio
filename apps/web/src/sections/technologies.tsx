"use client";

import { motion } from "framer-motion";
import { Text } from "@/components/ui";
import { Icon } from "@iconify/react";
import { BadgeComments } from "@/components/badgeComments";
import { GraphicLine, GraphicScribble } from "@/components/graphics";

type Accent =
  "primary" | "green" | "gold" | "primaryDark" | "text" | "warning" | "surface";
interface StackGroup {
  title: string;
  label: string;
  icons: string[];
  items: string[];
  accent: Accent;
}

const stacks: StackGroup[] = [
  {
    title: "Base",
    label: "Fundação comum",
    icons: [
      "simple-icons:html5",
      "simple-icons:css3",
      "simple-icons:javascript",
      "simple-icons:typescript",
      "simple-icons:git",
      "simple-icons:github",
    ],
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "Git", "API REST"],
    accent: "text" as const,
  },
  {
    title: "Frontend",
    label: "Interfaces que performam",
    icons: [
      "simple-icons:react",
      "simple-icons:nextdotjs",
      "simple-icons:tailwindcss",
    ],
    items: ["React", "Next.js", "Tailwind CSS"],
    accent: "primary" as const,
  },
  {
    title: "Backend",
    label: "APIs sólidas",
    icons: [
      "simple-icons:nodedotjs",
      "simple-icons:express",
      "simple-icons:swagger",
      "simple-icons:auth0",
      "simple-icons:jsonwebtokens",
    ],
    items: ["Node.js", "Express", "Swagger", "OAuth 2.0", "JWT"],
    accent: "green" as const,
  },
  {
    title: "Banco de Dados",
    label: "Dados com integridade",
    icons: [
      "simple-icons:postgresql",
      "simple-icons:prisma",
      "simple-icons:mongodb",
    ],
    items: ["PostgreSQL", "Prisma", "MongoDB"],
    accent: "gold" as const,
  },
  {
    title: "Filas & Realtime",
    label: "Processamento assíncrono",
    icons: ["simple-icons:redis", "simple-icons:socketdotio"],
    items: ["BullMQ", "Redis", "WebSocket"],
    accent: "primaryDark" as const,
  },
  {
    title: "Testes",
    label: "Confiança no deploy",
    icons: ["simple-icons:jest", "simple-icons:vitest"],
    items: ["Jest", "Vitest"],
    accent: "warning" as const,
  },
  {
    title: "Infra & Gestão",
    label: "Fluxo e entrega",
    icons: [
      "simple-icons:docker",
      "simple-icons:cloudflare",
      "simple-icons:trello",
    ],
    items: ["Docker", "Cloudflare", "Kanban", "Trello"],
    accent: "surface" as const,
  },
];

const spotlightPos = [
  "top-[-50px] right-[-40px]",
  "bottom-[-30px] left-[-20px]",
  "top-[20%] right-[10%]",
  "bottom-[10%] right-[-20px]",
  "top-[-20px] left-[30%]",
  "bottom-[-40px] right-[20%]",
  "top-[10%] left-[-20px]",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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
          <BadgeComments comment="Stack" />
          <h2 className="font-heading text-4xl font-bold tracking-tight md:text-[48px]">
            Stack que{" "}
            <span className="text-portfolio-primary">uso no dia a dia</span>
          </h2>
          <Text variant="muted" className="max-w-xl">
            As tecnologias que mais uso ao construir meus projetos Fullstack de entrega confiáveis.
          </Text>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-12 auto-rows-fr"
        >
          {stacks.map((group, idx) => {
            const accentMap = {
              primary: {
                bg: "bg-portfolio-primary",
                ring: "ring-portfolio-primary/20",
                text: "text-portfolio-primary",
                soft: "bg-portfolio-primary/10",
                glow: "bg-portfolio-primary",
              },
              green: {
                bg: "bg-portfolio-green",
                ring: "ring-portfolio-green/20",
                text: "text-portfolio-green",
                soft: "bg-portfolio-green/15",
                glow: "bg-portfolio-green",
              },
              gold: {
                bg: "bg-portfolio-gold",
                ring: "ring-portfolio-gold/20",
                text: "text-portfolio-gold",
                soft: "bg-portfolio-gold/20",
                glow: "bg-portfolio-gold",
              },
              primaryDark: {
                bg: "bg-portfolio-primary-dark",
                ring: "ring-portfolio-primary-dark/20",
                text: "text-portfolio-primary-dark",
                soft: "bg-portfolio-primary-dark/10",
                glow: "bg-portfolio-primary-dark",
              },
              text: {
                bg: "bg-portfolio-text",
                ring: "ring-portfolio-text/10",
                text: "text-portfolio-text",
                soft: "bg-portfolio-text/5",
                glow: "bg-portfolio-text",
              },
              warning: {
                bg: "bg-portfolio-warning",
                ring: "ring-portfolio-warning/20",
                text: "text-portfolio-warning",
                soft: "bg-portfolio-warning/15",
                glow: "bg-portfolio-warning",
              },
              surface: {
                bg: "bg-portfolio-text",
                ring: "ring-portfolio-text/10",
                text: "text-portfolio-text",
                soft: "bg-portfolio-bg",
                glow: "bg-portfolio-text",
              },
            }[group.accent];

            const isBase = idx === 0;
            const colSpan = isBase
              ? "md:col-span-12"
              : idx === 1
                ? "md:col-span-7"
                : idx === 2
                  ? "md:col-span-5"
                  : idx === 3
                    ? "md:col-span-5"
                    : idx === 4
                      ? "md:col-span-7"
                      : idx === 5
                        ? "md:col-span-5"
                        : "md:col-span-7";

            return (
              <motion.div
                key={group.title}
                variants={cardVariants}
                className={`group relative flex flex-col overflow-hidden rounded-16 bg-portfolio-surface p-6 shadow-solid ring-1 ring-portfolio-border transition-all duration-300 hover:shadow-solid-lg hover:-translate-y-1 hover:ring-portfolio-text/10 md:p-7 ${colSpan} ${isBase ? "md:flex-row md:items-center md:gap-8" : ""}`}
              >
                <div
                  className={`pointer-events-none absolute h-64 w-64 rounded-full blur-3xl opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.18] ${spotlightPos[idx]} ${accentMap.glow}`}
                />

                <div className={isBase ? "md:w-[320px] shrink-0" : ""}>
                  <h3 className="font-heading text-xl font-extrabold tracking-tight text-portfolio-text">
                    {group.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-medium text-portfolio-text-secondary">
                    {group.label}
                  </p>
                  <div className="mt-4 flex gap-2.5 flex-wrap">
                    {group.icons.map((ic) => (
                      <span
                        key={ic}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-12 ${accentMap.soft} ring-1 ${accentMap.ring}`}
                      >
                        <Icon
                          icon={ic}
                          width={18}
                          height={18}
                          className={accentMap.text}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex flex-wrap gap-2 ${isBase ? "md:flex-1 md:justify-end md:pt-0 pt-5 mt-auto" : "mt-auto pt-5"}`}
                >
                  {group.items.map((it) => (
                    <span
                      key={it}
                      className={`rounded-full ${accentMap.soft} px-3 py-1 text-xs font-semibold ${accentMap.text} ring-1 ${accentMap.ring}`}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
