import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border transition-all duration-150 hover:-translate-y-1 hover:shadow-solid-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
