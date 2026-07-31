import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "green" | "gold";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-portfolio-surface text-portfolio-text-secondary ring-1 ring-portfolio-border",
  primary: "bg-portfolio-primary/10 text-portfolio-primary",
  green: "bg-portfolio-green/15 text-portfolio-green",
  gold: "bg-portfolio-gold/20 text-portfolio-text",
};

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-12 px-3 py-1.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
