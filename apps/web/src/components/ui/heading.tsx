import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: HeadingLevel;
}

const styles: Record<HeadingLevel, string> = {
  h1: "text-5xl md:text-6xl lg:text-[80px] font-extrabold tracking-tight leading-[1.05]",
  h2: "text-4xl md:text-[48px] font-bold tracking-tight leading-tight",
  h3: "text-2xl font-bold tracking-tight",
  h4: "text-lg font-bold",
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
