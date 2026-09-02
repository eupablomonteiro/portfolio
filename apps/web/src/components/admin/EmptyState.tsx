export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-16 border border-dashed border-portfolio-border bg-portfolio-surface p-10 text-center">
      <p className="font-heading font-bold text-portfolio-text">{title}</p>
      <p className="mt-1 text-sm text-portfolio-text-secondary">{description}</p>
    </div>
  );
}
