import { cn } from "@/lib/utils";

interface GraphicLineProps {
  className?: string;
}

export function GraphicLine({ className }: GraphicLineProps) {
  return (
    <svg
      className={cn("h-6 w-full max-w-[160px]", className)}
      viewBox="0 0 160 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 14 C 30 6, 55 18, 85 12 C 110 7, 135 16, 156 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}
