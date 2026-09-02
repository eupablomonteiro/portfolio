import Link from "next/link";
import { Icon } from "@iconify/react";

const projects = [
  { id: "1", title: "E-commerce Platform", slug: "e-commerce-platform", techs: ["Next.js", "Stripe"], published: true },
  { id: "2", title: "Dashboard Analytics", slug: "dashboard-analytics", techs: ["React", "Recharts"], published: true },
  { id: "3", title: "API RESTful", slug: "api-restful", techs: ["Node.js", "Swagger"], published: false },
];

export default function AdminProjectsPage() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-portfolio-text">Projetos</h1>
          <p className="mt-1 text-sm text-portfolio-text-secondary">Gerencie projetos em destaque.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-12 bg-portfolio-primary px-4 py-2.5 text-sm font-semibold text-white shadow-solid hover:bg-portfolio-primary-hover">
          <Icon icon="lucide:plus" width={16} height={16} /> Novo projeto
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-16 bg-portfolio-surface shadow-solid ring-1 ring-portfolio-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-portfolio-bg text-xs font-semibold text-portfolio-text-secondary">
              <tr>
                <th className="px-4 py-3">Projeto</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Techs</th>
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
                        <span key={t} className="rounded-full bg-portfolio-bg px-2 py-1 text-xs ring-1 ring-portfolio-border">{t}</span>
                      ))}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ring-1 ${p.published ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20" : "bg-portfolio-bg text-portfolio-text-secondary ring-portfolio-border"}`}>
                      {p.published ? "publicado" : "rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex gap-2">
                      <Link href="#" className="rounded-12 bg-portfolio-bg px-3 py-1.5 text-xs font-semibold ring-1 ring-portfolio-border hover:bg-portfolio-surface">Editar</Link>
                      <button className="rounded-12 bg-portfolio-text px-3 py-1.5 text-xs font-semibold text-white">Arquivar</button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
