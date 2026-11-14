// src/app/chat/layout.tsx
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  return (
    <div className="h-[var(--vh)] bg-background flex flex-col text-text font-sans">
      {/* Barra de retorno ao portfólio */}
      <div className="px-6 py-3.5 flex items-center justify-between border-b border-white/[0.06] bg-black/60 backdrop-blur-xl z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Voltar ao Portfólio</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-400">Canal Direto • David Levy</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}