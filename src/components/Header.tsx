// src/components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projetos', href: '/#projetos' },
    { name: 'Competências', href: '/#habilidades' },
    { name: 'Processo', href: '/#processo' },
    { name: 'Sobre', href: '/#sobre' },
    { name: 'Contato', href: '/#contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-3.5 bg-black/60 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80'
            : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Monograma */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            aria-label="Página Inicial - David Levy"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-white/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logos/favicon.png"
                alt="David Levy Logo"
                width={26}
                height={26}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-2">
                David Levy
              </span>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors duration-200 tracking-tight text-[13px] font-medium"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/#contato"
              className="pill-button text-xs py-2 px-4.5 bg-white/[0.06] hover:bg-white text-zinc-200 hover:text-black border border-white/10 hover:border-white transition-all duration-300"
            >
              <span>Vamos Conversar</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </Link>
          </nav>

          {/* Botão Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-white/10 bg-white/5 text-zinc-300 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Menu Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden pt-28 px-8 flex flex-col justify-between pb-16"
          >
            <div className="flex flex-col space-y-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                Navegação
              </span>
              {navLinks.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-zinc-200 hover:text-white tracking-tight flex items-center justify-between py-2 border-b border-white/[0.06]"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-zinc-600">0{idx + 1}</span>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <Link
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="pill-button-primary pill-button py-3.5 text-center text-sm font-semibold justify-center shadow-xl"
              >
                Iniciar Chat em Tempo Real
              </Link>
              <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-3 border-t border-white/[0.06]">
                <span>Status: Disponível</span>
                <span>Brasil (UTC-3)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}