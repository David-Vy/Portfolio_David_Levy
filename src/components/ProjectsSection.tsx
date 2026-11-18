// src/components/ProjectsSection.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import ProjectEditorialRow from "./ProjectEditorialRow";
import { useLanguage } from "@/context/LanguageContext";
import LiveText from "@/components/LiveText";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isSectionActive, setIsSectionActive] = useState<boolean>(false);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioningRef = useRef<boolean>(false);
  const focusedIndexRef = useRef<number>(0);

  // Sincronização atômica da ref para acesso sem atraso dentro dos event listeners
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

    // Calcula a posição de rolagem para centralizar perfeitamente o card do projeto na tela
    const centerOffset = (window.innerHeight - rect.height) / 2;
    const targetY = absoluteTop - Math.max(36, centerOffset);

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    // Desbloqueia novas transições após o término do deslocamento suave da câmera
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 700);
  }, []);

  // Se o usuário veio de um retorno de projeto (ex: #projeto-lycloud-server), posiciona diretamente nele
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const rawHash = window.location.hash.replace("#", "");
      const cleanSlug = rawHash.replace(/^projeto-/, "");
      const targetIndex = projectsData.findIndex(
        (p) => p.slug === cleanSlug || p.slug === rawHash
      );
      if (targetIndex !== -1) {
        const timer = setTimeout(() => {
          scrollToProject(targetIndex);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [scrollToProject]);

  // Monitorar rolagem livre para identificar qual projeto a câmera está enquadrando
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

        // Se uma transição induzida pela câmera já estiver em andamento, respeita seu target
        if (isTransitioningRef.current) return;

        const total = projectsData.length;
        const lastIdx = total - 1;

        // Se o usuário está na entrada superior da seção (cabeçalho visível), fixa o primeiro projeto
        if (sectionRect.top >= 0 && rowRefs.current[0]) {
          const rect0 = rowRefs.current[0].getBoundingClientRect();
          if (rect0.top < window.innerHeight && rect0.bottom > 0) {
            setFocusedIndex(0);
            return;
          }
        }

        // Se o usuário está no rodapé da seção (entrando por baixo), fixa o último projeto
        if (sectionRect.bottom <= window.innerHeight + 150 && rowRefs.current[lastIdx]) {
          const rectLast = rowRefs.current[lastIdx].getBoundingClientRect();
          if (rectLast.top < window.innerHeight && rectLast.bottom > 0) {
            setFocusedIndex(lastIdx);
            return;
          }
        }

        // Algoritmo de Visibilidade Dominante: identifica o projeto com maior área visível na tela
        let bestIndex = 0;
        let maxVisibleHeight = 0;

        rowRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(window.innerHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            bestIndex = idx;
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

  // Controle de Câmera estilo Feed via Mouse Wheel, Touch Gestures e Teclado
  useEffect(() => {
    // 1. Mouse Wheel — Rolar para cima ou baixo move a visão (câmera) projeto a projeto sem pular o 1º ou último
    const onWheel = (e: WheelEvent) => {
      const sectionEl = document.getElementById("projetos");
      if (!sectionEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      // Ativa o controle de câmera exclusivamente dentro da área da seção de projetos
      const inProjectsZone = sectionRect.top <= 120 && sectionRect.bottom >= window.innerHeight - 100;
      if (!inProjectsZone) return;

      if (isTransitioningRef.current) {
        if (Math.abs(e.deltaY) > 8) {
          e.preventDefault();
        }
        return;
      }

      const total = projectsData.length;
      const currentIdx = focusedIndexRef.current;
      const safeCurrentIdx = currentIdx < 0 ? 0 : Math.min(total - 1, currentIdx);
      const currentEl = rowRefs.current[safeCurrentIdx];

      let isCurrentCentered = false;
      let isCurrentBelowCenter = false;
      let isCurrentAboveCenter = false;

      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const centerDiff = elementCenter - viewportCenter;

        isCurrentCentered = Math.abs(centerDiff) < 110;
        isCurrentBelowCenter = centerDiff > 110;
        isCurrentAboveCenter = centerDiff < -110;
      }

      const isScrollingDown = e.deltaY > 30;
      const isScrollingUp = e.deltaY < -30;

      if (isScrollingDown) {
        // Se o projeto atual ainda não estiver centralizado (ex: entrando na seção de cima), primeiro centraliza o projeto 0
        if (!isCurrentCentered && (isCurrentBelowCenter || safeCurrentIdx === 0)) {
          e.preventDefault();
          scrollToProject(safeCurrentIdx);
        } else if (safeCurrentIdx < total - 1) {
          // Projeto atual já está centralizado: avança para o próximo
          e.preventDefault();
          scrollToProject(safeCurrentIdx + 1);
        }
        // No último projeto já centralizado, permite que o scroll natural desça suavemente para a próxima seção
      } else if (isScrollingUp) {
        // Se o projeto atual ainda não estiver centralizado (ex: entrando na seção por baixo), primeiro centraliza o projeto 7
        if (!isCurrentCentered && (isCurrentAboveCenter || safeCurrentIdx === total - 1)) {
          e.preventDefault();
          scrollToProject(safeCurrentIdx);
        } else if (safeCurrentIdx > 0) {
          // Projeto atual já está centralizado: recua para o anterior
          e.preventDefault();
          scrollToProject(safeCurrentIdx - 1);
        }
        // No primeiro projeto já centralizado, permite que o scroll natural suba suavemente para a seção anterior
      }
    };

    // 2. Touch Gestures para Dispositivos Móveis e Tablets
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const sectionEl = document.getElementById("projetos");
      if (!sectionEl || isTransitioningRef.current) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const inProjectsZone = sectionRect.top <= 120 && sectionRect.bottom >= window.innerHeight - 100;
      if (!inProjectsZone) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) < 45) return;

      const total = projectsData.length;
      const currentIdx = focusedIndexRef.current;
      const safeCurrentIdx = currentIdx < 0 ? 0 : Math.min(total - 1, currentIdx);
      const currentEl = rowRefs.current[safeCurrentIdx];

      let isCurrentCentered = false;
      let isCurrentBelowCenter = false;
      let isCurrentAboveCenter = false;

      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const centerDiff = elementCenter - viewportCenter;

        isCurrentCentered = Math.abs(centerDiff) < 110;
        isCurrentBelowCenter = centerDiff > 110;
        isCurrentAboveCenter = centerDiff < -110;
      }

      if (deltaY > 45) {
        // Swipe para cima (desce a visão)
        if (!isCurrentCentered && (isCurrentBelowCenter || safeCurrentIdx === 0)) {
          scrollToProject(safeCurrentIdx);
        } else if (safeCurrentIdx < total - 1) {
          scrollToProject(safeCurrentIdx + 1);
        }
      } else if (deltaY < -45) {
        // Swipe para baixo (sobe a visão)
        if (!isCurrentCentered && (isCurrentAboveCenter || safeCurrentIdx === total - 1)) {
          scrollToProject(safeCurrentIdx);
        } else if (safeCurrentIdx > 0) {
          scrollToProject(safeCurrentIdx - 1);
        }
      }
    };

    // 3. Teclado (Setas para Cima/Baixo e PageUp/PageDown)
    const onKeyDown = (e: KeyboardEvent) => {
      const sectionEl = document.getElementById("projetos");
      if (!sectionEl || isTransitioningRef.current) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const inProjectsZone = sectionRect.top <= 120 && sectionRect.bottom >= window.innerHeight - 100;
      if (!inProjectsZone) return;

      const total = projectsData.length;
      const currentIdx = focusedIndexRef.current;
      const safeCurrentIdx = currentIdx < 0 ? 0 : Math.min(total - 1, currentIdx);

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        if (safeCurrentIdx < total - 1) {
          e.preventDefault();
          scrollToProject(safeCurrentIdx + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (safeCurrentIdx > 0) {
          e.preventDefault();
          scrollToProject(safeCurrentIdx - 1);
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
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            <LiveText text={t.projects.sectionTitle} mode="chars" />
          </h2>
        </div>

        <LiveText
          text={t.projects.sectionSubtitle}
          as="p"
          mode="words"
          className="text-zinc-400 text-sm sm:text-base max-w-lg font-normal leading-relaxed"
        />
      </div>

      {/* Lista Editorial em Linhas Abertas (Feed com Câmera de Foco Automático) */}
      <div className="flex flex-col">
        {projectsData.map((project, index) => (
          <div
            key={project.slug}
            id={`projeto-${project.slug}`}
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
          aria-label={t.projects.feedNavigation}
          className="fixed right-6 bottom-8 z-40 hidden xl:flex flex-col items-center gap-1.5 px-2.5 py-2.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/[0.08] transition-opacity duration-300 shadow-2xl"
        >
          <button
            type="button"
            onClick={() => scrollToProject(focusedIndex - 1)}
            disabled={focusedIndex === 0}
            aria-label={t.projects.prevProject}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronUp size={15} />
          </button>

          <span className="text-[10px] font-mono tracking-wider text-zinc-300 py-0.5">
            {String(focusedIndex + 1).padStart(2, "0")}
            <span className="text-zinc-600 block text-center">/</span>
            <span className="text-zinc-500">{String(projectsData.length).padStart(2, "0")}</span>
          </span>

          <button
            type="button"
            onClick={() => scrollToProject(focusedIndex + 1)}
            disabled={focusedIndex === projectsData.length - 1}
            aria-label={t.projects.nextProject}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronDown size={15} />
          </button>
        </aside>
      )}
    </section>
  );
}
