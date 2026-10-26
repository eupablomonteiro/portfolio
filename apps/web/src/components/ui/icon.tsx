import type { ComponentType } from "react";
import {
  Briefcase,
  Check,
  ExternalLink,
  LayoutGrid,
  Plus,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
} from "lucide-react";

interface LucideIconProps {
  size?: number | string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

const lucideIcons: Record<string, ComponentType<LucideIconProps>> = {
  "lucide:briefcase": Briefcase,
  "lucide:check": Check,
  "lucide:external-link": ExternalLink,
  "lucide:layout-grid": LayoutGrid,
  "lucide:plus": Plus,
  "lucide:x": X,
  "lucide:bold": Bold,
  "lucide:italic": Italic,
  "lucide:underline": Underline,
  "lucide:list": List,
  "lucide:list-ordered": ListOrdered,
  "lucide:link": Link,
};

export function Icon({
  icon,
  width = 16,
  height,
  className,
}: {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const LucideIcon = lucideIcons[icon];
  if (LucideIcon) {
    return <LucideIcon size={width} className={className} aria-hidden="true" />;
  }

  if (icon.startsWith("simple-icons:")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height ?? width}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <use href={`#icon-${icon.replace(":", "-")}`} />
      </svg>
    );
  }

  return null;
}
