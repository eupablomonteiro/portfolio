import { cn } from "@/lib/utils";

interface IllustrationPlaceholderProps {
  className?: string;
  label?: string;
  section?: string;
}

export function IllustrationPlaceholder({
  className,
  label = "Ilustração do personagem",
  section = "",
}: IllustrationPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[--radius-lg] bg-gradient-to-br from-portfolio-bg-alt to-portfolio-bg border-2 border-dashed border-portfolio-primary/20",
        className
      )}
      role="img"
      aria-label={`${label} — espaço reservado para ilustração digital`}
    >
      <div className="flex flex-col items-center gap-3 text-center p-6">
        <div className="rounded-full bg-portfolio-primary/10 p-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-primary/40">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
        <p className="font-handwritten text-sm text-portfolio-text-muted/60">
          ilustração em breve
        </p>
        {section && (
          <p className="text-[10px] text-portfolio-text-muted/40 max-w-[140px]">
            {section}
          </p>
        )}
      </div>
    </div>
  );
}
