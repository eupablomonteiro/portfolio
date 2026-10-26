import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { Icon } from "@/components/ui/icon";

export default async function AdminLayout({ children }: {children: React.ReactNode}){
  const session = await auth();
  if(!session || session.user?.email !== process.env.GITHUB_ALLOWED_EMAIL) redirect("/login");
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E1577318_1px,transparent_1px),linear-gradient(to_bottom,#E1577310_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute top-10 right-[20%] h-80 w-80 rounded-full bg-portfolio-primary/15 blur-[90px]" />
      <div className="absolute bottom-10 left-[15%] h-96 w-96 rounded-full bg-portfolio-gold/10 blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-portfolio-text/5 blur-[120px]" />
      <div className="relative w-full max-w-[1100px] h-[82vh] min-h-[540px] flex flex-col rounded-16 bg-portfolio-surface shadow-solid-lg ring-1 ring-portfolio-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-portfolio-border bg-portfolio-bg/50">
          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-400"/><span className="h-3 w-3 rounded-full bg-yellow-400"/><span className="h-3 w-3 rounded-full bg-green-400"/></div>
          <a href="/" className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-portfolio-text-secondary hover:text-portfolio-text"><Icon icon="lucide:external-link" width={12} height={12}/> site</a>
        </div>
        <div className="flex gap-1 px-3 pt-3 bg-portfolio-bg border-b border-portfolio-border">
          <AdminTabs />
          <div className="ml-auto hidden md:flex items-center gap-2 pb-2"><Image src={session.user?.image ?? "https://avatars.githubusercontent.com/u/00000000?v=4"} alt="avatar" width={24} height={24} className="h-6 w-6 rounded-full"/><span className="text-xs font-medium text-portfolio-text-secondary">{session.user?.name ?? "eupablomonteiro"}</span></div>
        </div>
        <div className="flex-1 overflow-auto p-6 md:p-7 bg-portfolio-surface">{children}</div>
      </div>
    </div>
  );
}