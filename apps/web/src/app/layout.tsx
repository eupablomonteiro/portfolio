import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pablo Monteiro — Desenvolvedor Full Stack",
  description:
    "Software é construído com disciplina. Portfólio de Pablo Monteiro, desenvolvedor full stack com foco em React, Next.js, Node.js e TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}