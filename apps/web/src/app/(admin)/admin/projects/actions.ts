"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { ProjectService } from "@/services/ProjectService";

export type ActionResult = { ok: true } | { ok: false; error: string };

function csv(v: FormDataEntryValue | null): string[] {
  return String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL)
    return { ok: false, error: "Não autorizado" };

  const raw = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    github: String(formData.get("github") ?? ""),
    live: String(formData.get("live") ?? ""),
    order: String(formData.get("order") ?? "0"),
    published: String(formData.get("published") ?? "false"),
  };

  try {
    await new ProjectService().create(raw);
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { ok: false, error: "Slug já existe" };
    }
    return { ok: false, error: "Dados inválidos" };
  }

  revalidatePath("/admin/projects");
  return { ok: true };
}
