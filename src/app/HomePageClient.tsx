// src/app/HomePageClient.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, MessageSquare } from 'lucide-react';
import Typewriter from "@/components/Typewriter";
import SocialIcons from "@/components/SocialIcons";
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import AboutSection from "@/components/AboutSection";
import MarqueeSeparator from '@/components/MarqueeSeparator';
import ContactSection from '@/components/ContactSection';
import NextPageZone from '@/components/NextPageZone';

export default function HomePageClient() {
  return (
    <div className="relative min-h-screen bg-background text-text overflow-hidden">
      {/* Background radial spotlight sutil estilo Apple / Studio Mirage */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-to-b from-white/[0.05] via-white/[0.015] to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Grid de linhas quase imperceptíveis de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* SEÇÃO HERO */}
      <motion.section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
            Disponível para Estágio & Nível Júnior
          </span>
        </motion.div>

        {/* Headline Monumental */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] text-white leading-[0.92] uppercase select-none"
        >
          DAVID LEVY
        </motion.h1>

        {/* Subtítulo dinâmico */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 flex flex-col items-center gap-3"
        >
          <Typewriter />
          <p className="max-w-xl text-zinc-400 text-sm sm:text-base font-normal leading-relaxed tracking-tight">
            Desenvolvendo aplicações web e desktop de alta performance, arquiteturas distribuídas e ecossistemas escaláveis com foco em código limpo, microsserviços e engenharia moderna.
          </p>
        </motion.div>

        {/* Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projetos"
            className="pill-button pill-button-primary px-7 py-3.5 text-sm shadow-xl"
          >
            <span>Explorar Projetos</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/chat"
            className="pill-button px-7 py-3.5 text-sm text-zinc-300 hover:text-white"
          >
            <MessageSquare className="w-4 h-4 text-zinc-400" />
            <span>Chat em Tempo Real</span>
          </Link>
        </motion.div>

        {/* Redes Sociais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10"
        >
          <SocialIcons />
        </motion.div>

        {/* Indicador de Scroll no estilo Studio Mirage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#statement"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 transition-all text-xs font-mono tracking-wider uppercase"
          >
            <span>Rolar para explorar</span>
            <ArrowDown className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </motion.section>

      {/* SEÇÃO STATEMENT (MANIFESTO EDITORIAL) */}
      <section id="statement" className="relative py-28 md:py-36 border-t border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              00 — Filosofia & Direção
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white tracking-[-0.03em] leading-[1.25]"
          >
            A engenharia de software atinge sua excelência quando arquitetura robusta, performance e design centrado no usuário convergem em sistemas escaláveis e confiáveis.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 text-base md:text-lg leading-relaxed font-normal"
          >
            <p>
              Da concepção de plataformas distribuídas de streaming com WebRTC e aceleração nativa via hardware em C++ até a orquestração de microsserviços com Docker, bancos relacionais e NoSQL.
            </p>
            <p>
              Cada sistema reflete o compromisso com código limpo, princípios SOLID, controle de concorrência e uma entrega de software com alto rigor técnico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DE PROJETOS SELECIONADOS */}
      <ProjectsSection />

      {/* SEÇÃO DE COMPETÊNCIAS TÉCNICAS */}
      <SkillsSection />

      {/* SEÇÃO DE PROCESSO & METODOLOGIA (NOVO - ESTILO STUDIO MIRAGE TIMELINE) */}
      <ProcessTimeline />

      {/* SEÇÃO SOBRE MIM */}
      <AboutSection />

      {/* LETREIRO INFINITO FLUIDO (NOVO - ESTILO STUDIO MIRAGE LETSTALK SEPARATOR) */}
      <MarqueeSeparator />

      {/* SEÇÃO DE CONTATO */}
      <ContactSection />

      {/* BANNER INTERATIVO GRAND FINAL (NOVO - ESTILO STUDIO MIRAGE NEXTPAGEZONE) */}
      <NextPageZone />
    </div>
  );
}