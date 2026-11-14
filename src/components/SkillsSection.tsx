// src/components/SkillsSection.tsx
"use client";

import { motion } from 'framer-motion';
import { skillsData } from '@/lib/skills-data';

export default function SkillsSection() {
  return (
    <section id="habilidades" className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Competências Técnicas
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Linguagens, frameworks e ferramentas consolidadas no desenvolvimento de sistemas web, desktop e serviços distribuídos em nuvem.
        </p>
      </div>

      {/* Grid Aberto e Editorial de Categorias (Sem cards fechados ou 3D tilt) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {skillsData.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-medium text-white tracking-tight mb-4 pb-2 border-b border-white/[0.06]">
              {category.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-mono text-zinc-300 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}