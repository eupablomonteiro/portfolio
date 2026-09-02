"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BadgeComments } from "@/components/badgeComments";
import { Text } from "@/components/ui";
import { GraphicLine, GraphicStar } from "@/components/graphics";
interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  techs: string[];
  accent: "primary" | "green" | "gold";
}

const experiences: Experience[] = [
  {
    company: "Freelance — E-commerce Platform",
    role: "Desenvolvedor Fullstack",
    period: "2023 — Presente",
    location: "Remoto",
    accent: "primary",
    bullets: [
      "Construí loja completa com catálogo, carrinho e checkout Stripe processando vendas reais",
      "Reduzi tempo de carregamento em 40% com renderização híbrida Next.js e otimização de imagens",
      "Implementei painel administrativo com controle de estoque e relatórios",
    ],
    techs: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
  },
  {
    company: "Freelance — Dashboard Analytics",
    role: "Desenvolvedor Frontend",
    period: "2022 — 2023",
    location: "Remoto",
    accent: "green",
    bullets: [
      "Desenvolvi painel de métricas com gráficos interativos e filtros avançados",
      "Integrei exportação de relatórios em PDF/CSV consumida por 200+ usuários",
      "Padronizei componentes e reduzi retrabalho em novas telas",
    ],
    techs: ["React", "TypeScript", "Recharts", "Node.js"],
  },
  {
    company: "Projetos Autorais",
    role: "Desenvolvedor Fullstack Júnior",
    period: "2021 — 2022",
    location: "São Paulo, BR",
    accent: "gold",
    bullets: [
      "Criei APIs RESTful com autenticação JWT, Swagger e testes automatizados",
      "Evoluí projetos pessoais aplicando boas práticas de código limpo e Git",
    ],
    techs: ["Node.js", "Express", "PostgreSQL", "Docker"],
  },
];



export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} id="experience" className="relative py-24 overflow-hidden paper-texture">
      <GraphicStar className="absolute top-16 left-[6%] h-5 w-5 text-portfolio-gold" />
      <GraphicLine className="absolute top-24 right-[6%] w-24 text-portfolio-primary" />

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-14 flex flex-col items-start gap-4"
        >
          <BadgeComments comment="Trajetória" />
          <h2 className="font-heading text-4xl font-bold tracking-tight md:text-[48px]">
            Experiência <span className="text-portfolio-primary">profissional</span>
          </h2>
          <Text variant="muted" className="max-w-xl">
            Trabalhos reais onde atuei sozinho como freelancer — do levantamento ao deploy.
          </Text>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-portfolio-border md:left-[20px]" />
          <motion.div style={{ scaleY, transformOrigin: "top" }} className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-portfolio-primary via-portfolio-green to-portfolio-gold md:left-[20px]" />

          {experiences.map((exp, idx) => {
            const dotColor = exp.accent === "primary" ? "bg-portfolio-primary" : exp.accent === "green" ? "bg-portfolio-green" : "bg-portfolio-gold";
            const isSticky = true;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.06 }}
                style={isSticky ? { top: `calc(96px + ${idx * 20}px)` } as React.CSSProperties : undefined}
                className="group sticky relative mb-10 pl-12 md:pl-16 last:mb-0"
              >
                <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-portfolio-text bg-portfolio-surface shadow-solid-sm md:h-11 md:w-11 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
                  <div className={`h-3 w-3 rounded-full ${dotColor} shadow-[0_0_8px_rgba(0,0,0,0.15)]`} />
                </div>
                <div className="rounded-16 bg-portfolio-surface p-6 shadow-solid ring-1 ring-portfolio-border md:p-7 transition-all duration-300 group-hover:shadow-solid-lg group-hover:-translate-y-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-portfolio-text">{exp.company}</h3>
                      <p className={`mt-1 font-medium ${exp.accent === "primary" ? "text-portfolio-primary" : exp.accent === "green" ? "text-portfolio-green" : "text-portfolio-gold"}`}>{exp.role}</p>
                    </div>
                    <span className="rounded-full bg-portfolio-bg px-3 py-1 font-mono text-xs font-medium text-portfolio-text-secondary ring-1 ring-portfolio-border">
                      {exp.period} • {exp.location}
                    </span>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-portfolio-text-secondary">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.techs.map((t) => (
                      <span key={t} className="rounded-full bg-portfolio-bg px-2.5 py-1 text-xs font-medium text-portfolio-text-secondary ring-1 ring-portfolio-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
