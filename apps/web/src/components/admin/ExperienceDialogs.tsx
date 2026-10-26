"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/admin/Modal";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Button } from "@/components/ui";
import {
  createExperience,
  deleteExperience,
  updateExperience,
  type ActionResult,
} from "@/app/(admin)/admin/experience/actions";
import type { Experience } from "@/generated/prisma/client";

type Action = (formData: FormData) => Promise<ActionResult>;

export function CreateExperienceButton({ suggestions = [] }: { suggestions?: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={() => setOpen(true)}
      >
        <Icon icon="lucide:plus" width={16} height={16} /> Nova experiência
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Nova experiência" description="Conte a trajetória profissional.">
        <ExperienceForm mode="create" suggestions={suggestions} action={createExperience as Action} onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}

export function ExperienceRowActions({ row, suggestions = [] }: { row: Experience; suggestions?: string[] }) {
  const [modal, setModal] = useState<"edit" | "delete" | null>(null);
  const close = () => setModal(null);

  return (
    <>
      <span className="flex gap-2">
        <button
          type="button"
          onClick={() => setModal("edit")}
          className="rounded-12 bg-portfolio-bg px-3 py-1.5 text-xs font-semibold ring-1 ring-portfolio-border"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => setModal("delete")}
          className="rounded-12 bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
        >
          Excluir
        </button>
      </span>

      <Modal open={modal === "edit"} onClose={close} title={`Editar — ${row.company}`} description="Slug não pode ser alterado.">
        <ExperienceForm mode="edit" initial={row} suggestions={suggestions} action={updateExperience as Action} onDone={close} />
      </Modal>

      <Modal open={modal === "delete"} onClose={close} title={`Excluir — ${row.company}`} description="Ação irreversível.">
        <ConfirmDelete title={row.company} expectedSlug={row.slug} id={row.id} action={deleteExperience as Action} onDone={close} />
      </Modal>
    </>
  );
}
