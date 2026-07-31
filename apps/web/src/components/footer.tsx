import { Container } from "@/components/ui";
import { Character } from "@/components/character";
import { GitBranch, Briefcase, Mail } from "lucide-react";

const socials = [
  { href: "https://GitBranch.com/eupablomonteiro", icon: GitBranch, label: "GitBranch" },
  {
    href: "https://Briefcase.com/in/eupablomonteiro",
    icon: Briefcase,
    label: "Briefcase",
  },
  { href: "mailto:contato@pablomonteiro.dev", icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-portfolio-border py-12">
      <Container className="flex flex-col items-center gap-5 text-center">
        <Character pose="bye" className="h-20" aria-hidden="true" />
        <p className="font-mono text-sm text-portfolio-text-secondary">
          construído com disciplina, um commit por vez.
        </p>
        <div className="flex gap-5">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-text-secondary transition-colors hover:text-portfolio-primary"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="text-xs text-portfolio-text-secondary">
          &copy; {year} Pablo Monteiro. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
