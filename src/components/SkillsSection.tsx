// src/components/SkillsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { skillsData } from '@/lib/skills-data';
import { Code2, Cpu, Palette } from 'lucide-react';
import DepthCard from './DepthCard';

const categoryIcons = [
  <Code2 key="code" className="w-5 h-5 text-white" />,
  <Cpu key="cpu" className="w-5 h-5 text-white" />,
  <Palette key="palette" className="w-5 h-5 text-white" />,
];

export default function SkillsSection() {
  return (
    <section id="habilidades" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              02 — Competências & Arsenal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Domínio Técnico
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Conjunto de linguagens, engines e ferramentas consolidadas ao longo de projetos reais e aprendizado prático contínuo.
        </p>
      </div>

      {/* Grid de 3 Colunas com Profundidade 3D */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillsData.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <DepthCard
              maxTilt={6}
              glowColor="rgba(255, 255, 255, 0.12)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    {categoryIcons[idx] || <Code2 className="w-5 h-5 text-white" />}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors duration-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-6">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.07] text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{category.skills.length} itens catalogados</span>
                <span className="text-zinc-600 group-hover:text-white transition-colors duration-500">●</span>
              </div>
            </DepthCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}