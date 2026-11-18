"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface PlanetConfig {
  id: string;
  distance: number; // Raio relativo na elipse
  radius: number; // Raio do ponto no canvas
  speed: number; // Velocidade orbital angular
  color: string; // Tonalidade monocromática (RGB)
  hasRing?: boolean;
  ringRadiusX?: number;
  ringRadiusY?: number;
  moons?: { distance: number; radius: number; speed: number; angle: number }[];
}

const PLANET_METADATA: Record<
  string,
  { pt: { name: string; au: string; detail: string }; en: { name: string; au: string; detail: string } }
> = {
  mercury: {
    pt: { name: "Mercúrio", au: "0.39 UA", detail: "Período: 88 dias" },
    en: { name: "Mercury", au: "0.39 AU", detail: "Period: 88 days" },
  },
  venus: {
    pt: { name: "Vênus", au: "0.72 UA", detail: "Período: 225 dias" },
    en: { name: "Venus", au: "0.72 AU", detail: "Period: 225 days" },
  },
  earth: {
    pt: { name: "Terra", au: "1.00 UA", detail: "365.2 dias • 1 Satélite" },
    en: { name: "Earth", au: "1.00 AU", detail: "365.2 days • 1 Satellite" },
  },
  mars: {
    pt: { name: "Marte", au: "1.52 UA", detail: "687 dias • 2 Satélites" },
    en: { name: "Mars", au: "1.52 AU", detail: "687 days • 2 Satellites" },
  },
  jupiter: {
    pt: { name: "Júpiter", au: "5.20 UA", detail: "11.8 anos • 4 Satélites Galileanos" },
    en: { name: "Jupiter", au: "5.20 AU", detail: "11.8 years • 4 Galilean Satellites" },
  },
  saturn: {
    pt: { name: "Saturno", au: "9.58 UA", detail: "29.4 anos • Sistema de Anéis" },
    en: { name: "Saturn", au: "9.58 AU", detail: "29.4 years • Ring System" },
  },
  uranus: {
    pt: { name: "Urano", au: "19.2 UA", detail: "84.0 anos • Eixo Inclinado" },
    en: { name: "Uranus", au: "19.2 AU", detail: "84.0 years • Tilted Axis" },
  },
  neptune: {
    pt: { name: "Netuno", au: "30.1 UA", detail: "164.8 anos • Sentinela Externo" },
    en: { name: "Neptune", au: "30.1 AU", detail: "164.8 years • Outer Sentinel" },
  },
};

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function SolarSystemBackground() {
  const { language } = useLanguage();
  const languageRef = useRef(language);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    isHovered: false,
  });
  const ripplesRef = useRef<Ripple[]>([]);
  const hoveredPlanetRef = useRef<string | null>(null);

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

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Configuração dos corpos celestes do Sistema Solar minimalista
    const planets: (PlanetConfig & { angle: number })[] = [
      {
        id: "mercury",
        distance: 0.15,
        radius: 1.8,
        speed: 0.024,
        color: "220, 220, 230",
        angle: Math.random() * Math.PI * 2,
      },
      {
        id: "venus",
        distance: 0.24,
        radius: 2.5,
        speed: 0.016,
        color: "240, 240, 245",
        angle: Math.random() * Math.PI * 2,
      },
      {
        id: "earth",
        distance: 0.35,
        radius: 3.0,
        speed: 0.012,
        color: "255, 255, 255",
        angle: Math.random() * Math.PI * 2,
        moons: [
          { distance: 8.5, radius: 0.85, speed: 0.055, angle: Math.random() * Math.PI * 2 },
        ],
      },
      {
        id: "mars",
        distance: 0.47,
        radius: 2.2,
        speed: 0.009,
        color: "225, 225, 235",
        angle: Math.random() * Math.PI * 2,
        moons: [
          { distance: 6, radius: 0.6, speed: 0.08, angle: 0 },
        ],
      },
      {
        id: "jupiter",
        distance: 0.67,
        radius: 5.2,
        speed: 0.0045,
        color: "245, 245, 255",
        angle: Math.random() * Math.PI * 2,
        moons: [
          { distance: 11, radius: 0.8, speed: 0.045, angle: 1.2 },
          { distance: 15, radius: 0.9, speed: 0.032, angle: 3.4 },
        ],
      },
      {
        id: "saturn",
        distance: 0.85,
        radius: 4.2,
        speed: 0.0032,
        color: "235, 235, 245",
        hasRing: true,
        ringRadiusX: 11.5,
        ringRadiusY: 4.5,
        angle: Math.random() * Math.PI * 2,
      },
      {
        id: "uranus",
        distance: 1.05,
        radius: 3.2,
        speed: 0.0022,
        color: "215, 220, 235",
        angle: Math.random() * Math.PI * 2,
      },
      {
        id: "neptune",
        distance: 1.24,
        radius: 3.0,
        speed: 0.0016,
        color: "205, 210, 230",
        angle: Math.random() * Math.PI * 2,
      },
    ];

    // Cinturão de Asteroides Minimalista
    interface Asteroid {
      baseDistance: number;
      offsetDistance: number;
      angle: number;
      speed: number;
      radius: number;
      alpha: number;
    }
    const asteroids: Asteroid[] = [];
    const asteroidCount = 120;
    for (let i = 0; i < asteroidCount; i++) {
      asteroids.push({
        baseDistance: 0.56,
        offsetDistance: (Math.random() - 0.5) * 0.055,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0065 + Math.random() * 0.0025,
        radius: 0.35 + Math.random() * 0.45,
        alpha: 0.12 + Math.random() * 0.28,
      });
    }

    // Estrelas de fundo discretas
    interface BackgroundStar {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }
    let bgStars: BackgroundStar[] = [];

    let currentTilt = 0.52;
    let currentRotation = -0.20;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth || 1200;
      height = rect.height || 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Gera estrelas de fundo
      const isMobile = width < 768;
      const bgCount = isMobile ? 70 : 150;
      bgStars = [];
      for (let i = 0; i < bgCount; i++) {
        bgStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.4 + Math.random() * 0.55,
          alpha: 0.15 + Math.random() * 0.35,
          twinkleSpeed: 0.001 + Math.random() * 0.002,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    let lastTime = 0;

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (lastTime <= 0) {
        lastTime = time;
      }
      const rawDelta = (time - lastTime) / 1000;
      const delta = Math.max(0, Math.min(rawDelta, 0.1));
      lastTime = time;

      // 1. Limpeza
      ctx.clearRect(0, 0, width, height);

      // Fundo monocromático profundo
      ctx.fillStyle = "rgba(4, 4, 7, 0.98)";
      ctx.fillRect(0, 0, width, height);

      // 2. Estrelas de fundo sutis
      for (let i = 0; i < bgStars.length; i++) {
        const s = bgStars[i];
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const a = Math.max(0.1, Math.min(0.65, s.alpha + twinkle * 0.2));
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(0.1, s.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.fill();
      }

      // 3. Posicionamento do Centro do Sistema Solar
      const isMobile = width < 1024;
      const centerX = isMobile ? width * 0.5 : width * 0.40;
      const centerY = isMobile ? height * 0.42 : height * 0.48;
      const maxOrbitRadius = Math.min(width, height) * (isMobile ? 0.46 : 0.42);

      // Parallax interativo suave com interpolação contínua (smooth dampening)
      const mouse = mouseRef.current;
      if (mouse.isHovered && mouse.x > 0) {
        const normX = (mouse.x - width * 0.5) / (width * 0.5);
        const normY = (mouse.y - height * 0.5) / (height * 0.5);
        const targetTilt = 0.52 + normY * 0.08;
        const targetRot = -0.20 + normX * 0.10;
        currentTilt += (targetTilt - currentTilt) * 0.06;
        currentRotation += (targetRot - currentRotation) * 0.06;
      }

      const cosRot = Math.cos(currentRotation);
      const sinRot = Math.sin(currentRotation);

      const getPlanetScreenPos = (orbitRadius: number, angle: number) => {
        const localX = orbitRadius * Math.cos(angle);
        const localY = orbitRadius * Math.sin(angle) * currentTilt;

        const rotX = localX * cosRot - localY * sinRot;
        const rotY = localX * sinRot + localY * cosRot;

        return {
          x: centerX + rotX,
          y: centerY + rotY,
        };
      };

      // 4. Ondas de Gravidade / Ripples Interativas
      const ripples = ripplesRef.current;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 170 * delta;
        r.alpha -= 0.65 * delta;

        if (r.alpha <= 0 || r.radius >= r.maxRadius || r.radius <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const safeRadius = Math.max(0.1, r.radius);
        ctx.beginPath();
        ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, r.alpha * 0.35)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 5. Linhas Orbitais (Órbitas Elípticas Minimalistas)
      hoveredPlanetRef.current = null;
      let hoveredInfo: { name: string; au: string; detail: string; x: number; y: number } | null = null;

      for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        const r = p.distance * maxOrbitRadius;

        const currentPos = getPlanetScreenPos(r, p.angle);
        const distToMouse = Math.hypot(mouse.x - currentPos.x, mouse.y - currentPos.y);
        const isHovered = distToMouse < Math.max(28, p.radius * 4.5);

        if (isHovered) {
          hoveredPlanetRef.current = p.id;
          const currentLang = languageRef.current === "en" ? "en" : "pt";
          const meta = PLANET_METADATA[p.id]?.[currentLang] || { name: p.id, au: "", detail: "" };
          hoveredInfo = { name: meta.name, au: meta.au, detail: meta.detail, x: currentPos.x, y: currentPos.y };
        }

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(currentRotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * currentTilt, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered
          ? "rgba(255, 255, 255, 0.40)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isHovered ? 1.1 : 0.65;
        if (i % 2 === 1 && !isHovered) {
          ctx.setLineDash([3, 5]);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 6. Cinturão de Asteroides Minimalista
      for (let i = 0; i < asteroids.length; i++) {
        const ast = asteroids[i];
        if (!prefersReducedMotion) {
          ast.angle += ast.speed * 60 * delta;
        }
        const astRadius = (ast.baseDistance + ast.offsetDistance) * maxOrbitRadius;
        const pos = getPlanetScreenPos(astRadius, ast.angle);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, Math.max(0.1, ast.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 220, 230, ${ast.alpha})`;
        ctx.fill();
      }

      // 7. O Sol (Símbolo Astronômico Minimalista no Foco)
      // Corona difusa suave
      const sunGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      sunGlow.addColorStop(0, "rgba(255, 255, 255, 0.32)");
      sunGlow.addColorStop(0.35, "rgba(255, 255, 255, 0.07)");
      sunGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();

      // Ponto do núcleo solar
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6.0, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(255, 255, 255, 0.85)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Anel geométrico solar
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10.0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // 8. Renderiza Planetas e Luas
      for (let i = 0; i < planets.length; i++) {
        const p = planets[i];

        if (!prefersReducedMotion) {
          p.angle += p.speed * 60 * delta;
        }

        const r = p.distance * maxOrbitRadius;
        const pos = getPlanetScreenPos(r, p.angle);
        const isHovered = hoveredPlanetRef.current === p.id;

        // Se Saturno: anel elíptico minimalista
        if (p.hasRing && p.ringRadiusX && p.ringRadiusY) {
          ctx.save();
          ctx.translate(pos.x, pos.y);
          ctx.rotate(currentRotation - 0.22);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.ringRadiusX, p.ringRadiusY, 0, 0, Math.PI * 2);
          ctx.strokeStyle = isHovered
            ? "rgba(255, 255, 255, 0.75)"
            : "rgba(255, 255, 255, 0.32)";
          ctx.lineWidth = 0.9;
          ctx.stroke();
          ctx.restore();
        }

        // Ponto circular do planeta
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, Math.max(0.1, isHovered ? p.radius * 1.3 : p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${p.color})`;
        ctx.fill();

        // Anel de foco ao pairar o mouse
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, Math.max(0.1, p.radius * 2.3), 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        // Satélites orbitais (ex: Satélite natural da Terra, satélites de Júpiter)
        if (p.moons && p.moons.length > 0) {
          for (let m = 0; m < p.moons.length; m++) {
            const moon = p.moons[m];
            if (!prefersReducedMotion) {
              moon.angle += moon.speed * 60 * delta;
            }
            const moonX = pos.x + Math.cos(moon.angle) * moon.distance;
            const moonY = pos.y + Math.sin(moon.angle) * moon.distance * currentTilt;

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, Math.max(0.1, moon.distance), 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(moonX, moonY, Math.max(0.1, moon.radius), 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
            ctx.fill();
          }
        }
      }

      // 9. HUD / Tooltip Minimalista no Planeta em Foco
      if (hoveredInfo) {
        const hudX = hoveredInfo.x + 14;
        const hudY = hoveredInfo.y - 16;

        ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(hoveredInfo.name, hudX, hudY);

        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
        ctx.fillText(`${hoveredInfo.au} • ${hoveredInfo.detail}`, hudX, hudY + 12);

        // Linha indicadora sutil
        ctx.beginPath();
        ctx.moveTo(hoveredInfo.x + 4, hoveredInfo.y - 4);
        ctx.lineTo(hudX - 3, hudY + 4);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 0.75;
        ctx.stroke();
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

    // Rastreia coordenadas do mouse com escuta global segura
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        mouseRef.current.isHovered = true;
      } else {
        mouseRef.current.isHovered = false;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        ripplesRef.current.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 5,
          maxRadius: Math.max(width, height) * 0.7,
          alpha: 0.8,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Canvas do Sistema Solar */}
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />

      {/* Vinhetas verticais para integração contínua com as seções adjacentes */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

      {/* Máscara radial de contraste suave para garantir leitura impecável de fotos, textos e cards */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,8,0.25)_0%,rgba(5,5,8,0.60)_65%,rgba(5,5,8,0.88)_100%)] pointer-events-none" />
    </div>
  );
}
