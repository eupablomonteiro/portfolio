export default function AdminExperienceLoading() {
  return (
    <div className="mx-auto max-w-[1100px] animate-pulse" aria-busy="true" aria-label="Carregando experiências">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="h-7 w-44 rounded-12 bg-portfolio-bg ring-1 ring-portfolio-border" />
          <div className="mt-2 h-4 w-52 rounded-12 bg-portfolio-bg ring-1 ring-portfolio-border" />
        </div>
        <div className="h-10 w-44 rounded-12 bg-portfolio-bg ring-1 ring-portfolio-border" />
      </div>
      <div className="mt-6 grid gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-16 bg-portfolio-surface p-5 shadow-solid ring-1 ring-portfolio-border">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="space-y-2">
                <div className="h-5 w-48 rounded bg-portfolio-bg" />
                <div className="h-4 w-36 rounded bg-portfolio-bg" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 rounded-12 bg-portfolio-bg" />
                <div className="h-7 w-16 rounded-12 bg-portfolio-bg" />
              </div>
            </div>
            <div className="mt-3 flex gap-1.5">
              <div className="h-6 w-16 rounded-full bg-portfolio-bg" />
              <div className="h-6 w-16 rounded-full bg-portfolio-bg" />
              <div className="h-6 w-16 rounded-full bg-portfolio-bg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
