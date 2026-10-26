import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CarouselDots({ total, active, label }: { total: number; active: number; label: string }) {
  if (total < 2) return null;
  return (
    <span className="ml-auto flex gap-1" role="img" aria-label={label}>
      {Array.from({ length: total }, (_, d) => (
        <span
          key={d}
          className={cn("h-1.5 w-1.5 rounded-full", d === active ? "bg-portfolio-primary" : "bg-portfolio-text/20")}
        />
      ))}
    </span>
  );
}

export function BrowserFrame({
  title,
  dots,
  children,
  onHoverChange,
}: {
  title: string;
  dots?: ReactNode;
  children: ReactNode;
  onHoverChange?: (hovering: boolean) => void;
}) {
  return (
    <div
      className="overflow-hidden rounded-12 border-[5px] border-portfolio-text bg-portfolio-bg"
      onMouseEnter={onHoverChange ? () => onHoverChange(true) : undefined}
      onMouseLeave={onHoverChange ? () => onHoverChange(false) : undefined}
    >
      <div className="flex items-center gap-1.5 border-b-2 border-portfolio-text bg-portfolio-surface px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="sr-only">{title}</span>
        {dots}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, large = false, hiddenOnMobile = true }: { children: ReactNode; large?: boolean; hiddenOnMobile?: boolean }) {
  return (
    <div className={cn("shrink-0", large ? "w-[200px]" : "w-[30%] max-w-[110px]", hiddenOnMobile && !large && "hidden sm:block")}>
      <div className="rounded-16 border-4 border-portfolio-text bg-portfolio-bg p-1">
        <div className="relative aspect-[9/19] overflow-hidden rounded-12 bg-portfolio-bg">{children}</div>
      </div>
    </div>
  );
}

export function ShotPlaceholder({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-portfolio-bg">
      <span className={cn("font-mono text-portfolio-text-secondary", compact ? "text-[10px]" : "text-xs")}>{label}</span>
    </div>
  );
}
