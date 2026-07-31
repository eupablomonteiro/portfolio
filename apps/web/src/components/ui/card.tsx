import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-[--radius-lg] bg-portfolio-card p-6 shadow-sm ring-1 ring-portfolio-border/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:rounded-t-[--radius-lg] before:bg-gradient-to-r before:from-portfolio-primary/50 before:to-portfolio-accent/40 before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100",
        className
      )}
    >
      {children}
    </div>
  );
}
