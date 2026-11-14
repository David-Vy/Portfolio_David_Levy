"use client";

import React, { useEffect, useRef } from "react";

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

export default function SkillsNetworkBackground() {
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
    let nodes: NetworkNode[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth || 1200;
      const height = rect.height || 600;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes(width, height);
    };

    const initNodes = (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? 24 : 48;
      nodes = [];

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 1.5,
          baseAlpha: 0.12 + Math.random() * 0.16,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const render = () => {
      if (!isVisible) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const maxConnectDistance = 115;
      const mouseInfluenceRadius = 150;

      // 1. Update and draw connecting network lines between nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Move node
        n1.x += n1.vx;
        n1.y += n1.vy;
        n1.pulsePhase += 0.02;

        // Bounce on boundaries
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Gravitate softly to mouse if nearby
        if (mouse.isActive) {
          const dxMouse = mouse.x - n1.x;
          const dyMouse = mouse.y - n1.y;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < mouseInfluenceRadius && distMouse > 5) {
            const pullFactor = (1 - distMouse / mouseInfluenceRadius) * 0.25;
            n1.x += (dxMouse / distMouse) * pullFactor;
            n1.y += (dyMouse / distMouse) * pullFactor;

            // Draw elastic connection line to mouse
            const lineAlpha = (1 - distMouse / mouseInfluenceRadius) * 0.18;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections between pairs of nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDistance) {
            const alpha =
              (1 - dist / maxConnectDistance) * 0.08 * (n1.baseAlpha + n2.baseAlpha);
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Draw nodes with soft radial pulse
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulsePhase) * 0.04;
        const currentAlpha = Math.max(0.04, Math.min(0.4, n.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
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
        mouse.x = relativeX;
        mouse.y = relativeY;
        mouse.isActive = true;
      } else {
        mouse.isActive = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    // Pause animation when section is off screen to save CPU
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(render);
          }
        } else if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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
