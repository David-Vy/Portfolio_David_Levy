// src/components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LiveText from "@/components/LiveText";

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contato" className="relative py-28 md:py-36 px-6 md:px-10 max-w-4xl mx-auto border-t border-white/[0.06] text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6">
          <LiveText text={t.contact.title} mode="chars" />
        </h2>

        <LiveText
          text={t.contact.subtitle}
          as="p"
          mode="words"
          className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal mb-10"
        />

        {/* Ações Principais */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:david.vyf@gmail.com"
            className="pill-button pill-button-primary px-6 py-3 text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>david.vyf@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/david-levy-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button px-6 py-3 text-sm text-zinc-300 hover:text-white"
          >
            <Linkedin className="w-4 h-4" />
            <LiveText text={t.contact.connectLinkedIn} mode="chars" />
          </a>
        </div>

        {/* Links Profissionais Diretos */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400">
          <a
            href="https://github.com/David-Vy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/david-levy-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <span className="text-zinc-600 hidden sm:inline">·</span>

          <span className="font-mono text-xs text-zinc-500">
            <LiveText text={t.contact.location} mode="words" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
