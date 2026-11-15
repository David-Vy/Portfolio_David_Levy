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
  hasSpikes: boolean;
  spikeLength: number;
  layer: 1 | 2 | 3; // 1: micro fundo distante, 2: intermediária, 3: estrela proeminente de primeiro plano
}

interface Stardust {
  along: number;
  across: number;
  radius: number;
  alpha: number;
  speed: number;
  color: string;
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

interface NebulaCloud {
  xRatio: number;
  yRatio: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
  colors: [string, string, string];
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

    // Respeito a acessibilidade de movimento reduzido
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Estruturas de dados dos corpos celestes
    let stars: Star[] = [];
    let stardust: Stardust[] = [];
    let shootingStar: ShootingStar | null = null;
    let nextShootingStarTime = Date.now() + 2000;

    // Nebulosas cósmicas volumétricas inspiradas em telescópios espaciais (Hubble / James Webb)
    const nebulae: NebulaCloud[] = [
      {
        // Núcleo galáctico ultravioleta e púrpura cósmico
        xRatio: 0.52,
        yRatio: 0.48,
        baseRadius: 0.62,
        pulseSpeed: 0.0005,
        pulsePhase: 0,
        colors: [
          "rgba(139, 92, 246, 0.20)",
          "rgba(76, 29, 149, 0.08)",
          "rgba(8, 4, 20, 0)",
        ],
      },
      {
        // Nuvem estelar de Carina / Ciano estelar
        xRatio: 0.20,
        yRatio: 0.38,
        baseRadius: 0.52,
        pulseSpeed: 0.0007,
        pulsePhase: 1.8,
        colors: [
          "rgba(6, 182, 212, 0.16)",
          "rgba(14, 116, 144, 0.06)",
          "rgba(2, 6, 23, 0)",
        ],
      },
      {
        // Filamento estelar magenta e rubi profundo
        xRatio: 0.82,
        yRatio: 0.58,
        baseRadius: 0.55,
        pulseSpeed: 0.0006,
        pulsePhase: 3.5,
        colors: [
          "rgba(236, 72, 153, 0.15)",
          "rgba(157, 23, 77, 0.05)",
          "rgba(15, 3, 14, 0)",
        ],
      },
      {
        // Abismo azul safira interestelar
        xRatio: 0.38,
        yRatio: 0.72,
        baseRadius: 0.48,
        pulseSpeed: 0.0008,
        pulsePhase: 4.9,
        colors: [
          "rgba(59, 130, 246, 0.14)",
          "rgba(29, 78, 216, 0.04)",
          "rgba(2, 6, 23, 0)",
        ],
      },
    ];

    // Cores espectrais autênticas de estrelas astronômicas (RGB)
    const starColorPalette = [
      "220, 238, 255", // Classe B/A: Azul-branco brilhante (Sirius / Vega)
      "255, 255, 255", // Classe A: Branco puro estelar
      "255, 244, 214", // Classe F: Branco quente
      "255, 222, 153", // Classe G: Âmbar solar dourado (Sol / Capella)
      "255, 192, 170", // Classe M: Rubi estelar suave (Betelgeuse)
      "175, 215, 255", // Classe O: Azul profundo de alta energia
      "224, 231, 255", // Diamante estelar levemente violeta
    ];

    // Ângulo do braço da galáxia (diagonal majestosa de ~ -20 graus)
    const galaxyAngle = -0.35;
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
      const starCount = isMobile ? 220 : 460;
      const dustCount = isMobile ? 180 : 380;

      stars = [];
      stardust = [];

      // 1. Gera poeira estelar concentrada no disco galáctico (Milky Way Stream)
      for (let i = 0; i < dustCount; i++) {
        const along = (Math.random() - 0.5) * (width * 1.5);
        // Distribuição normalizada por somatório triangular (maior densidade no núcleo do plano)
        const across =
          (Math.random() + Math.random() + Math.random() - 1.5) * (height * 0.5);

        const colorPick =
          starColorPalette[Math.floor(Math.random() * starColorPalette.length)];

        stardust.push({
          along,
          across,
          radius: 0.35 + Math.random() * 0.75,
          alpha: 0.15 + Math.random() * 0.45,
          speed: 0.05 + Math.random() * 0.12,
          color: colorPick,
        });
      }

      // 2. Gera estrelas distribuídas em 3 camadas ópticas de profundidade
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        const rand = Math.random();
        let layer: 1 | 2 | 3 = 1;
        let radius = 0.45 + Math.random() * 0.55;
        let baseAlpha = 0.28 + Math.random() * 0.45;
        let hasSpikes = false;
        let spikeLength = 0;

        if (rand > 0.94) {
          // Estrela proeminente de primeiro plano com brilho e reflexo difrativo
          layer = 3;
          radius = 1.9 + Math.random() * 0.9;
          baseAlpha = 0.8 + Math.random() * 0.2;
          hasSpikes = true;
          spikeLength = radius * (5 + Math.random() * 3);
        } else if (rand > 0.68) {
          // Estrela intermediária
          layer = 2;
          radius = 0.95 + Math.random() * 0.75;
          baseAlpha = 0.48 + Math.random() * 0.4;
        }

        const colorPick =
          starColorPalette[Math.floor(Math.random() * starColorPalette.length)];

        stars.push({
          x,
          y,
          radius,
          baseAlpha,
          twinkleSpeed: 0.0012 + Math.random() * 0.0035,
          twinklePhase: Math.random() * Math.PI * 2,
          color: colorPick,
          hasSpikes,
          spikeLength,
          layer,
        });
      }
    };

    const spawnShootingStar = () => {
      // Meteoro com trajetória diagonal elegante
      const startX = Math.random() * (width * 0.8);
      const startY = Math.random() * (height * 0.45);
      const angle = 0.52 + (Math.random() - 0.5) * 0.25; // ~30 graus
      const speed = 14 + Math.random() * 9;
      const length = 110 + Math.random() * 80;

      shootingStar = {
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        opacity: 1,
        width: 1.6 + Math.random() * 0.8,
        active: true,
        decay: 0.02 + Math.random() * 0.012,
      };

      // Intervalo entre meteoros: de 4.5s a 8.5s
      nextShootingStarTime = Date.now() + 4500 + Math.random() * 4000;
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

      // 2. Fundo negro cósmico com sutis gradientes profundos
      const spaceGrad = ctx.createLinearGradient(0, 0, width, height);
      spaceGrad.addColorStop(0, "rgba(4, 4, 10, 0.96)");
      spaceGrad.addColorStop(0.5, "rgba(6, 6, 15, 0.98)");
      spaceGrad.addColorStop(1, "rgba(3, 3, 8, 0.96)");
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Renderiza as nebulosas galácticas com respiração cósmica suave
      for (let i = 0; i < nebulae.length; i++) {
        const neb = nebulae[i];
        const pulse = Math.sin(time * neb.pulseSpeed + neb.pulsePhase) * 0.08;
        const cx = width * neb.xRatio;
        const cy = height * neb.yRatio;
        const radius = Math.max(width, height) * (neb.baseRadius + pulse);

        const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        radial.addColorStop(0, neb.colors[0]);
        radial.addColorStop(0.48, neb.colors[1]);
        radial.addColorStop(1, neb.colors[2]);

        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Renderiza e translada a poeira estelar ao longo do disco galáctico
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

        // Desenha apenas se dentro da visão
        if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.fill();
        }
      }

      // 5. Renderiza as estrelas cintilantes com suas camadas
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Cintilação suave baseada em seno contínuo
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const currentAlpha = Math.max(
          0.12,
          Math.min(1, s.baseAlpha + twinkle * 0.38)
        );

        // Deriva sideral cósmica ultra suave
        if (!prefersReducedMotion) {
          const driftSpeed = s.layer === 3 ? 0.045 : s.layer === 2 ? 0.026 : 0.012;
          s.x -= driftSpeed * 60 * delta;
          if (s.x < -30) s.x = width + 30;
        }

        // Desenho do corpo da estrela
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${currentAlpha})`;
        ctx.fill();

        // Auréola e reflexo difrativo de 4 pontas para estrelas proeminentes (layer 3)
        if (s.hasSpikes && currentAlpha > 0.4) {
          // Halo estelar difuso suave
          const halo = ctx.createRadialGradient(
            s.x,
            s.y,
            0,
            s.x,
            s.y,
            s.radius * 5
          );
          halo.addColorStop(0, `rgba(${s.color}, ${currentAlpha * 0.48})`);
          halo.addColorStop(1, `rgba(${s.color}, 0)`);
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 5, 0, Math.PI * 2);
          ctx.fill();

          // Spikes de difração em cruz elegante (óptica de telescópio espacial)
          const spikeLen = s.spikeLength * (0.85 + twinkle * 0.15);
          ctx.strokeStyle = `rgba(${s.color}, ${currentAlpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          // Eixo horizontal
          ctx.moveTo(s.x - spikeLen, s.y);
          ctx.lineTo(s.x + spikeLen, s.y);
          // Eixo vertical
          ctx.moveTo(s.x, s.y - spikeLen);
          ctx.lineTo(s.x, s.y + spikeLen);
          ctx.stroke();

          // Spikes secundários diagonais sutis de 45 graus (brilho de diamante cósmico)
          const diagLen = spikeLen * 0.35;
          ctx.strokeStyle = `rgba(${s.color}, ${currentAlpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - diagLen, s.y - diagLen);
          ctx.lineTo(s.x + diagLen, s.y + diagLen);
          ctx.moveTo(s.x - diagLen, s.y + diagLen);
          ctx.lineTo(s.x + diagLen, s.y - diagLen);
          ctx.stroke();
        }
      }

      // 6. Gerenciamento e renderização de Estrelas Cadentes (Meteoros)
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

        // Cauda ionizada com gradiente luminoso estelar
        const meteorGrad = ctx.createLinearGradient(ms.x, ms.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${ms.opacity})`);
        meteorGrad.addColorStop(0.2, `rgba(186, 230, 253, ${ms.opacity * 0.88})`);
        meteorGrad.addColorStop(0.65, `rgba(168, 85, 247, ${ms.opacity * 0.45})`);
        meteorGrad.addColorStop(1, "rgba(10, 6, 26, 0)");

        ctx.save();
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = ms.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ms.x, ms.y);
        ctx.stroke();

        // Cabeça brilhante do meteoro com corona ionizada
        ctx.beginPath();
        ctx.arc(ms.x, ms.y, ms.width * 1.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ms.opacity})`;
        ctx.shadowColor = "rgba(186, 230, 253, 0.95)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();

        // Movimento do meteoro
        ms.x += cos * ms.speed * 60 * delta;
        ms.y += sin * ms.speed * 60 * delta;
        ms.opacity -= ms.decay * 60 * delta;

        if (ms.opacity <= 0 || ms.x > width + 100 || ms.y > height + 100) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Observador de visibilidade (desativa a animação quando fora da tela para poupar CPU/GPU)
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
      {/* Canvas da Galáxia */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Vinhetas verticais para integração orgânica impecável com as seções adjacentes */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Máscara radial de contraste para garantir legibilidade perfeita da tipografia editorial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,9,0.3)_0%,rgba(5,5,9,0.6)_65%,rgba(5,5,9,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
