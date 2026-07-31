import Link from "next/link";
import { buttonVariants } from "@/components/ui";
import { Character } from "@/components/character";
import { GraphicScribble, GraphicStar } from "@/components/graphics";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 paper-texture">
      <GraphicScribble className="absolute top-24 left-[10%] h-10 w-10 text-portfolio-primary/50" />
      <GraphicStar className="absolute bottom-28 right-[12%] h-6 w-6 text-portfolio-gold" />

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8">
          <div
            className="absolute -inset-3 -rotate-2 rounded-16 bg-portfolio-gold/40"
            aria-hidden="true"
          />
          <div className="relative rounded-16 border-2 border-portfolio-text bg-portfolio-surface p-8 shadow-solid">
            <Character pose="confused" className="h-44" />
          </div>
        </div>

        <p className="font-mono text-sm font-semibold text-portfolio-primary">
          {"// "}404
        </p>
        <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          Essa página se perdeu no caminho.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-portfolio-text-secondary">
          A rota que você procura não existe por aqui — mas o portfólio
          continua no mesmo endereço de sempre.
        </p>

        <Link
          href="/"
          className={buttonVariants({ variant: "primary", size: "lg" }) + " mt-8"}
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
