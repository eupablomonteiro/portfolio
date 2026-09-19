"use client";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TechPicker } from "@/components/admin/TechPicker";
import type { ActionResult } from "@/app/(admin)/admin/projects/actions";
import type { Project } from "@/generated/prisma/client";

export function ProjectForm({
  mode,
  initial,
  suggestions = [],
  action,
  onDone,
}: {
  mode: "create" | "edit";
  initial?: Project;
  suggestions?: string[];
  action: (formData: FormData) => Promise<ActionResult>;
  onDone: () => void;
}) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    async (_prev, fd) => {
      const res = await action(fd);
      if (res.ok) onDone();
      return res;
    },
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [nativeOk, setNativeOk] = useState(mode === "edit");
  const [techs, setTechs] = useState<string[]>(initial?.techs ?? []);
  const canSubmit = nativeOk && techs.length > 0;

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={() => setNativeOk(formRef.current?.checkValidity() ?? false)}
      className="grid gap-4"
    >
      {mode === "edit" && initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <FormField label="Título">
          <input name="title" required minLength={3} defaultValue={initial?.title ?? ""} placeholder="Meu projeto" className={inputClass} />
        </FormField>
        <FormField label="Slug" aside="minúsculas, números e hífens">
          <input
            name="slug"
            required
            minLength={3}
            pattern="[a-z0-9-]+"
            defaultValue={initial?.slug ?? ""}
            disabled={mode === "edit"}
            placeholder="meu-projeto"
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField label="Descrição">
        <textarea name="description" required minLength={10} rows={3} defaultValue={initial?.description ?? ""} placeholder="O que o projeto resolve..." className={inputClass} />
      </FormField>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <FormField label="GitHub" hint="URL completa">
          <input name="github" type="url" required defaultValue={initial?.github ?? ""} placeholder="https://github.com/..." className={inputClass} />
        </FormField>
        <FormField label="Demo (opcional)" hint="URL completa ou vazio">
          <input name="live" type="url" defaultValue={initial?.live ?? ""} placeholder="https://..." className={inputClass} />
        </FormField>
      </div>
      <FormField label="Techs" hint="Clique para adicionar, × para remover">
        <TechPicker name="techs" defaultValue={initial?.techs ?? []} suggestions={suggestions} onChange={setTechs} />
      </FormField>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <FormField label="Ordem">
          <input name="order" type="number" min={0} step={1} defaultValue={initial?.order ?? 0} className={inputClass} />
        </FormField>
        <FormField label="Visibilidade">
          <label className="flex h-10 cursor-pointer items-center gap-2 text-sm text-portfolio-text">
            <input
              type="checkbox"
              name="published"
              value="true"
              defaultChecked={initial?.published ?? false}
              className="h-4 w-4 accent-portfolio-primary"
            />
            Publicado
          </label>
        </FormField>
      </div>
      {state && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      ) : null}
      {!canSubmit ? (
        <p className="font-mono text-xs text-portfolio-text-secondary">Preencha todos os campos para liberar o envio.</p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton
          label={mode === "create" ? "Criar projeto" : "Salvar alterações"}
          icon="lucide:check"
          disabled={!canSubmit}
        />
      </div>
    </form>
  );
}
