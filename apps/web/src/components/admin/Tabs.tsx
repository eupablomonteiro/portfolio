"use client";

import { useState, type ReactNode } from "react";

export function Tabs({
  tabs,
  defaultTab,
  onTabChange,
}: {
  tabs: Array<{ id: string; label: string; content: ReactNode }>;
  defaultTab?: string;
  onTabChange?: (id: string) => void;
}) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const select = (id: string) => {
    setActive(id);
    onTabChange?.(id);
  };

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Seções do formulário" className="flex gap-1 rounded-12 bg-portfolio-bg p-1 ring-1 ring-portfolio-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            onClick={() => select(t.id)}
            className={
              t.id === active
                ? "flex-1 cursor-pointer rounded-12 bg-portfolio-surface px-4 py-2 text-sm font-semibold text-portfolio-text shadow-solid-sm ring-1 ring-portfolio-border"
                : "flex-1 cursor-pointer rounded-12 px-4 py-2 text-sm font-medium text-portfolio-text-secondary hover:text-portfolio-text"
            }
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" hidden={t.id !== active} className="mt-4">
          {t.content}
        </div>
      ))}
    </div>
  );
}
