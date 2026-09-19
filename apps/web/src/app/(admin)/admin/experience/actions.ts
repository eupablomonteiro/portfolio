"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { ExperienceService } from "@/services/ExperienceService";
import { csv } from "@/lib/utils";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createExperience(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };

  const raw = {
    slug: String(formData.get("slug") ?? ""),
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    period: String(formData.get("period") ?? ""),
    location: String(formData.get("location") ?? ""),
    bullets: csv(formData.get("bullets")),
    techs: csv(formData.get("techs")),
    order: String(formData.get("order") ?? "0"),
  };

  try {
    await new ExperienceService().create(raw);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return { ok: false, error: "Slug já existe" };
    return { ok: false, error: "Dados inválidos" };
  }

  revalidatePath("/admin/experience");
  revalidatePath("/");
  return { ok: true };
}

export async function updateExperience(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };
  const raw = {
    id: String(formData.get("id") ?? ""),
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    period: String(formData.get("period") ?? ""),
    location: String(formData.get("location") ?? ""),
    bullets: csv(formData.get("bullets")),
    techs: csv(formData.get("techs")),
    order: String(formData.get("order") ?? "0"),
  };
  try {
    await new ExperienceService().update(raw);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025")
      return { ok: false, error: "Registro não encontrado" };
    return { ok: false, error: "Dados inválidos" };
  }
  revalidatePath("/admin/experience");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteExperience(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };
  const id = String(formData.get("id") ?? "");
  try {
    await new ExperienceService().remove(id);
  } catch {
    return { ok: false, error: "Registro não encontrado" };
  }
  revalidatePath("/admin/experience");
  revalidatePath("/");
  return { ok: true };
}
