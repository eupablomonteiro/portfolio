import { cn } from "@/lib/utils";

type TextVariant = "body" | "muted" | "caption";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span";
  variant?: TextVariant;
}

const variants: Record<TextVariant, string> = {
  body: "text-lg leading-relaxed text-portfolio-text",
  muted: "text-base leading-relaxed text-portfolio-text-secondary",
  caption: "text-sm leading-relaxed text-portfolio-text-secondary",
};

export function Text({
  children,
  className,
  as: Tag = "p",
  variant = "body",
}: TextProps) {
  return (
    <Tag className={cn(variants[variant], className)}>{children}</Tag>
  );
}
