// src/components/AboutSection.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const credentials = [
    {
      role: "Bacharelado em Engenharia de Software",
      institution: "Faculdade Anhanguera",
      period: "Previsão Jan/2030",
      description: "Fundamentos de engenharia web, arquitetura de sistemas e computação em nuvem.",
    },
    {
      role: "Técnico em Desenvolvimento de Sistemas",
      institution: "Escola Técnica de Santa Maria (ETSM)",
      period: "2024–2025 (1.200h)",
      description: "Lógica avançada de programação, modelagem relacional de dados e desenvolvimento de software.",
    },
    {
      role: "Programador Full-Stack",
      institution: "SENAI — Unidade Integrada SIG Brasília",
      period: "Concluído (670h)",
      description: "Metodologias ágeis (Scrum), APIs RESTful, SQL/NoSQL e testes automatizados.",
    },
    {
      role: "Formação em Idiomas",
      institution: "Centro Interescolar de Línguas (CIL 01)",
      period: "Português, Espanhol & Inglês",
      description: "Português nativo, Espanhol avançado (440h CIL) e Inglês intermediário (previsão 2026).",
    },
  ];

  return (
    <section id="sobre" className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
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

      {/* Grid Editorial Aberto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Coluna Visual: Foto com acabamento minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-4"
        >
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-950">
            <Image
              src="/images/profile-photo.jpg"
              alt="David Levy - Engenheiro de Software"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover grayscale contrast-[1.05] brightness-95 hover:grayscale-0 transition-all duration-700 ease-out"
              priority
            />
          </div>
          <p className="text-xs font-mono text-zinc-400 pt-1">
            Brasília, DF — Disponível para atuação remota ou híbrida
          </p>
        </motion.div>

        {/* Coluna Editorial de Texto */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col space-y-10"
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

          {/* Formação Acadêmica & Certificações */}
          <div className="pt-8 border-t border-white/[0.06] space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 font-medium">
              Formação Acadêmica & Certificações
            </h3>

            <div className="space-y-6">
              {credentials.map((cred) => (
                <div key={cred.role} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-white/[0.04]">
                  <div>
                    <h4 className="text-base font-medium text-white">{cred.role}</h4>
                    <p className="text-sm text-zinc-400">{cred.institution}</p>
                    <p className="text-xs text-zinc-400 mt-1">{cred.description}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 shrink-0 sm:text-right">
                    {cred.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
