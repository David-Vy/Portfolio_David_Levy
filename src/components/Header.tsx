// src/components/Header.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/[0.06]'
            : 'py-6 bg-transparent border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Monograma */}
          <Link
            href="/"
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            aria-label="Página Inicial - David Levy"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
              <Image
                src="/logos/favicon.png"
                alt="David Levy Logo"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white">
                David Levy
              </span>
              <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-normal"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/#contato"
              className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-200 bg-white/[0.08] hover:bg-white hover:text-black transition-colors duration-200"
            >
              Contato
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-28 px-8 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-medium text-zinc-300 hover:text-white py-2"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.06]">
              <Link
                href="/#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full text-center text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                Contato
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}