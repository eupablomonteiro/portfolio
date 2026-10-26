import { Prisma } from "@/generated/prisma/client";
import { ZodError } from "zod";

function isConnectivityError(e: unknown): boolean {
  if (e instanceof TypeError) {
    const msg = `${e.message} ${(e as { cause?: unknown }).cause ?? ""}`.toLowerCase();
    return (
      msg.includes("fetch failed") ||
      msg.includes("enotfound") ||
      msg.includes("econnrefused") ||
      msg.includes("etimedout") ||
      msg.includes("network")
    );
  }
  return false;
}

function zodDetails(e: ZodError): string {
  const parts = e.issues.slice(0, 3).map((i) => {
    const field = i.path.length > 0 ? String(i.path.join(".")) : "campo";
    return `${field}: ${i.message}`;
  });
  const extra = e.issues.length > 3 ? ` (+${e.issues.length - 3} outros)` : "";
  return parts.join("; ") + extra;
}

function prismaTarget(e: Prisma.PrismaClientKnownRequestError): string {
  const target = (e.meta as { target?: unknown } | undefined)?.target;
  if (Array.isArray(target)) return target.map(String).join(", ");
  return "";
}

/**
 * Converte qualquer erro de Server Action em mensagem segura e específica:
 * sempre diz ONDE (contexto) e O QUÊ (campo/motivo). Detalhes internos
 * (stack, SQL, segredos) vão para o log do servidor, nunca para a UI.
 */
export function toActionError(e: unknown, context: string): string {
  if (e instanceof ZodError) return `${context}: ${zodDetails(e)}`;
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      const field = prismaTarget(e);
      return field ? `${context}: ${field} já existe` : `${context}: registro duplicado`;
    }
    if (e.code === "P2025") return `${context}: registro não encontrado`;
    console.error(`[${context}] Prisma ${e.code}`, e.meta);
    return `${context}: falha no banco de dados (${e.code})`;
  }
  if (isConnectivityError(e)) {
    console.error(`[${context}] conectividade`, e);
    return `${context}: sem conexão com o serviço externo — confira a URL e a rede`;
  }
  if (e instanceof Error) {
    if (e.message && !/prisma|sql|postgres|connection string/i.test(e.message)) {
      return `${context}: ${e.message}`;
    }
    console.error(`[${context}]`, e);
    return `${context}: erro inesperado`;
  }
  console.error(`[${context}] valor desconhecido`, e);
  return `${context}: erro inesperado`;
}
