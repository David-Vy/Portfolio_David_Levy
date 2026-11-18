// src/app/projects/[slug]/ProjectPageClient.tsx
"use client";

import React from "react";
import { Project } from "@/lib/projects-data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  HardDriveDownload,
  Layers,
  Code2
} from "lucide-react";
import ProjectMediaGallery from "@/components/ProjectMediaGallery";
import { PROJECT_THEMES } from "@/components/ProjectAmbientBackground";
import LyCloudMockup from "@/components/mockups/LyCloudMockup";
import RosaNeuralMockup from "@/components/mockups/RosaNeuralMockup";
import ExoWebApiMockup from "@/components/mockups/ExoWebApiMockup";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectPageClient({ project }: { project: Project }) {
  const { language, t } = useLanguage();
  const projectTranslation = t.projects.items[project.slug];
  const displayCategory = projectTranslation?.category || project.category;
  const displayDescription = projectTranslation?.description || project.description;
  const displayLongDescriptionHtml = projectTranslation?.longDescriptionHtml || project.longDescriptionHtml;

  const hasLongDescription = displayLongDescriptionHtml && displayLongDescriptionHtml.length > 0;
  const hasLinks = project.githubUrl || project.liveUrl || project.downloadUrl;
  const hasMultipleImages = Boolean(project.images && project.images.length > 1);
  const theme = PROJECT_THEMES[project.slug] || PROJECT_THEMES["lymadhouse"];

  // Renderizador Inteligente de Mídia / Mockup / Fallback
  const renderProjectMedia = () => {
    // 1. Mockup interativo LyCloud Server (Telemetry Dashboard)
    if (project.mockupType === "lycloud") {
      return (
        <div className="w-full aspect-[16/10] md:aspect-[21/10] min-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
          <LyCloudMockup />
        </div>
      );
    }

    // 2. Mockup interativo Projeto Rosa (Neural Terminal CLI)
    if (project.mockupType === "rosa") {
      return (
        <div className="w-full aspect-[16/10] md:aspect-[21/10] min-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
          <RosaNeuralMockup />
        </div>
      );
    }

    // 2.1 Mockup interativo Exo WebApi (.NET Core 8 Gateway)
    if (project.mockupType === "exo") {
      return (
        <div className="w-full aspect-[16/10] md:aspect-[21/10] min-h-[460px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
          <ExoWebApiMockup />
        </div>
      );
    }

    // 3. Galeria Multi-Imagem com Controles & Carrossel
    if (hasMultipleImages) {
      return (
        <div className="w-full shadow-2xl">
          <ProjectMediaGallery
            images={project.images!}
            title={project.title}
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
            priority
          />
        </div>
      );
    }

    // 4. Imagem Única de Alta Resolução (Qualidade Original)
    if (project.imageUrl) {
      return (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] bg-zinc-950 shadow-2xl">
          <Image
            src={project.imageUrl}
            alt={`Apresentação do projeto ${project.title}`}
            fill
            unoptimized
            quality={100}
            sizes="100vw"
            className="object-contain object-center"
            priority
          />
        </div>
      );
    }

    // 5. Fallback Arquitetural Estilizado em Código (ex: Exo WebApi)
    return (
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-zinc-950/80 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-emerald-400">
          <Code2 className="w-7 h-7" />
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 mb-2 font-medium">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm font-mono text-zinc-400 max-w-md">
          Arquitetura de microsserviços, contratos RESTful e persistência corporativa.
        </p>
      </div>
    );
  };

  return (
    <motion.div
      className="relative min-h-screen bg-background text-text pt-28 pb-32 px-6 md:px-10 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Botão Voltar */}
      <div className="mb-10">
        <Link
          href={`/#projeto-${project.slug}`}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors py-2 px-4 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
        >
          <ArrowLeft size={14} />
          <span>{t.projectDetail.backToProjects}</span>
        </Link>
      </div>

      {/* Cabeçalho Editorial do Projeto */}
      <header className="mb-12">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium block mb-4">
          {displayCategory}
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
          <span className={`bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent`}>
            {project.title}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl leading-relaxed font-normal">
          {displayDescription}
        </p>

        {/* Tags de Tecnologias */}
        <div className="flex flex-wrap gap-2 mt-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-zinc-300 px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Contêiner de Mídia Principal (Galeria Multi-Imagem, Mockup Interativo ou Fallback) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        {renderProjectMedia()}
      </motion.div>

      {/* Grid de Conteúdo Detalhado e Barra Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Coluna Principal: Detalhes, Arquitetura e Engenharia */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t.projectDetail.overviewArchitecture}
            </h2>
          </div>

          {hasLongDescription ? (
            <div
              className="prose prose-invert max-w-none text-zinc-300 text-base sm:text-lg leading-relaxed [&>h3]:text-white [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:tracking-tight [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:border-b [&>h3]:border-white/[0.06] [&>h3]:pb-2 [&>p]:mb-6 [&>p]:text-zinc-400 [&>p>strong]:text-white [&>p>strong]:font-medium [&>ul]:space-y-2 [&>ul]:mb-6 [&>ul>li]:text-zinc-400 [&>code]:text-emerald-300 [&>code]:bg-white/[0.06] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded"
              dangerouslySetInnerHTML={{ __html: displayLongDescriptionHtml! }}
            />
          ) : (
            <p className="text-zinc-400">
              {t.projectDetail.documentationPending}
            </p>
          )}
        </div>

        {/* Barra Lateral: Links de Acesso Direto e Ficha Técnica */}
        <aside className="lg:col-span-4 sticky top-28 space-y-6">
          {hasLinks && (
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-zinc-950">
              <h3 className="text-sm font-medium text-white tracking-tight mb-4">
                {t.projectDetail.projectLinks}
              </h3>

              <div className="space-y-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github size={16} />
                      <span>{t.projectDetail.githubRepo}</span>
                    </div>
                    <ExternalLink size={13} className="opacity-50" />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors text-sm font-medium"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink size={16} />
                      <span>{t.projectDetail.livePlatform}</span>
                    </div>
                    <ExternalLink size={13} />
                  </a>
                )}

                {project.downloadUrl && (
                  <a
                    href={project.downloadUrl}
                    download
                    className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <HardDriveDownload size={16} />
                      <span>{t.projectDetail.downloadBuild}</span>
                    </div>
                    <ExternalLink size={13} className="opacity-50" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Destaques de Arquitetura na Barra Lateral (se presentes) */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div className="p-6 rounded-2xl border border-white/[0.08] bg-zinc-950">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                {language === "en" ? "Architecture Highlights" : "Destaques Arquiteturais"}
              </h3>
              <ul className="space-y-2 text-xs font-mono text-zinc-400">
                {project.architectureHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-zinc-600 select-none">•</span>
                    <span className="leading-relaxed text-zinc-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ficha Técnica Rápida */}
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-zinc-950 text-xs font-mono space-y-3">
            <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-500 uppercase tracking-wider">{language === "en" ? "Engineer" : "Desenvolvedor"}</span>
              <span className="text-zinc-300">David Levy</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-500 uppercase tracking-wider">{language === "en" ? "Domain" : "Categoria"}</span>
              <span className="text-zinc-300 text-right max-w-[160px] truncate" title={displayCategory}>
                {displayCategory}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
              <span className="text-zinc-500 uppercase tracking-wider">Status</span>
              <span className="text-zinc-300">{language === "en" ? "Complete" : "Completo"}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-zinc-500 uppercase tracking-wider">{language === "en" ? "Core Tech" : "Tags Principais"}</span>
              <span className="text-zinc-300">{project.tags.slice(0, 3).join(", ")}</span>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
