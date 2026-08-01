"use client";

import { useCallback, useEffect, useRef } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Heading, Text } from "@/components/ui";
import { GraphicScribble, GraphicStar } from "@/components/graphics";
import { ExternalLink, GitBranch } from "lucide-react";
import { BadgeComments } from "@/components/badgeComments";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import pabloProjetosSection from "@/assets/pablo-projetos-section.png";

interface Project {
  title: string;
  description: string;
  techs: string[];
  color: string;
  links: { github: string; live: string };
  screenshot?: StaticImageData;
  screenshotMobile?: StaticImageData;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "Loja completa com catálogo, carrinho, checkout com Stripe e painel administrativo.",
    techs: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    color: "var(--color-portfolio-primary)",
    links: { github: "#", live: "#" },
  },
  {
    title: "Dashboard Analytics",
    description:
      "Painel de métricas com gráficos interativos, filtros e exportação de relatórios.",
    techs: ["React", "TypeScript", "Recharts", "Node.js"],
    color: "var(--color-portfolio-green)",
    links: { github: "#", live: "#" },
  },
  {
    title: "API RESTful",
    description:
      "API de gerenciamento de conteúdo com autenticação, autorização e Swagger.",
    techs: ["Node.js", "Express", "PostgreSQL", "Swagger"],
    color: "var(--color-portfolio-gold)",
    links: { github: "#", live: "#" },
  },
  {
    title: "Landing Page",
    description:
      "Página de produto com foco em conversão, SEO e performance no Core Web Vitals.",
    techs: ["Next.js", "Tailwind CSS", "Vercel"],
    color: "var(--color-portfolio-primary-dark)",
    links: { github: "#", live: "#" },
  },
];

const SPEED = 1.1;
const DRAG_THRESHOLD = 6;

function wrapX(value: number, setWidth: number) {
  if (setWidth <= 0) return value;
  return ((value % setWidth) + setWidth) % setWidth;
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const xRef = useRef(0);
  const setWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const hoverRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const movedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    if (trackRef.current) setWidthRef.current = trackRef.current.scrollWidth / 2;
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPointerXRef.current;
    if (!movedRef.current && Math.abs(dx) < DRAG_THRESHOLD) return;
    movedRef.current = true;
    lastPointerXRef.current = e.clientX;
    xRef.current = wrapX(xRef.current + dx, setWidthRef.current);
  }, []);

  const suppressClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("click", suppressClick, true);
  }, [handlePointerMove, suppressClick]);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      draggingRef.current = true;
      movedRef.current = false;
      lastPointerXRef.current = e.clientX;
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("click", suppressClick, true);
    },
    [handlePointerMove, endDrag, suppressClick],
  );

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", measure);

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const setWidth = setWidthRef.current;

      if (
        !draggingRef.current &&
        !hoverRef.current &&
        !reducedMotionRef.current &&
        setWidth > 0
      ) {
        xRef.current += (SPEED * dt) / 16.67;
        if (xRef.current >= setWidth) xRef.current -= setWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      const container = containerRef.current;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        for (const card of cardRefs.current) {
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          const visible =
            Math.min(rect.right, containerRect.right) -
            Math.max(rect.left, containerRect.left);
          const progress = Math.min(1, Math.max(0, visible / rect.width));
          card.style.opacity = String(0.25 + 0.75 * progress);
          card.style.transform = `scale(${0.94 + 0.06 * progress})`;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section
      id="projects"
      className="relative bg-portfolio-surface py-24 overflow-hidden"
    >
      <GraphicStar className="absolute top-16 left-[5%] h-5 w-5 text-portfolio-gold" />
      <GraphicScribble className="absolute bottom-20 right-[4%] h-10 w-10 text-portfolio-primary/50" />

      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 flex flex-col items-start gap-4"
        >
          <BadgeComments comment="Projetos" />

          <Heading as="h2">
            O que eu já <span className="text-portfolio-primary">construí</span>
          </Heading>
          <Text variant="muted" className="max-w-md">
            Poucos projetos, bem resolvidos. Cada um me ensinou algo que o
            anterior não ensinou.
          </Text>
        </motion.div>

        <div className="flex flex-col gap-12 md:flex-row md:items-end md:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden w-[220px] shrink-0 md:block lg:w-[250px]"
          >
            <Image
              src={pabloProjetosSection}
              alt="Pablo Monteiro apresentando seus projetos"
              width={2020}
              height={3932}
              sizes="(min-width: 1024px) 250px, 220px"
              className="h-auto w-full"
            />
          </motion.div>

          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="relative flex w-full flex-1 select-none items-end overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
            onPointerDown={startDrag}
            onPointerCancel={endDrag}
            onPointerEnter={() => {
              hoverRef.current = true;
            }}
            onPointerLeave={() => {
              hoverRef.current = false;
            }}
          >
            <div ref={trackRef} className="flex w-max py-4 will-change-transform">
              {[0, 1].map((set) => (
                <div key={set} className="flex gap-10 pr-10">
                  {projects.map((project, i) => (
                    <ProjectCard
                      key={`${set}-${project.title}`}
                      project={project}
                      ref={(el) => {
                        cardRefs.current[set * projects.length + i] = el;
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard = forwardRef<HTMLElement, { project: Project }>(
  function ProjectCard({ project }, ref) {
    return (
      <article
        ref={ref}
        className="w-[calc(100vw-3rem)] max-w-[440px] shrink-0 rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border md:w-[400px] md:max-w-none"
      >
        <div className="flex items-end justify-center gap-4 p-6 pb-5">
          <div className="min-w-0 flex-1">
            <div className="rounded-12 border-[6px] border-portfolio-text bg-portfolio-bg">
              <div className="aspect-[16/10] overflow-hidden rounded-[4px] bg-portfolio-bg">
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={`${project.title} em desktop`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ProjectArt color={project.color} />
                )}
              </div>
            </div>
            <div className="mx-auto h-3 w-20 rounded-b-md bg-portfolio-text" />
          </div>

          <div className="w-[30%] max-w-[104px]">
            <div className="rounded-16 border-4 border-portfolio-text bg-portfolio-bg">
              <div className="aspect-[9/19] overflow-hidden rounded-12 bg-portfolio-bg">
                {project.screenshotMobile ? (
                  <Image
                    src={project.screenshotMobile}
                    alt={`${project.title} em mobile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ProjectArt color={project.color} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="rounded-12 bg-portfolio-bg px-2.5 py-1 text-xs font-medium text-portfolio-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
          <h3 className="font-heading text-xl font-bold text-portfolio-text">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-portfolio-text-secondary">
            {project.description}
          </p>
          <div className="mt-4 flex gap-5">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
            >
              <GitBranch size={16} />
              Código
            </a>
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
            >
              <ExternalLink size={16} />
              Demo
            </a>
          </div>
        </div>
      </article>
    );
  },
);

function ProjectArt({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 400 340"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="80"
        y="50"
        width="240"
        height="240"
        rx="16"
        stroke={color}
        strokeWidth="2"
        opacity="0.35"
      />
      <rect
        x="104"
        y="74"
        width="80"
        height="130"
        rx="10"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <circle
        cx="130"
        cy="150"
        r="26"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
      <path
        d="M136 162 Q 150 150, 164 162"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <rect
        x="120"
        y="176"
        width="50"
        height="6"
        rx="3"
        fill={color}
        opacity="0.3"
      />
      <rect
        x="210"
        y="74"
        width="80"
        height="130"
        rx="10"
        fill={color}
        fillOpacity="0.08"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <path
        d="M350 120 L 370 100 L 390 120 L 410 100 L 430 120"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <path
        d="M350 140 L 370 120 L 390 140 L 410 120 L 430 140"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      <rect x="210" y="120" width="10" height="60" rx="4" fill={color} opacity="0.35" />
      <rect x="230" y="100" width="10" height="80" rx="4" fill={color} opacity="0.2" />
      <rect x="250" y="140" width="10" height="40" rx="4" fill={color} opacity="0.3" />
    </svg>
  );
}
