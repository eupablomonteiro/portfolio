import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import sharp from "sharp";
import { env } from "@/lib/env";

export const SUPABASE_BUCKET = "portfolio-bucket" as const;
export const SIGNED_IMAGE_URL_TAG = "signed-image-urls" as const;

const SIGNED_IMAGE_URL_EXPIRES_IN = 3600;
const SIGNED_IMAGE_URL_CACHE_SECONDS = process.env.NODE_ENV === "development" ? 60 : 300;

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function createSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const url = env.SUPABASE_URL;
  // Service key (server-only) tem precedência: gera signed URLs e faz
  // upload sem depender de policy para anon. Anon é o fallback.
  const key = env.SUPABASE_SERVICE_KEY ?? env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase não configurado — defina SUPABASE_URL e SUPABASE_PUBLISHABLE_KEY (ou SUPABASE_SERVICE_KEY)",
    );
  }

  supabaseClient = createClient(url, key);
  return supabaseClient;
}

export async function getSignedImageUrl(path: string, expiresIn: number = SIGNED_IMAGE_URL_EXPIRES_IN) {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).createSignedUrl(path, expiresIn);

  if (error) throw new Error(`Erro ao gerar URL assinada para ${path}: ${error.message}`);

  return data.signedUrl;
}

const getCachedSignedImageUrl = unstable_cache(
  async (path: string) => getSignedImageUrl(path, SIGNED_IMAGE_URL_EXPIRES_IN),
  ["signed-image-url"],
  {
    revalidate: SIGNED_IMAGE_URL_CACHE_SECONDS,
    tags: [SIGNED_IMAGE_URL_TAG],
  },
);

const COVER_SLOTS = ["desktop", "mobile"] as const;
export type CoverSlot = (typeof COVER_SLOTS)[number];

const COVER_MAX_BYTES = 4 * 1024 * 1024;
const COVER_ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/heic", "image/heif"] as const;
const COVER_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif", "heic", "heif"] as const;
const HEIC_TYPES = ["image/heic", "image/heif"] as const;
const HEIC_EXTENSIONS = ["heic", "heif"] as const;

function sanitizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
}

export async function uploadCover(file: File, slug: string, slot: string): Promise<string> {
  if (!COVER_ALLOWED_TYPES.includes(file.type as (typeof COVER_ALLOWED_TYPES)[number])) {
    throw new Error("Tipo de imagem inválido. Use PNG, JPG, WEBP ou GIF.");
  }
  if (file.size <= 0 || file.size > COVER_MAX_BYTES) {
    throw new Error("Imagem excede o limite de 4MB.");
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!(COVER_EXTENSIONS as readonly string[]).includes(ext)) {
    throw new Error("Extensão de imagem inválida.");
  }

  const supabase = createSupabaseClient();
  const isHeic = HEIC_TYPES.includes(file.type as (typeof HEIC_TYPES)[number]) || HEIC_EXTENSIONS.includes(ext as (typeof HEIC_EXTENSIONS)[number]);
  const finalExt = isHeic ? "webp" : ext;
  const contentType = isHeic ? "image/webp" : file.type;
  const path = `covers/${sanitizeSlug(slug)}/${slot}-${Date.now()}.${finalExt}`;
  const payload = isHeic ? await sharp(await file.arrayBuffer()).webp({ quality: 85 }).toBuffer() : file;
  const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(path, payload, {
    contentType,
    upsert: false,
  });
  if (error) throw new Error(`Falha no upload da capa: ${error.message}`);
  return path;
}

export async function trySignedImageUrl(path: string | null | undefined): Promise<string | undefined> {
  if (!path) return undefined;
  try {
    return await getCachedSignedImageUrl(path);
  } catch {
    return undefined;
  }
}