// src/components/mockups/LyMadhouseMockup.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Radio,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Monitor,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface TelemetryLog {
  id: string;
  timestamp: string;
  module: "DXGI" | "WASAPI" | "LiveKit" | "Krisp" | "NodeAPI";
  message: string;
}

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: "log-1",
    timestamp: "19:04:10",
    module: "NodeAPI",
    message: "ly_capture.node addon loaded into Electron main process via N-API",
  },
  {
    id: "log-2",
    timestamp: "19:04:11",
    module: "DXGI",
    message: "IDXGIOutputDuplication acquired on Adapter 0 (Direct3D 11 Zero-Copy)",
  },
  {
    id: "log-3",
    timestamp: "19:04:11",
    module: "WASAPI",
    message: "IAudioCaptureClient loopback initialized: 48 kHz, 2 ch, PCM Float32",
  },
  {
    id: "log-4",
    timestamp: "19:04:12",
    module: "Krisp",
    message: "Deep neural noise suppression active (SNR gain +24.8 dB)",
  },
  {
    id: "log-5",
    timestamp: "19:04:12",
    module: "LiveKit",
    message: "WebRTC peer connection established: H.264/Opus streaming @ 60 FPS",
  },
];

export default function LyMadhouseMockup() {
  const [mounted, setMounted] = useState(false);
  const [isCapturing, setIsCapturing] = useState(true);
  const [krispEnabled, setKrispEnabled] = useState(true);
  const [targetFps, setTargetFps] = useState<60 | 120>(60);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [fpsCurrent, setFpsCurrent] = useState(60.1);
  const [bitrateKbps, setBitrateKbps] = useState(4820);
  const [audioLatencyMs, setAudioLatencyMs] = useState(1.8);
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [activeTab, setActiveTab] = useState<"stream" | "audio" | "terminal">("stream");

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simular jitter dinâmico de telemetria em tempo real
  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      // Pequena variação em FPS e bitrate
      const fpsDelta = (Math.random() - 0.48) * 0.4;
      const targetBase = targetFps === 120 ? 120.0 : 60.0;
      setFpsCurrent(Number((targetBase + fpsDelta).toFixed(1)));

      const baseBitrate = targetFps === 120 ? 8200 : 4800;
      const bitrateDelta = Math.floor((Math.random() - 0.5) * 180);
      setBitrateKbps(baseBitrate + bitrateDelta);

      const latDelta = (Math.random() - 0.5) * 0.2;
      setAudioLatencyMs(Number((1.8 + latDelta).toFixed(2)));
    }, 1200);

    return () => clearInterval(interval);
  }, [isCapturing, targetFps]);

  // Auto-scroll do terminal de diagnóstico
  useEffect(() => {
    if (activeTab === "terminal" && terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  const addTelemetryLog = useCallback((module: TelemetryLog["module"], message: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(" ")[0];
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp,
      module,
      message,
    };
    setLogs((prev) => [...prev.slice(-18), newLog]);
  }, []);

  const handleToggleCapture = () => {
    const next = !isCapturing;
    setIsCapturing(next);
    addTelemetryLog(
      "DXGI",
      next
        ? `Desktop duplication streaming resumed at ${targetFps} FPS`
        : "Desktop duplication capture paused by operator"
    );
  };

  const handleToggleKrisp = () => {
    const next = !krispEnabled;
    setKrispEnabled(next);
    addTelemetryLog(
      "Krisp",
      next
        ? "Krisp AI neural filter enabled (acoustic noise suppression 100%)"
        : "Krisp AI bypassed (raw WASAPI PCM loopback pass-through)"
    );
  };

  const handleFpsChange = (fps: 60 | 120) => {
    setTargetFps(fps);
    addTelemetryLog(
      "DXGI",
      `Video pipeline reconfigured to ${fps} FPS Direct3D 11 refresh rate`
    );
  };

  const handleToggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    addTelemetryLog(
      "WASAPI",
      next ? "System audio capture muted" : "System audio capture active (WASAPI loopback unmuted)"
    );
  };

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[440px] bg-zinc-950 flex items-center justify-center text-zinc-500 font-mono text-xs">
        Iniciando motor DXGI / WebRTC...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white font-mono text-xs select-none overflow-hidden">
      {/* Barra de Status e Cabeçalho Superior */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isCapturing ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-bold tracking-tight text-white text-[13px]">
              LyMadhouse Engine
            </span>
            <span className="hidden sm:inline text-zinc-600">/</span>
            <span className="text-[11px] text-zinc-400">
              DXGI 11 &amp; WebRTC Telemetry
            </span>
          </div>
        </div>

        {/* Badges de Arquitetura */}
        <div className="flex items-center gap-1.5">
          <span className="hidden md:inline px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
            Zero-Copy IPC
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-300 text-[10px]">
            LiveKit v1.5
          </span>
        </div>
      </div>

      {/* Barra de Navegação Interna de Abas */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/40 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("stream")}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeTab === "stream"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            Video / DXGI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audio")}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeTab === "audio"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            Audio / WASAPI
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
              activeTab === "terminal"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
            }`}
          >
            Console Logs ({logs.length})
          </button>
        </div>

        {/* Controles de Ação Rápida */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleCapture}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-semibold transition-all ${
              isCapturing
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
            }`}
          >
            {isCapturing ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Retomar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleKrisp}
            className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-mono transition-all ${
              krispEnabled
                ? "border-purple-500/40 bg-purple-500/15 text-purple-300"
                : "border-white/10 bg-white/[0.03] text-zinc-500"
            }`}
            title="Alternar Cancelamento de Ruído Krisp AI"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Krisp {krispEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Dinâmico por Aba */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {activeTab === "stream" && (
          <div className="space-y-4">
            {/* Display de Simulação de Vídeo Direct3D 11 */}
            <div className="relative aspect-video rounded-xl bg-zinc-900 border border-white/10 overflow-hidden flex flex-col justify-between p-4 group">
              {/* Grade de fundo simulando buffer de tela */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

              {/* Header do Overlay de Vídeo */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-semibold text-white">
                    1920x1080 @ {isCapturing ? `${fpsCurrent} FPS` : "0 FPS"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400">Target:</span>
                  <button
                    type="button"
                    onClick={() => handleFpsChange(60)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      targetFps === 60
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    60 FPS
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFpsChange(120)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      targetFps === 120
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    120 FPS
                  </button>
                </div>
              </div>

              {/* Centro Visual: Ondas e Indicador Zero-Copy */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-4">
                {isCapturing ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      {[40, 65, 85, 50, 95, 70, 80, 60, 45, 90, 75, 55].map((val, i) => (
                        <motion.span
                          key={i}
                          animate={{
                            height: isCapturing ? [12, val * 0.35, 12] : 6,
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.9,
                            delay: i * 0.06,
                            ease: "easeInOut",
                          }}
                          className="w-1.5 rounded-full bg-gradient-to-t from-emerald-500 to-cyan-400"
                          style={{ height: 16 }}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-300 font-medium">
                      IDXGIOutputDuplication: Zero-Copy D3D11 Frame Rendered
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      Buffer compartilhado via Handle de GPU sem transferência de CPU
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 text-zinc-500">
                    <Pause className="w-8 h-8 mx-auto opacity-50 mb-1" />
                    <p className="text-xs">Captura pausada</p>
                  </div>
                )}
              </div>

              {/* Rodapé do Overlay de Vídeo com Métricas WebRTC */}
              <div className="relative z-10 flex items-center justify-between text-[10px] text-zinc-400 border-t border-white/[0.06] pt-2">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-cyan-400" />
                  LiveKit WebRTC: {isCapturing ? `${bitrateKbps} kbps` : "0 kbps"}
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  Frame Time: {isCapturing ? (targetFps === 120 ? "8.3 ms" : "16.6 ms") : "0 ms"}
                </span>
              </div>
            </div>

            {/* Painel de Métricas de Hardware */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/10 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                  Captura DXGI
                </span>
                <span className="text-sm font-bold text-white">Direct3D 11</span>
                <span className="text-[10px] text-emerald-400 block font-mono">0.4ms overhead</span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/10 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                  Áudio WASAPI
                </span>
                <span className="text-sm font-bold text-white">{audioLatencyMs} ms</span>
                <span className="text-[10px] text-cyan-400 block font-mono">PCM Float32</span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/10 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                  Ruído Krisp
                </span>
                <span className="text-sm font-bold text-white">
                  {krispEnabled ? "-28 dB" : "Bypass"}
                </span>
                <span className="text-[10px] text-purple-400 block font-mono">
                  {krispEnabled ? "IA Neural Ativa" : "Desativado"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/70 border border-white/10 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                  C++ Node-API
                </span>
                <span className="text-sm font-bold text-white">Zero Locks</span>
                <span className="text-[10px] text-zinc-400 block font-mono">ThreadSafeFunc</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "audio" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">
                    WASAPI Loopback Audio Capture (Direct Loopback)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] border ${
                    isAudioMuted
                      ? "border-red-500/40 bg-red-500/10 text-red-300"
                      : "border-white/10 bg-white/[0.04] text-zinc-300"
                  }`}
                >
                  {isAudioMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Mudo</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Ativo</span>
                    </>
                  )}
                </button>
              </div>

              {/* VU Meter Virtual */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Canal Esquerdo (L)</span>
                  <span>{isAudioMuted ? "-Inf dB" : "-4.2 dB FS"}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-950 border border-white/10 overflow-hidden flex p-0.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400"
                    animate={{
                      width: isAudioMuted ? "0%" : ["65%", "82%", "74%", "88%", "70%"],
                    }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-zinc-400 pt-1">
                  <span>Canal Direito (R)</span>
                  <span>{isAudioMuted ? "-Inf dB" : "-5.1 dB FS"}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-zinc-950 border border-white/10 overflow-hidden flex p-0.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400"
                    animate={{
                      width: isAudioMuted ? "0%" : ["60%", "78%", "80%", "72%", "85%"],
                    }}
                    transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Especificações da Stream de Áudio */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-zinc-300">
                <div className="p-2.5 rounded bg-zinc-950 border border-white/5 space-y-0.5">
                  <span className="text-zinc-500 text-[10px]">Formato Loopback:</span>
                  <p className="font-semibold text-white">48.000 Hz, 32-bit Float</p>
                </div>
                <div className="p-2.5 rounded bg-zinc-950 border border-white/5 space-y-0.5">
                  <span className="text-zinc-500 text-[10px]">Cancelamento de Ruído:</span>
                  <p className="font-semibold text-purple-300">
                    {krispEnabled ? "Krisp AI Deep Clean" : "Bypass Desativado"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "terminal" && (
          <div
            ref={terminalEndRef}
            className="p-3 rounded-xl bg-zinc-900 border border-white/10 font-mono text-[11px] space-y-1.5 max-h-[220px] overflow-y-auto"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-zinc-600 shrink-0">{log.timestamp}</span>
                <span
                  className={`px-1.5 rounded text-[9px] font-semibold uppercase shrink-0 ${
                    log.module === "DXGI"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : log.module === "WASAPI"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : log.module === "Krisp"
                      ? "bg-purple-500/20 text-purple-300"
                      : log.module === "LiveKit"
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-white/10 text-zinc-300"
                  }`}
                >
                  {log.module}
                </span>
                <span className="text-zinc-300 break-words">{log.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Barra Inferior com Indicadores Globais */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-t border-white/10 text-[10px] text-zinc-400 shrink-0">
        <span className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>DXGI Direct3D 11 Desktop Duplication</span>
        </span>
        <span className="text-zinc-500">LiveKit WebRTC Low Latency</span>
      </div>
    </div>
  );
}
