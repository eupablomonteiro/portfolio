"use client";

import { useCallback } from "react";
import { Icon } from "@/components/ui/icon";

type FormatKind = "wrap" | "block";

interface FormatDef {
  kind: FormatKind;
  title: string;
  icon: string;
  open?: string;
  close?: string;
  prefix?: string;
}

const FORMATS: FormatDef[] = [
  { kind: "wrap", title: "Negrito", icon: "lucide:bold", open: "**", close: "**" },
  { kind: "wrap", title: "Itálico", icon: "lucide:italic", open: "*", close: "*" },
  { kind: "wrap", title: "Sublinhado", icon: "lucide:underline", open: "<u>", close: "</u>" },
  { kind: "wrap", title: "Link", icon: "lucide:link", open: "[", close: "](url)" },
  { kind: "block", title: "Tópicos", icon: "lucide:list", prefix: "- " },
  { kind: "block", title: "Numerada", icon: "lucide:list-ordered", prefix: "1. " },
];

const buttonBase =
  "inline-flex h-9 w-9 items-center justify-center rounded-8 text-portfolio-text-secondary hover:text-portfolio-text hover:bg-portfolio-bg transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:outline-none active:bg-portfolio-bg/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

export function RichTextToolbar({
  textareaRef,
  disabled = false,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  disabled?: boolean;
}) {
  const apply = useCallback(
    (def: FormatDef) => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const value = el.value;
      const before = value.slice(0, start);
      const selected = value.slice(start, end);
      const after = value.slice(end);

      let result: string;
      let caret = start;

      if (def.kind === "block") {
        const lines = value.split("\n");
        let pos = 0;
        let startLine = 0;
        let endLine = 0;
        lines.forEach((line, i) => {
          const lineStart = pos;
          const lineEnd = pos + line.length;
          if (start >= lineStart && start <= lineEnd) startLine = i;
          if (end >= lineStart && end <= lineEnd) endLine = i;
          pos = lineEnd + 1;
        });
        const prefix = def.prefix!;
        const newLines = lines.map((line, i) => (i >= startLine && i <= endLine ? prefix + line : line));
        result = newLines.join("\n");
        caret = start + prefix.length;
      } else {
        const text = selected || "texto";
        result = before + (def.open ?? "") + text + (def.close ?? "") + after;
        caret = start + (def.open ?? "").length + text.length;
      }

      el.value = result;
      el.setSelectionRange(caret, caret);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    },
    [textareaRef],
  );

  return (
    <div className="flex items-center gap-1 p-2 rounded-12 bg-portfolio-surface border border-portfolio-border shadow-solid-sm">
      {FORMATS.map((def, idx) => {
        const isFirstBlock = def.kind === "block" && idx > 0 && FORMATS[idx - 1]!.kind === "wrap";
        return (
          <>
            {isFirstBlock && <div className="h-4 w-px mx-1 bg-portfolio-border" />}
            <button
              key={def.icon}
              type="button"
              title={def.title}
              disabled={disabled}
              onClick={() => apply(def)}
              className={buttonBase}
            >
              <Icon icon={def.icon} width={18} height={18} className="text-portfolio-text-secondary hover:text-portfolio-text transition-colors duration-150" />
            </button>
          </>
        );
      })}
    </div>
  );
}
