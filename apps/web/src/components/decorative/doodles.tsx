import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
}

export function DoodleSparkle({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-10 h-10", className)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 6 L 22 17 L 33 19 L 22 21 L 20 32 L 18 21 L 7 19 L 18 17 Z"
        fill="var(--color-portfolio-accent)"
        fillOpacity="0.2"
        stroke="var(--color-portfolio-accent)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodlePetal({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-8 h-8", className)}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 4 C 22 10, 26 18, 20 26 C 18 28, 14 28, 12 26 C 6 18, 10 10, 16 4 Z"
        fill="var(--color-portfolio-primary)"
        fillOpacity="0.12"
        stroke="var(--color-portfolio-primary)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16 8 C 20 12, 22 18, 18 24"
        stroke="var(--color-portfolio-primary)"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}

export function DoodleBrackets({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-12 h-10", className)}
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 6 L 4 20 L 14 34"
        stroke="var(--color-portfolio-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M34 6 L 44 20 L 34 34"
        stroke="var(--color-portfolio-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export function DoodleSlash({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-8 h-10", className)}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22 4 L 10 36"
        stroke="var(--color-portfolio-green)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export function DoodleUnderscore({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-12 h-6", className)}
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 16 L 40 16"
        stroke="var(--color-portfolio-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M42 14 L 40 16 L 42 18"
        stroke="var(--color-portfolio-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

export function DoodleCursor({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-6 h-10", className)}
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="32"
        rx="2"
        fill="var(--color-portfolio-primary)"
        fillOpacity="0.15"
        stroke="var(--color-portfolio-primary)"
        strokeWidth="1.2"
      />
      <rect x="7" y="8" width="10" height="4" rx="1" fill="var(--color-portfolio-primary)" fillOpacity="0.3" />
      <rect x="7" y="15" width="8" height="3" rx="1" fill="var(--color-portfolio-primary)" fillOpacity="0.2" />
      <rect x="7" y="21" width="10" height="3" rx="1" fill="var(--color-portfolio-primary)" fillOpacity="0.2" />
    </svg>
  );
}

export function DoodleBrushStroke({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-20 h-6", className)}
      viewBox="0 0 80 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 16 C 20 8, 30 18, 45 12 C 55 8, 65 16, 76 10"
        stroke="var(--color-portfolio-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
      />
    </svg>
  );
}

export function DoodleDotGrid({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-16 h-16", className)}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2" fill="var(--color-portfolio-blue)" opacity="0.35" />
      <circle cx="32" cy="12" r="2.5" fill="var(--color-portfolio-accent)" opacity="0.25" />
      <circle cx="52" cy="12" r="2" fill="var(--color-portfolio-green)" opacity="0.3" />
      <circle cx="12" cy="32" r="2.5" fill="var(--color-portfolio-green)" opacity="0.25" />
      <circle cx="32" cy="32" r="3" fill="var(--color-portfolio-primary)" opacity="0.15" />
      <circle cx="52" cy="32" r="2" fill="var(--color-portfolio-accent)" opacity="0.3" />
      <circle cx="12" cy="52" r="2" fill="var(--color-portfolio-accent)" opacity="0.25" />
      <circle cx="32" cy="52" r="2.5" fill="var(--color-portfolio-blue)" opacity="0.3" />
      <circle cx="52" cy="52" r="2" fill="var(--color-portfolio-green)" opacity="0.2" />
    </svg>
  );
}

export function DoodleChevrons({ className }: DoodleProps) {
  return (
    <svg
      className={cn("w-10 h-10", className)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M18 12 L 12 20 L 18 28"
        stroke="var(--color-portfolio-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M22 12 L 28 20 L 22 28"
        stroke="var(--color-portfolio-green)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
