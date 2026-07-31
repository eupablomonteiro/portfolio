"use client";

import { motion } from "framer-motion";
import { Badge, Text } from "@/components/ui";
import {
  DoodleCursor,
  DoodleDotGrid,
  DoodleBrushStroke,
  DoodleChevrons,
  DoodleUnderscore,
} from "@/components/decorative";

const steps = [
  {
    year: "2022",
    title: "O primeiro contato",
    description:
      "Criei meu primeiro servidor de Minecraft e descobri o mundo da programação. Instalei plugins, editei configs e comecei a fazer meus primeiros scripts.",
    color: "var(--color-portfolio-blue)",
  },
  {
    year: "2023",
    title: "Mergulho no desenvolvimento web",
    description:
      "Comecei a estudar HTML, CSS e JavaScript. Em poucos meses já estava construindo meus primeiros projetos com React e Node.js.",
    color: "var(--color-portfolio-green)",
  },
  {
    year: "2024",
    title: "Full Stack na prática",
    description:
      "Desenvolvi projetos completos, do planejamento ao deploy. Aprofundei em TypeScript, bancos de dados, Docker e boas práticas de arquitetura.",
    color: "var(--color-portfolio-accent)",
  },
  {
    year: "2025",
    title: "Buscando a primeira oportunidade",
    description:
      "Foco em construir um portfólio sólido, contribuir com projetos open source e encontrar minha primeira vaga como desenvolvedor júnior.",
    color: "var(--color-portfolio-primary)",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-portfolio-bg-alt py-24 paper-texture"
    >
      <DoodleCursor className="absolute bottom-16 left-[4%] w-8 h-12 hidden lg:block" />
      <DoodleDotGrid className="absolute bottom-24 right-[6%] w-16 h-16 hidden md:block" />
      <DoodleChevrons className="absolute top-8 right-[5%] w-10 h-10 hidden md:block opacity-50" />
      <DoodleUnderscore className="absolute top-1/3 left-[3%] w-14 h-7 hidden lg:block opacity-50" />
      <DoodleBrushStroke className="absolute absolute top-1/2 right-[3%] w-28 h-6 hidden lg:block" />
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:items-center">
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
              aria-label="Ilustração sobre o desenvolvedor"
            >
              <svg
                viewBox="0 0 380 380"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="40" y="30" width="300" height="320" rx="16" stroke="var(--color-portfolio-blue)" strokeWidth="1.5" strokeOpacity="0.3" />
                <rect x="60" y="50" width="260" height="40" rx="6" fill="var(--color-portfolio-bg)" stroke="var(--color-portfolio-blue)" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx="80" cy="70" r="6" fill="var(--color-portfolio-accent)" opacity="0.5" />
                <path d="M95 60 L 130 60" stroke="var(--color-portfolio-green)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M95 70 L 110 70" stroke="var(--color-portfolio-green)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <path d="M95 80 L 120 80" stroke="var(--color-portfolio-green)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                <rect x="70" y="110" width="100" height="80" rx="8" fill="var(--color-portfolio-card)" stroke="var(--color-portfolio-blue)" strokeWidth="1" strokeOpacity="0.4" />
                <circle cx="100" cy="140" r="15" fill="var(--color-portfolio-blue)" fillOpacity="0.1" stroke="var(--color-portfolio-blue)" strokeWidth="1.5" />
                <path d="M90 155 Q 100 148, 110 155" stroke="var(--color-portfolio-blue)" strokeWidth="1" opacity="0.5" />
                <rect x="80" y="165" width="40" height="4" rx="2" fill="var(--color-portfolio-blue)" opacity="0.3" />
                <rect x="85" y="173" width="30" height="3" rx="1.5" fill="var(--color-portfolio-blue)" opacity="0.2" />
                <rect x="200" y="110" width="100" height="80" rx="8" fill="var(--color-portfolio-card)" stroke="var(--color-portfolio-green)" strokeWidth="1" strokeOpacity="0.4" />
                <rect x="215" y="125" width="30" height="20" rx="4" fill="var(--color-portfolio-green)" fillOpacity="0.1" stroke="var(--color-portfolio-green)" strokeWidth="1" />
                <path d="M230 135 L 220 145" stroke="var(--color-portfolio-green)" strokeWidth="1" opacity="0.5" />
                <rect x="215" y="153" width="40" height="4" rx="2" fill="var(--color-portfolio-green)" opacity="0.3" />
                <rect x="220" y="161" width="30" height="3" rx="1.5" fill="var(--color-portfolio-green)" opacity="0.2" />
                <rect x="70" y="210" width="240" height="120" rx="8" fill="var(--color-portfolio-card)" stroke="var(--color-portfolio-yellow)" strokeWidth="1" strokeOpacity="0.4" />
                <path d="M90 230 L 100 220 L 110 230 L 120 215 L 130 230 L 140 210 L 150 230 L 160 225 L 170 230 L 180 218 L 190 230 L 200 225 L 210 230 L 220 215 L 230 230 L 240 220 L 250 230 L 260 225 L 270 230 L 280 222 L 290 230" stroke="var(--color-portfolio-yellow)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="90" y="250" width="60" height="30" rx="4" fill="var(--color-portfolio-blue)" fillOpacity="0.1" stroke="var(--color-portfolio-blue)" strokeWidth="1" />
                <rect x="170" y="250" width="60" height="30" rx="4" fill="var(--color-portfolio-green)" fillOpacity="0.1" stroke="var(--color-portfolio-green)" strokeWidth="1" />
                <rect x="250" y="250" width="40" height="30" rx="4" fill="var(--color-portfolio-yellow)" fillOpacity="0.1" stroke="var(--color-portfolio-yellow)" strokeWidth="1" />
                <rect x="110" y="295" width="50" height="4" rx="2" fill="var(--color-portfolio-blue)" opacity="0.3" />
                <rect x="180" y="295" width="80" height="4" rx="2" fill="var(--color-portfolio-green)" opacity="0.3" />
                <path d="M50 320 Q 60 340, 85 330 Q 100 325, 95 310" stroke="var(--color-portfolio-green)" strokeWidth="1.5" opacity="0.4" />
                <path d="M280 310 Q 300 300, 320 320 Q 330 330, 310 340" stroke="var(--color-portfolio-yellow)" strokeWidth="1.5" opacity="0.4" />
                <circle cx="30" cy="60" r="4" fill="var(--color-portfolio-accent)" opacity="0.3" />
                <circle cx="350" cy="80" r="3" fill="var(--color-portfolio-accent)" opacity="0.25" />
                <circle cx="340" cy="360" r="5" fill="var(--color-portfolio-blue)" opacity="0.2" />
                <circle cx="40" cy="340" r="3" fill="var(--color-portfolio-green)" opacity="0.25" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <Badge variant="blue">sobre</Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              <span className="text-portfolio-primary">Quem</span>
              {" "}
              <span className="text-portfolio-text">eu sou</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.3 }}
              className="h-0.5 rounded-full bg-portfolio-accent origin-left"
            />
            <p className="leading-relaxed text-portfolio-text">
              Aos 15 anos eu só queria jogar Minecraft com meus amigos. Pra fazer
              o servidor funcionar do meu jeito, comecei a fuçar plugins, editar
              configs — e sem perceber, já estava dentro do buraco da
              programação. Nunca mais saí.
            </p>
            <p className="leading-relaxed text-portfolio-text-muted">
              De lá pra cá, virei noites estudando React, Node e TypeScript até
              conseguir construir aplicações completas — do planejamento ao
              deploy. Cada projeto novo me ensina algo que o anterior não
              ensinou, e é isso que me move.
            </p>
            <p className="leading-relaxed text-portfolio-text-muted">
              Fora do código, sou fissurado por design de produto, música boa e
              qualquer história bem contada — seja num livro, num jogo ou num
              filme.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="relative mt-20"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <Text variant="handwritten" className="text-portfolio-accent">
              como tudo começou
            </Text>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-portfolio-text">
              <span className="text-portfolio-primary">Minha</span> trajetória
            </h3>
          </div>

          <div className="mx-auto max-w-[760px]">
            <div className="relative">
              <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-portfolio-primary/30 via-portfolio-accent/30 to-portfolio-blue/30" />

              {steps.map((step, i) => (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                  className="relative mb-10 pl-14 last:mb-0"
                >
                  <div
                    className="absolute left-[11px] top-1.5 h-4 w-4 rounded-full border-2"
                    style={{
                      borderColor: step.color,
                      backgroundColor: "var(--color-portfolio-bg-alt)",
                    }}
                  />

                  <span
                    className="font-handwritten text-sm"
                    style={{ color: step.color }}
                  >
                    {step.year}
                  </span>
                  <h4 className="mt-1 font-heading text-lg font-semibold text-portfolio-text">
                    {step.title}
                  </h4>
                  <Text variant="muted" className="mt-1 max-w-lg">
                    {step.description}
                  </Text>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
