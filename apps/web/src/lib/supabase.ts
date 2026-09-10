import { createClient } from "@supabase/supabase-js";
export const SUPABASE_BUCKET = "portfolio-bucket" as const;

export function createSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error(
      "Supabase não configurado - preencha as variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY",
    );
  }

  return createClient(url, key);
}

export async function getSignedImageUrl(path: string, expiresIn: number = 3600) {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).createSignedUrl(path, expiresIn);

  if (error) throw new Error(`Erro ao gerar URL assinada para ${path}: ${error.message}`);

  return data.signedUrl;
}