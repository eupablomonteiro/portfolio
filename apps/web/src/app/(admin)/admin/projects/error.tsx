"use client";

export default function AdminProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[1100px]" role="alert">
      <div className="rounded-16 bg-portfolio-surface p-8 text-center shadow-solid ring-1 ring-portfolio-border">
        <p className="font-heading text-lg font-bold text-portfolio-text">Não foi possível carregar os projetos</p>
        <p className="mt-1 text-sm text-portfolio-text-secondary">
          {error.message || "Tente novamente em instantes."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-12 bg-portfolio-primary px-4 py-2.5 text-sm font-semibold text-white shadow-solid hover:bg-portfolio-primary-hover"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
