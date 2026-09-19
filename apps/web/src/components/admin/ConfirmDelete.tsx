"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { ActionResult } from "@/app/(admin)/admin/projects/actions";

export function ConfirmDelete({
  title,
  expectedSlug,
  id,
  action,
  onDone,
}: {
  title: string;
  expectedSlug: string;
  id: string;
  action: (formData: FormData) => Promise<ActionResult>;
  onDone: () => void;
}) {
  const [typed, setTyped] = useState("");
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    async (_prev, fd) => {
      const res = await action(fd);
      if (res.ok) onDone();
      return res;
    },
    null,
  );
  const matches = typed.trim() === expectedSlug;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <p className="text-sm text-portfolio-text-secondary">
        Excluir <strong className="text-portfolio-text">{title}</strong> é irreversível. Digite o slug{" "}
        <code className="rounded bg-portfolio-bg px-1.5 py-0.5 font-mono text-xs ring-1 ring-portfolio-border">
          {expectedSlug}
        </code>{" "}
        para confirmar.
      </p>
      <input type="hidden" name="id" value={id} />
      <input
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder={expectedSlug}
        aria-label="Confirme digitando o slug"
        className="w-full rounded-12 bg-portfolio-bg px-3 py-2 font-mono text-sm ring-1 ring-portfolio-border focus:outline-none focus:ring-2 focus:ring-portfolio-primary"
      />
      {!matches ? (
        <p className="font-mono text-xs text-portfolio-text-secondary">O botão libera ao digitar o slug exato.</p>
      ) : null}
      {state && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      ) : null}
      <div className="flex justify-end gap-2">
        <DeleteButton disabled={!matches} />
      </div>
    </form>
  );
}

function DeleteButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="rounded-12 bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-solid disabled:cursor-not-allowed disabled:opacity-40 hover:bg-red-700"
    >
      {pending ? "Excluindo..." : "Excluir definitivamente"}
    </button>
  );
}
