import { ExperienceSkeleton, ProjectsSkeleton } from "@/sections/home-skeletons";

export default function PublicLoading() {
  return (
    <main aria-busy="true" aria-label="Carregando página inicial">
      <div className="mx-auto w-full max-w-[1200px] animate-pulse px-6 pt-32 pb-8">
        <div className="h-6 w-64 rounded-full bg-portfolio-text/10" />
        <div className="mt-6 h-16 w-3/4 rounded bg-portfolio-text/10" />
        <div className="mt-3 h-8 w-1/2 rounded bg-portfolio-text/10" />
        <div className="mt-6 flex gap-4">
          <div className="h-14 w-40 rounded-12 bg-portfolio-text/10" />
          <div className="h-14 w-40 rounded-12 bg-portfolio-text/10" />
        </div>
      </div>
      <ExperienceSkeleton />
      <ProjectsSkeleton />
    </main>
  );
}
