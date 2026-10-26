import { ProjectService } from "@/services/ProjectService";
import { ExperienceService } from "@/services/ExperienceService";
import { EmptyState } from "@/components/admin/EmptyState";
import { CreateProjectButton, ProjectRowActions } from "@/components/admin/ProjectDialogs";
import { trySignedImageUrl } from "@/lib/supabase";

export default async function AdminProjectsPage() {
  const service = new ProjectService();
  const [projects, projectTechs, experienceTechs] = await Promise.all([
    service.list(),
    service.listTechs(),
    new ExperienceService().listTechs(),
  ]);
  const techSuggestions = [...new Set([...projectTechs, ...experienceTechs])];
  const coverUrls = new Map<string, { desktopGallery: string[]; mobileGallery: string[] }>();
  const resolveGallery = async (paths: string[]) =>
    (await Promise.all(paths.map((g) => trySignedImageUrl(g)))).filter((u): u is string => !!u);
  await Promise.all(
    projects.map(async (p) => {
      const [desktopGallery, mobileGallery] = await Promise.all([
        resolveGallery([p.coverDesktop, ...p.gallery].filter((s): s is string => !!s)),
        resolveGallery([p.coverMobile, ...(p.mobileGallery ?? [])].filter((s): s is string => !!s)),
      ]);
      coverUrls.set(p.id, { desktopGallery, mobileGallery });
    }),
  );

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-portfolio-text">Projetos</h1>
          <p className="mt-1 text-sm text-portfolio-text-secondary">Gerencie projetos em destaque.</p>
        </div>
        <CreateProjectButton suggestions={techSuggestions} />
      </div>

      {projects.length ? (
        <div className="mt-6 overflow-hidden rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-portfolio-bg text-xs font-semibold text-portfolio-text-secondary">
                <tr>
                  <th className="px-4 py-3">Projeto</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Techs</th>
                  <th className="px-4 py-3">Capas</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-t border-portfolio-border">
                    <td className="px-4 py-3 font-medium text-portfolio-text">{p.title}</td>
                    <td className="px-4 py-3 font-mono text-xs text-portfolio-text-secondary">{p.slug}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex flex-wrap gap-1">
                        {p.techs.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-portfolio-bg px-2 py-1 text-xs ring-1 ring-portfolio-border"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex gap-1 font-mono text-[10px]"
                        title={`desktop ${[p.coverDesktop, ...p.gallery].filter(Boolean).length} • mobile ${[p.coverMobile, ...p.mobileGallery].filter(Boolean).length}`}
                      >
                        <span
                          className={`rounded px-1.5 py-0.5 ring-1 ${p.coverDesktop || p.gallery.length > 0 ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" : "bg-portfolio-bg text-portfolio-text-secondary ring-portfolio-border"}`}
                        >
                          D{[p.coverDesktop, ...p.gallery].filter(Boolean).length || ""}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 ring-1 ${p.coverMobile || p.mobileGallery.length > 0 ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" : "bg-portfolio-bg text-portfolio-text-secondary ring-portfolio-border"}`}
                        >
                          M{[p.coverMobile, ...p.mobileGallery].filter(Boolean).length || ""}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${p.published ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" : "bg-portfolio-bg text-portfolio-text-secondary ring-portfolio-border"}`}
                      >
                        {p.published ? "publicado" : "rascunho"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ProjectRowActions row={p} suggestions={techSuggestions} coverUrls={coverUrls.get(p.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Sem projetos" description="Cadastre o primeiro projeto em destaque." />
        </div>
      )}
    </div>
  );
}
