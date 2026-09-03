"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
const tabs = [
  { href: "/admin/projects", label: "Projetos", icon: "lucide:layout-grid" },
  { href: "/admin/experience", label: "Experiência", icon: "lucide:briefcase" },
];
export function AdminTabs(){
  const pathname = usePathname();
  return (
    <>
      {tabs.map(tab=>{
        const active = pathname.startsWith(tab.href);
        return <Link key={tab.href} href={tab.href} className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-12 border transition-colors ${active?"bg-portfolio-surface border-portfolio-border border-b-portfolio-surface text-portfolio-text -mb-px z-10":"bg-portfolio-bg/50 border-transparent text-portfolio-text-secondary hover:text-portfolio-text hover:bg-portfolio-surface/50"}`}><Icon icon={tab.icon} width={16} height={16}/>{tab.label}</Link>;
      })}
      <span className="ml-2 hidden lg:inline-flex font-mono text-xs text-portfolio-text-secondary self-center">{tabs.find(t=>pathname.startsWith(t.href))?`Admin > ${tabs.find(t=>pathname.startsWith(t.href))!.label}`:"Admin"}</span>
    </>
  );
}