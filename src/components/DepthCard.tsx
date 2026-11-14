// src/components/DepthCard.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface DepthCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  featured?: boolean;
}

export default function DepthCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.12)",
  maxTilt = 6,
  featured = false,
}: DepthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rawMouseXPixels = useMotionValue(0);
  const rawMouseYPixels = useMotionValue(0);

  // Mola ultra-suave e fluida estilo Apple / Studio Mirage
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);
  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
    rawMouseXPixels.set(e.clientX - rect.left);
    rawMouseYPixels.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      className={`relative group rounded-2xl md:rounded-3xl border border-white/[0.08] bg-zinc-950/80 transition-shadow duration-700 ${
        isHovered ? "shadow-2xl shadow-black/90 border-white/25" : ""
      } ${featured ? "ring-1 ring-emerald-500/20" : ""} ${className}`}
    >
      {/* Feixe de luz reflexivo que acompanha o cursor (Spotlight Sheen) */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-30"
          style={{
            background: isHovered
              ? `radial-gradient(550px circle at ${rawMouseXPixels.get()}px ${rawMouseYPixels.get()}px, ${glowColor}, transparent 70%)`
              : "none",
          }}
          aria-hidden="true"
        />
      )}

      {/* Conteúdo interno preservando a profundidade 3D */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
