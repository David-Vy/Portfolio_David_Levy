// src/components/AboutSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SolarSystemBackground from "@/components/SolarSystemBackground";

// SVGs das Bandeiras Nacionais — discretas e com proporções oficiais
function BrazilFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-5 h-3.5 rounded-xs shrink-0 shadow-xs" aria-label="Bandeira do Brasil">
      <rect width="32" height="24" fill="#009b3a" rx="1.5" />
      <polygon points="16,3 29,12 16,21 3,12" fill="#fedf00" />
      <circle cx="16" cy="12" r="5.2" fill="#002776" />
      <path d="M 11.2,13.2 Q 16,10.2 20.8,13.2" stroke="#ffffff" strokeWidth="0.9" fill="none" />
    </svg>
  );
}

function SpainFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-5 h-3.5 rounded-xs shrink-0 shadow-xs" aria-label="Bandeira da Espanha">
      <rect width="32" height="24" fill="#aa151b" rx="1.5" />
      <rect y="6" width="32" height="12" fill="#f1bf00" />
      <circle cx="9" cy="12" r="2.8" fill="#aa151b" opacity="0.85" />
    </svg>
  );
}

function UsaFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-5 h-3.5 rounded-xs shrink-0 shadow-xs" aria-label="Bandeira dos Estados Unidos">
      <rect width="32" height="24" fill="#ffffff" rx="1.5" />
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

// Emblemas Institucionais — discretos e minimalistas
function AnhangueraLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" aria-label="Logo Faculdade Anhanguera">
      <rect width="32" height="32" rx="6" fill="#18181b" />
      <path d="M16 6L7 25h4.8l2.2-4.8h6l2.2 4.8H25L16 6z" fill="#f97316" />
      <polygon points="16,12 14.5,17 17.5,17" fill="#18181b" />
      <line x1="14" y1="20.2" x2="18" y2="20.2" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function EtsmLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" aria-label="Logo Escola Técnica de Santa Maria">
      <rect width="32" height="32" rx="6" fill="#18181b" />
      <path d="M10 13l-3 3 3 3M22 13l3 3-3 3M17 10l-2 12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SenaiLogo() {
  return (
    <svg viewBox="0 0 38 22" className="w-6 h-4 shrink-0" fill="none" aria-label="Logo SENAI">
      <rect width="38" height="22" rx="3" fill="#dc2626" />
      <text x="19" y="15" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.6">SENAI</text>
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
    },
    {
      role: "Técnico em Desenvolvimento de Sistemas",
      institution: "Escola Técnica de Santa Maria (ETSM)",
      period: "2024–2025 (1.200h)",
      description: "Lógica avançada de programação, modelagem relacional de dados e desenvolvimento de software.",
      logo: <EtsmLogo />,
    },
    {
      role: "Programador Full-Stack",
      institution: "SENAI — Unidade Integrada SIG Brasília",
      period: "Concluído (670h)",
      description: "Metodologias ágeis (Scrum), APIs RESTful, SQL/NoSQL e testes automatizados.",
      logo: <SenaiLogo />,
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
    <section id="sobre" className="relative py-28 md:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Fundo Dinâmico Cósmico: Sistema Solar Minimalista & Interativo */}
      <SolarSystemBackground />

      <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
        {/* A. Cabeçalho Editorial */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Sobre David Levy
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
            Trajetória em Engenharia de Software, fundamentação acadêmica e princípios de desenvolvimento.
          </p>
        </div>

        {/* B. Grid de Apresentação Pessoal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Fotografia e Princípios */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            {/* Fotografia em Proporção Natural 4:5 e Acabamento Minimalista */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-950">
              <Image
                src="/images/profile-photo.jpg"
                alt="David Levy - Engenheiro de Software"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                className="object-cover grayscale contrast-[1.05] brightness-95"
                loading="lazy"
              />
            </div>

            {/* Localização Integrada */}
            <p className="text-xs text-zinc-400 font-normal leading-relaxed">
              Brasília, DF — Disponível para atuação presencial, remota ou híbrida
            </p>

            {/* Princípios de Engenharia Integrados com Discrição */}
            <div className="pt-6 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
                Princípios de Engenharia
              </span>
              <ul className="space-y-2 text-sm text-zinc-300">
                {engineeringPrinciples.map((principle) => (
                  <li key={principle} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Coluna Direita: Biografia Editorial, Formação e Idiomas */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.25, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col space-y-16"
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

            {/* C. Formação Acadêmica & Qualificações — Apresentação Cronológica Editorial */}
            <div className="pt-8 border-t border-white/[0.06] space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Formação Acadêmica & Certificações
                </h3>
              </div>

              <div className="space-y-8">
                {credentials.map((cred) => (
                  <div
                    key={cred.role}
                    className="flex flex-col space-y-2 pb-8 border-b border-white/[0.06] last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-base font-medium text-white tracking-tight">
                        {cred.role}
                      </h4>
                      <span className="text-xs font-mono text-zinc-400 shrink-0">
                        {cred.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      {cred.logo}
                      <span>{cred.institution}</span>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                      {cred.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* D. Idiomas & Proficiência Internacional — Lista Compacta e Integrada */}
            <div className="pt-8 border-t border-white/[0.06] space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Idiomas & Proficiência Internacional
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex flex-col space-y-1.5">
                    <div className="flex items-center gap-2 mb-0.5">
                      {lang.flag}
                      <h4 className="text-base font-medium text-white tracking-tight">
                        {lang.name}
                      </h4>
                    </div>

                    <span className="text-xs font-mono text-zinc-300">
                      {lang.level}
                    </span>

                    <span className="text-xs text-zinc-400">
                      {lang.institution}
                    </span>

                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
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
