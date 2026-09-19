import { Projects } from "@/sections/projects";
import { ProjectService } from "@/services/ProjectService";

export async function ProjectsFeed() {
  const rows = await new ProjectService().listPublished();
  return (
    <Projects
      projects={rows.map((p) => ({
        title: p.title,
        description: p.description,
        techs: p.techs,
        github: p.github,
        live: p.live ?? undefined,
        imageUrl: p.coverDesktop ?? undefined,
      }))}
    />
  );
}
