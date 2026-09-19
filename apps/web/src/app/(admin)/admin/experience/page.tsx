import { ExperienceService } from "@/services/ExperienceService";
import { ProjectService } from "@/services/ProjectService";
import { EmptyState } from "@/components/admin/EmptyState";
import { CreateExperienceButton, ExperienceRowActions } from "@/components/admin/ExperienceDialogs";

export default async function AdminExperiencePage() {
  const service = new ExperienceService();
  const [experiences, experienceTechs, projectTechs] = await Promise.all([
    service.list(),
    service.listTechs(),
    new ProjectService().listTechs(),
  ]);
  const techSuggestions = [...new Set([...experienceTechs, ...projectTechs])];

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-portfolio-text">
            Experiência
          </h1>
          <p className="mt-1 text-sm text-portfolio-text-secondary">
            Gerencie trajetória profissional.
          </p>
        </div>
        <CreateExperienceButton suggestions={techSuggestions} />
      </div>

      {experiences.length ? (
        <div className="mt-6 grid gap-4">
          {experiences.map((e) => (
            <div
              key={e.id}
              className="rounded-16 bg-portfolio-surface p-5 shadow-solid ring-1 ring-portfolio-border"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading font-bold text-portfolio-text">
                    {e.company}
                  </h3>
                  <p className="text-sm text-portfolio-primary">
                    {e.role} • {e.period}
                  </p>
                </div>
                <ExperienceRowActions row={e} suggestions={techSuggestions} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {e.techs.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-portfolio-bg px-2 py-1 text-xs ring-1 ring-portfolio-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="Sem experiências"
            description="Cadastre a primeira trajetória."
          />
        </div>
      )}
    </div>
  );
}
