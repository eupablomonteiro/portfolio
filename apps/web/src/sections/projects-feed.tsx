import { Projects } from "@/sections/projects";
import type { StackingProject } from "@/components/ui/stacking-card";
import { ProjectService } from "@/services/ProjectService";
import { trySignedImageUrl } from "@/lib/supabase";

export async function ProjectsFeed() {
  let rows: Awaited<ReturnType<ProjectService["listPublished"]>> = [];
  try {
    rows = await new ProjectService().listPublished();
  } catch {
    rows = [];
  }
  const resolveGallery = async (paths: (string | null)[]) =>
    (await Promise.all(paths.map((g) => trySignedImageUrl(g ?? undefined)))).filter((u): u is string => !!u);
  const projects: StackingProject[] = await Promise.all(
    rows.map(async (p) => {
      const [imageUrl, mobileImageUrl, gallery, mobileGallery] = await Promise.all([
        trySignedImageUrl(p.coverDesktop),
        trySignedImageUrl(p.coverMobile),
        resolveGallery(p.gallery ?? []),
        resolveGallery(p.mobileGallery ?? []),
      ]);
      return {
        title: p.title,
        description: p.description,
        techs: p.techs,
        github: p.github,
        live: p.live ?? undefined,
        imageUrl,
        mobileImageUrl,
        gallery,
        mobileGallery,
        displayMode: (p.displayMode === "web" || p.displayMode === "mobile" ? p.displayMode : "both") as StackingProject["displayMode"],
      };
    }),
  );
  return <Projects projects={projects} />;
}
