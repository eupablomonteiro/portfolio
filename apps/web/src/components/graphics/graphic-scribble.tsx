import { cn } from "@/lib/utils";

interface GraphicScribbleProps {
  className?: string;
}

export function GraphicScribble({ className }: GraphicScribbleProps) {
  return (
    <svg
      className={cn("h-8 w-8", className)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 4 C 26 6, 30 14, 28 20 C 26 26, 18 29, 11 27 C 5 25, 3 18, 6 12 C 9 6, 16 4, 23 6 C 27 8, 29 14, 26 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
