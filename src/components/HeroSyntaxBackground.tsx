"use client";

import React, { useEffect, useRef } from "react";

interface SyntaxParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  terminalVelocity: number;
  targetFloor: number;
  rotation: number;
  angularVelocity: number;
  symbol: string;
  fontSize: number;
  baseOpacity: number;
  settled: boolean;
  baseRestX: number;
  baseRestY: number;
  baseRestAngle: number;
  currentDisplaceX: number;
  currentDisplaceY: number;
  currentDisplaceAngle: number;
}

const SYNTAX_SYMBOLS = [
  "{ }",
  "[ ]",
  ";",
  "( )",
  "/>",
  "</",
  "=>",
  "&&",
  "||",
  "*",
  "&",
  "!==",
  "===",
  "++",
  "::",
  "{",
  "}",
  "[",
  "]",
  ";",
  "()",
  "->",
  "#",
  "$",
];

export default function HeroSyntaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number | null = null;
    let isRunning = false;
    let particles: SyntaxParticle[] = [];

    // Mouse coordinates relative to hero container
    const mouse = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    // Calculate canvas bounds and adapt to high DPI
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth || 1200;
      const height =
        rect.height || Math.floor(window.innerHeight * 0.85) || 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-init or adjust particles if resizing
      if (particles.length === 0) {
        initParticles(width, height);
      } else {
        // Adjust floor for existing particles
        particles.forEach((p) => {
          p.targetFloor = height - 18 - (Math.abs(p.x * 17) % 36);
          if (p.settled) {
            p.baseRestY = p.targetFloor;
            p.y = p.targetFloor;
          }
        });
      }

      wakeUpLoop();
    };

    // Initialize syntax particles
    const initParticles = (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? 22 : 42;
      particles = [];
      const slotWidth = (width - 60) / count;

      for (let i = 0; i < count; i++) {
        const symbol =
          SYNTAX_SYMBOLS[Math.floor(Math.random() * SYNTAX_SYMBOLS.length)];
        const fontSize = Math.floor(13 + Math.random() * 7);
        const baseOpacity = Number((0.08 + Math.random() * 0.12).toFixed(3));

        // Stratified horizontal distribution prevents awkward clustering
        const x =
          30 + i * slotWidth + (Math.random() - 0.5) * (slotWidth * 0.7);

        // Spread spawn heights above viewport so they drop progressively
        const spawnDelayY = prefersReducedMotion
          ? 0
          : -20 - Math.random() * (height * 0.9);

        // Target floor with organic slight unevenness across the bottom edge
        const floorVariability = Math.random() * 26;
        const targetFloor = height - 16 - floorVariability;

        const initialY = prefersReducedMotion ? targetFloor : spawnDelayY;
        const initialRotation = (Math.random() - 0.5) * 0.4;

        particles.push({
          x,
          y: initialY,
          vx: (Math.random() - 0.5) * 0.4,
          vy: prefersReducedMotion ? 0 : 0.8 + Math.random() * 1.5,
          gravity: 0.16 + Math.random() * 0.08,
          terminalVelocity: 4.8 + Math.random() * 2.2,
          targetFloor,
          rotation: initialRotation,
          angularVelocity: (Math.random() - 0.5) * 0.018,
          symbol,
          fontSize,
          baseOpacity,
          settled: prefersReducedMotion,
          baseRestX: x,
          baseRestY: targetFloor,
          baseRestAngle: initialRotation,
          currentDisplaceX: 0,
          currentDisplaceY: 0,
          currentDisplaceAngle: 0,
        });
      }
    };

    // Main animation loop
    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let allSettledAndStill = true;
      const repelRadius = 110;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Falling Phase (Initial entrance drop)
        if (!p.settled) {
          p.vy = Math.min(p.vy + p.gravity, p.terminalVelocity);
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.angularVelocity;

          // Ground floor collision check
          if (p.y >= p.targetFloor) {
            p.y = p.targetFloor;
            // Dampen bounce
            p.vy = -p.vy * 0.26;
            p.vx *= 0.6;
            p.angularVelocity *= 0.5;

            // Check if energy dropped low enough to settle
            if (Math.abs(p.vy) < 0.3 && Math.abs(p.vx) < 0.08) {
              p.settled = true;
              p.vy = 0;
              p.vx = 0;
              p.angularVelocity = 0;
              p.baseRestX = p.x;
              p.baseRestY = p.targetFloor;
              p.baseRestAngle = p.rotation;
            }
          }
          allSettledAndStill = false;
        }

        // 2. Interactive Mouse Microphysics
        let targetDisplaceX = 0;
        let targetDisplaceY = 0;
        let targetDisplaceAngle = 0;

        if (mouse.isActive && p.settled) {
          const currentPosX = p.baseRestX + p.currentDisplaceX;
          const currentPosY = p.baseRestY + p.currentDisplaceY;

          const dx = currentPosX - mouse.x;
          const dy = currentPosY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < repelRadius && dist > 0.01) {
            // Smooth quadratic falloff
            const factor = Math.pow(1 - dist / repelRadius, 2);
            const repelStrength = 32;

            targetDisplaceX = (dx / dist) * factor * repelStrength;
            // Push slightly up or sideways, prevent sinking below floor
            targetDisplaceY = Math.min(
              (dy / dist) * factor * 22,
              p.targetFloor - p.baseRestY
            );
            targetDisplaceAngle = (dx > 0 ? 1 : -1) * factor * 0.35;
          }
        }

        // Smooth spring interpolation back to rest position
        const springSpeed = 0.12;
        p.currentDisplaceX +=
          (targetDisplaceX - p.currentDisplaceX) * springSpeed;
        p.currentDisplaceY +=
          (targetDisplaceY - p.currentDisplaceY) * springSpeed;
        p.currentDisplaceAngle +=
          (targetDisplaceAngle - p.currentDisplaceAngle) * springSpeed;

        // Check if particle is still moving
        if (
          Math.abs(targetDisplaceX - p.currentDisplaceX) > 0.08 ||
          Math.abs(targetDisplaceY - p.currentDisplaceY) > 0.08 ||
          Math.abs(p.currentDisplaceX) > 0.08 ||
          Math.abs(p.currentDisplaceY) > 0.08
        ) {
          allSettledAndStill = false;
        }

        // 3. Render Particle
        const renderX = p.settled ? p.baseRestX + p.currentDisplaceX : p.x;
        const renderY = p.settled ? p.baseRestY + p.currentDisplaceY : p.y;
        const renderAngle = p.settled
          ? p.baseRestAngle + p.currentDisplaceAngle
          : p.rotation;

        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(renderAngle);

        ctx.font = `400 ${p.fontSize}px "JetBrains Mono", "Fira Code", ui-monospace, Menlo, Consolas, monospace`;
        ctx.fillStyle = `rgba(244, 244, 245, ${p.baseOpacity})`;
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();
      }

      // If everything has fallen and settled and no mouse interaction is happening, sleep to save 100% CPU
      if (allSettledAndStill && (!mouse.isActive || mouse.x < 0)) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const wakeUpLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Track mouse events relative to hero container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      if (
        relativeX >= 0 &&
        relativeX <= rect.width &&
        relativeY >= 0 &&
        relativeY <= rect.height
      ) {
        mouse.x = relativeX;
        mouse.y = relativeY;
        mouse.isActive = true;
        wakeUpLoop();
      } else if (mouse.isActive) {
        mouse.isActive = false;
        wakeUpLoop();
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      wakeUpLoop();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const relativeX = touch.clientX - rect.left;
        const relativeY = touch.clientY - rect.top;
        if (
          relativeX >= 0 &&
          relativeX <= rect.width &&
          relativeY >= 0 &&
          relativeY <= rect.height
        ) {
          mouse.x = relativeX;
          mouse.y = relativeY;
          mouse.isActive = true;
          wakeUpLoop();
        }
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
      wakeUpLoop();
    };

    // Setup listeners
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    // Initial setup
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
