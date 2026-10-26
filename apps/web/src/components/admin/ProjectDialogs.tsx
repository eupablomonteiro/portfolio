"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/admin/Modal";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Button } from "@/components/ui";
import {
  archiveProject,
  createProject,
  deleteProject,
  updateProject,
  type ActionResult,
} from "@/app/(admin)/admin/projects/actions";
import type { Project } from "@/generated/prisma/client";

type Action = (formData: FormData) => Promise<ActionResult>;

export function CreateProjectButton({ suggestions = [] }: { suggestions?: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={() => setOpen(true)}
      >
        <Icon icon="lucide:plus" width={16} height={16} /> Novo projeto
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Novo projeto" description="Preencha os dados do projeto em destaque.">
        <ProjectForm mode="create" suggestions={suggestions} action={createProject as Action} onDone={() => setOpen(false)} />
      </Modal>
    </>
  );
}

export function ProjectRowActions({ row, suggestions = [], coverUrls }: { row: Project; suggestions?: string[]; coverUrls?: { desktopGallery?: string[]; mobileGallery?: string[] } }) {
  const [modal, setModal] = useState<"edit" | "archive" | "delete" | null>(null);
  const close = () => setModal(null);

  return (
    <>
      <span className="inline-flex gap-2">
        <button
          type="button"
          onClick={() => setModal("edit")}
          className="rounded-12 bg-portfolio-bg px-3 py-1.5 text-xs font-semibold ring-1 ring-portfolio-border hover:bg-portfolio-surface"
        >
          Editar
        </button>
        {row.published ? (
          <button
            type="button"
            onClick={() => setModal("archive")}
            className="rounded-12 bg-portfolio-text px-3 py-1.5 text-xs font-semibold text-white"
          >
            Arquivar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setModal("delete")}
            className="rounded-12 bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
          >
            Excluir
          </button>
        )}
      </span>

      <Modal open={modal === "edit"} onClose={close} title={`Editar — ${row.title}`} description="Slug não pode ser alterado.">
        <ProjectForm mode="edit" initial={row} suggestions={suggestions} coverUrls={coverUrls} action={updateProject as Action} onDone={close} />
      </Modal>

      <Modal open={modal === "archive"} onClose={close} title={`Arquivar — ${row.title}`} description="O projeto sai do ar e vira rascunho. Reversível na edição.">
        <form
          action={async (fd) => {
            const res = await archiveProject(fd);
            if (res.ok) close();
          }}
          className="flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={row.id} />
          <p className="text-sm text-portfolio-text-secondary">
            Tem certeza? O slug <code className="font-mono text-xs">{row.slug}</code> será mantido.
          </p>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={close} className="rounded-12 bg-portfolio-bg px-4 py-2 text-sm font-semibold ring-1 ring-portfolio-border">
              Cancelar
            </button>
            <button type="submit" className="rounded-12 bg-portfolio-text px-4 py-2 text-sm font-semibold text-white">
              Arquivar
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={modal === "delete"} onClose={close} title={`Excluir — ${row.title}`} description="Ação irreversível.">
        <ConfirmDelete title={row.title} expectedSlug={row.slug} id={row.id} action={deleteProject as Action} onDone={close} />
      </Modal>
    </>
  );
}
