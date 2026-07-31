import { Code2, Briefcase, Mail } from "lucide-react";
import { Container } from "@/components/ui";

const socials = [
  { href: "https://github.com/pablohenrique", icon: Code2, label: "Github" },
  {
    href: "https://linkedin.com/in/pablohenrique",
    icon: Briefcase,
    label: "LinkedIn",
  },
  { href: "mailto:contato@pablohenrique.dev", icon: Mail, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-portfolio-border py-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <div className="flex gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-text-muted transition-colors hover:text-portfolio-primary"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="font-handwritten text-sm text-portfolio-text-muted">
          transformando café em código desde 2022
        </p>
        <p className="text-xs text-portfolio-text-muted">
          &copy; {year} Pablo Henrique. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
