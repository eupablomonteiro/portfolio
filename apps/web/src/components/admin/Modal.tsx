"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open ]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[min(600px,92vw)] rounded-16 bg-portfolio-surface p-0 shadow-solid-lg ring-1 ring-portfolio-border backdrop:bg-black/60"
    >
      <div className="flex items-start justify-between gap-4 border-b border-portfolio-border bg-portfolio-bg/60 px-5 py-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-portfolio-text">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-sm text-portfolio-text-secondary">{description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="inline-flex h-8 w-8 items-center justify-center rounded-12 bg-portfolio-surface ring-1 ring-portfolio-border hover:bg-portfolio-bg"
        >
          <Icon icon="lucide:x" width={16} height={16} />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
    </dialog>
  );
}
