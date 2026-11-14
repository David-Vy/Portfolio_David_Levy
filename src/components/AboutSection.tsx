// src/components/AboutSection.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Terminal, Layers, ShieldCheck, GraduationCap } from 'lucide-react';
import DepthCard from './DepthCard';

export default function AboutSection() {
  const pillars = [
    {
      icon: <Terminal className="w-5 h-5 text-white" />,
      title: "Engenharia Web & Desktop",
      desc: "Aplicações de alto desempenho com Electron, Next.js, React, WebRTC (LiveKit), aceleração por GPU e streaming de baixa latência em C++ e Node.js."
    },
    {
      icon: <Layers className="w-5 h-5 text-white" />,
      title: "Back-end, Cloud & DevOps",
      desc: "Arquiteturas distribuídas com Node.js (Express/Fastify), Docker, microsserviços, WebSockets e persistência com PostgreSQL (Supabase RLS) e MongoDB."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: "Arquitetura Limpa & Segurança",
      desc: "Código sustentável orientado a Clean Code, princípios SOLID, controle de acesso seguro (JWT, OAuth, RLS) e metodologias ágeis (Scrum)."
    }
  ];

  return (
    <section id="sobre" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              04 — Perfil & Formação Técnica
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Sobre David Levy
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Trajetória em Engenharia de Software, fundamentação acadêmica e princípios técnicos de desenvolvimento.
        </p>
      </div>

      {/* Grid Editorial Asimétrico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Coluna Visual: Foto com acabamento minimalista e Ficha Rápida */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <DepthCard
            maxTilt={5}
            glowColor="rgba(255, 255, 255, 0.15)"
            className="p-3 shadow-2xl"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900">
              <Image
                src="/images/profile-photo.jpg"
                alt="David Levy - Engenheiro de Software"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </DepthCard>

          {/* Cartão de Qualificação Rápida */}
          <DepthCard
            maxTilt={4}
            glowColor="rgba(255, 255, 255, 0.08)"
            className="p-6 text-xs font-mono space-y-3"
          >
            <div className="flex justify-between items-start py-1.5 border-b border-white/[0.04] gap-2">
              <span className="text-zinc-500 uppercase tracking-wider shrink-0">Graduação</span>
              <span className="text-zinc-200 text-right">Eng. de Software (Anhanguera &apos;30)</span>
            </div>
            <div className="flex justify-between items-start py-1.5 border-b border-white/[0.04] gap-2">
              <span className="text-zinc-500 uppercase tracking-wider shrink-0">Técnico</span>
              <span className="text-zinc-200 text-right">Dev. Sistemas (ETSM 1.200h, 2024-2025)</span>
            </div>
            <div className="flex justify-between items-start py-1.5 border-b border-white/[0.04] gap-2">
              <span className="text-zinc-500 uppercase tracking-wider shrink-0">Certificação</span>
              <span className="text-zinc-200 text-right">Full-Stack SENAI (670h)</span>
            </div>
            <div className="flex justify-between items-start py-1.5 border-b border-white/[0.04] gap-2">
              <span className="text-zinc-500 uppercase tracking-wider shrink-0">Idiomas</span>
              <span className="text-zinc-200 text-right">Português, Espanhol (440h CIL), Inglês (2026)</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-zinc-500 uppercase tracking-wider shrink-0">Localização</span>
              <span className="text-zinc-200">Brasília, DF (Remoto / Híbrido)</span>
            </div>
          </DepthCard>
        </motion.div>

        {/* Coluna Editorial de Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between space-y-8"
        >
          {/* Narrativa Principal */}
          <div className="space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-white text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
              Olá! Sou David Levy Ferreira Lacerda. Sou estudante de Engenharia de Software e desenvolvedor Full-Stack certificado pelo SENAI.
            </p>
            <p className="text-zinc-400">
              Possuo experiência prática na concepção e implementação de aplicações Web e Desktop de alto desempenho, empregando <strong className="text-white font-medium">React, Next.js, TypeScript, Node.js e Electron</strong>. Minha atuação é orientada à engenharia de software robusta, com ênfase em sistemas distribuídos em tempo real, segurança de dados e microsserviços escaláveis.
            </p>
            <p className="text-zinc-400">
              Desenvolvo ecossistemas complexos — desde soluções desktop com streaming de baixa latência em <strong className="text-white font-medium">WebRTC (LiveKit)</strong> e aceleração nativa via hardware em <strong className="text-white font-medium">C++</strong> (DirectX/DXGI), até engines locais de nuvem (BaaS) orquestradas em <strong className="text-white font-medium">Docker</strong>, monorepos e persistência com <strong className="text-white font-medium">PostgreSQL (Supabase RLS)</strong> e NoSQL.
            </p>
            <p className="text-zinc-400">
              Busco oportunidades de estágio ou posição técnica/júnior em Engenharia de Software e desenvolvimento Full-Stack, onde eu possa agregar valor com rigor de engenharia, arquitetura limpa (Clean Code &amp; SOLID) e evolução contínua.
            </p>
          </div>

          {/* Formação Acadêmica & Certificações */}
          <div className="pt-6 border-t border-white/[0.06] space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                Formação Acadêmica &amp; Certificações
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Graduação</span>
                  <span className="text-emerald-400/90 font-medium">Previsão Jan/2030</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Bacharelado em Engenharia de Software</h4>
                <p className="text-xs text-zinc-400 font-sans">Faculdade Anhanguera</p>
                <p className="text-[11px] text-zinc-500 font-mono pt-1">
                  Foco em engenharia web, arquitetura e computação em nuvem.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Curso Técnico</span>
                  <span className="text-zinc-300 font-medium">2024-2025 (1.200h)</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Técnico em Desenvolvimento de Sistemas</h4>
                <p className="text-xs text-zinc-400 font-sans">Escola Técnica de Santa Maria (ETSM)</p>
                <p className="text-[11px] text-zinc-500 font-mono pt-1">
                  Lógica de programação, modelagem de banco de dados e arquitetura.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Certificação Oficial</span>
                  <span className="text-emerald-400/90 font-medium">Concluído (670h)</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Programador Full-Stack</h4>
                <p className="text-xs text-zinc-400 font-sans">SENAI — Unidade Integrada SIG Brasília</p>
                <p className="text-[11px] text-zinc-500 font-mono pt-1">
                  Metodologias ágeis (Scrum), REST APIs, SQL/NoSQL e testes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Idiomas</span>
                  <span className="text-zinc-300 font-medium">Formação CIL</span>
                </div>
                <h4 className="text-sm font-semibold text-white">Português, Espanhol &amp; Inglês</h4>
                <p className="text-xs text-zinc-400 font-sans">Centro Interescolar de Línguas (CIL 01)</p>
                <p className="text-[11px] text-zinc-500 font-mono pt-1">
                  Português nativo, Espanhol completo (440h CIL) e Inglês intermediário (previsão 2026).
                </p>
              </div>
            </div>
          </div>

          {/* Pilares Técnicos com DepthCards */}
          <div className="pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-5">
            {pillars.map((pillar) => (
              <DepthCard
                key={pillar.title}
                maxTilt={6}
                glowColor="rgba(255, 255, 255, 0.1)"
                className="p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-white tracking-tight mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </DepthCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
