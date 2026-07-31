import { cn } from "@/lib/utils";

interface SquiggleDividerProps {
  className?: string;
}

export function SquiggleDivider({ className }: SquiggleDividerProps) {
  return (
    <svg
      className={cn("w-full max-w-xs h-6 text-portfolio-border", className)}
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 12 C 20 4, 30 20, 50 12 S 80 20, 100 12 S 130 20, 150 12 S 180 20, 200 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
