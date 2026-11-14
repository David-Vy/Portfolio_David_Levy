// src/components/MarqueeSeparator.tsx
"use client";

import { motion } from "framer-motion";

export default function MarqueeSeparator() {
  const items = [
    "SOFTWARE ENGINEERING",
    "FULL-STACK ARCHITECTURE",
    "DISTRIBUTED SYSTEMS",
    "WEBRTC & REAL-TIME",
    "DOCKER & CLOUD ENGINE",
    "POSTGRESQL & NOSQL",
    "REST APIS & MICROSERVICES",
    "CLEAN CODE & SOLID",
    "NEXT.JS & ELECTRON",
    "HIGH PERFORMANCE & C++",
  ];

  return (
    <div className="relative w-full py-10 overflow-hidden border-y border-white/[0.06] bg-zinc-950/40 select-none">
      {/* Máscaras de fade lateral para transição invisível nas bordas */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Marquee Track com Framer Motion em velocidade lenta e suave */}
      <motion.div
        className="flex whitespace-nowrap gap-10 items-center will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 35,
          ease: "linear",
        }}
      >
        {/* Renderizado duas vezes para loop infinito sem cortes */}
        {[...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-600 hover:text-white transition-colors duration-500 uppercase">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
