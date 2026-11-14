"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo, Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export interface ProjectMediaGalleryProps {
  /** Array de caminhos de imagem (URLs relativas como '/images/projects/...' ou absolutas) */
  images: string[];
  /** Título do projeto para acessibilidade, atributos alt e fallbacks */
  title: string;
  /** Classes CSS adicionais para o container externo */
  className?: string;
  /** Classe de proporção de aspecto (padrão: 'aspect-[16/10]') */
  aspectRatio?: string;
  /** Prioridade de carregamento na primeira imagem para LCP (Core Web Vitals) */
  priority?: boolean;
  /** Intervalo em milissegundos para transição automática (padrão: 3000ms quando focado). */
  autoPlayInterval?: number;
  /** Estado de foco ativo do projeto (quando focado no feed, roda o carrossel; quando desfocado, volta para imagem 0) */
  isFocused?: boolean;
  /** Callback opcional acionado quando o slide ativo é alterado */
  onSlideChange?: (index: number) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : direction < 0 ? '-100%' : '0%',
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    zIndex: 1,
    x: '0%',
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : direction > 0 ? '-100%' : '0%',
    opacity: 0,
    scale: 0.98,
  }),
};

const slideTransition: Transition = {
  x: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  opacity: { duration: 0.28, ease: 'easeInOut' },
  scale: { duration: 0.28, ease: 'easeOut' },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProjectMediaGallery({
  images = [],
  title,
  className = '',
  aspectRatio = 'aspect-video',
  priority = false,
  autoPlayInterval = 3000,
  isFocused,
  onSlideChange,
}: ProjectMediaGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  // Tupla [page, direction] atômica para garantir animações consistentes com AnimatePresence
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  // Monitorar visibilidade caso a prop isFocused não seja passada diretamente
  useEffect(() => {
    const el = galleryRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Foco ativo: controlado preferencialmente pela prop isFocused do feed, com fallback para isInView
  const activeFocus = isFocused !== undefined ? isFocused : isInView;

  const totalImages = images.length;
  // Índice normalizado de 0 a (images.length - 1) com clamp modular seguro
  const currentIndex = totalImages > 0 ? ((page % images.length) + images.length) % images.length : 0;

  // Notificar callback quando o índice mudar
  useEffect(() => {
    if (onSlideChange && totalImages > 0) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange, totalImages]);

  // Navegação para próximo / anterior
  const paginate = useCallback(
    (newDirection: number) => {
      if (totalImages <= 1) return;
      setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    },
    [totalImages]
  );

  // Navegação direta para índice específico (clique nos dots ou reset para imagem 0)
  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (totalImages <= 1) return;
      setPage(([prevPage]) => {
        const currentNorm = ((prevPage % totalImages) + totalImages) % totalImages;
        if (targetIndex === currentNorm) return [prevPage, 0];
        const newDirection = targetIndex > currentNorm ? 1 : -1;
        const diff = targetIndex - currentNorm;
        return [prevPage + diff, newDirection];
      });
    },
    [totalImages]
  );

  // Se o usuário desfocar do projeto, o modo carrossel é interrompido e volta de forma fluida para a imagem 0
  useEffect(() => {
    if (!activeFocus) {
      if (currentIndex !== 0) {
        goToSlide(0);
      }
    }
  }, [activeFocus, currentIndex, goToSlide]);

  // Carrossel inicia SOMENTE quando o usuário focar no projeto (pausa em hover)
  useEffect(() => {
    if (!activeFocus || autoPlayInterval <= 0 || totalImages <= 1 || isHovered) return;

    const timer = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeFocus, autoPlayInterval, totalImages, isHovered, paginate]);

  // Navegação por teclado (Setas Esquerda / Direita)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (totalImages <= 1) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      paginate(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      paginate(1);
    }
  };

  // Tratamento de gestos de arraste / swipe touch
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    if (totalImages <= 1) return;
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold || offset.x < -50) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold || offset.x > 50) {
      paginate(-1);
    }
  };

  const handleImageError = (index: number) => {
    setFailedIndices((prev) => new Set(prev).add(index));
  };

  // CASO 1: Array Vazio ou Nulo
  if (!images || totalImages === 0) {
    return (
      <div
        className={`group relative w-full ${aspectRatio} overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-950/60 border border-white/10 flex flex-col items-center justify-center text-zinc-500 p-6 ${className}`}
        role="region"
        aria-label={`Galeria de ${title} vazia`}
      >
        <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 text-zinc-600">
          <ImageIcon className="w-6 h-6" />
        </div>
        <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">{title}</p>
        <p className="text-[11px] text-zinc-600">Nenhuma imagem disponível no momento</p>
      </div>
    );
  }

  // CASO 2: Imagem Única (Sem overhead de carrossel, sem controles visuais)
  if (totalImages === 1) {
    const isError = failedIndices.has(0);
    return (
      <div
        className={`group relative w-full ${aspectRatio} overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-950/60 border border-white/10 ${className}`}
        role="region"
        aria-label={`Imagem única de ${title}`}
      >
        {isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 text-zinc-400 p-6 text-center select-none">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 text-zinc-600">
              <ImageIcon className="w-6 h-6" />
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">{title}</p>
            <p className="text-[11px] text-zinc-600">Prévia da imagem indisponível</p>
          </div>
        ) : (
          <Image
            src={images[0]}
            alt={`Capa do projeto ${title}`}
            fill
            unoptimized
            sizes="100vw"
            className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            priority={priority}
            onError={() => handleImageError(0)}
          />
        )}
      </div>
    );
  }

  // CASO 3: Múltiplas Imagens (Carrossel Interativo Completo no Estilo Editorial Google)
  const currentImageUrl = images[currentIndex];
  const isCurrentError = failedIndices.has(currentIndex);

  return (
    <div
      ref={galleryRef}
      className={`group relative w-full ${aspectRatio} overflow-hidden rounded-2xl md:rounded-3xl bg-zinc-950/80 border border-white/10 select-none shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-roledescription="carrossel"
      aria-label={`Galeria de imagens do projeto ${title}`}
    >
      {/* Slides Animados com Framer Motion */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
        >
          {isCurrentError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/90 text-zinc-400 p-6 text-center select-none">
              <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-3 text-zinc-600">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">{title}</p>
              <p className="text-[11px] text-zinc-600">
                Captura de tela {currentIndex + 1} indisponível
              </p>
            </div>
          ) : (
            <Image
              src={currentImageUrl}
              alt={`${title} — Imagem ${currentIndex + 1} de ${totalImages}`}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain object-center select-none pointer-events-none"
              priority={priority && currentIndex === 0}
              onError={() => handleImageError(currentIndex)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradientes Sutis para Contraste dos Controles */}
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

      {/* Botão Circular Anterior (<) com Backdrop Blur */}
      <button
        type="button"
        aria-label="Imagem anterior"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          paginate(-1);
        }}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/15 hover:border-white/40 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-emerald-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 -translate-x-0.5" strokeWidth={2.2} />
      </button>

      {/* Botão Circular Próximo (>) Inspirado na Referência Visual do Google */}
      <button
        type="button"
        aria-label="Próxima imagem"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          paginate(1);
        }}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/90 text-white/90 hover:text-white border border-white/15 hover:border-white/40 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-emerald-400 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5 translate-x-0.5" strokeWidth={2.2} />
      </button>

      {/* Paginação em Pontos: • ○ ○ Fiel à Referência Editorial */}
      <div
        className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg pointer-events-auto"
        role="tablist"
        aria-label={`Navegação de imagens de ${title}`}
      >
        {images.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir para imagem ${idx + 1} de ${totalImages}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(idx);
              }}
              className="group/dot relative p-1 transition-transform duration-200 focus:outline-none focus-visible:scale-125"
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-2 h-2 bg-white'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
