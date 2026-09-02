"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const tabs = [
  { href: "/admin/projects", label: "Projetos", icon: "lucide:layout-grid" },
  { href: "/admin/experience", label: "Experiência", icon: "lucide:briefcase" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = tabs.find((t) => pathname.startsWith(t.href));
  const breadcrumb = current ? `Admin > ${current.label}` : "Admin";

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1577318_1px,transparent_1px),linear-gradient(to_bottom,#E1577310_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute top-10 right-[20%] h-80 w-80 rounded-full bg-portfolio-primary/15 blur-[90px]" />
      <div className="absolute bottom-10 left-[15%] h-96 w-96 rounded-full bg-portfolio-gold/10 blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-portfolio-text/5 blur-[120px]" />

      <div className="relative w-full max-w-[1100px] h-[82vh] min-h-[540px] flex flex-col rounded-16 bg-portfolio-surface shadow-solid-lg ring-1 ring-portfolio-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-portfolio-border bg-portfolio-bg/50">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="font-mono text-xs text-portfolio-text-secondary">{breadcrumb}</span>
          <a href="/" className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-portfolio-text-secondary hover:text-portfolio-text">
            <Icon icon="lucide:external-link" width={12} height={12} /> site
          </a>
        </div>

        <div className="flex gap-1 px-3 pt-3 bg-portfolio-bg border-b border-portfolio-border">
          {tabs.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-12 border transition-colors ${active ? "bg-portfolio-surface border-portfolio-border border-b-portfolio-surface text-portfolio-text -mb-px z-10" : "bg-portfolio-bg/50 border-transparent text-portfolio-text-secondary hover:text-portfolio-text hover:bg-portfolio-surface/50"}`}
              >
                <Icon icon={tab.icon} width={16} height={16} />
                {tab.label}
              </Link>
            );
          })}
          <div className="ml-auto hidden md:flex items-center gap-2 pb-2">
            <img src="https://avatars.githubusercontent.com/u/00000000?v=4" alt="avatar" className="h-6 w-6 rounded-full" />
            <span className="text-xs font-medium text-portfolio-text-secondary">eupablomonteiro</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 md:p-7 bg-portfolio-surface">{children}</div>
      </div>
    </div>
  );
}
