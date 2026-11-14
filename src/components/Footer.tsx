// src/components/Footer.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-black py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Bloco Superior */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.04]">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center">
              <Image
                src="/logos/favicon.png"
                alt="David Levy Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </Link>
            <div>
              <p className="font-semibold text-sm text-white tracking-tight">David Levy</p>
              <p className="text-xs text-zinc-500 font-mono">Engenheiro de Software | Desenvolvedor Full-Stack</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <SocialIcons />
          </div>
        </div>

        {/* Bloco Inferior de Créditos e Volta ao Topo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>
            &copy; {currentYear} David Levy. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <span>Brasil (UTC-3)</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Voltar ao topo da página"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}