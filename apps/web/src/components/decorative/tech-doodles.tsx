import { cn } from "@/lib/utils";
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiDocker,
  SiSwagger,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

interface DoodleProps {
  className?: string;
}

export function DoodleTS({ className }: DoodleProps) {
  return (
    <SiTypescript
      size={20}
      className={cn("text-portfolio-blue", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleJS({ className }: DoodleProps) {
  return (
    <SiJavascript
      size={20}
      className={cn("text-portfolio-yellow", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleNext({ className }: DoodleProps) {
  return (
    <SiNextdotjs
      size={20}
      className={cn("text-portfolio-text", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleNode({ className }: DoodleProps) {
  return (
    <SiNodedotjs
      size={20}
      className={cn("text-portfolio-green", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleSQL({ className }: DoodleProps) {
  return (
    <SiPostgresql
      size={20}
      className={cn("text-portfolio-blue", className)}
      aria-hidden="true"
    />
  );
}

export function DoodlePrisma({ className }: DoodleProps) {
  return (
    <SiPrisma
      size={20}
      className={cn("text-portfolio-green", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleRedis({ className }: DoodleProps) {
  return (
    <SiRedis
      size={20}
      className={cn("text-portfolio-accent", className)}
      aria-hidden="true"
    />
  );
}

export function Docker({ className }: DoodleProps) {
  return (
    <SiDocker
      size={20}
      className={cn("text-portfolio-blue", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleQueue({ className }: DoodleProps) {
  return (
    <SiTypescript
      size={20}
      className={cn("text-portfolio-primary", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleAPI({ className }: DoodleProps) {
  return (
    <SiSwagger
      size={20}
      className={cn("text-portfolio-green", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleReact({ className }: DoodleProps) {
  return (
    <SiReact
      size={20}
      className={cn("text-portfolio-blue", className)}
      aria-hidden="true"
    />
  );
}

export function DoodleTailwind({ className }: DoodleProps) {
  return (
    <SiTailwindcss
      size={20}
      className={cn("text-portfolio-blue", className)}
      aria-hidden="true"
    />
  );
}
