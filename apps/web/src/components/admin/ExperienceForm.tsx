"use client";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TechPicker } from "@/components/admin/TechPicker";
import type { ActionResult } from "@/app/(admin)/admin/experience/actions";
import type { Experience } from "@/generated/prisma/client";

export function ExperienceForm({
  mode,
  initial,
  suggestions = [],
  action,
  onDone,
}: {
  mode: "create" | "edit";
  initial?: Experience;
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
        <FormField label="Empresa">
          <input name="company" required minLength={3} defaultValue={initial?.company ?? ""} placeholder="Freelance — E-commerce" className={inputClass} />
        </FormField>
        <FormField label="Cargo">
          <input name="role" required minLength={3} defaultValue={initial?.role ?? ""} placeholder="Fullstack" className={inputClass} />
        </FormField>
      </div>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <FormField label="Slug" aside="minúsculas, números e hífens">
          <input
            name="slug"
            required
            minLength={3}
            pattern="[a-z0-9-]+"
            defaultValue={initial?.slug ?? ""}
            disabled={mode === "edit"}
            placeholder="freelance-ecommerce"
            className={inputClass}
          />
        </FormField>
        <FormField label="Ordem">
          <input name="order" type="number" min={0} step={1} defaultValue={initial?.order ?? 0} className={inputClass} />
        </FormField>
      </div>
      <div className="grid items-start gap-4 sm:grid-cols-2">
        <FormField label="Período" hint='Ex: "2023 — Presente"'>
          <input name="period" required minLength={3} defaultValue={initial?.period ?? ""} placeholder="2023 — Presente" className={inputClass} />
        </FormField>
        <FormField label="Local">
          <input name="location" required minLength={2} defaultValue={initial?.location ?? ""} placeholder="Remoto" className={inputClass} />
        </FormField>
      </div>
      <FormField label="Bullets" hint="Um por vírgula — conquistas e responsabilidades">
        <textarea name="bullets" required rows={3} defaultValue={initial?.bullets.join(", ") ?? ""} placeholder="Liderou migração..., Reduziu custo..." className={inputClass} />
      </FormField>
      <FormField label="Techs" hint="Clique para adicionar, × para remover">
        <TechPicker name="techs" defaultValue={initial?.techs ?? []} suggestions={suggestions} onChange={setTechs} />
      </FormField>
      {state && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      ) : null}
      {!canSubmit ? (
        <p className="font-mono text-xs text-portfolio-text-secondary">Preencha todos os campos e selecione ao menos 1 tech para liberar o envio.</p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton
          label={mode === "create" ? "Criar experiência" : "Salvar alterações"}
          icon="lucide:check"
          disabled={!canSubmit}
        />
      </div>
    </form>
  );
}
