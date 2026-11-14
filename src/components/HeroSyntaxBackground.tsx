"use client";

import React, { useEffect, useRef } from "react";

interface GiantSyntaxParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  rotation: number;
  angularVelocity: number;
  symbol: string;
  fontSize: number;
  baseOpacity: number;
  settled: boolean;
}

const GIANTS_SYMBOLS = [
  "{",
  "}",
  "[",
  "]",
  ";",
  "/>",
  "</",
  "(",
  ")",
  "=>",
  "&&",
  "||",
  "*",
  "//",
  "++",
  "#",
  "$",
  "{}",
  "[]",
  "::",
  "==",
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

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number | null = null;
    let isRunning = false;
    let particles: GiantSyntaxParticle[] = [];

    // Track mouse with position and velocity
    const mouse = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      lastX: -9999,
      lastY: -9999,
      isActive: false,
    };

    const initParticles = (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? 11 : 20;
      particles = [];

      const floorY = height - 20;

      for (let i = 0; i < count; i++) {
        const symbol = GIANTS_SYMBOLS[i % GIANTS_SYMBOLS.length];
        const minFont = isMobile ? 48 : 64;
        const maxFont = isMobile ? 74 : 102;
        const fontSize = Math.floor(minFont + Math.random() * (maxFont - minFont));
        const radius = fontSize * 0.42;
        const mass = radius * radius;
        const baseOpacity = Number((0.09 + Math.random() * 0.11).toFixed(3));

        // Distributed spawn across active width
        const spawnX =
          width * 0.08 + Math.random() * (width * 0.84);
        const spawnY = prefersReducedMotion
          ? floorY - radius - (i % 2) * (radius * 0.8)
          : -70 - i * 45 - Math.random() * 120;

        particles.push({
          x: spawnX,
          y: spawnY,
          vx: (Math.random() - 0.5) * 1.6,
          vy: prefersReducedMotion ? 0 : 2.0 + Math.random() * 3.0,
          radius,
          mass,
          rotation: (Math.random() - 0.5) * 0.8,
          angularVelocity: (Math.random() - 0.5) * 0.035,
          symbol,
          fontSize,
          baseOpacity,
          settled: prefersReducedMotion,
        });
      }

      // If reduced motion, pre-settle them with physics solver immediately
      if (prefersReducedMotion) {
        settleWithPhysics(particles, width, height, 240);
      }
    };

    // Pre-solver helper for instant settling without animation
    const settleWithPhysics = (
      pts: GiantSyntaxParticle[],
      width: number,
      height: number,
      iterations: number
    ) => {
      const floorY = height - 20;
      const dt = 0.25;
      const grav = 0.22;

      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          p.vy += grav * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rotation += p.angularVelocity * dt;

          if (p.y > floorY - p.radius) {
            p.y = floorY - p.radius;
            p.vy = -p.vy * 0.3;
            p.vx *= 0.85;
            p.angularVelocity *= 0.8;
          }
          if (p.x < p.radius + 15) {
            p.x = p.radius + 15;
            p.vx = -p.vx * 0.4;
          }
          if (p.x > width - p.radius - 15) {
            p.x = width - p.radius - 15;
            p.vx = -p.vx * 0.4;
          }
        }

        resolveCollisions(pts);
      }

      pts.forEach((p) => {
        p.vx = 0;
        p.vy = 0;
        p.angularVelocity = 0;
        p.settled = true;
      });
    };

    // Fast particle-particle collision solver
    const resolveCollisions = (pts: GiantSyntaxParticle[]) => {
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const p1 = pts[i];
          const p2 = pts[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);
          const minDist = p1.radius + p2.radius;

          if (dist < minDist && dist > 0.001) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            const totalMass = p1.mass + p2.mass;
            const m1Ratio = p2.mass / totalMass;
            const m2Ratio = p1.mass / totalMass;

            // Positional separation
            p1.x -= nx * overlap * m1Ratio;
            p1.y -= ny * overlap * m1Ratio;
            p2.x += nx * overlap * m2Ratio;
            p2.y += ny * overlap * m2Ratio;

            // Relative velocity impulse
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const vn = nx * kx + ny * ky;

            if (vn > 0) {
              const impulse = (1.3 * vn) / totalMass;
              p1.vx -= impulse * p2.mass * nx;
              p1.vy -= impulse * p2.mass * ny;
              p2.vx += impulse * p1.mass * nx;
              p2.vy += impulse * p1.mass * ny;

              p1.angularVelocity += (Math.random() - 0.5) * 0.008;
              p2.angularVelocity += (Math.random() - 0.5) * 0.008;
            }
          }
        }
      }
    };

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

      initParticles(width, height);
      wakeUpLoop();
    };

    const render = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const floorY = height - 20;

      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const subSteps = 3;
      const dt = 1 / subSteps;
      const gravity = 0.22;
      let totalKineticEnergy = 0;

      for (let s = 0; s < subSteps; s++) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Gravity and velocity integration
          p.vy += gravity * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rotation += p.angularVelocity * dt;

          // Floor boundary collision with restitution & rolling friction
          if (p.y > floorY - p.radius) {
            p.y = floorY - p.radius;
            p.vy = -p.vy * 0.32;
            p.vx *= 0.88;
            p.angularVelocity *= 0.84;
          }

          // Side walls boundary collision
          if (p.x < p.radius + 15) {
            p.x = p.radius + 15;
            p.vx = -p.vx * 0.35;
          }
          if (p.x > width - p.radius - 15) {
            p.x = width - p.radius - 15;
            p.vx = -p.vx * 0.35;
          }

          // Interactive Mouse Repulsion & Physical Push
          if (mouse.isActive) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const mouseEffectiveRadius = p.radius + 70;

            if (dist < mouseEffectiveRadius && dist > 0.1) {
              const nx = dx / dist;
              const ny = dy / dist;
              const pushFactor = Math.pow(1 - dist / mouseEffectiveRadius, 2);
              const pushForce = pushFactor * 4.5;

              p.vx += nx * pushForce + mouse.vx * 0.25;
              p.vy += ny * pushForce + mouse.vy * 0.25;
              p.angularVelocity += (nx > 0 ? 1 : -1) * pushForce * 0.015;
            }
          }

          totalKineticEnergy += p.vx * p.vx + p.vy * p.vy;
        }

        // Particle-to-particle collision
        resolveCollisions(particles);
      }

      // Render each giant symbol with bold typography and tactile glassy stroke
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.font = `600 ${p.fontSize}px "JetBrains Mono", "Fira Code", ui-monospace, Menlo, Consolas, monospace`;

        // Subtle outer stroke for tactile depth
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.baseOpacity * 0.45})`;
        ctx.strokeText(p.symbol, 0, 0);

        // Main luminous fill
        ctx.fillStyle = `rgba(244, 244, 245, ${p.baseOpacity})`;
        ctx.fillText(p.symbol, 0, 0);

        ctx.restore();
      }

      // Damping mouse velocity
      mouse.vx *= 0.8;
      mouse.vy *= 0.8;

      // Sleep loop when fully settled and mouse is inactive (0% CPU usage)
      const isStill = totalKineticEnergy < 0.2;
      if (isStill && (!mouse.isActive || mouse.x < 0)) {
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
        if (mouse.lastX !== -9999) {
          mouse.vx = (relativeX - mouse.lastX) * 0.4;
          mouse.vy = (relativeY - mouse.lastY) * 0.4;
        }
        mouse.lastX = relativeX;
        mouse.lastY = relativeY;
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
      mouse.lastX = -9999;
      mouse.lastY = -9999;
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
          if (mouse.lastX !== -9999) {
            mouse.vx = (relativeX - mouse.lastX) * 0.4;
            mouse.vy = (relativeY - mouse.lastY) * 0.4;
          }
          mouse.lastX = relativeX;
          mouse.lastY = relativeY;
          mouse.x = relativeX;
          mouse.y = relativeY;
          mouse.isActive = true;
          wakeUpLoop();
        }
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
      mouse.lastX = -9999;
      mouse.lastY = -9999;
      wakeUpLoop();
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

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
