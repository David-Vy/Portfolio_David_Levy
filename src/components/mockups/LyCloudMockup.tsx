// src/components/mockups/LyCloudMockup.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  HardDrive,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface NodeState {
  id: "orchestrator" | "mongo" | "minio" | "websocket";
  name: string;
  category: string;
  status: string;
  metric: string;
}

export default function LyCloudMockup() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeState | null>(null);
  const [pulseKey, setPulseKey] = useState<number>(0);

  // Nós da Arquitetura Distribuída BaaS
  const nodes: NodeState[] = [
    {
      id: "orchestrator",
      name: "BaaS Core Orchestrator",
      category: "Docker Monorepo PNPM",
      status: "Operacional • 0.8ms",
      metric: "CPU 18% • RAM 512MB",
    },
    {
      id: "mongo",
      name: "MongoDB NoSQL Engine",
      category: "Coleções Reativas",
      status: "14 Coleções Conectadas",
      metric: "142 ops/s • Mongoose",
    },
    {
      id: "minio",
      name: "MinIO S3 Object Store",
      category: "Armazenamento em Nuvem",
      status: "3 Buckets Ativos",
      metric: "1.8 GB Alocados",
    },
    {
      id: "websocket",
      name: "WebSocket Telemetry Stream",
      category: "Canal Bidirecional",
      status: "4 Conexões Ativas",
      metric: "Latência: 2.1ms",
    },
  ];

  const triggerAction = (actionName: string) => {
    setActiveAction(actionName);
    setPulseKey((prev) => prev + 1);
    setTimeout(() => {
      setActiveAction(null);
    }, 1800);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-zinc-950/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative select-none">
      {/* 1. Header Minimalista */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight">
              LyCloud BaaS Topology
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
        </div>
      </div>

      {/* 2. Ilustração Minimalista da Topologia em Nuvem (SVG + Nodes Orbitais) */}
      <div className="relative flex-1 flex items-center justify-center my-6 min-h-[220px]">
        {/* Linhas Conectoras Sutis em SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-white/[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="50%" y1="50%" x2="20%" y2="28%" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="80%" y2="28%" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="50%" y2="85%" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Pulsos de Dados Animados pelas Linhas */}
          {activeAction && (
            <>
              <line
                x1="50%"
                y1="50%"
                x2="20%"
                y2="28%"
                stroke="rgba(16, 185, 129, 0.6)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-pulse"
              />
              <line
                x1="50%"
                y1="50%"
                x2="80%"
                y2="28%"
                stroke="rgba(20, 184, 166, 0.6)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-pulse"
              />
              <line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="85%"
                stroke="rgba(56, 189, 248, 0.6)"
                strokeWidth="2"
                strokeDasharray="4 8"
                className="animate-pulse"
              />
            </>
          )}
        </svg>

        {/* Nó Central: BaaS Core Orchestrator */}
        <motion.div
          key={`core-${pulseKey}`}
          animate={{ scale: activeAction ? [1, 1.08, 1] : 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setSelectedNode(nodes[0])}
          className="relative z-20 cursor-pointer group"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 flex flex-col items-center justify-center p-2 shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:border-emerald-400 transition-all duration-300">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-white tracking-tight">Core BaaS</span>
            <span className="text-[9px] font-mono text-emerald-400/80">Docker Cluster</span>
          </div>

          {/* Anéis de Pulso Suave */}
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 blur-md -z-10 animate-pulse" />
        </motion.div>

        {/* Nó 1: MongoDB NoSQL (Canto Superior Esquerdo) */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          onClick={() => setSelectedNode(nodes[1])}
          className="absolute top-2 left-4 sm:left-12 z-20 cursor-pointer group"
        >
          <div className="px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] group-hover:border-emerald-500/40 flex items-center gap-2.5 shadow-lg backdrop-blur-md transition-all">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Database className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">MongoDB</p>
              <p className="text-[10px] font-mono text-zinc-400">14 Coleções</p>
            </div>
          </div>
        </motion.div>

        {/* Nó 2: MinIO S3 Object Storage (Canto Superior Direito) */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          onClick={() => setSelectedNode(nodes[2])}
          className="absolute top-2 right-4 sm:right-12 z-20 cursor-pointer group"
        >
          <div className="px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] group-hover:border-teal-500/40 flex items-center gap-2.5 shadow-lg backdrop-blur-md transition-all">
            <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">MinIO S3</p>
              <p className="text-[10px] font-mono text-zinc-400">Object Storage</p>
            </div>
          </div>
        </motion.div>

        {/* Nó 3: WebSocket Telemetry (Inferior Central) */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1 }}
          onClick={() => setSelectedNode(nodes[3])}
          className="absolute bottom-1 z-20 cursor-pointer group"
        >
          <div className="px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/[0.08] group-hover:border-cyan-500/40 flex items-center gap-2.5 shadow-lg backdrop-blur-md transition-all">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">WebSocket Stream</p>
              <p className="text-[10px] font-mono text-zinc-400">CPU / RAM Live</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Rodapé com Ações Interativas Minimalistas */}
      <div className="border-t border-white/[0.06] pt-4 relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => triggerAction("Sincronização de Cluster")}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sincronizar Cluster</span>
          </button>

          <button
            type="button"
            onClick={() => triggerAction("Mutação NoSQL")}
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Gravação NoSQL</span>
          </button>

          <button
            type="button"
            onClick={() => triggerAction("Upload S3 Multipart")}
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Upload S3</span>
          </button>
        </div>

        {/* Feedback Rápido da Ação ou Nó Selecionado */}
        <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
          {activeAction ? (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-emerald-400 flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{activeAction} executada</span>
            </motion.span>
          ) : selectedNode ? (
            <span className="text-zinc-300">
              {selectedNode.name}: <strong className="text-emerald-400 font-normal">{selectedNode.metric}</strong>
            </span>
          ) : (
            <span>Clique nos nós para inspecionar</span>
          )}
        </div>
      </div>
    </div>
  );
}
