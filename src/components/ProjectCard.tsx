// src/components/ProjectCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, HardDriveDownload, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/projects-data';
import DepthCard from './DepthCard';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <DepthCard
        maxTilt={featured ? 4 : 6}
        glowColor="rgba(255, 255, 255, 0.14)"
        className="h-full flex flex-col justify-between overflow-hidden"
      >
        {/* Container da Imagem com proporção cinematográfica */}
        <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden bg-zinc-900 rounded-t-[inherit]">
          <div className={`relative w-full ${featured ? 'h-72 sm:h-96 md:h-[420px]' : 'h-64 sm:h-80'}`}>
            <Image
              src={project.imageUrl}
              alt={`Capa do projeto ${project.title}`}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 600px"}
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
              priority={featured}
            />
            
            {/* Gradiente superior para garantir contraste perfeito em imagens claras */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Gradiente inferior para fusão suave com o card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-700" />
            
            {/* Badge flutuante de Explorar no canto superior com transição lenta */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono py-1.5 px-3 rounded-full bg-black/90 text-white border border-white/20 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:border-white/40 group-hover:bg-black group-hover:scale-105">
                <span>Ver Case</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            {/* Destaque Tag se for o projeto principal */}
            {featured && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-black/90 backdrop-blur-md border border-white/20 text-white font-medium shadow-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Destaque Principal
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Conteúdo textual do Card */}
        <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
          <div>
            {/* Tags de tecnologias */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Título do Projeto */}
            <Link href={`/projects/${project.slug}`} className="block">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors duration-500 flex items-center gap-2">
                {project.title}
              </h3>
            </Link>

            {/* Descrição resumida */}
            <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Links de acesso direto no rodapé do card */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-semibold text-white hover:text-zinc-300 flex items-center gap-1.5 transition-colors duration-300"
            >
              <span>Ver detalhes completos</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <div className="flex items-center gap-2.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver código no GitHub"
                  aria-label={`Código no GitHub de ${project.title}`}
                  className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <Github size={15} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Acessar projeto online"
                  aria-label={`Acessar ${project.title} online`}
                  className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <ExternalLink size={15} />
                </a>
              )}

              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Fazer download da build"
                  aria-label={`Download do projeto ${project.title}`}
                  className="p-2 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <HardDriveDownload size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </DepthCard>
    </motion.div>
  );
}