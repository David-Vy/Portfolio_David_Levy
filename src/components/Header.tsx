// src/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BrazilFlag, UsaFlag } from "@/components/LanguageFlags";

function LanguageSwitcherMinimal({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Seleção de idioma / Language selection"
      className={`inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xs ${className}`}
    >
      {/* Opção Português */}
      <button
        type="button"
        onClick={() => setLanguage("pt")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-150 cursor-pointer ${
          language === "pt"
            ? "bg-white/10 text-white shadow-xs font-medium"
            : "text-zinc-500 hover:text-zinc-300 opacity-60 hover:opacity-100"
        }`}
        aria-label="Mudar idioma para Português"
        aria-pressed={language === "pt"}
        title="Português (Brasil)"
      >
        <BrazilFlag className="w-4 h-3" />
        <span className="text-[10px] tracking-wider">PT</span>
      </button>

      {/* Opção Inglês */}
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-150 cursor-pointer ${
          language === "en"
            ? "bg-white/10 text-white shadow-xs font-medium"
            : "text-zinc-500 hover:text-zinc-300 opacity-60 hover:opacity-100"
        }`}
        aria-label="Switch language to English"
        aria-pressed={language === "en"}
        title="English (US)"
      >
        <UsaFlag className="w-4 h-3" />
        <span className="text-[10px] tracking-wider">EN</span>
      </button>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.projects, href: "/#projetos" },
    { name: t.header.skills, href: "/#habilidades" },
    { name: t.header.process, href: "/#processo" },
    { name: t.header.about, href: "/#sobre" },
    { name: t.header.contact, href: "/#contato" },
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

          {/* Navegação Desktop & Switcher de Idioma */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-sm" aria-label="Navegação Principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors duration-150 text-sm font-normal"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Switcher de Idioma Minimalista Desktop */}
            <LanguageSwitcherMinimal />
          </div>

          {/* Área Mobile: Switcher de Idioma e Botão Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcherMinimal />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
                  key={link.href}
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
