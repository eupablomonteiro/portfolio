import { cn } from "@/lib/utils";

interface FloatingDotsProps {
  className?: string;
  count?: number;
  color?: string;
}

export function FloatingDots({
  className,
  count = 6,
  color = "var(--color-portfolio-border)",
}: FloatingDotsProps) {
  const dots = Array.from({ length: count }, (_, i) => ({
    x: 10 + Math.sin(i * 1.2) * 40 + 50,
    y: 10 + Math.cos(i * 0.9) * 40 + 50,
    r: 1.5 + (i % 3) * 0.5,
    opacity: 0.3 + (i % 4) * 0.15,
  }));

  return (
    <svg
      className={cn("w-32 h-32", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill={color}
          opacity={dot.opacity}
        />
      ))}
    </svg>
  );
}
