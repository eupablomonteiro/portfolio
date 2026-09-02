import { Icon } from "@iconify/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1577333_1px,transparent_1px),linear-gradient(to_bottom,#E1577312_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-20 right-[15%] h-64 w-64 rounded-full bg-portfolio-primary/20 blur-[80px]" />
      <div className="absolute bottom-20 left-[10%] h-72 w-72 rounded-full bg-portfolio-gold/15 blur-[80px]" />

      <div className="relative w-full max-w-[420px] rounded-16 bg-portfolio-surface p-8 shadow-solid-lg ring-1 ring-portfolio-border">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-portfolio-text flex items-center justify-center">
            <Icon icon="simple-icons:github" width={22} height={22} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-portfolio-text">Acesso restrito</h1>
          <p className="text-sm text-center text-portfolio-text-secondary max-w-[300px]">Área exclusiva do proprietário. Autenticação via GitHub.</p>
        </div>

        <a href="/admin/projects" className="mt-6 flex w-full items-center justify-center gap-2 rounded-12 bg-portfolio-text px-4 py-3 text-sm font-semibold text-white hover:bg-portfolio-text/90 transition-colors">
          <Icon icon="simple-icons:github" width={18} height={18} />
          Entrar com GitHub
        </a>

        <p className="mt-4 text-center font-mono text-xs text-portfolio-text-secondary">
          {"// "} não é você? <a href="/" className="underline hover:text-portfolio-text">voltar ao site</a>
        </p>
      </div>
    </div>
  );
}
