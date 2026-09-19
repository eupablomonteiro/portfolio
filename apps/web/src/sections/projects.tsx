"use client";

import { StackingCards, type StackingProject } from "@/components/ui/stacking-card";

export function Projects({ projects }: { projects: StackingProject[] }) {
  return <StackingCards projects={projects} />;
}
