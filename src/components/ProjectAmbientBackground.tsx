// src/components/ProjectAmbientBackground.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface ProjectThemeConfig {
  titleGradient: string;
  accentGlow: string;
  shapes: {
    id: string;
    type: "circle" | "rect" | "diamond" | "ring" | "pill" | "hexagon";
    width: number;
    height: number;
    top: string;
    left: string;
    color: string;
    blur: string;
    opacity: number;
    duration: number;
    floatDistance: number;
    parallaxFactor: number;
  }[];
}

export const PROJECT_THEMES: Record<string, ProjectThemeConfig> = {
  lymadhouse: {
    // Electric Gemini Cyan & Indigo (Streaming / C++ / WebRTC)
    titleGradient: "from-cyan-300 via-sky-400 to-indigo-400",
    accentGlow: "rgba(56, 189, 248, 0.15)",
    shapes: [
      {
        id: "lm-1",
        type: "diamond",
        width: 320,
        height: 320,
        top: "10%",
        left: "5%",
        color: "linear-gradient(135deg, rgba(6, 182, 212, 0.28), rgba(59, 130, 246, 0.12))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 16,
        floatDistance: 35,
        parallaxFactor: 30,
      },
      {
        id: "lm-2",
        type: "circle",
        width: 380,
        height: 380,
        top: "40%",
        left: "65%",
        color: "radial-gradient(circle, rgba(99, 102, 241, 0.25), rgba(14, 165, 233, 0.05))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 18,
        floatDistance: 40,
        parallaxFactor: -35,
      },
      {
        id: "lm-3",
        type: "hexagon",
        width: 240,
        height: 240,
        top: "60%",
        left: "25%",
        color: "linear-gradient(45deg, rgba(14, 165, 233, 0.22), rgba(99, 102, 241, 0.15))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 14,
        floatDistance: 25,
        parallaxFactor: 20,
      },
    ],
  },

  "lycloud-server": {
    // Mint Emerald, Teal & Cyan (Cloud / BaaS / Docker)
    titleGradient: "from-emerald-300 via-teal-300 to-cyan-400",
    accentGlow: "rgba(20, 184, 166, 0.15)",
    shapes: [
      {
        id: "lc-1",
        type: "rect",
        width: 340,
        height: 300,
        top: "15%",
        left: "60%",
        color: "linear-gradient(135deg, rgba(16, 185, 129, 0.28), rgba(20, 184, 166, 0.12))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 17,
        floatDistance: 30,
        parallaxFactor: -28,
      },
      {
        id: "lc-2",
        type: "circle",
        width: 360,
        height: 360,
        top: "45%",
        left: "10%",
        color: "radial-gradient(circle, rgba(6, 182, 212, 0.25), rgba(16, 185, 129, 0.05))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 19,
        floatDistance: 40,
        parallaxFactor: 35,
      },
      {
        id: "lc-3",
        type: "pill",
        width: 280,
        height: 180,
        top: "70%",
        left: "55%",
        color: "linear-gradient(45deg, rgba(20, 184, 166, 0.22), rgba(16, 185, 129, 0.1))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 15,
        floatDistance: 25,
        parallaxFactor: -20,
      },
    ],
  },

  lyvia: {
    // Electric Violet, Fuchsia & Rose (Distributed HLS Media Streaming)
    titleGradient: "from-violet-300 via-fuchsia-400 to-rose-400",
    accentGlow: "rgba(217, 70, 239, 0.15)",
    shapes: [
      {
        id: "lv-1",
        type: "ring",
        width: 360,
        height: 360,
        top: "15%",
        left: "10%",
        color: "radial-gradient(circle, rgba(139, 92, 246, 0.3), rgba(217, 70, 239, 0.08))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 18,
        floatDistance: 35,
        parallaxFactor: 32,
      },
      {
        id: "lv-2",
        type: "circle",
        width: 380,
        height: 380,
        top: "45%",
        left: "60%",
        color: "radial-gradient(circle, rgba(244, 63, 94, 0.24), rgba(139, 92, 246, 0.06))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 20,
        floatDistance: 45,
        parallaxFactor: -38,
      },
      {
        id: "lv-3",
        type: "diamond",
        width: 260,
        height: 260,
        top: "65%",
        left: "25%",
        color: "linear-gradient(135deg, rgba(217, 70, 239, 0.22), rgba(244, 63, 94, 0.12))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 15,
        floatDistance: 25,
        parallaxFactor: 22,
      },
    ],
  },

  "icre-web": {
    // Warm Sunset Amber, Coral & Gold (Fintech / PIX / Accounting)
    titleGradient: "from-amber-300 via-orange-400 to-rose-400",
    accentGlow: "rgba(245, 158, 11, 0.15)",
    shapes: [
      {
        id: "ic-1",
        type: "diamond",
        width: 320,
        height: 320,
        top: "15%",
        left: "65%",
        color: "linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(249, 115, 22, 0.12))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 17,
        floatDistance: 30,
        parallaxFactor: -30,
      },
      {
        id: "ic-2",
        type: "circle",
        width: 360,
        height: 360,
        top: "40%",
        left: "5%",
        color: "radial-gradient(circle, rgba(251, 113, 133, 0.25), rgba(245, 158, 11, 0.06))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 19,
        floatDistance: 35,
        parallaxFactor: 32,
      },
      {
        id: "ic-3",
        type: "rect",
        width: 280,
        height: 200,
        top: "65%",
        left: "50%",
        color: "linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(251, 113, 133, 0.1))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 15,
        floatDistance: 25,
        parallaxFactor: -20,
      },
    ],
  },

  intellistock: {
    // Electric Lime, Emerald & Mint (Logistics & Inventory)
    titleGradient: "from-lime-300 via-emerald-400 to-teal-400",
    accentGlow: "rgba(132, 204, 22, 0.15)",
    shapes: [
      {
        id: "is-1",
        type: "rect",
        width: 340,
        height: 280,
        top: "10%",
        left: "15%",
        color: "linear-gradient(135deg, rgba(132, 204, 22, 0.26), rgba(16, 185, 129, 0.14))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 16,
        floatDistance: 30,
        parallaxFactor: 28,
      },
      {
        id: "is-2",
        type: "circle",
        width: 380,
        height: 380,
        top: "45%",
        left: "60%",
        color: "radial-gradient(circle, rgba(16, 185, 129, 0.25), rgba(20, 184, 166, 0.06))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 19,
        floatDistance: 40,
        parallaxFactor: -35,
      },
      {
        id: "is-3",
        type: "hexagon",
        width: 250,
        height: 250,
        top: "65%",
        left: "20%",
        color: "linear-gradient(45deg, rgba(20, 184, 166, 0.22), rgba(132, 204, 22, 0.1))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 14,
        floatDistance: 25,
        parallaxFactor: 20,
      },
    ],
  },

  utilify: {
    // Sky Blue, Royal Sapphire & Indigo (Multi-tool Utility)
    titleGradient: "from-sky-300 via-blue-400 to-indigo-400",
    accentGlow: "rgba(56, 189, 248, 0.15)",
    shapes: [
      {
        id: "ut-1",
        type: "circle",
        width: 360,
        height: 360,
        top: "15%",
        left: "60%",
        color: "radial-gradient(circle, rgba(56, 189, 248, 0.28), rgba(37, 99, 235, 0.08))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 17,
        floatDistance: 35,
        parallaxFactor: -30,
      },
      {
        id: "ut-2",
        type: "diamond",
        width: 320,
        height: 320,
        top: "40%",
        left: "10%",
        color: "linear-gradient(135deg, rgba(37, 99, 235, 0.24), rgba(99, 102, 241, 0.1))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 20,
        floatDistance: 40,
        parallaxFactor: 35,
      },
      {
        id: "ut-3",
        type: "pill",
        width: 280,
        height: 170,
        top: "65%",
        left: "45%",
        color: "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(56, 189, 248, 0.12))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 15,
        floatDistance: 25,
        parallaxFactor: -18,
      },
    ],
  },

  "projeto-rosa": {
    // Neon Rose, Magenta & Purple (DirectML GRU Neural Network)
    titleGradient: "from-rose-400 via-pink-400 to-purple-400",
    accentGlow: "rgba(244, 63, 94, 0.15)",
    shapes: [
      {
        id: "pr-1",
        type: "circle",
        width: 380,
        height: 380,
        top: "15%",
        left: "10%",
        color: "radial-gradient(circle, rgba(244, 63, 94, 0.3), rgba(236, 72, 153, 0.08))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 18,
        floatDistance: 40,
        parallaxFactor: 32,
      },
      {
        id: "pr-2",
        type: "ring",
        width: 340,
        height: 340,
        top: "45%",
        left: "65%",
        color: "radial-gradient(circle, rgba(168, 85, 247, 0.26), rgba(244, 63, 94, 0.06))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 20,
        floatDistance: 45,
        parallaxFactor: -36,
      },
      {
        id: "pr-3",
        type: "diamond",
        width: 250,
        height: 250,
        top: "65%",
        left: "30%",
        color: "linear-gradient(135deg, rgba(236, 72, 153, 0.22), rgba(168, 85, 247, 0.12))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 15,
        floatDistance: 25,
        parallaxFactor: 20,
      },
    ],
  },

  "exo-webapi": {
    // Electric Purple to Cyan (Enterprise C# .NET Architecture)
    titleGradient: "from-purple-300 via-indigo-400 to-cyan-300",
    accentGlow: "rgba(192, 132, 252, 0.15)",
    shapes: [
      {
        id: "ew-1",
        type: "rect",
        width: 340,
        height: 300,
        top: "15%",
        left: "60%",
        color: "linear-gradient(135deg, rgba(192, 132, 252, 0.26), rgba(129, 140, 248, 0.12))",
        blur: "blur-3xl",
        opacity: 0.35,
        duration: 17,
        floatDistance: 30,
        parallaxFactor: -28,
      },
      {
        id: "ew-2",
        type: "circle",
        width: 370,
        height: 370,
        top: "40%",
        left: "10%",
        color: "radial-gradient(circle, rgba(103, 232, 249, 0.22), rgba(192, 132, 252, 0.05))",
        blur: "blur-3xl",
        opacity: 0.3,
        duration: 19,
        floatDistance: 38,
        parallaxFactor: 34,
      },
      {
        id: "ew-3",
        type: "hexagon",
        width: 260,
        height: 260,
        top: "65%",
        left: "45%",
        color: "linear-gradient(45deg, rgba(129, 140, 248, 0.2), rgba(103, 232, 249, 0.1))",
        blur: "blur-2xl",
        opacity: 0.25,
        duration: 15,
        floatDistance: 25,
        parallaxFactor: -20,
      },
    ],
  },
};

const DEFAULT_THEME = PROJECT_THEMES["lymadhouse"];

export interface ProjectAmbientBackgroundProps {
  slug: string;
  isFocused?: boolean;
}

export default function ProjectAmbientBackground({
  slug,
  isFocused = false,
}: ProjectAmbientBackgroundProps) {
  const theme = PROJECT_THEMES[slug] || DEFAULT_THEME;
  const containerRef = useRef<HTMLDivElement>(null);

  // Coordenadas relativas do cursor (-0.5 a 0.5) para parallax suave
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Mola suave para amortecimento natural do movimento
  const springConfig = { damping: 30, stiffness: 80, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 -z-10 pointer-events-auto overflow-hidden rounded-3xl"
      aria-hidden="true"
    >
      {/* Placa de Vidro Fosco Escuro (Dark Frosted Glass) */}
      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-3xl border border-white/[0.04] rounded-3xl z-10 transition-colors duration-500" />

      {/* Vinheta escura nas bordas para blend perfeito com o fundo preto do site */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.85)_100%)] z-20 pointer-events-none" />

      {/* Camada das Formas Geométricas Translúcidas em Movimento Orgânico e Parallax Interativo */}
      <div className="absolute inset-0 z-0">
        {theme.shapes.map((shape) => {
          const borderRadiusClass =
            shape.type === "circle"
              ? "rounded-full"
              : shape.type === "pill"
              ? "rounded-full"
              : shape.type === "diamond"
              ? "rounded-3xl rotate-45"
              : shape.type === "hexagon"
              ? "rounded-[2rem] rotate-12"
              : "rounded-2xl rotate-6";

          return (
            <motion.div
              key={shape.id}
              style={{
                width: shape.width,
                height: shape.height,
                top: shape.top,
                left: shape.left,
                background: shape.color,
                opacity: isFocused ? shape.opacity * 1.25 : shape.opacity,
                x: prefersReducedMotion ? 0 : smoothX,
                y: prefersReducedMotion ? 0 : smoothY,
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      x: [
                        0,
                        shape.floatDistance * 0.7,
                        -shape.floatDistance * 0.5,
                        0,
                      ],
                      y: [
                        0,
                        -shape.floatDistance,
                        shape.floatDistance * 0.6,
                        0,
                      ],
                      rotate:
                        shape.type === "diamond"
                          ? [45, 60, 30, 45]
                          : shape.type === "rect"
                          ? [6, 18, -6, 6]
                          : [0, 20, -15, 0],
                      scale: isFocused ? [1, 1.06, 0.96, 1] : 1,
                    }
              }
              transition={{
                repeat: Infinity,
                duration: shape.duration,
                ease: "easeInOut",
              }}
              className={`absolute pointer-events-none ${shape.blur} ${borderRadiusClass} transition-opacity duration-700`}
            />
          );
        })}
      </div>
    </div>
  );
}
