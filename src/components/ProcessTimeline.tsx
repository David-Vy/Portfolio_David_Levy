// src/components/ProcessTimeline.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LiveText from "@/components/LiveText";

export default function ProcessTimeline() {
  const { t } = useLanguage();

  return (
    <section id="processo" className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            <LiveText text={t.process.sectionTitle} mode="chars" />
          </h2>
        </div>

        <LiveText
          text={t.process.sectionSubtitle}
          as="p"
          mode="words"
          className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed"
        />
      </div>

      {/* Grid Editorial Aberto (Sem cartões fechados nem 3D tilt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {t.process.steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex flex-col pt-6 border-t border-white/[0.08]"
          >
            <span className="text-xs font-mono text-zinc-500 mb-3 block">
              {step.number}
            </span>

            <h3 className="text-lg font-medium text-white tracking-tight mb-2">
              <LiveText text={step.title} mode="chars" />
            </h3>

            <LiveText
              text={step.description}
              as="p"
              mode="words"
              className="text-sm text-zinc-400 leading-relaxed font-normal"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
