import { cn } from "@/lib/utils";

interface UnderlineSquiggleProps {
  className?: string;
  color?: string;
}

export function UnderlineSquiggle({
  className,
  color = "var(--color-portfolio-accent)",
}: UnderlineSquiggleProps) {
  return (
    <svg
      className={cn("w-full h-3", className)}
      viewBox="0 0 120 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 6 Q 15 0, 30 6 T 60 6 T 90 6 T 120 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
