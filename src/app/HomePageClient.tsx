// src/app/HomePageClient.tsx
"use client";

import { motion } from "framer-motion";
import SocialIcons from "@/components/SocialIcons";
import HeroSyntaxBackground from "@/components/HeroSyntaxBackground";
import GalaxySpaceBackground from "@/components/GalaxySpaceBackground";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePageClient() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-background text-text overflow-hidden">
      {/* SEÇÃO HERO: Engenheiro de Software & Desenvolvedor Full-Stack */}
      <section
        id="home"
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 w-full overflow-hidden"
      >
        {/* Fundo Interativo: Queda Física de Símbolos de Sintaxe & Sedimentação */}
        <HeroSyntaxBackground />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-white leading-none">
              {t.hero.title}
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-zinc-300 font-normal tracking-tight">
              {t.hero.role}
            </p>

            <p className="mt-5 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed font-normal">
              {t.hero.description}
            </p>

            {/* Ações Rápidas */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projetos"
                className="pill-button pill-button-primary px-6 py-3 text-sm"
              >
                {t.hero.exploreProjects}
              </a>

              <a
                href="#contato"
                className="pill-button px-6 py-3 text-sm text-zinc-300 hover:text-white"
              >
                {t.hero.contact}
              </a>
            </div>

            {/* Redes Sociais */}
            <div className="mt-10">
              <SocialIcons />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO STATEMENT (MANIFESTO EDITORIAL) */}
      <section
        id="statement"
        className="relative py-24 md:py-32 border-t border-b border-white/[0.06] overflow-hidden"
      >
        {/* Fundo Cósmico Animado: Galáxia, Estrelas Cintilantes, Nebulosas e Meteoros */}
        <GalaxySpaceBackground />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white tracking-tight leading-snug"
          >
            {t.statement.quote}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 text-base leading-relaxed font-normal"
          >
            <p>{t.statement.p1}</p>
            <p>{t.statement.p2}</p>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DE PROJETOS SELECIONADOS */}
      <ProjectsSection />

      {/* SEÇÃO DE COMPETÊNCIAS TÉCNICAS */}
      <SkillsSection />

      {/* SEÇÃO DE PROCESSO & METODOLOGIA */}
      <ProcessTimeline />

      {/* SEÇÃO SOBRE MIM */}
      <AboutSection />

      {/* SEÇÃO DE CONTATO */}
      <ContactSection />
    </div>
  );
}
