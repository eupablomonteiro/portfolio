"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { TECH_OPTIONS } from "@/lib/tech-options";

export function TechPicker({
  name,
  defaultValue = [],
  suggestions = [],
  onChange,
}: {
  name: string;
  defaultValue?: string[];
  suggestions?: string[];
  onChange?: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [custom, setCustom] = useState("");

  const options = useMemo(() => {
    const seen = new Set<string>();
    return [...TECH_OPTIONS, ...suggestions].filter((t) => {
      const key = t.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [suggestions]);

  const update = (next: string[]) => {
    setSelected(next);
    onChange?.(next);
  };

  const toggle = (tech: string) =>
    update(selected.includes(tech) ? selected.filter((t) => t !== tech) : [...selected, tech]);

  const remove = (tech: string) => update(selected.filter((t) => t !== tech));

  const addCustom = () => {
    const value = custom.trim();
    if (!value || selected.some((t) => t.toLowerCase() === value.toLowerCase())) return;
    update([...selected, value]);
    setCustom("");
  };

  return (
    <div>
      <input type="hidden" name={name} value={selected.join(", ")} />
      {selected.length > 0 ? (
        <div className="mb-2 flex flex-wrap gap-1.5" aria-label="Tecnologias selecionadas">
          {selected.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => remove(tech)}
              aria-label={`Remover ${tech}`}
              title="Clique para remover"
              className="inline-flex cursor-pointer select-none items-center gap-1 rounded-full bg-portfolio-text px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-600"
            >
              {tech}
              <Icon icon="lucide:x" width={12} height={12} />
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tecnologias disponíveis">
        {options
          .filter((t) => !selected.includes(t))
          .map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => toggle(tech)}
              className="cursor-pointer select-none rounded-full bg-portfolio-bg px-2.5 py-1 text-xs text-portfolio-text-secondary ring-1 ring-portfolio-border transition-colors hover:bg-portfolio-surface hover:text-portfolio-text hover:ring-portfolio-primary"
            >
              + {tech}
            </button>
          ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          placeholder="Outra tech... + Enter"
          aria-label="Adicionar outra tecnologia"
          className="min-w-0 flex-1 rounded-12 bg-portfolio-bg px-3 py-2 text-sm ring-1 ring-portfolio-border placeholder:text-portfolio-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-portfolio-primary"
        />
        <button
          type="button"
          onClick={addCustom}
          className="shrink-0 cursor-pointer rounded-12 bg-portfolio-bg px-3 py-2 text-xs font-semibold ring-1 ring-portfolio-border transition-colors hover:bg-portfolio-surface"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
