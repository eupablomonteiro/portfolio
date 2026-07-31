import { cn } from "@/lib/utils";

interface GraphicStarProps {
  className?: string;
}

export function GraphicStar({ className }: GraphicStarProps) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2 L 13.5 10.5 L 22 12 L 13.5 13.5 L 12 22 L 10.5 13.5 L 2 12 L 10.5 10.5 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
