import { Container } from "@/components/ui";
import { Mail, ArrowUp } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import pabloLogo from "@/assets/pablo-logo.png";
import Image from "next/image";

const socials = [
  { href: "https://github.com/eupablomonteiro", icon: "simple-icons:github", label: "GitHub", isIconify: true } as const,
  {
    href: "https://linkedin.com/in/eupablomonteiro",
    icon: "simple-icons:linkedin",
    label: "LinkedIn",
    isIconify: true,
  } as const,
  { href: "mailto:pablo.monteirorgt19@gmail.com", icon: Mail, label: "Gmail" } as const,
];

const navLinks = [
  { href: "#technologies", label: "Stack" },
  { href: "#experience", label: "Experiência" },
  { href: "#projects", label: "Projetos" },
  { href: "#contact", label: "Contato" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-portfolio-border paper-texture">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <a href="#hero" className="flex items-center gap-3">
              <Image
                src={pabloLogo}
                alt="Logo de Pablo Monteiro"
                width={40}
                height={56}
                sizes="40px"
                className="h-14 w-auto"
              />
              <span className="font-mono text-sm font-semibold text-portfolio-text">
                eupablomonteiro<span className="text-portfolio-primary">.dev</span>
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-portfolio-text-secondary">
              Tenho alguns anos de experiência com desenvolvimento web atuando sozinho em grandes projetos como freelancer.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map(({ href, icon, label }) => {
                const isIconify = typeof icon === "string";
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
                  >
                    {isIconify ? (
                      <Icon icon={icon as string} width={18} height={18} />
                    ) : (
                      (() => {
                        const LucideIcon = icon as React.ElementType;
                        return <LucideIcon size={18} />;
                      })()
                    )}
                    {label}
                  </a>
                );
              })}
            </div>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-col items-start gap-3"
          >
            <p className="font-mono text-sm font-medium text-portfolio-primary">
              {"// "}Navegação
            </p>
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <p className="font-mono text-sm font-medium text-portfolio-primary">
              {"// "}Contato
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-portfolio-text-secondary">
              Disponível para projetos freelance e novas oportunidades.
            </p>
            <a
              href="mailto:pablo.monteirorgt19@gmail.com"
              className="text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
            >
              pablo.monteirorgt19@gmail.com
            </a>
            <p className="text-sm font-medium text-portfolio-text-secondary">
              São Paulo, Brasil
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-portfolio-border pt-6 md:flex-row">
          <p className="font-mono text-xs text-portfolio-text-secondary">
            {"//"} construído com disciplina, um commit por vez.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-portfolio-text-secondary">
              &copy; {year} Pablo Monteiro. Todos os direitos reservados.
            </p>
            <a
              href="#hero"
              aria-label="Voltar ao topo"
              className="flex h-9 w-9 items-center justify-center rounded-12 bg-portfolio-surface shadow-solid-sm ring-1 ring-portfolio-border transition-colors hover:text-portfolio-primary"
            >
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
