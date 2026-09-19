import { Experience, type ExperienceItem } from "@/sections/experience";
import { ExperienceService } from "@/services/ExperienceService";

const ACCENTS = ["primary", "green", "gold"] as const;

export async function ExperienceFeed() {
  const rows = await new ExperienceService().list();
  const experiences: ExperienceItem[] = rows.map((e, idx) => ({
    company: e.company,
    role: e.role,
    period: e.period,
    location: e.location,
    bullets: e.bullets,
    techs: e.techs,
    accent: ACCENTS[idx % ACCENTS.length] ?? "primary",
  }));
  return <Experience experiences={experiences} />;
}
