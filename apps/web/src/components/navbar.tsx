"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { Menu, X, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#technologies", label: "Tecnologias" },
  { href: "#projects", label: "Projetos" },
  { href: "#process", label: "Processo" },
  { href: "#contact", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-portfolio-bg/95 backdrop-blur-sm border-b border-portfolio-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="font-mono text-sm font-semibold text-portfolio-text"
        >
          pablo<span className="text-portfolio-primary">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-text"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://GitBranch.com/eupablomonteiro"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            <GitBranch size={16} />
            GitBranch
          </a>
        </div>

        <button
          className="md:hidden p-2 text-portfolio-text"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-portfolio-bg border-b border-portfolio-border px-6 py-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-portfolio-text-secondary transition-colors hover:text-portfolio-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://GitBranch.com/eupablomonteiro"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              <GitBranch size={16} />
              GitBranch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
