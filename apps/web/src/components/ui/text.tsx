import { cn } from "@/lib/utils";

type TextVariant = "body" | "small" | "muted" | "handwritten";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span";
  variant?: TextVariant;
}

const variants: Record<TextVariant, string> = {
  body: "text-base leading-relaxed text-portfolio-text",
  small: "text-sm leading-relaxed text-portfolio-text",
  muted: "text-sm leading-relaxed text-portfolio-text-muted",
  handwritten: "font-handwritten text-lg text-portfolio-text-muted",
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
