"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Monitor,
  Server,
  Database,
  ShieldCheck,
} from "lucide-react";
import {
  skillsData,
  SKILL_APPLICATIONS,
  SkillCategory,
  SkillApplication,
} from "@/lib/skills-data";
import SkillsNetworkBackground from "@/components/SkillsNetworkBackground";
import { useLanguage } from "@/context/LanguageContext";
import LiveText from "@/components/LiveText";

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

interface SkillScatter {
  tilt: number;
  xShift: number;
  yShift: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  bgOpacity: number;
}

function getSkillScatter(skill: string, catIdx: number, itemIdx: number): SkillScatter {
  let hash = 0;
  for (let i = 0; i < skill.length; i++) {
    hash = (hash * 31 + skill.charCodeAt(i)) & 0xfffff;
  }
  hash += catIdx * 73 + itemIdx * 19;

  // Rotação orgânica sutil: entre -2.2deg e +2.2deg
  const tilt = Number((((hash % 11) - 5) * 0.44).toFixed(2));

  // Deslocamento horizontal: entre -8px e +8px
  const xShift = Number((((hash % 9) - 4) * 1.8).toFixed(1));

  // Deslocamento vertical: entre -7px e +7px
  const yShift = Number((((hash % 9) - 4) * 1.6).toFixed(1));

  // Margens orgânicas para distribuir e ocupar a área interior do card
  const marginLeft = (hash % 5 === 1) ? 6 : (hash % 5 === 2) ? 12 : 4;
  const marginRight = (hash % 5 === 3) ? 10 : (hash % 5 === 4) ? 6 : 4;
  const marginTop = (hash % 4 === 1) ? 6 : (hash % 4 === 2) ? 10 : 4;
  const marginBottom = (hash % 4 === 3) ? 8 : 4;

  // Variação sutil de opacidade de fundo
  const bgOpacity = Number((0.025 + (hash % 4) * 0.015).toFixed(3));

  return { tilt, xShift, yShift, marginLeft, marginRight, marginTop, marginBottom, bgOpacity };
}

function getShuffledSkills(skills: string[], categoryIndex: number): string[] {
  const copy = [...skills];
  let seed = (categoryIndex + 1) * 7919;
  for (let i = copy.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

interface SkillPillProps {
  skill: string;
  application?: SkillApplication;
  scatter: SkillScatter;
}

function SkillPill({ skill, application, scatter }: SkillPillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative transition-all duration-300"
      style={{
        transform: isHovered
          ? "rotate(0deg) translate(0px, -3px) scale(1.06)"
          : `translate(${scatter.xShift}px, ${scatter.yShift}px) rotate(${scatter.tilt}deg)`,
        marginLeft: `${scatter.marginLeft}px`,
        marginRight: `${scatter.marginRight}px`,
        marginTop: `${scatter.marginTop}px`,
        marginBottom: `${scatter.marginBottom}px`,
        zIndex: isHovered ? 40 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`inline-flex items-center text-xs font-mono px-3.5 py-2 rounded-lg border transition-all duration-200 cursor-default select-none ${
          isHovered
            ? "bg-white/[0.14] text-white border-white/30 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
            : "text-zinc-300 border-white/[0.08] hover:border-white/20"
        }`}
        style={{
          backgroundColor: !isHovered
            ? `rgba(255, 255, 255, ${scatter.bgOpacity})`
            : undefined,
        }}
      >
        <span>{skill}</span>
      </div>

      {/* Micro-chip minimalista de 1 linha indicando o projeto */}
      <AnimatePresence>
        {isHovered && application && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-50 whitespace-nowrap px-2.5 py-1 rounded-md bg-zinc-900/95 border border-white/10 shadow-xl text-[11px] font-mono text-zinc-300 pointer-events-none"
          >
            <span className="text-zinc-400">Projeto:</span>{" "}
            <span className="text-white font-medium">
              {application.projectName}
            </span>
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
  categoryTitle?: string;
  skillsCountLabel?: string;
}

function SpotlightCard({ category, index, className = "", categoryTitle, skillsCountLabel }: SpotlightCardProps) {
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
        className="group relative h-full min-h-[380px] sm:min-h-[400px] flex flex-col rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-6 sm:p-7 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
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
              <LiveText text={categoryTitle || category.title} mode="chars" />
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              {category.skills.length} <LiveText text={skillsCountLabel || "competências"} mode="chars" />
            </span>
          </div>
        </div>

        {/* Distribuição Orgânica das Pílulas aproveitando toda a área interior do card */}
        <div className="relative z-10 flex-1 flex flex-wrap content-around justify-around items-center py-2 px-1">
          {getShuffledSkills(category.skills, index).map((skill, itemIdx) => (
            <SkillPill
              key={skill}
              skill={skill}
              application={SKILL_APPLICATIONS[skill]}
              scatter={getSkillScatter(skill, index, itemIdx)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { t } = useLanguage();

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              <LiveText text={t.skills.sectionTitle} mode="chars" />
            </h2>
          </div>

          <LiveText
            text={t.skills.sectionSubtitle}
            as="p"
            mode="words"
            className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed"
          />
        </div>

        {/* Grid de Cards com Efeito Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {skillsData.map((category, idx) => {
            // No desktop, o 5º card (Engenharia & Práticas) ocupa 2 colunas para fechar a grade com simetria perfeita (3 no topo + 3 na base)
            const isLastWideCard = idx === 4;
            const categoryTitle = t.skills.categories[category.title] || category.title;
            return (
              <SpotlightCard
                key={category.title}
                category={category}
                index={idx}
                categoryTitle={categoryTitle}
                skillsCountLabel={t.skills.skillsCount}
                className={isLastWideCard ? "lg:col-span-2" : "lg:col-span-1"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
