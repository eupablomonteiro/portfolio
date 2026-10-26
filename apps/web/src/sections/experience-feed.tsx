import { Experience, type ExperienceItem } from "@/sections/experience";
import { ExperienceService } from "@/services/ExperienceService";

const ACCENTS = ["primary", "green", "gold"] as const;

export async function ExperienceFeed() {
  let experiences: ExperienceItem[] = [];
  try {
    const rows = await new ExperienceService().list();
    experiences = rows.map((e, idx) => ({
      company: e.company,
      role: e.role,
      period: e.period,
      location: e.location,
      description: e.description,
      techs: e.techs,
      accent: ACCENTS[idx % ACCENTS.length] ?? "primary",
    }));
  } catch {
    experiences = [];
  }
  return <Experience experiences={experiences} />;
}
