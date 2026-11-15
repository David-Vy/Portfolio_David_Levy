"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isBrightPoint: boolean;
}

interface Stardust {
  along: number;
  across: number;
  radius: number;
  alpha: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  width: number;
  active: boolean;
  decay: number;
}

export default function GalaxySpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Respeito à preferência de acessibilidade
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Estruturas dos corpos celestes monocromáticos
    let stars: Star[] = [];
    let stardust: Stardust[] = [];
    let shootingStar: ShootingStar | null = null;
    let nextShootingStarTime = Date.now() + 2000;

    // Paleta estritamente monocromática (brancos puros e prateados suaves)
    const monochromePalette = [
      "255, 255, 255", // Branco puro
      "245, 245, 250", // Branco estelar sutil
      "230, 230, 238", // Prateado claro
      "205, 205, 215", // Prata suave
      "180, 180, 195", // Cinza cósmico discreto
    ];

    // Ângulo natural do disco de poeira cósmica (~ -22 graus)
    const galaxyAngle = -0.38;
    const cosA = Math.cos(galaxyAngle);
    const sinA = Math.sin(galaxyAngle);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth || 1200;
      height = rect.height || 600;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initSpace();
    };

    const initSpace = () => {
      const isMobile = width < 768;
      const starCount = isMobile ? 220 : 420;
      const dustCount = isMobile ? 140 : 280;

      stars = [];
      stardust = [];

      // 1. Poeira estelar monocromática (micro-pontos semelhantes à faixa da Via Láctea no céu real)
      for (let i = 0; i < dustCount; i++) {
        const along = (Math.random() - 0.5) * (width * 1.5);
        // Distribuição mais densa no centro do plano
        const across =
          (Math.random() + Math.random() + Math.random() - 1.5) * (height * 0.45);

        stardust.push({
          along,
          across,
          radius: 0.35 + Math.random() * 0.45,
          alpha: 0.12 + Math.random() * 0.30,
          speed: 0.04 + Math.random() * 0.08,
        });
      }

      // 2. Campo estelar minimalista: exclusivamente pontos circulares de magnitudes variadas
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        const rand = Math.random();
        let radius = 0.45 + Math.random() * 0.45; // 75% são micro pontinhos (0.45px a 0.9px)
        let baseAlpha = 0.25 + Math.random() * 0.45;
        let isBrightPoint = false;

        if (rand > 0.94) {
          // Pontos ligeiramente maiores e mais luminosos (sem spikes, apenas pontos nítidos)
          radius = 1.35 + Math.random() * 0.45; // Máximo 1.8px
          baseAlpha = 0.82 + Math.random() * 0.18;
          isBrightPoint = true;
        } else if (rand > 0.72) {
          // Pontos intermediários
          radius = 0.85 + Math.random() * 0.4;
          baseAlpha = 0.45 + Math.random() * 0.35;
        }

        const colorPick =
          monochromePalette[Math.floor(Math.random() * monochromePalette.length)];

        stars.push({
          x,
          y,
          radius,
          baseAlpha,
          twinkleSpeed: 0.0012 + Math.random() * 0.0035,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPick,
          isBrightPoint,
        });
      }
    };

    const spawnShootingStar = () => {
      // Estrela cadente monocromática em trajetória suave e limpa
      const startX = Math.random() * (width * 0.8);
      const startY = Math.random() * (height * 0.4);
      const angle = 0.52 + (Math.random() - 0.5) * 0.2; // ~30 graus
      const speed = 13 + Math.random() * 7;
      const length = 95 + Math.random() * 65;

      shootingStar = {
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        opacity: 0.95,
        width: 1.4 + Math.random() * 0.5,
        active: true,
        decay: 0.02 + Math.random() * 0.012,
      };

      // Intervalo entre meteoros: de 4s a 8s
      nextShootingStarTime = Date.now() + 4000 + Math.random() * 4000;
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // 1. Limpeza do quadro
      ctx.clearRect(0, 0, width, height);

      // 2. Fundo monocromático profundo (vácuo do espaço minimalista)
      ctx.fillStyle = "rgba(4, 4, 7, 0.98)";
      ctx.fillRect(0, 0, width, height);

      // Brilho difuso ambiente estritamente monocromático e ultra discreto (nuvem estelar sutil)
      const ambientGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.65
      );
      ambientGlow.addColorStop(0, "rgba(255, 255, 255, 0.025)");
      ambientGlow.addColorStop(0.5, "rgba(240, 240, 245, 0.010)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Renderiza a poeira estelar (stardust) ao longo do plano galáctico
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      for (let i = 0; i < stardust.length; i++) {
        const p = stardust[i];

        if (!prefersReducedMotion) {
          p.along += p.speed * 60 * delta;
          if (p.along > width * 0.75) p.along = -width * 0.75;
        }

        const px = centerX + p.along * cosA - p.across * sinA;
        const py = centerY + p.along * sinA + p.across * cosA;

        if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        }
      }

      // 4. Renderiza todas as estrelas como pontinhos limpos de luz
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Cintilação suave e realista
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const currentAlpha = Math.max(
          0.12,
          Math.min(1, s.baseAlpha + twinkle * 0.35)
        );

        // Deriva sideral cósmica ultra lenta
        if (!prefersReducedMotion) {
          const driftSpeed = s.isBrightPoint ? 0.03 : 0.015;
          s.x -= driftSpeed * 60 * delta;
          if (s.x < -20) s.x = width + 20;
        }

        // Auréola sutil apenas para os pontinhos mais brilhantes (sempre circular, sem spikes)
        if (s.isBrightPoint && currentAlpha > 0.45) {
          const halo = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            s.radius * 2.8
          );
          halo.addColorStop(0, `rgba(${s.color}, ${currentAlpha * 0.35})`);
          halo.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Ponto estelar circular
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha})`;
        ctx.fill();
      }

      // 5. Estrelas Cadentes (Meteoro Monocromático)
      const now = Date.now();
      if (!shootingStar && now >= nextShootingStarTime && !prefersReducedMotion) {
        spawnShootingStar();
      }

      if (shootingStar && shootingStar.active) {
        const ms = shootingStar;
        const cos = Math.cos(ms.angle);
        const sin = Math.sin(ms.angle);

        const tailX = ms.x - cos * ms.length;
        const tailY = ms.y - sin * ms.length;

        // Cauda ionizada monocromática elegante (branco puro e prateado translúcido)
        const meteorGrad = ctx.createLinearGradient(ms.x, ms.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${ms.opacity})`);
        meteorGrad.addColorStop(0.35, `rgba(228, 228, 231, ${ms.opacity * 0.65})`);
        meteorGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.save();
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = ms.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ms.x, ms.y);
        ctx.stroke();

        // Ponto frontal brilhante do meteoro
        ctx.beginPath();
        ctx.arc(ms.x, ms.y, ms.width * 1.15, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ms.opacity})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        // Avanço do meteoro
        ms.x += cos * ms.speed * 60 * delta;
        ms.y += sin * ms.speed * 60 * delta;
        ms.opacity -= ms.decay * 60 * delta;

        if (ms.opacity <= 0 || ms.x > width + 100 || ms.y > height + 100) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Observador de visibilidade (pausa renderização quando fora da tela)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();
    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Canvas do Céu Estelar Monocromático */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Vinhetas verticais para transição orgânica e imperceptível entre seções */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Máscara radial de contraste suave para manter leitura confortável da tipografia */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,8,0.25)_0%,rgba(5,5,8,0.55)_65%,rgba(5,5,8,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
