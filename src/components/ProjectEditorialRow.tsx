// src/components/ProjectEditorialRow.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, HardDriveDownload, ArrowRight, Code2 } from "lucide-react";
import { Project } from "@/lib/projects-data";
import ProjectMediaGallery from "./ProjectMediaGallery";
import ProjectAmbientBackground, { PROJECT_THEMES } from "./ProjectAmbientBackground";
import LyCloudMockup from "./mockups/LyCloudMockup";
import RosaNeuralMockup from "./mockups/RosaNeuralMockup";
import LyMadhouseMockup from "./mockups/LyMadhouseMockup";
import ExoWebApiMockup from "./mockups/ExoWebApiMockup";

/**
 * Interface estendida retrocompatível com a base atual e aberta
 * para as melhorias de M1 (arquitetura e categorias) e M2/M3 (mídia/mockups).
 */
export type ProjectEditorialItem = Project;

export interface ProjectEditorialRowProps {
  project: ProjectEditorialItem;
  index: number;
  isFocused?: boolean;
}

export default function ProjectEditorialRow({ project, index, isFocused = false }: ProjectEditorialRowProps) {
  const hasMultipleImages = Boolean(project.images && project.images.length > 1);
  const isMockup = Boolean(project.mockupType);
  const isEven = index % 2 === 0;
  const theme = PROJECT_THEMES[project.slug] || PROJECT_THEMES["lymadhouse"];

  // Rastreamento de coordenadas relativas do cursor (-0.5 a 0.5) para parallax e spotlight interativo
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: relX, y: relY });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative py-12 md:py-20 px-6 sm:px-8 lg:px-12 my-6 sm:my-8 rounded-3xl min-h-[70vh] md:min-h-[82vh] flex items-center justify-center transition-all duration-500 border border-white/[0.08] shadow-2xl ${
        isFocused ? "opacity-100 ring-1 ring-white/10" : "opacity-80 hover:opacity-100"
      }`}
    >
      {/* Fundo de Vidro Fosco Escuro com Formas Geométricas em Movimento & Interatividade Dinâmica */}
      <ProjectAmbientBackground
        slug={project.slug}
        isFocused={isFocused}
        mouseRelativeX={mousePos.x}
        mouseRelativeY={mousePos.y}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full relative z-10">
        {/* Coluna de Mídia (Desktop lg:col-span-7) — Alterna lado de forma limpa (par=esq, ímpar=dir) */}
        <div className={`lg:col-span-7 ${!isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div
            className={`relative w-full rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-sm overflow-hidden group transition-all duration-300 shadow-2xl ${
              isMockup
                ? "h-[440px] sm:h-[480px] lg:h-[500px]"
                : "aspect-video"
            }`}
          >
            {project.mockupType === "lycloud" ? (
              <LyCloudMockup />
            ) : project.mockupType === "rosa" ? (
              <RosaNeuralMockup />
            ) : project.mockupType === "lymadhouse" ? (
              <LyMadhouseMockup />
            ) : project.mockupType === "exo" ? (
              <ExoWebApiMockup />
            ) : hasMultipleImages ? (
              <ProjectMediaGallery
                images={project.images!}
                title={project.title}
                className="w-full h-full"
                autoPlayInterval={3000}
                isFocused={isFocused}
              />
            ) : project.imageUrl ? (
              <Link href={`/projects/${project.slug}`} className="block relative w-full h-full">
                <Image
                  src={project.imageUrl}
                  alt={`Apresentação do projeto ${project.title}`}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  priority={index === 0}
                />
              </Link>
            ) : (
              /* Apresentação arquitetural em código (ex: Exo WebApi) */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-950/90 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-zinc-300">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-medium">
                  {project.category || "Backend & Enterprise API"}
                </span>
                <p className="text-xl font-semibold text-white mb-2">{project.title}</p>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md leading-relaxed">
                  Arquitetura corporativa em camadas com Repository Pattern, autenticação JWT Bearer e ORM Entity Framework Core.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna de Conteúdo (Desktop lg:col-span-5) — Alterna lado (par=dir, ímpar=esq) */}
        <div className={`lg:col-span-5 flex flex-col justify-center space-y-4 ${!isEven ? "lg:order-1" : "lg:order-2"}`}>
          {/* Overline de Categoria */}
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
            {project.category || "Engenharia de Software"}
          </span>

          {/* Título Display Editorial com Fonte Ampliada e Degradê Exclusivo Inspirado no Gemini */}
          <Link href={`/projects/${project.slug}`} className="block group/title">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-opacity duration-200 group-hover/title:opacity-90">
              <span className={`bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent`}>
                {project.title}
              </span>
            </h3>
          </Link>

          {/* Resumo Editorial (2 a 3 linhas) */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
            {project.description}
          </p>

          {/* Pills de Tecnologias */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-zinc-300 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links de Ação & CTA Minimalista */}
          <div className="pt-3 flex items-center justify-between sm:justify-start gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-zinc-200 transition-colors group/cta"
            >
              <span>Ver Estudo de Caso</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
            </Link>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código no GitHub de ${project.title}`}
                  title="Repositório GitHub"
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors duration-200"
                >
                  <Github size={16} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acessar projeto online: ${project.title}`}
                  title="Acessar Online"
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors duration-200"
                >
                  <ExternalLink size={16} />
                </a>
              )}

              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download do projeto: ${project.title}`}
                  title="Download da Build"
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors duration-200"
                >
                  <HardDriveDownload size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
