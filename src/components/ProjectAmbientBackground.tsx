// src/components/ProjectAmbientBackground.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";

export interface ProjectThemeConfig {
  titleGradient: string;
  accentColor: string;
  shapes: {
    id: string;
    type: "diamond" | "circle" | "rect" | "pill" | "hexagon";
    width: number;
    height: number;
    top: string;
    left: string;
    color: string;
    blur: string;
    duration: number;
    floatX: number;
    floatY: number;
    parallaxMultiplier: number;
  }[];
}

export const PROJECT_THEMES: Record<string, ProjectThemeConfig> = {
  lymadhouse: {
    // Roxo forte, escuro e marcante fiel ao logo (sem tons pasteis ou rosados)
    titleGradient: "from-purple-500 via-purple-700 to-indigo-950",
    accentColor: "rgba(126, 34, 206, 0.6)",
    shapes: [
      {
        id: "lm-1",
        type: "diamond",
        width: 320,
        height: 320,
        top: "8%",
        left: "4%",
        color: "linear-gradient(135deg, rgba(126, 34, 206, 0.85), rgba(88, 28, 135, 0.6))",
        blur: "blur-xl",
        duration: 16,
        floatX: 25,
        floatY: 30,
        parallaxMultiplier: 35,
      },
      {
        id: "lm-2",
        type: "circle",
        width: 360,
        height: 360,
        top: "35%",
        left: "62%",
        color: "radial-gradient(circle, rgba(109, 40, 217, 0.8), rgba(59, 7, 100, 0.6))",
        blur: "blur-2xl",
        duration: 18,
        floatX: -30,
        floatY: 35,
        parallaxMultiplier: -40,
      },
      {
        id: "lm-3",
        type: "hexagon",
        width: 250,
        height: 250,
        top: "60%",
        left: "22%",
        color: "linear-gradient(45deg, rgba(124, 58, 237, 0.75), rgba(76, 29, 149, 0.6))",
        blur: "blur-xl",
        duration: 14,
        floatX: 20,
        floatY: -25,
        parallaxMultiplier: 25,
      },
    ],
  },

  "lycloud-server": {
    // Mint Emerald, Teal & Cyan (Cloud / BaaS / Docker)
    titleGradient: "from-emerald-300 via-teal-300 to-cyan-400",
    accentColor: "rgba(20, 184, 166, 0.5)",
    shapes: [
      {
        id: "lc-1",
        type: "rect",
        width: 340,
        height: 300,
        top: "12%",
        left: "60%",
        color: "linear-gradient(135deg, rgba(16, 185, 129, 0.65), rgba(20, 184, 166, 0.4))",
        blur: "blur-xl",
        duration: 17,
        floatX: -25,
        floatY: 30,
        parallaxMultiplier: -32,
      },
      {
        id: "lc-2",
        type: "circle",
        width: 350,
        height: 350,
        top: "40%",
        left: "8%",
        color: "radial-gradient(circle, rgba(34, 211, 238, 0.6), rgba(13, 148, 136, 0.3))",
        blur: "blur-2xl",
        duration: 19,
        floatX: 30,
        floatY: -30,
        parallaxMultiplier: 36,
      },
      {
        id: "lc-3",
        type: "pill",
        width: 280,
        height: 160,
        top: "68%",
        left: "40%",
        color: "linear-gradient(45deg, rgba(20, 184, 166, 0.55), rgba(16, 185, 129, 0.3))",
        blur: "blur-xl",
        duration: 15,
        floatX: -20,
        floatY: 20,
        parallaxMultiplier: -22,
      },
    ],
  },

  lyvia: {
    // Escala Monocromática: degradê cinza e branco minimalista e elegante
    titleGradient: "from-white via-zinc-200 to-zinc-400",
    accentColor: "rgba(255, 255, 255, 0.45)",
    shapes: [
      {
        id: "lv-1",
        type: "pill",
        width: 350,
        height: 220,
        top: "12%",
        left: "8%",
        color: "linear-gradient(135deg, rgba(255, 255, 255, 0.65), rgba(212, 212, 216, 0.35))",
        blur: "blur-xl",
        duration: 17,
        floatX: 25,
        floatY: 30,
        parallaxMultiplier: 30,
      },
      {
        id: "lv-2",
        type: "circle",
        width: 370,
        height: 370,
        top: "38%",
        left: "60%",
        color: "radial-gradient(circle, rgba(244, 244, 245, 0.55), rgba(113, 113, 122, 0.25))",
        blur: "blur-2xl",
        duration: 20,
        floatX: -35,
        floatY: -35,
        parallaxMultiplier: -38,
      },
      {
        id: "lv-3",
        type: "diamond",
        width: 260,
        height: 260,
        top: "65%",
        left: "25%",
        color: "linear-gradient(45deg, rgba(228, 228, 231, 0.5), rgba(82, 82, 91, 0.25))",
        blur: "blur-xl",
        duration: 15,
        floatX: 20,
        floatY: 20,
        parallaxMultiplier: 22,
      },
    ],
  },

  "icre-web": {
    // Tom de azul equilibrado: nem muito escuro nem muito claro
    titleGradient: "from-sky-300 via-blue-400 to-blue-600",
    accentColor: "rgba(59, 130, 246, 0.5)",
    shapes: [
      {
        id: "ic-1",
        type: "diamond",
        width: 330,
        height: 330,
        top: "12%",
        left: "62%",
        color: "linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(37, 99, 235, 0.4))",
        blur: "blur-xl",
        duration: 16,
        floatX: -28,
        floatY: 32,
        parallaxMultiplier: -32,
      },
      {
        id: "ic-2",
        type: "circle",
        width: 360,
        height: 360,
        top: "38%",
        left: "6%",
        color: "radial-gradient(circle, rgba(96, 165, 250, 0.65), rgba(29, 78, 216, 0.3))",
        blur: "blur-2xl",
        duration: 19,
        floatX: 30,
        floatY: -35,
        parallaxMultiplier: 36,
      },
      {
        id: "ic-3",
        type: "rect",
        width: 280,
        height: 210,
        top: "65%",
        left: "48%",
        color: "linear-gradient(45deg, rgba(37, 99, 235, 0.55), rgba(96, 165, 250, 0.3))",
        blur: "blur-xl",
        duration: 15,
        floatX: -20,
        floatY: 20,
        parallaxMultiplier: -22,
      },
    ],
  },

  intellistock: {
    // Electric Lime & Emerald (Logística & Estoque Inteligente)
    titleGradient: "from-lime-300 via-emerald-400 to-teal-400",
    accentColor: "rgba(132, 204, 22, 0.5)",
    shapes: [
      {
        id: "is-1",
        type: "rect",
        width: 340,
        height: 280,
        top: "10%",
        left: "12%",
        color: "linear-gradient(135deg, rgba(132, 204, 22, 0.65), rgba(16, 185, 129, 0.35))",
        blur: "blur-xl",
        duration: 16,
        floatX: 25,
        floatY: 30,
        parallaxMultiplier: 28,
      },
      {
        id: "is-2",
        type: "circle",
        width: 370,
        height: 370,
        top: "42%",
        left: "60%",
        color: "radial-gradient(circle, rgba(16, 185, 129, 0.6), rgba(20, 184, 166, 0.3))",
        blur: "blur-2xl",
        duration: 19,
        floatX: -32,
        floatY: -35,
        parallaxMultiplier: -36,
      },
      {
        id: "is-3",
        type: "hexagon",
        width: 250,
        height: 250,
        top: "65%",
        left: "18%",
        color: "linear-gradient(45deg, rgba(20, 184, 166, 0.5), rgba(132, 204, 22, 0.3))",
        blur: "blur-xl",
        duration: 14,
        floatX: 20,
        floatY: 20,
        parallaxMultiplier: 20,
      },
    ],
  },

  utilify: {
    // Sky Blue, Royal Sapphire & Indigo (Desktop Utility Toolkit)
    titleGradient: "from-sky-300 via-blue-400 to-indigo-400",
    accentColor: "rgba(56, 189, 248, 0.5)",
    shapes: [
      {
        id: "ut-1",
        type: "circle",
        width: 360,
        height: 360,
        top: "12%",
        left: "60%",
        color: "radial-gradient(circle, rgba(56, 189, 248, 0.65), rgba(37, 99, 235, 0.3))",
        blur: "blur-2xl",
        duration: 17,
        floatX: -30,
        floatY: 35,
        parallaxMultiplier: -32,
      },
      {
        id: "ut-2",
        type: "diamond",
        width: 310,
        height: 310,
        top: "40%",
        left: "8%",
        color: "linear-gradient(135deg, rgba(37, 99, 235, 0.6), rgba(99, 102, 241, 0.3))",
        blur: "blur-xl",
        duration: 20,
        floatX: 35,
        floatY: -30,
        parallaxMultiplier: 35,
      },
      {
        id: "ut-3",
        type: "pill",
        width: 290,
        height: 170,
        top: "65%",
        left: "42%",
        color: "linear-gradient(45deg, rgba(99, 102, 241, 0.5), rgba(56, 189, 248, 0.3))",
        blur: "blur-xl",
        duration: 15,
        floatX: -20,
        floatY: 20,
        parallaxMultiplier: -20,
      },
    ],
  },

  "projeto-rosa": {
    // Neon Rose, Magenta & Crimson (DirectML GRU Neural Inference)
    titleGradient: "from-rose-400 via-pink-400 to-fuchsia-400",
    accentColor: "rgba(244, 63, 94, 0.5)",
    shapes: [
      {
        id: "pr-1",
        type: "circle",
        width: 380,
        height: 380,
        top: "12%",
        left: "8%",
        color: "radial-gradient(circle, rgba(244, 63, 94, 0.7), rgba(236, 72, 153, 0.35))",
        blur: "blur-2xl",
        duration: 18,
        floatX: 30,
        floatY: 35,
        parallaxMultiplier: 34,
      },
      {
        id: "pr-2",
        type: "diamond",
        width: 330,
        height: 330,
        top: "42%",
        left: "62%",
        color: "linear-gradient(135deg, rgba(217, 70, 239, 0.6), rgba(244, 63, 94, 0.3))",
        blur: "blur-xl",
        duration: 20,
        floatX: -35,
        floatY: -35,
        parallaxMultiplier: -38,
      },
      {
        id: "pr-3",
        type: "pill",
        width: 280,
        height: 180,
        top: "65%",
        left: "28%",
        color: "linear-gradient(45deg, rgba(236, 72, 153, 0.55), rgba(168, 85, 247, 0.3))",
        blur: "blur-xl",
        duration: 15,
        floatX: 20,
        floatY: 20,
        parallaxMultiplier: 22,
      },
    ],
  },

  "exo-webapi": {
    // Electric Purple to Cyan (Enterprise C# .NET Architecture)
    titleGradient: "from-purple-300 via-indigo-400 to-cyan-300",
    accentColor: "rgba(192, 132, 252, 0.5)",
    shapes: [
      {
        id: "ew-1",
        type: "rect",
        width: 340,
        height: 290,
        top: "12%",
        left: "62%",
        color: "linear-gradient(135deg, rgba(192, 132, 252, 0.65), rgba(129, 140, 248, 0.35))",
        blur: "blur-xl",
        duration: 17,
        floatX: -26,
        floatY: 30,
        parallaxMultiplier: -30,
      },
      {
        id: "ew-2",
        type: "circle",
        width: 370,
        height: 370,
        top: "38%",
        left: "8%",
        color: "radial-gradient(circle, rgba(103, 232, 249, 0.6), rgba(192, 132, 252, 0.25))",
        blur: "blur-2xl",
        duration: 19,
        floatX: 32,
        floatY: -35,
        parallaxMultiplier: 36,
      },
      {
        id: "ew-3",
        type: "hexagon",
        width: 260,
        height: 260,
        top: "65%",
        left: "42%",
        color: "linear-gradient(45deg, rgba(129, 140, 248, 0.55), rgba(103, 232, 249, 0.3))",
        blur: "blur-xl",
        duration: 15,
        floatX: -20,
        floatY: 20,
        parallaxMultiplier: -22,
      },
    ],
  },
};

const DEFAULT_THEME = PROJECT_THEMES["lymadhouse"];

export interface ProjectAmbientBackgroundProps {
  slug: string;
  isFocused?: boolean;
  mouseRelativeX?: number; // normalizado de -0.5 a 0.5
  mouseRelativeY?: number; // normalizado de -0.5 a 0.5
}

export default function ProjectAmbientBackground({
  slug,
  mouseRelativeX = 0,
  mouseRelativeY = 0,
}: ProjectAmbientBackgroundProps) {
  const theme = PROJECT_THEMES[slug] || DEFAULT_THEME;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  useEffect(() => {
    rawX.set(mouseRelativeX);
    rawY.set(mouseRelativeY);
  }, [mouseRelativeX, mouseRelativeY, rawX, rawY]);

  // Molas ultra-suaves para amortecer o movimento do cursor
  const springX = useSpring(rawX, { damping: 25, stiffness: 60 });
  const springY = useSpring(rawY, { damping: 25, stiffness: 60 });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Coordenadas normalizadas convertidas em percentuais para o spotlight interativo
  const spotlightX = useTransform(springX, (val) => `${((val + 0.5) * 100).toFixed(1)}%`);
  const spotlightY = useTransform(springY, (val) => `${((val + 0.5) * 100).toFixed(1)}%`);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0"
      aria-hidden="true"
    >
      {/* 1. Base Plate: Dark Charcoal Foundation */}
      <div className="absolute inset-0 bg-[#08080b]/85 rounded-3xl" />

      {/* 2. Camada das Formas Geométricas Translúcidas em Movimento e Parallax */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {theme.shapes.map((shape) => {
          const borderRadiusClass =
            shape.type === "circle"
              ? "rounded-full"
              : shape.type === "pill"
              ? "rounded-full"
              : shape.type === "diamond"
              ? "rounded-3xl rotate-45"
              : shape.type === "hexagon"
              ? "rounded-[2.5rem] rotate-12"
              : "rounded-2xl rotate-6";

          return (
            <ParallaxShape
              key={shape.id}
              shape={shape}
              springX={springX}
              springY={springY}
              borderRadiusClass={borderRadiusClass}
              prefersReducedMotion={prefersReducedMotion}
            />
          );
        })}
      </div>

      {/* 3. Spotlight interativo do cursor que projeta uma aura sutil na cor tema do projeto */}
      <motion.div
        className="absolute inset-0 rounded-3xl transition-opacity duration-500"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(550px circle at ${x} ${y}, ${theme.accentColor}, transparent 65%)`
          ),
          opacity: 0.6,
        }}
      />

      {/* 4. Difusor de Vidro Fosco (Dark Frosted Glass Overlay) */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/20 border border-white/[0.08] rounded-3xl transition-colors duration-500" />

      {/* 5. Vinheta suave nas bordas para integração com o fundo do site */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,7,0.6)_100%)] rounded-3xl pointer-events-none" />
    </div>
  );
}

// Subcomponente que separa o parallax do cursor da animação de flutuação contínua
interface ParallaxShapeProps {
  shape: ProjectThemeConfig["shapes"][0];
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  borderRadiusClass: string;
  prefersReducedMotion: boolean;
}

function ParallaxShape({
  shape,
  springX,
  springY,
  borderRadiusClass,
  prefersReducedMotion,
}: ParallaxShapeProps) {
  // Transforma o movimento da mola na translação de parallax correspondente ao fator da forma
  const parallaxX = useTransform(
    springX,
    (val: number) => (prefersReducedMotion ? 0 : val * shape.parallaxMultiplier)
  );
  const parallaxY = useTransform(
    springY,
    (val: number) => (prefersReducedMotion ? 0 : val * shape.parallaxMultiplier)
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        width: shape.width,
        height: shape.height,
        top: shape.top,
        left: shape.left,
        x: parallaxX,
        y: parallaxY,
      }}
      className="pointer-events-none"
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, shape.floatX, -shape.floatX * 0.7, 0],
                y: [0, -shape.floatY, shape.floatY * 0.7, 0],
                rotate:
                  shape.type === "diamond"
                    ? [45, 60, 30, 45]
                    : shape.type === "rect"
                    ? [6, 18, -6, 6]
                    : [0, 20, -15, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: shape.duration,
          ease: "easeInOut",
        }}
        style={{
          background: shape.color,
        }}
        className={`w-full h-full ${shape.blur} ${borderRadiusClass} border border-white/10 opacity-75`}
      />
    </motion.div>
  );
}
