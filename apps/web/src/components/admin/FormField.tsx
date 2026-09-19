export function FormField({
  label,
  aside,
  hint,
  error,
  children,
}: {
  label: string;
  aside?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block min-w-0 text-sm">
      <span className="font-semibold text-portfolio-text">
        {label}
        {aside ? (
          <span className="ml-1.5 text-xs font-normal text-portfolio-text-secondary/70">({aside})</span>
        ) : null}
      </span>
      {hint ? (
        <span className="mt-0.5 block font-mono text-xs text-portfolio-text-secondary">{hint}</span>
      ) : null}
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span role="alert" className="mt-1 block text-xs font-medium text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export const inputClass =
  "w-full rounded-12 bg-portfolio-bg px-3 py-2 text-sm text-portfolio-text ring-1 ring-portfolio-border placeholder:text-portfolio-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-portfolio-primary";
