// src/components/AboutSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Globe2, CheckCircle2 } from "lucide-react";
import SolarSystemBackground from "@/components/SolarSystemBackground";

// SVGs das Bandeiras Nacionais com precisão óptica e proporção equilibrada
function BrazilFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-6 h-4.5 rounded shadow-sm shrink-0" aria-label="Bandeira do Brasil">
      <rect width="32" height="24" fill="#009b3a" rx="2" />
      <polygon points="16,3 29,12 16,21 3,12" fill="#fedf00" />
      <circle cx="16" cy="12" r="5.2" fill="#002776" />
      <path d="M 11.2,13.2 Q 16,10.2 20.8,13.2" stroke="#ffffff" strokeWidth="0.9" fill="none" />
    </svg>
  );
}

function SpainFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-6 h-4.5 rounded shadow-sm shrink-0" aria-label="Bandeira da Espanha">
      <rect width="32" height="24" fill="#aa151b" rx="2" />
      <rect y="6" width="32" height="12" fill="#f1bf00" />
      <circle cx="9" cy="12" r="2.8" fill="#aa151b" opacity="0.85" />
    </svg>
  );
}

function UsaFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-6 h-4.5 rounded shadow-sm shrink-0" aria-label="Bandeira dos Estados Unidos">
      <rect width="32" height="24" fill="#ffffff" rx="2" />
      <rect y="0" width="32" height="3.7" fill="#b22234" />
      <rect y="7.4" width="32" height="3.7" fill="#b22234" />
      <rect y="14.8" width="32" height="3.7" fill="#b22234" />
      <rect y="22.2" width="32" height="1.8" fill="#b22234" />
      <rect width="13" height="13" fill="#3c3b6e" rx="1" />
      <circle cx="4" cy="4" r="0.9" fill="#ffffff" />
      <circle cx="9" cy="4" r="0.9" fill="#ffffff" />
      <circle cx="6.5" cy="6.5" r="0.9" fill="#ffffff" />
      <circle cx="4" cy="9" r="0.9" fill="#ffffff" />
      <circle cx="9" cy="9" r="0.9" fill="#ffffff" />
    </svg>
  );
}

// SVGs das Instituições de Ensino com estética de design institucional Google
function AnhangueraLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-label="Logo Faculdade Anhanguera">
      <rect width="32" height="32" rx="8" fill="#18181b" />
      <path d="M16 6L7 25h4.8l2.2-4.8h6l2.2 4.8H25L16 6z" fill="#f97316" />
      <polygon points="16,12 14.5,17 17.5,17" fill="#18181b" />
      <line x1="14" y1="20.2" x2="18" y2="20.2" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SenaiLogo() {
  return (
    <svg viewBox="0 0 40 24" className="w-8 h-5" fill="none" aria-label="Logo SENAI">
      <rect width="40" height="24" rx="4" fill="#dc2626" />
      <text x="20" y="16.5" fill="#ffffff" fontSize="9.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.8">SENAI</text>
    </svg>
  );
}

function EtsmLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" aria-label="Logo Escola Técnica de Santa Maria">
      <rect width="32" height="32" rx="8" fill="#18181b" />
      <path d="M10 13l-3 3 3 3M22 13l3 3-3 3M17 10l-2 12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutSection() {
  const credentials = [
    {
      role: "Bacharelado em Engenharia de Software",
      institution: "Faculdade Anhanguera",
      period: "Previsão Jan/2030",
      description: "Fundamentos de engenharia web, arquitetura de sistemas e computação em nuvem.",
      logo: <AnhangueraLogo />,
      badge: "Graduação Superior",
      tags: ["Arquitetura de Software", "Sistemas Distribuídos", "Computação em Nuvem"],
    },
    {
      role: "Técnico em Desenvolvimento de Sistemas",
      institution: "Escola Técnica de Santa Maria (ETSM)",
      period: "2024–2025 (1.200h)",
      description: "Lógica avançada de programação, modelagem relacional de dados e desenvolvimento de software.",
      logo: <EtsmLogo />,
      badge: "Formação Técnica • 1.200h",
      tags: ["Algoritmos & Estruturas", "Modelagem SQL", "Desenvolvimento Web & Desktop"],
    },
    {
      role: "Programador Full-Stack",
      institution: "SENAI — Unidade Integrada SIG Brasília",
      period: "Concluído (670h)",
      description: "Metodologias ágeis (Scrum), APIs RESTful, SQL/NoSQL e testes automatizados.",
      logo: <SenaiLogo />,
      badge: "Qualificação Profissional • 670h",
      tags: ["Metodologias Ágeis (Scrum)", "APIs RESTful", "Testes Automatizados"],
    },
  ];

  const languages = [
    {
      name: "Português",
      level: "Nativo",
      institution: "Língua Materna",
      flag: <BrazilFlag />,
      description: "Comunicação nativa e articulação técnica fluida.",
    },
    {
      name: "Espanhol",
      level: "Avançado (440h)",
      institution: "Centro Interescolar de Línguas (CIL 01)",
      flag: <SpainFlag />,
      description: "Formação concluída de 440h no CIL com proficiência oral e escrita.",
    },
    {
      name: "Inglês",
      level: "Intermediário",
      institution: "Centro Interescolar de Línguas (CIL 01)",
      flag: <UsaFlag />,
      description: "Leitura técnica, documentação e conversação (Previsão 2026).",
    },
  ];

  const engineeringPrinciples = [
    "Clean Architecture & SOLID",
    "Sistemas Distribuídos & WebRTC",
    "Código Limpo, Testável & Escalável",
  ];

  return (
    <section id="sobre" className="relative py-24 md:py-32 border-t border-white/[0.06] overflow-hidden">
      {/* Fundo Dinâmico Cósmico: Sistema Solar Minimalista & Interativo */}
      <SolarSystemBackground />

      <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Cabeçalho Editorial */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Sobre David Levy
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Trajetória em Engenharia de Software, fundamentação acadêmica e princípios de desenvolvimento.
        </p>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Coluna Visual: Foto com acabamento minimalista e Princípios */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-950 shadow-2xl group">
            <Image
              src="/images/profile-photo.jpg"
              alt="David Levy - Engenheiro de Software"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
              priority
            />
          </div>

          <p className="text-xs font-mono text-zinc-400">
            Brasília, DF — Disponível para atuação presencial, remota ou híbrida
          </p>

          {/* Princípios de Engenharia (Inspirados no Google Engineering) */}
          <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium block">
              Princípios de Engenharia
            </span>
            <div className="flex flex-col gap-2">
              {engineeringPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Coluna Editorial de Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col space-y-12"
        >
          {/* Narrativa Principal */}
          <div className="space-y-6 text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-white text-xl sm:text-2xl font-medium tracking-tight leading-snug">
              Olá, sou David Levy. Estudante de Engenharia de Software e desenvolvedor Full-Stack.
            </p>
            <p>
              Tenho experiência prática no desenvolvimento de aplicações Web e Desktop de alto desempenho utilizando React, Next.js, TypeScript, Node.js e Electron. Minha atuação é orientada à engenharia de software estruturada, com ênfase em sistemas distribuídos, microsserviços e comunicação em tempo real.
            </p>
            <p>
              Construo ecossistemas completos — desde soluções desktop com streaming de baixa latência em WebRTC e aceleração nativa via hardware em C++ (DirectX/DXGI), até plataformas privadas com orquestração em Docker, monorepos e persistência relacional com PostgreSQL e NoSQL.
            </p>
            <p>
              Busco oportunidades de estágio ou posição técnica/júnior em Engenharia de Software e desenvolvimento Full-Stack, com foco em arquitetura limpa, código sustentável e evolução contínua.
            </p>
          </div>

          {/* Formação Acadêmica & Certificações Ilustrativas com Logos SVG */}
          <div className="pt-6 border-t border-white/[0.06] space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-medium">
                Formação Acadêmica & Certificações
              </h3>
            </div>

            <div className="flex flex-col gap-3.5">
              {credentials.map((cred) => (
                <div
                  key={cred.role}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-zinc-950/60 border border-white/[0.07] hover:border-white/20 hover:bg-zinc-900/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Logo Institucional */}
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {cred.logo}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <h4 className="text-base font-medium text-white tracking-tight">
                          {cred.role}
                        </h4>
                        <span className="text-xs font-mono text-zinc-400 shrink-0">
                          {cred.period}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-zinc-300 mb-1.5">
                        {cred.institution}
                      </p>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                        {cred.description}
                      </p>

                      {/* Tags de Foco Técnico da Formação */}
                      <div className="flex flex-wrap gap-1.5">
                        {cred.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção Exclusiva de Idiomas & Proficiência Internacional com Bandeiras SVG */}
          <div className="pt-6 border-t border-white/[0.06] space-y-6">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-medium">
                Idiomas & Proficiência Internacional
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="p-4 rounded-2xl bg-zinc-950/60 border border-white/[0.07] hover:border-white/20 hover:bg-zinc-900/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      {lang.flag}
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                        {lang.level}
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-white tracking-tight mb-0.5">
                      {lang.name}
                    </h4>

                    <span className="text-[11px] font-mono text-zinc-400 block mb-2">
                      {lang.institution}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-white/[0.04]">
                    {lang.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
