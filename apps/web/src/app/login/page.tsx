import { signIn, auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { IconSprite } from "@/components/ui/icon-sprite";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { env } from "@/lib/env";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user?.email === env.GITHUB_ALLOWED_EMAIL) redirect("/admin/projects");

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 relative overflow-hidden">
      <IconSprite />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1577333_1px,transparent_1px),linear-gradient(to_bottom,#E1577312_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-20 right-[15%] h-64 w-64 rounded-full bg-portfolio-primary/20 blur-[80px]" />
      <div className="absolute bottom-20 left-[10%] h-72 w-72 rounded-full bg-portfolio-gold/15 blur-[80px]" />

      <div className="relative w-full max-w-[420px] rounded-16 bg-portfolio-surface p-8 shadow-solid-lg ring-1 ring-portfolio-border">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-portfolio-text flex items-center justify-center">
            <Icon
              icon="simple-icons:github"
              width={22}
              height={22}
              className="text-white"
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-heading text-2xl font-bold text-portfolio-text">
              Acesso restrito
            </h1>
            <p className="text-sm text-center text-portfolio-text-secondary max-w-[300px]">
              Área exclusiva do proprietário.
            </p>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin/projects" });
          }}
          className="flex flex-col gap-3 my-4"
        >
          <SubmitButton label="Entrar com GitHub" icon="simple-icons:github" variant="tertiary" />
        </form>

        <p className="mt-4 text-center font-mono text-xs text-portfolio-text-secondary">
          {"// "} não é você?{" "}
          <a href="/" className="underline hover:text-portfolio-text">
            voltar ao site
          </a>
        </p>
      </div>
    </div>
  );
}
