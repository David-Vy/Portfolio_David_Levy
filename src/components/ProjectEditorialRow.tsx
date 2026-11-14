// src/components/ProjectEditorialRow.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, HardDriveDownload, ArrowRight, Code2 } from "lucide-react";
import { Project } from "@/lib/projects-data";
import ProjectMediaGallery from "./ProjectMediaGallery";
import LyCloudMockup from "./mockups/LyCloudMockup";
import RosaNeuralMockup from "./mockups/RosaNeuralMockup";
import LyMadhouseMockup from "./mockups/LyMadhouseMockup";

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative py-10 md:py-16 min-h-[70vh] md:min-h-[82vh] flex items-center justify-center transition-opacity duration-700 ${
        isFocused ? "opacity-100" : "opacity-45 hover:opacity-80"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
        {/* Coluna de Mídia (Desktop lg:col-span-7) — Alterna lado de forma limpa (par=esq, ímpar=dir) */}
        <div className={`lg:col-span-7 ${!isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div
            className={`relative w-full rounded-2xl md:rounded-3xl border border-white/10 bg-zinc-950/40 overflow-hidden group shadow-2xl transition-all duration-500 ${
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
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                  priority={index === 0}
                />
              </Link>
            ) : (
              /* Apresentação arquitetural em código (ex: Exo WebApi) */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-950/80 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-emerald-400">
                  <Code2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 mb-2 font-medium">
                  {project.category || "Backend & Enterprise API"}
                </span>
                <p className="text-xl font-bold text-white mb-2">{project.title}</p>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md leading-relaxed">
                  Arquitetura corporativa em camadas com Repository Pattern, autenticação JWT Bearer e ORM Entity Framework Core.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna de Conteúdo (Desktop lg:col-span-5) — Alterna lado (par=dir, ímpar=esq) */}
        <div className={`lg:col-span-5 flex flex-col justify-center space-y-5 ${!isEven ? "lg:order-1" : "lg:order-2"}`}>
          {/* Overline de Categoria */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 font-medium">
              {project.category || "Engenharia de Software"}
            </span>
          </div>

          {/* Título Display Editorial */}
          <Link href={`/projects/${project.slug}`} className="block group/title">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover/title:text-emerald-300 transition-colors duration-300">
              {project.title}
            </h3>
          </Link>

          {/* Resumo Editorial (2 a 3 linhas) */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
            {project.description}
          </p>

          {/* Destaques Técnicos de Arquitetura (Se presentes no projeto) */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <ul className="space-y-1.5 pt-2 border-t border-white/[0.04] text-xs font-mono text-zinc-300">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                  <span className="leading-snug">{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Pills de Tecnologias */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links de Ação & CTA Minimalista */}
          <div className="pt-3 flex items-center justify-between sm:justify-start gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors group/cta"
            >
              <span>Ver Estudo de Caso</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código no GitHub de ${project.title}`}
                  title="Repositório GitHub"
                  className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <Github size={15} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acessar projeto online: ${project.title}`}
                  title="Acessar Online"
                  className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <ExternalLink size={15} />
                </a>
              )}

              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download do projeto: ${project.title}`}
                  title="Download da Build"
                  className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <HardDriveDownload size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
