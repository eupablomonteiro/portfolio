"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { ProjectService } from "@/services/ProjectService";
import { csv, bool } from "@/lib/utils";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };

  const raw = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    github: String(formData.get("github") ?? ""),
    live: String(formData.get("live") ?? ""),
    order: String(formData.get("order") ?? "0"),
    published: bool(formData.get("published")),
  };

  try {
    await new ProjectService().create(raw);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { ok: false, error: "Slug já existe" };
    }
    return { ok: false, error: "Dados inválidos" };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function updateProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };

  const raw = {
    id: String(formData.get("id") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    github: String(formData.get("github") ?? ""),
    live: String(formData.get("live") ?? ""),
    order: String(formData.get("order") ?? "0"),
    published: bool(formData.get("published")),
  };

  try {
    await new ProjectService().update(raw);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025")
      return { ok: false, error: "Registro não encontrado." };
    return { ok: false, error: "Dados inválidos" };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function archiveProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };
  const id = String(formData.get("id") ?? "");
  try {
    await new ProjectService().archive(id);
  } catch {
    return { ok: false, error: "Registro não encontrado" };
  }
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Não autorizado" };
  const id = String(formData.get("id") ?? "");
  try {
    await new ProjectService().remove(id);
  } catch {
    return { ok: false, error: "Registro não encontrado" };
  }
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { ok: true };
}
