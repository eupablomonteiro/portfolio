export default function AdminProjectsLoading() {
  return (
    <div className="mx-auto max-w-[1100px] animate-pulse" aria-busy="true" aria-label="Carregando projetos">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="h-7 w-40 rounded-12 bg-portfolio-bg ring-1 ring-portfolio-border" />
          <div className="mt-2 h-4 w-56 rounded-12 bg-portfolio-bg ring-1 ring-portfolio-border" />
        </div>
        <div className="h-10 w-36 rounded-12 bg-portfolio-bg ring-1 ring-portfolio-border" />
      </div>
      <div className="mt-6 overflow-hidden rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border">
        <div className="space-y-0">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 border-t border-portfolio-border px-4 py-3 first:border-t-0">
              <div className="h-4 w-32 rounded bg-portfolio-bg" />
              <div className="h-4 w-24 rounded bg-portfolio-bg" />
              <div className="hidden h-6 flex-1 gap-1 sm:flex">
                <div className="h-6 w-16 rounded-full bg-portfolio-bg" />
                <div className="h-6 w-16 rounded-full bg-portfolio-bg" />
              </div>
              <div className="ml-auto h-6 w-20 rounded-full bg-portfolio-bg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
