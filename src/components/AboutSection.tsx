// src/components/AboutSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SolarSystemBackground from "@/components/SolarSystemBackground";
import { BrazilFlag, UsaFlag } from "@/components/LanguageFlags";
import { useLanguage } from "@/context/LanguageContext";

// SVGs das Bandeiras Nacionais — discretas e com proporções oficiais
function SpainFlag() {
  return (
    <svg viewBox="0 0 32 24" className="w-5 h-3.5 rounded-xs shrink-0 shadow-xs" aria-label="Bandeira da Espanha">
      <rect width="32" height="24" fill="#aa151b" rx="1.5" />
      <rect y="6" width="32" height="12" fill="#f1bf00" />
      <circle cx="9" cy="12" r="2.8" fill="#aa151b" opacity="0.85" />
    </svg>
  );
}

// Emblemas Institucionais — discretos e minimalistas
function AnhangueraLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" aria-label="Logo Faculdade Anhanguera">
      <rect width="32" height="32" rx="6" fill="#18181b" />
      <path d="M16 6L7 25h4.8l2.2-4.8h6l2.2 4.8H27L18 6h-2zm1 6.5l2 4.3h-4l2-4.3z" fill="#f97316" />
    </svg>
  );
}

function EtsmLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 shrink-0" fill="none" aria-label="Logo Escola Técnica de Santa Maria">
      <rect width="32" height="32" rx="6" fill="#18181b" />
      <path d="M10 11L5 16L10 21" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 11L27 16L22 21" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9L14 23" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SenaiLogo() {
  return (
    <svg viewBox="0 0 44 20" className="w-8 h-4 shrink-0" fill="none" aria-label="Logo SENAI">
      <rect width="44" height="20" rx="3.5" fill="#e11d48" />
      <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="9.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">
        SENAI
      </text>
    </svg>
  );
}

export default function AboutSection() {
  const { language, t } = useLanguage();

  /*
   * Registro Curricular & Acadêmico Oficial:
   * - Bacharelado em Engenharia de Software | Faculdade Anhanguera (Previsão Jan/2030)
   * - Técnico em Desenvolvimento de Sistemas | Escola Técnica de Santa Maria (ETSM) (2024–2025, 1.200h)
   * - Programador Full-Stack | SENAI — Unidade Integrada SIG Brasília (Concluído, 670h)
   * - Idiomas: Português (Nativo), Espanhol (Avançado, 440h, CIL), Inglês (Intermediário, CIL)
   */
  const credentials = [
    {
      role: language === "en" ? "Bachelor of Science in Software Engineering" : "Bacharelado em Engenharia de Software",
      period: language === "en" ? "Expected Jan/2030" : "Previsão Jan/2030",
      institution: language === "en" ? "Anhanguera University" : "Faculdade Anhanguera",
      description: language === "en"
        ? "Web engineering fundamentals, systems architecture, and cloud computing."
        : "Fundamentos de engenharia web, arquitetura de sistemas e computação em nuvem.",
      logo: <AnhangueraLogo />,
    },
    {
      role: language === "en" ? "Technical Degree in Systems Development" : "Técnico em Desenvolvimento de Sistemas",
      period: "2024–2025 (1.200h)",
      institution: language === "en" ? "Santa Maria Technical School (ETSM)" : "Escola Técnica de Santa Maria (ETSM)",
      description: language === "en"
        ? "Advanced programming logic, relational data modeling, and software engineering."
        : "Lógica avançada de programação, modelagem relacional de dados e desenvolvimento de software.",
      logo: <EtsmLogo />,
    },
    {
      role: language === "en" ? "Full-Stack Developer Certification" : "Programador Full-Stack",
      period: language === "en" ? "Completed (670h)" : "Concluído (670h)",
      institution: language === "en" ? "SENAI — SIG Brasília Integrated Unit" : "SENAI — Unidade Integrada SIG Brasília",
      description: language === "en"
        ? "Agile methodologies (Scrum), RESTful APIs, SQL/NoSQL, and automated testing."
        : "Metodologias ágeis (Scrum), APIs RESTful, SQL/NoSQL e testes automatizados.",
      logo: <SenaiLogo />,
    },
  ];

  const languages = [
    {
      name: language === "en" ? "Portuguese" : "Português",
      level: language === "en" ? "Native" : "Nativo",
      institution: language === "en" ? "Native Tongue" : "Língua Materna",
      flag: <BrazilFlag />,
      description: language === "en"
        ? "Native communication and fluent technical articulation."
        : "Comunicação nativa e articulação técnica fluida.",
    },
    {
      name: language === "en" ? "Spanish" : "Espanhol",
      level: language === "en" ? "Advanced (440h)" : "Avançado (440h)",
      institution: language === "en" ? "Inter-School Language Center (CIL 01)" : "Centro Interescolar de Línguas (CIL 01)",
      flag: <SpainFlag />,
      description: language === "en"
        ? "Completed 440h formal training at CIL with oral and written proficiency."
        : "Formação concluída de 440h no CIL com proficiência oral e escrita.",
    },
    {
      name: language === "en" ? "English" : "Inglês",
      level: language === "en" ? "Intermediate" : "Intermediário",
      institution: language === "en" ? "Inter-School Language Center (CIL 01)" : "Centro Interescolar de Línguas (CIL 01)",
      flag: <UsaFlag />,
      description: language === "en"
        ? "Technical literature, documentation, and conversational fluency (Target 2026)."
        : "Leitura técnica, documentação e conversação (Previsão 2026).",
    },
  ];

  return (
    <section id="sobre" className="relative py-28 md:py-36 border-t border-white/[0.06] overflow-hidden">
      {/* Fundo Dinâmico Cósmico: Sistema Solar Minimalista & Interativo */}
      <SolarSystemBackground />

      <div className="relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
        {/* A. Cabeçalho Editorial */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            {t.about.sectionTitle}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
            {t.about.sectionSubtitle}
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
                alt="David Levy - Software Engineer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                className="object-cover grayscale contrast-[1.05] brightness-95"
                loading="lazy"
              />
            </div>

            {/* Localização Integrada */}
            <p className="text-xs text-zinc-400 font-normal leading-relaxed">
              {t.about.location}
            </p>

            {/* Princípios de Engenharia Integrados com Discrição */}
            <div className="pt-6 border-t border-white/[0.06] space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block">
                {t.about.principlesTitle}
              </span>
              <ul className="space-y-2 text-sm text-zinc-300">
                {t.about.principles.map((principle) => (
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
                {t.about.bioGreeting}
              </p>
              <p>{t.about.bioP1}</p>
              <p>{t.about.bioP2}</p>
              <p>{t.about.bioP3}</p>
            </div>

            {/* C. Formação Acadêmica & Qualificações — Apresentação Cronológica Editorial */}
            <div className="pt-8 border-t border-white/[0.06] space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  {t.about.academicTitle}
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
                  {t.about.languagesTitle}
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
