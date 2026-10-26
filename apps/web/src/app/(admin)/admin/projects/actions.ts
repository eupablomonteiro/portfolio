"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import { ProjectService } from "@/services/ProjectService";
import { csv, bool } from "@/lib/utils";
import { SIGNED_IMAGE_URL_TAG, uploadCover } from "@/lib/supabase";
import { toActionError } from "@/lib/action-error";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function uploadSlotFiles(formData: FormData, field: string, slug: string, slot: string): Promise<string[]> {
  const files = formData.getAll(field).filter((f): f is File => f instanceof File && f.size > 0);
  const paths: string[] = [];
  for (const [i, file] of files.entries()) {
    try {
      paths.push(await uploadCover(file, slug, `${slot}-${i}`));
    } catch (e) {
      throw new Error(toActionError(e, `Projetos > ${field}`));
    }
  }
  return paths;
}

function revalidateProjects() {
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidateTag(SIGNED_IMAGE_URL_TAG);
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Projetos > criar: não autorizado" };

  const slug = String(formData.get("slug") ?? "");

  let desktopFiles: string[] = [];
  let mobileFiles: string[] = [];
  try {
    desktopFiles = await uploadSlotFiles(formData, "coverDesktop", slug, "desktop");
    mobileFiles = await uploadSlotFiles(formData, "coverMobile", slug, "mobile");
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Projetos > criar: falha no upload das imagens" };
  }
  const [coverDesktop, ...gallery] = desktopFiles;
  const [coverMobile, ...mobileGallery] = mobileFiles;

  const raw = {
    title: String(formData.get("title") ?? ""),
    slug,
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    github: String(formData.get("github") ?? ""),
    live: String(formData.get("live") ?? ""),
    order: String(formData.get("order") ?? "0"),
    published: bool(formData.get("published")),
    displayMode: String(formData.get("displayMode") ?? "both"),
    coverDesktop,
    coverMobile,
    gallery,
    mobileGallery,
  };

  try {
    await new ProjectService().create(raw);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Projetos > criar") };
  }

  revalidateProjects();
  return { ok: true };
}

export async function updateProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();

  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Projetos > editar: não autorizado" };

  const id = String(formData.get("id") ?? "");
  let current: Awaited<ReturnType<ProjectService["getById"]>>;
  try {
    current = await new ProjectService().getById(id);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Projetos > editar: buscar registro") };
  }
  if (!current) return { ok: false, error: "Projetos > editar: registro não encontrado" };

  let desktopFiles: string[] = [];
  let mobileFiles: string[] = [];
  try {
    desktopFiles = await uploadSlotFiles(formData, "coverDesktop", current.slug, "desktop");
    mobileFiles = await uploadSlotFiles(formData, "coverMobile", current.slug, "mobile");
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Projetos > editar: falha no upload das imagens" };
  }
  const [newCoverDesktop, ...newGallery] = desktopFiles;
  const [newCoverMobile, ...newMobileGallery] = mobileFiles;

  const raw = {
    id,
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    techs: csv(formData.get("techs")),
    github: String(formData.get("github") ?? ""),
    live: String(formData.get("live") ?? ""),
    order: String(formData.get("order") ?? "0"),
    published: bool(formData.get("published")),
    displayMode: String(formData.get("displayMode") ?? "both"),
    ...(newCoverDesktop ? { coverDesktop: newCoverDesktop } : {}),
    ...(newCoverMobile ? { coverMobile: newCoverMobile } : {}),
    ...(newGallery.length > 0 ? { gallery: [...current.gallery, ...newGallery] } : {}),
    ...(newMobileGallery.length > 0 ? { mobileGallery: [...current.mobileGallery, ...newMobileGallery] } : {}),
  };

  try {
    await new ProjectService().update(raw);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Projetos > editar") };
  }

  revalidateProjects();
  return { ok: true };
}

export async function archiveProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Projetos > arquivar: não autorizado" };
  const id = String(formData.get("id") ?? "");
  try {
    await new ProjectService().archive(id);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Projetos > arquivar") };
  }
  revalidateProjects();
  return { ok: true };
}

export async function deleteProject(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (session?.user?.email !== env.GITHUB_ALLOWED_EMAIL) return { ok: false, error: "Projetos > excluir: não autorizado" };
  const id = String(formData.get("id") ?? "");
  try {
    await new ProjectService().remove(id);
  } catch (e) {
    return { ok: false, error: toActionError(e, "Projetos > excluir") };
  }
  revalidateProjects();
  return { ok: true };
}
