"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Monitor,
  Server,
  Database,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import {
  skillsData,
  SKILL_APPLICATIONS,
  SkillCategory,
  SkillApplication,
} from "@/lib/skills-data";
import SkillsNetworkBackground from "@/components/SkillsNetworkBackground";

function getCategoryIcon(iconName?: string) {
  switch (iconName) {
    case "terminal":
      return <Terminal className="w-5 h-5 text-purple-400" />;
    case "monitor":
      return <Monitor className="w-5 h-5 text-sky-400" />;
    case "server":
      return <Server className="w-5 h-5 text-emerald-400" />;
    case "database":
      return <Database className="w-5 h-5 text-amber-400" />;
    case "shield":
      return <ShieldCheck className="w-5 h-5 text-rose-400" />;
    default:
      return <Terminal className="w-5 h-5 text-zinc-300" />;
  }
}

interface SkillPillProps {
  skill: string;
  application?: SkillApplication;
}

function SkillPill({ skill, application }: SkillPillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`inline-flex items-center text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-default select-none ${
          application
            ? "bg-white/[0.05] border-white/10 text-zinc-200 hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:text-white"
            : "bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
        }`}
      >
        {application && (
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] mr-2 shrink-0 animate-pulse" />
        )}
        <span>{skill}</span>
      </div>

      {/* Popover flutuante detalhando aplicação real no projeto */}
      <AnimatePresence>
        {isHovered && application && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-40 w-64 sm:w-72 p-3 rounded-xl bg-zinc-950/95 border border-emerald-500/30 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.8)] text-left pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400">
                <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{application.projectName}</span>
              </span>
              <Link
                href={`/projects/${application.projectSlug}`}
                className="text-[10px] text-zinc-400 hover:text-white inline-flex items-center gap-0.5 transition-colors"
              >
                <span>Ver projeto</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {application.context}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SpotlightCardProps {
  category: SkillCategory;
  index: number;
  className?: string;
}

function SpotlightCard({ category, index, className = "" }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full ${className}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: -1000, y: -1000 });
        }}
        className="group relative h-full flex flex-col rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {/* Efeito Spotlight Dinâmico no Mouse */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${
              category.accentColor || "rgba(255,255,255,0.08)"
            }, transparent 80%)`,
          }}
        />

        {/* Borda Iluminada no Mouse */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.18), transparent 75%)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Cabeçalho do Card com Ícone */}
        <div className="relative z-10 flex items-center gap-3.5 mb-5 pb-4 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
            {getCategoryIcon(category.iconName)}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
              {category.title}
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              {category.skills.length} competências
            </span>
          </div>
        </div>

        {/* Grid de Pílulas de Habilidade */}
        <div className="relative z-10 flex flex-wrap gap-2.5 mt-auto pt-1">
          {category.skills.map((skill) => (
            <SkillPill
              key={skill}
              skill={skill}
              application={SKILL_APPLICATIONS[skill]}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="habilidades"
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06] overflow-hidden"
    >
      {/* Fundo Dinâmico de Topologia de Rede & Microsserviços */}
      <SkillsNetworkBackground />

      {/* Conteúdo da Seção */}
      <div className="relative z-10">
        {/* Cabeçalho Editorial da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stack Tecnológica & Engenharia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Competências Técnicas
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              Linguagens, frameworks e ferramentas consolidadas no desenvolvimento de sistemas web, desktop e serviços distribuídos em nuvem.
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
              <span>Pontos verdes indicam tecnologias com estudo de caso no portfólio</span>
            </div>
          </div>
        </div>

        {/* Grid de Cards com Efeito Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {skillsData.map((category, idx) => {
            // No desktop, o 5º card (Engenharia & Práticas) ocupa 2 colunas para fechar a grade com simetria perfeita (3 no topo + 3 na base)
            const isLastWideCard = idx === 4;
            return (
              <SpotlightCard
                key={category.title}
                category={category}
                index={idx}
                className={isLastWideCard ? "lg:col-span-2" : "lg:col-span-1"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
