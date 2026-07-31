import { cn } from "@/lib/utils";

interface GraphicCutoutProps {
  children: React.ReactNode;
  className?: string;
}

export function GraphicCutout({ children, className }: GraphicCutoutProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-12 bg-portfolio-surface px-4 py-2 shadow-solid-sm ring-1 ring-portfolio-border -rotate-1",
        className
      )}
    >
      {children}
    </div>
  );
}
