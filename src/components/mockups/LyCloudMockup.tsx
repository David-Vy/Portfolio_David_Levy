// src/components/mockups/LyCloudMockup.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Database,
  HardDrive,
  Server,
  Terminal,
  Play,
  Pause,
  RefreshCw,
  UploadCloud,
  Search,
  Zap,
  Wifi,
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "mongo" | "minio" | "ws" | "sdk" | "func";
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "init-1",
    timestamp: "18:42:01",
    level: "info",
    message: "LyCloud Server v1.0.4 initialized — Monorepo BaaS Cluster ready",
  },
  {
    id: "init-2",
    timestamp: "18:42:02",
    level: "mongo",
    message: "Connected to mongodb://127.0.0.1:27017/lycloud (14 collections, 4.2ms)",
  },
  {
    id: "init-3",
    timestamp: "18:42:02",
    level: "minio",
    message: "MinIO S3 Gateway active: 3 buckets mounted (1.8 GB stored)",
  },
  {
    id: "init-4",
    timestamp: "18:42:03",
    level: "ws",
    message: "WebSocket telemetry channel established (wss://localhost:3000/stream)",
  },
];

export default function LyCloudMockup() {
  const [mounted, setMounted] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [cpuUsage, setCpuUsage] = useState(24.5);
  const [ramUsage, setRamUsage] = useState(584); // MB
  const [networkPing, setNetworkPing] = useState(4.2); // ms
  const [activeSockets] = useState(4);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isSpiking, setIsSpiking] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Garantir que a renderização inicial não cause hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Formatar hora atual para os logs
  const getFormattedTime = useCallback(() => {
    const now = new Date();
    return now.toTimeString().split(" ")[0];
  }, []);

  // Adicionar novo log ao buffer
  const addLog = useCallback(
    (level: LogEntry["level"], message: string) => {
      const newEntry: LogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        timestamp: getFormattedTime(),
        level,
        message,
      };
      setLogs((prev) => [...prev.slice(-40), newEntry]);
    },
    [getFormattedTime]
  );

  // Auto-scroll interno da console do terminal (sem interferir na rolagem global da página)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs]);

  // Oscilação periódica de telemetria via WebSocket simulado
  useEffect(() => {
    if (!isConnected || !mounted) return;

    const interval = setInterval(() => {
      // Oscilação suave do uso de CPU
      setCpuUsage((prev) => {
        if (isSpiking) return prev;
        const delta = Math.random() * 4 - 2;
        return Math.min(48, Math.max(14, +(prev + delta).toFixed(1)));
      });

      // Oscilação suave da RAM
      setRamUsage((prev) => {
        const delta = Math.random() * 6 - 3;
        return Math.min(720, Math.max(512, Math.round(prev + delta)));
      });

      // Latência de rede
      setNetworkPing((prev) => {
        const delta = Math.random() * 0.8 - 0.4;
        return +(Math.max(2.1, Math.min(9.5, prev + delta)).toFixed(1));
      });

      // Log periódico esporádico (1 a cada ~4 ticks)
      if (Math.random() < 0.25) {
        const periodicLogs: Array<{ level: LogEntry["level"]; msg: string }> = [
          { level: "ws", msg: `Telemetry heartbeat ACK · ping ${networkPing}ms · ${activeSockets} sockets` },
          { level: "mongo", msg: "Mongoose oplog sync OK · Zero replication lag · 142 ops/s" },
          { level: "minio", msg: "MinIO S3 HealthCheck 200 OK · Bucket /assets-public healthy" },
          { level: "info", msg: "Node.js EventLoop lag: 0.82ms · Heap total: 1024MB" },
        ];
        const chosen = periodicLogs[Math.floor(Math.random() * periodicLogs.length)];
        addLog(chosen.level, chosen.msg);
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [isConnected, mounted, isSpiking, networkPing, activeSockets, addLog]);

  // Alternar conexão WebSocket
  const toggleWebSocket = () => {
    if (isConnected) {
      setIsConnected(false);
      addLog("ws", "Live telemetry stream PAUSED by client — Polling suspended");
    } else {
      setIsConnected(true);
      addLog("ws", "WebSocket reconnected to wss://localhost:3000/stream (101 Switching Protocols)");
    }
  };

  // Resetar telemetria e console
  const handleReset = () => {
    setLogs(INITIAL_LOGS);
    setCpuUsage(24.5);
    setRamUsage(584);
    setIsConnected(true);
    addLog("info", "Cluster telemetry buffer reset to initial baseline");
  };

  // Simular operação do SDK: Upload para MinIO S3
  const triggerStorageUpload = () => {
    setIsSpiking(true);
    setCpuUsage(58.4);
    addLog("sdk", "lycloud.storage.upload(file: 'package-bundle.tar.gz', path: '/builds')");
    setTimeout(() => {
      addLog("minio", "S3 PutObject HTTP/1.1 200 OK — ETag '9a4f2c01...' (3.8 MB in 38ms)");
      addLog("sdk", "URL gerada: https://s3.lycloud.internal/builds/package-bundle.tar.gz");
      setRamUsage((prev) => prev + 18);
      setTimeout(() => {
        setIsSpiking(false);
        setCpuUsage(28.2);
      }, 1000);
    }, 450);
  };

  // Simular operação do SDK: Consulta NoSQL ao MongoDB
  const triggerDatabaseQuery = () => {
    setIsSpiking(true);
    setCpuUsage(42.1);
    addLog("sdk", "lycloud.database.get('users', { role: 'engineer', active: true })");
    setTimeout(() => {
      addLog("mongo", "Mongoose find() matched 6 documents in 2.3ms (index: ix_role_active)");
      setTimeout(() => {
        setIsSpiking(false);
        setCpuUsage(21.4);
      }, 800);
    }, 320);
  };

  // Simular operação do SDK: Invocação de Cloud Function
  const triggerFunctionInvoke = () => {
    setIsSpiking(true);
    setCpuUsage(67.8);
    addLog("sdk", "lycloud.functions.invoke('auth-token-verifier', { token: 'eyJh...' })");
    setTimeout(() => {
      addLog("func", "CloudFunction isolate (PID 5812) executed in 11ms — Result: { valid: true }");
      setTimeout(() => {
        setIsSpiking(false);
        setCpuUsage(23.7);
      }, 900);
    }, 400);
  };

  // Cores dinâmicas para o nível de log
  const getLogColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "mongo":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-800/40";
      case "minio":
        return "text-amber-400 bg-amber-950/40 border-amber-800/40";
      case "ws":
        return "text-cyan-400 bg-cyan-950/40 border-cyan-800/40";
      case "sdk":
        return "text-fuchsia-400 bg-fuchsia-950/40 border-fuchsia-800/40";
      case "func":
        return "text-pink-400 bg-pink-950/40 border-pink-800/40";
      default:
        return "text-blue-400 bg-blue-950/40 border-blue-800/40";
    }
  };

  const ramPercent = Math.round((ramUsage / 2048) * 100);

  return (
    <div className="relative w-full h-full flex flex-col bg-zinc-950 text-zinc-100 select-none overflow-hidden font-sans">
      {/* Background Decorativo e Glow Sutil */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header do Painel de Controle (Estilo Window Shell) */}
      <header className="relative z-10 shrink-0 h-11 px-3.5 sm:px-4 flex items-center justify-between border-b border-white/[0.08] bg-black/50 backdrop-blur-md">
        {/* Lado Esquerdo: Controles de Janela & Título do Cluster */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>

          <div className="h-3.5 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide text-white font-mono">
              LyCloud Server
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hidden sm:inline-block">
              BaaS Cluster v1.0.4
            </span>
          </div>
        </div>

        {/* Lado Direito: Toggle WebSocket & Reset */}
        <div className="flex items-center gap-2">
          {/* Botão de Toggle da Telemetria WebSocket */}
          <button
            type="button"
            onClick={toggleWebSocket}
            title={isConnected ? "Pausar telemetria ao vivo" : "Reconectar telemetria ao vivo"}
            aria-label={isConnected ? "Pausar telemetria ao vivo" : "Reconectar telemetria ao vivo"}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 border ${
              isConnected
                ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60"
                : "bg-amber-950/50 border-amber-500/40 text-amber-300 hover:bg-amber-900/60"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="hidden xs:inline">
              {isConnected ? "WS LIVE" : "WS PAUSED"}
            </span>
            {isConnected ? <Pause size={10} /> : <Play size={10} />}
          </button>

          {/* Botão de Reset */}
          <button
            type="button"
            onClick={handleReset}
            title="Reiniciar telemetria e limpar buffer"
            aria-label="Reiniciar telemetria e limpar buffer"
            className="p-1.5 rounded-md border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      </header>

      {/* 2. Medidores em Tempo Real: CPU, RAM e Latência de Rede */}
      <section className="relative z-10 shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 border-b border-white/[0.06] bg-zinc-950/60">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Gauge 1: CPU */}
          <div className="p-2 sm:p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <Cpu size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">CPU</span>
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  cpuUsage > 60 ? "text-amber-400" : "text-emerald-400"
                }`}
              >
                {mounted ? `${cpuUsage.toFixed(1)}%` : "24.5%"}
              </span>
            </div>
            <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  cpuUsage > 60
                    ? "bg-gradient-to-r from-amber-500 to-red-500"
                    : "bg-gradient-to-r from-emerald-500 to-cyan-400"
                }`}
                animate={{ width: `${mounted ? cpuUsage : 24.5}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Gauge 2: Memória RAM */}
          <div className="p-2 sm:p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <Activity size={12} className="text-cyan-400 shrink-0" />
                <span className="truncate">RAM</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {mounted ? `${ramUsage}MB` : "584MB"}
              </span>
            </div>
            <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                animate={{ width: `${mounted ? ramPercent : 28}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Gauge 3: Rede / Latência */}
          <div className="p-2 sm:p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <Wifi size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">PING</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {mounted ? `${networkPing}ms` : "4.2ms"}
              </span>
            </div>
            <div className="w-full bg-white/[0.08] rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                animate={{ width: `${mounted ? Math.min(100, networkPing * 10) : 42}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Badges de Saúde dos Serviços (MongoDB, MinIO, Node.js) */}
      <section className="relative z-10 shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 border-b border-white/[0.06] bg-black/40">
        <div className="grid grid-cols-3 gap-2">
          {/* Serviço 1: MongoDB */}
          <div className="flex items-center justify-between px-2.5 py-1 rounded-lg border border-white/[0.05] bg-white/[0.01]">
            <div className="flex items-center gap-1.5 min-w-0">
              <Database size={12} className="text-emerald-400 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] font-mono font-medium text-white truncate">MongoDB</p>
                <p className="text-[9px] font-mono text-zinc-400 truncate">14 col · 4.2ms</p>
              </div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Online" />
          </div>

          {/* Serviço 2: MinIO S3 */}
          <div className="flex items-center justify-between px-2.5 py-1 rounded-lg border border-white/[0.05] bg-white/[0.01]">
            <div className="flex items-center gap-1.5 min-w-0">
              <HardDrive size={12} className="text-amber-400 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] font-mono font-medium text-white truncate">MinIO S3</p>
                <p className="text-[9px] font-mono text-zinc-400 truncate">3 bkt · 1.8GB</p>
              </div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Active" />
          </div>

          {/* Serviço 3: Node.js Engine */}
          <div className="flex items-center justify-between px-2.5 py-1 rounded-lg border border-white/[0.05] bg-white/[0.01]">
            <div className="flex items-center gap-1.5 min-w-0">
              <Server size={12} className="text-cyan-400 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] font-mono font-medium text-white truncate">Node PID</p>
                <p className="text-[9px] font-mono text-zinc-400 truncate">PID 4092 · UP</p>
              </div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" title="Running" />
          </div>
        </div>
      </section>

      {/* 4. Barra de Ações Rápidas do SDK Oficial */}
      <section className="relative z-10 shrink-0 px-3 py-2 sm:px-4 sm:py-2 border-b border-white/[0.06] bg-zinc-950/80">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-1 hidden sm:inline">
              SDK Ops:
            </span>

            {/* Ação 1: Upload MinIO S3 */}
            <button
              type="button"
              onClick={triggerStorageUpload}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-amber-300 hover:text-white transition-all active:scale-95"
            >
              <UploadCloud size={11} className="text-amber-400" />
              <span>upload()</span>
            </button>

            {/* Ação 2: Query MongoDB */}
            <button
              type="button"
              onClick={triggerDatabaseQuery}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-emerald-300 hover:text-white transition-all active:scale-95"
            >
              <Search size={11} className="text-emerald-400" />
              <span>query()</span>
            </button>

            {/* Ação 3: Invocação de Cloud Function */}
            <button
              type="button"
              onClick={triggerFunctionInvoke}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-cyan-300 hover:text-white transition-all active:scale-95"
            >
              <Zap size={11} className="text-cyan-400" />
              <span>invoke()</span>
            </button>
          </div>

          <span className="text-[9px] font-mono text-zinc-500 whitespace-nowrap hidden md:inline">
            Clique para disparar eventos
          </span>
        </div>
      </section>

      {/* 5. Terminal Console / Event Log Integrado */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col bg-black/70">
        {/* Sub-header do Terminal */}
        <div className="shrink-0 px-3 py-1 sm:px-4 sm:py-1.5 flex items-center justify-between border-b border-white/[0.04] bg-white/[0.02]">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
            <Terminal size={11} className="text-zinc-500" />
            <span className="uppercase tracking-wider">Console do Servidor (Telemetria)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-zinc-500">
              {logs.length} eventos
            </span>
          </div>
        </div>

        {/* Corpo de Logs Rolável com Scroll Interno Seguro */}
        <div ref={terminalBodyRef} className="flex-1 min-h-0 overflow-y-auto p-2.5 sm:p-3 font-mono text-[10px] sm:text-[11px] leading-relaxed space-y-1">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 hover:bg-white/[0.02] py-0.5 px-1 rounded">
              <span className="text-zinc-500 shrink-0 select-none">{log.timestamp}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 border select-none ${getLogColor(
                  log.level
                )}`}
              >
                {log.level}
              </span>
              <span className="text-zinc-300 break-all">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
