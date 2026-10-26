'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useCarousel } from '@/components/ui/use-carousel';
import { BrowserFrame, CarouselDots, PhoneFrame, ShotPlaceholder } from '@/components/ui/mockup-frames';

export interface StackingProject {
  title: string;
  description: string;
  techs: string[];
  github: string;
  live?: string;
  screenshot?: StaticImageData;
  screenshotMobile?: StaticImageData;
  imageUrl?: string;
  mobileImageUrl?: string;
  gallery?: string[];
  mobileGallery?: string[];
  displayMode?: "both" | "web" | "mobile";
}

function DesktopMockup({ project, images }: { project: StackingProject; images: string[] }) {
  const { index, setPaused } = useCarousel(images.length);
  return (
    <div className="min-w-0 flex-1">
      <BrowserFrame
        title={project.title}
        onHoverChange={setPaused}
        dots={<CarouselDots total={images.length} active={index} label={`${images.length} prints, mostrando ${index + 1}`} />}
      >
        {project.screenshot ? (
          <Image src={project.screenshot} alt={project.title} fill className="object-cover" />
        ) : images.length > 0 ? (
          images.map((src, d) => (
            <Image
              key={`${src}_${d}`}
              src={src}
              alt={d === 0 ? project.title : `${project.title} — print ${d + 1}`}
              fill
              sizes="(min-width: 1024px) 550px, 90vw"
              priority={false}
              className={`object-cover transition-opacity duration-700 ${d === index ? "opacity-100" : "opacity-0"}`}
            />
          ))
        ) : (
          <ShotPlaceholder label="sem imagem" />
        )}
      </BrowserFrame>
      <div className="mx-auto h-2.5 w-16 rounded-b-md bg-portfolio-text" />
    </div>
  );
}

function MobileMockup({ project, large = false, gallery = [] }: { project: StackingProject; large?: boolean; gallery?: string[] }) {
  const shots = [project.mobileImageUrl, ...gallery].filter((s): s is string => !!s);
  const { index } = useCarousel(shots.length, 4500);
  return (
    <PhoneFrame large={large}>
      {project.screenshotMobile ? (
        <Image src={project.screenshotMobile} alt={`${project.title} mobile`} fill className="object-cover" />
      ) : shots.length > 0 ? (
        shots.map((src, d) => (
          <Image
            key={`${src}_${d}`}
            src={src}
            alt={d === 0 ? `${project.title} mobile` : `${project.title} mobile — print ${d + 1}`}
            fill
            sizes="220px"
            className={`object-cover transition-opacity duration-700 ${d === index ? "opacity-100" : "opacity-0"}`}
          />
        ))
      ) : (
        <ShotPlaceholder label="mobile" compact />
      )}
    </PhoneFrame>
  );
}

interface CardProps {
  i: number;
  project: StackingProject;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const StackingCard = ({ i, project, progress, range, targetScale }: CardProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const isEven = i % 2 === 0;
  const mode = project.displayMode ?? "both";
  const desktopImages = [project.imageUrl, ...(project.gallery ?? [])].filter((s): s is string => !!s);

  return (
    <div ref={container} className="h-[85vh] flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * 18}px)` }}
        className={cn(
          'relative flex flex-col origin-top w-[92%] lg:w-[92%] max-w-[1100px] h-[520px] lg:h-[460px] rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border overflow-hidden p-0'
        )}
      >
        <div className={`grid h-full grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
          <div className="flex items-end justify-center gap-4 bg-portfolio-bg p-6 lg:p-7 order-1">
            {mode !== "mobile" ? (
              <motion.div style={{ scale: imageScale }} className="flex min-w-0 flex-1 items-end">
                <DesktopMockup project={project} images={desktopImages} />
              </motion.div>
            ) : null}
            {mode !== "web" ? <MobileMockup project={project} large={mode === "mobile"} gallery={project.mobileGallery} /> : null}
          </div>

          <div className="flex flex-col justify-center p-6 lg:p-8 bg-portfolio-surface order-2">
            <span className="font-mono text-xs font-semibold text-portfolio-primary">0{i + 1} — {project.techs[0]}</span>
            <h3 className="mt-2 font-heading text-2xl font-bold text-portfolio-text leading-tight">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-portfolio-text-secondary line-clamp-3">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techs.map((t) => (
                <span key={t} className="rounded-full bg-portfolio-bg px-2.5 py-1 text-xs font-medium text-portfolio-text-secondary ring-1 ring-portfolio-border">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-12 bg-portfolio-text px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-portfolio-text/80">
                <Icon icon="simple-icons:github" width={16} height={16} />
                Repositório
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-12 bg-white px-4 py-2 text-sm font-semibold text-portfolio-text ring-1 ring-portfolio-border transition-colors hover:bg-portfolio-text hover:text-white hover:ring-portfolio-text">
                  <ExternalLink size={16} />
                  Ver Online
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function StackingCards({ projects }: { projects: StackingProject[] }) {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <section ref={container} className="relative bg-portfolio-bg">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 pb-4">
          <div className="flex flex-col items-start gap-2">
            <p className="font-mono text-sm font-medium text-portfolio-primary">{"// "}Projetos em destaque</p>
            <h2 className="font-heading text-4xl font-bold tracking-tight md:text-[48px]">
              Produtos que <span className="text-portfolio-primary">entreguei</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-portfolio-text-secondary">Role para ver o efeito de ficheiro — cada card escala e empilha com scroll sticky.</p>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.length === 0 ? (
            <div className="mx-auto w-[92%] max-w-[1100px] rounded-16 border border-dashed border-portfolio-border bg-portfolio-surface p-10 text-center">
              <p className="font-heading font-bold text-portfolio-text">Novos projetos a caminho</p>
              <p className="mt-1 text-sm text-portfolio-text-secondary">
                Em breve esta vitrine estará atualizada com os trabalhos mais recentes.
              </p>
            </div>
          ) : (
            projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i) * 0.04;
              return <StackingCard key={`${project.title}_${i}`} i={i} project={project} progress={scrollYProgress} range={[i * 0.22, 1]} targetScale={targetScale} />;
            })
          )}
        </div>

        <div className="h-[10vh] bg-portfolio-bg" />
      </section>
    </ReactLenis>
  );
}
