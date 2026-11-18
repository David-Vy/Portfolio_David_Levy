// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projetos", href: "/#projetos" },
    { name: "Competências", href: "/#habilidades" },
    { name: "Processo", href: "/#processo" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Contato", href: "/#contato" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "py-3.5 bg-black/85 backdrop-blur-md border-b border-white/[0.06]"
            : "py-5 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Identidade Pessoal: Monograma e Nome Alinhados à Esquerda */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-85"
            aria-label="Página Inicial - David Levy"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <Image
                src="/logos/favicon.png"
                alt="David Levy Logo"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white leading-tight">
                David Levy
              </span>
              <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase leading-none mt-0.5">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Navegação Desktop: Links Simples e Diretos, Sem Duplicações */}
          <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Navegação Principal">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors duration-150 text-sm font-normal"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Trigger do Menu Mobile: Minimalista e sem bordas pesadas */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Menu Mobile: Painel Leve, Restrito e Sem Efeitos Excessivos */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-0 top-[61px] z-40 bg-black/95 backdrop-blur-xl border-b border-white/[0.08] md:hidden px-6 py-8"
          >
            <nav className="flex flex-col space-y-4 max-w-7xl mx-auto" aria-label="Menu Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
