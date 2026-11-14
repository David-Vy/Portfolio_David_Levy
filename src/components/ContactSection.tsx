// src/components/ContactSection.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageSquare, Mail, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import DepthCard from './DepthCard';

export default function ContactSection() {
  const contactLinks = [
    {
      title: "Chat em Tempo Real",
      desc: "Autentique-se e converse direto comigo",
      href: "/chat",
      isInternal: true,
      action: "Abrir Chat",
      icon: <MessageSquare className="w-5 h-5 text-white" />
    },
    {
      title: "E-mail Direto",
      desc: "david.vyf@gmail.com",
      href: "mailto:david.vyf@gmail.com",
      isInternal: false,
      action: "Enviar E-mail",
      icon: <Mail className="w-5 h-5 text-white" />
    },
    {
      title: "GitHub",
      desc: "github.com/David-Vy",
      href: "https://github.com/David-Vy",
      isInternal: false,
      action: "Ver Repositórios",
      icon: <Github className="w-5 h-5 text-white" />
    },
    {
      title: "LinkedIn",
      desc: "linkedin.com/in/david-levy-dev",
      href: "https://www.linkedin.com/in/david-levy-dev",
      isInternal: false,
      action: "Conectar",
      icon: <Linkedin className="w-5 h-5 text-white" />
    }
  ];

  return (
    <section id="contato" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Container Principal */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
            05 — Conexão & Oportunidades
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Vamos iniciar uma conversa?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Estou aberto a oportunidades de estágio e nível júnior em Engenharia de Software, sistemas distribuídos e desenvolvimento Full-Stack. Fique à vontade para me contatar pelo chat, e-mail ou redes profissionais.
        </motion.p>

        {/* Botões de Ação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/chat"
            className="pill-button pill-button-primary px-8 py-4 text-base font-semibold shadow-2xl transition-all duration-500"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Iniciar Chat em Tempo Real</span>
          </Link>

          <a
            href="mailto:david.vyf@gmail.com"
            className="pill-button px-8 py-4 text-base text-zinc-300 hover:text-white transition-all duration-500"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>Enviar E-mail Direto</span>
          </a>
        </motion.div>

        {/* Metadados Rápidos de Contato */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Brasília — DF
          </span>
          <span className="text-zinc-600">•</span>
          <a href="tel:+5561999083545" className="hover:text-white transition-colors">
            (61) 99908-3545
          </a>
          <span className="text-zinc-600">•</span>
          <a href="mailto:david.vyf@gmail.com" className="hover:text-white transition-colors">
            david.vyf@gmail.com
          </a>
        </motion.div>
      </div>

      {/* Grid de Canais de Contato com Profundidade 3D */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
        {contactLinks.map((item, idx) => {
          const cardInner = (
            <DepthCard
              maxTilt={8}
              glowColor="rgba(255, 255, 255, 0.14)"
              className="p-6 h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight mb-1 group-hover:text-zinc-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono break-all">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                <span>{item.action}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </DepthCard>
          );

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {item.isInternal ? (
                <Link href={item.href} className="block h-full">
                  {cardInner}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {cardInner}
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}