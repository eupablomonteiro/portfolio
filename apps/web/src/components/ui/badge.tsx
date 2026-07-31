import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "green" | "blue" | "yellow";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

const dotMap: Record<BadgeVariant, string> = {
  default: "bg-portfolio-text-muted",
  green: "bg-portfolio-green",
  blue: "bg-portfolio-blue",
  yellow: "bg-portfolio-yellow",
};

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-portfolio-bg-alt text-portfolio-text-muted ring-1 ring-portfolio-border/30",
  green:
    "bg-portfolio-green/12 text-portfolio-green ring-1 ring-portfolio-green/20",
  blue: "bg-portfolio-blue/12 text-portfolio-blue ring-1 ring-portfolio-blue/20",
  yellow:
    "bg-portfolio-yellow/12 text-portfolio-yellow ring-1 ring-portfolio-yellow/20",
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", dotMap[variant])} />
      {children}
    </span>
  );
}
