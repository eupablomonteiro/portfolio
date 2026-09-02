import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// FASE 1 — MOCK: libera tudo para você construir UI sem travar
// TODO Fase 2: trocar por Auth.js
// export { auth as middleware } from "@/lib/auth"
// matcher já protege só /admin
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/login") return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
