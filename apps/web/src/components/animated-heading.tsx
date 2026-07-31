"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function AnimatedHeading({
  children,
  className,
  as: Tag = "h2",
}: AnimatedHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      <Tag
        className={cn(
          "font-heading text-3xl font-bold tracking-tight md:text-4xl",
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
