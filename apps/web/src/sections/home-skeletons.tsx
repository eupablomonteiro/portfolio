export function ProjectsSkeleton() {
  return (
    <section aria-busy="true" aria-label="Carregando projetos" className="bg-portfolio-bg">
      <div className="mx-auto max-w-[1200px] animate-pulse px-6 pt-6 pb-4">
        <div className="h-4 w-48 rounded bg-portfolio-text/10" />
        <div className="mt-3 h-10 w-2/3 rounded bg-portfolio-text/10" />
        <div className="mx-auto mt-6 h-[420px] w-[92%] max-w-[1100px] rounded-16 bg-portfolio-surface ring-1 ring-portfolio-border" />
      </div>
    </section>
  );
}

export function ExperienceSkeleton() {
  return (
    <section aria-busy="true" aria-label="Carregando experiência" className="paper-texture py-24">
      <div className="mx-auto max-w-[1200px] animate-pulse px-6">
        <div className="h-4 w-32 rounded bg-portfolio-text/10" />
        <div className="mt-3 h-10 w-1/2 rounded bg-portfolio-text/10" />
        <div className="mt-14 space-y-6">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-16 bg-portfolio-surface p-6 ring-1 ring-portfolio-border md:p-7">
              <div className="h-5 w-1/3 rounded bg-portfolio-text/10" />
              <div className="mt-2 h-4 w-1/4 rounded bg-portfolio-text/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
