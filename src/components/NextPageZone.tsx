// src/components/NextPageZone.tsx
"use client";

import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";

export default function NextPageZone() {
  return (
    <section className="relative w-full border-t border-white/[0.06] overflow-hidden bg-zinc-950/30">
      <Link
        href="/chat"
        className="group relative block w-full py-20 sm:py-28 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-700"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Próximo Passo
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
              Pronto para criar algo memorável?
            </h3>

            <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-xl font-normal">
              Seja para uma oportunidade de estágio ou júnior em Engenharia de Software, desenvolvimento Full-Stack ou uma conversa técnica sobre arquitetura.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden lg:inline-block text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
              Você está a um clique de distância
            </span>

            <div className="pill-button pill-button-primary px-8 py-4 text-base font-semibold group-hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-all duration-500">
              <MessageSquare className="w-4 h-4" />
              <span>Iniciar Chat</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>

        {/* Linha luminosa interativa inferior no hover estilo Studio Mirage */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[0.5px]" />
      </Link>
    </section>
  );
}
