import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: HeadingLevel;
}

const styles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-semibold tracking-tight",
  h3: "text-xl md:text-2xl font-semibold",
  h4: "text-lg font-medium",
};

export function Heading({
  children,
  className,
  as: Tag = "h2",
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-portfolio-text",
        styles[Tag],
        className
      )}
    >
      {children}
    </Tag>
  );
}
