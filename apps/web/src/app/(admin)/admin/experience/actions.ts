"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { ExperienceService } from "@/services/ExperienceService";
import { csv } from "@/lib/utils";
import { toActionError } from "@/lib/action-error";

export type ActionResult = { ok: true } | { ok: false; error: string };

function revalidateExperiences() {
  revalidatePath("/admin/experience");
  revalidatePath("/");
}

export async function createExperience(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Experiências > criar: não autorizado" };

  const raw = {
slug: String(formData.get("slug") ?? ""),
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    period: String(formData.get("period") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    order: String(formData.get("order") ?? "0"),
  };

  try {
    await new ExperienceService().create(raw);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Experiências > criar") };
  }

  revalidateExperiences();
  return { ok: true };
}

export async function updateExperience(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Experiências > editar: não autorizado" };
  const raw = {
    id: String(formData.get("id") ?? ""),
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    period: String(formData.get("period") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    order: String(formData.get("order") ?? "0"),
  };
  try {
    await new ExperienceService().update(raw);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Experiências > editar") };
  }
  revalidateExperiences();
  return { ok: true };
}

export async function deleteExperience(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Experiências > excluir: não autorizado" };
  const id = String(formData.get("id") ?? "");
  try {
    await new ExperienceService().remove(id);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Experiências > excluir") };
  }
  revalidateExperiences();
  return { ok: true };
}
