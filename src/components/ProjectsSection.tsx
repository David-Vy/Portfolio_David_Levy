// src/components/ProjectsSection.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import ProjectEditorialRow from "./ProjectEditorialRow";

export default function ProjectsSection() {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isSectionActive, setIsSectionActive] = useState<boolean>(false);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioningRef = useRef<boolean>(false);
  const focusedIndexRef = useRef<number>(0);

  // Manter ref sincronizada para acesso imediato dentro dos listeners
  useEffect(() => {
    focusedIndexRef.current = focusedIndex;
  }, [focusedIndex]);

  // Função central para mover a "CÂMERA" (visão do usuário) diretamente para o projeto
  const scrollToProject = useCallback((targetIndex: number) => {
    const total = projectsData.length;
    if (targetIndex < 0 || targetIndex >= total) return;

    const el = rowRefs.current[targetIndex];
    if (!el) return;

    isTransitioningRef.current = true;
    setFocusedIndex(targetIndex);

    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;

    // Calcula o offset exato para centralizar perfeitamente o projeto na visão do usuário
    const headerHeight = 72;
    const centerOffset = (window.innerHeight - rect.height) / 2;
    const targetY = absoluteTop - Math.max(headerHeight, centerOffset);

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    // Desbloqueia novas transições após o término suave do movimento da câmera
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 700);
  }, []);

  // Monitorar rolagem para identificar qual projeto a câmera está enquadrando
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const sectionEl = document.getElementById("projetos");
        if (!sectionEl) return;

        const sectionRect = sectionEl.getBoundingClientRect();
        const inView = sectionRect.bottom >= 150 && sectionRect.top <= window.innerHeight - 150;
        setIsSectionActive(inView);

        if (!inView) {
          setFocusedIndex(-1);
          return;
        }

        if (isTransitioningRef.current) return;

        const viewportCenter = window.innerHeight / 2;
        let bestIndex = 0;
        let minDistance = Infinity;

        rowRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const dist = Math.abs(elementCenter - viewportCenter);

          if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
            if (dist < minDistance) {
              minDistance = dist;
              bestIndex = idx;
            }
          }
        });

        setFocusedIndex((prev) => (prev !== bestIndex ? bestIndex : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Controle de Câmera estilo Feed via Mouse Wheel, Touch Swipe e Teclado
  useEffect(() => {
    // 1. Mouse Wheel — Rolar para cima ou baixo move a visão (câmera) de projeto em projeto
    const onWheel = (e: WheelEvent) => {
      const sectionEl = document.getElementById("projetos");
      if (!sectionEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      // Ativa o controle de câmera quando o usuário estiver no campo da seção de projetos
      const inProjectsZone = sectionRect.top <= 140 && sectionRect.bottom >= window.innerHeight - 100;

      if (!inProjectsZone) return;

      const currentIdx = focusedIndexRef.current;
      const isScrollingDown = e.deltaY > 30;
      const isScrollingUp = e.deltaY < -30;

      if (isTransitioningRef.current) {
        if (Math.abs(e.deltaY) > 10) {
          e.preventDefault();
        }
        return;
      }

      if (isScrollingDown) {
        if (currentIdx < projectsData.length - 1) {
          e.preventDefault();
          scrollToProject(currentIdx + 1);
        }
        // No último projeto, permite que o scroll natural prossiga para as seções seguintes
      } else if (isScrollingUp) {
        if (currentIdx > 0) {
          e.preventDefault();
          scrollToProject(currentIdx - 1);
        }
        // No primeiro projeto, permite que o scroll natural suba de volta para a Hero
      }
    };

    // 2. Touch Gestures para Mobile e Tablets
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const sectionEl = document.getElementById("projetos");
      if (!sectionEl || isTransitioningRef.current) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const inProjectsZone = sectionRect.top <= 140 && sectionRect.bottom >= window.innerHeight - 100;
      if (!inProjectsZone) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const currentIdx = focusedIndexRef.current;

      if (deltaY > 50 && currentIdx < projectsData.length - 1) {
        scrollToProject(currentIdx + 1);
      } else if (deltaY < -50 && currentIdx > 0) {
        scrollToProject(currentIdx - 1);
      }
    };

    // 3. Teclado (Setas para Cima/Baixo e PageUp/PageDown)
    const onKeyDown = (e: KeyboardEvent) => {
      const sectionEl = document.getElementById("projetos");
      if (!sectionEl || isTransitioningRef.current) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const inProjectsZone = sectionRect.top <= 140 && sectionRect.bottom >= window.innerHeight - 100;
      if (!inProjectsZone) return;

      const currentIdx = focusedIndexRef.current;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (currentIdx < projectsData.length - 1) {
          e.preventDefault();
          scrollToProject(currentIdx + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (currentIdx > 0) {
          e.preventDefault();
          scrollToProject(currentIdx - 1);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [scrollToProject]);

  return (
    <section id="projetos" className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Cabeçalho Editorial da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 border-b border-white/[0.08] pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              01 — Engenharia & Sistemas
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Projetos Selecionados
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-lg font-normal leading-relaxed">
          Sistemas distribuídos em tempo real, plataformas de streaming de baixa latência, arquiteturas em nuvem e aplicações web e desktop de alta performance.
        </p>
      </div>

      {/* Lista Editorial em Linhas Abertas (Feed com Câmera de Foco Automático) */}
      <div className="flex flex-col">
        {projectsData.map((project, index) => (
          <div
            key={project.slug}
            ref={(el) => {
              rowRefs.current[index] = el;
            }}
            className="scroll-mt-24 md:scroll-mt-32"
          >
            <ProjectEditorialRow
              project={project}
              index={index}
              isFocused={index === focusedIndex}
            />
          </div>
        ))}
      </div>

      {/* Indicador Flutuante de Feed / Câmera (Desktop) */}
      {isSectionActive && focusedIndex >= 0 && (
        <aside
          aria-label="Controle de Câmera do Feed de Projetos"
          className="fixed right-6 bottom-8 z-40 hidden xl:flex flex-col items-center gap-2 px-3 py-3 rounded-full bg-black/75 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 animate-fade-in"
        >
          <button
            type="button"
            onClick={() => scrollToProject(focusedIndex - 1)}
            disabled={focusedIndex === 0}
            aria-label="Projeto anterior"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronUp size={16} />
          </button>

          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-semibold py-1">
            {String(focusedIndex + 1).padStart(2, "0")}
            <span className="text-zinc-600 block text-center">/</span>
            <span className="text-zinc-500">{String(projectsData.length).padStart(2, "0")}</span>
          </span>

          <button
            type="button"
            onClick={() => scrollToProject(focusedIndex + 1)}
            disabled={focusedIndex === projectsData.length - 1}
            aria-label="Próximo projeto"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          >
            <ChevronDown size={16} />
          </button>
        </aside>
      )}
    </section>
  );
}
