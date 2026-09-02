import { Icon } from "@iconify/react";

const experiences = [
  { id: "1", company: "Freelance — E-commerce", role: "Fullstack", period: "2023 — Presente", techs: ["Next.js", "Stripe"] },
  { id: "2", company: "Freelance — Dashboard", role: "Frontend", period: "2022 — 2023", techs: ["React", "Recharts"] },
  { id: "3", company: "Projetos Autorais", role: "Júnior", period: "2021 — 2022", techs: ["Node.js", "Docker"] },
];

export default function AdminExperiencePage() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-portfolio-text">Experiência</h1>
          <p className="mt-1 text-sm text-portfolio-text-secondary">Gerencie trajetória profissional.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-12 bg-portfolio-primary px-4 py-2.5 text-sm font-semibold text-white shadow-solid hover:bg-portfolio-primary-hover">
          <Icon icon="lucide:plus" width={16} height={16} /> Nova experiência
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {experiences.map((e) => (
          <div key={e.id} className="rounded-16 bg-portfolio-surface p-5 shadow-solid ring-1 ring-portfolio-border">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-heading font-bold text-portfolio-text">{e.company}</h3>
                <p className="text-sm text-portfolio-primary">{e.role} • {e.period}</p>
              </div>
              <span className="flex gap-2">
                <button className="rounded-12 bg-portfolio-bg px-3 py-1.5 text-xs font-semibold ring-1 ring-portfolio-border">Editar</button>
                <button className="rounded-12 bg-portfolio-text px-3 py-1.5 text-xs font-semibold text-white">Arquivar</button>
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.techs.map((t) => (
                <span key={t} className="rounded-full bg-portfolio-bg px-2 py-1 text-xs ring-1 ring-portfolio-border">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
