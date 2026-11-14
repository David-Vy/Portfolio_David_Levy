// src/components/mockups/RosaNeuralMockup.tsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Activity,
  Sparkles,
  RotateCcw,
  CornerDownLeft,
  Layers,
  Sliders,
  Info,
} from "lucide-react";

interface TerminalMessage {
  id: string;
  type: "system" | "user" | "assistant" | "telemetry" | "info";
  content: string;
  timestamp?: string;
}

const PRESET_PROMPTS = [
  { label: "DirectML GRU", prompt: "Explique o DirectML GRU" },
  { label: "Arquitetura", prompt: "Qual a arquitetura da rede?" },
  { label: "Autoregressão", prompt: "Gerar texto autoregressivo" },
  { label: "Tensores", prompt: "Status dos tensores" },
  { label: "stats", prompt: "stats" },
  { label: "gpu", prompt: "gpu" },
];

const KNOWLEDGE_BASE: Record<string, string> = {
  "explique o directml gru":
    "O DirectML GRU foi desenvolvido para contornar a ausência de kernels CUDA proprietários em hardware gráfico AMD sob Windows. Implementei a célula recorrente (DirectMLGRUCell) a nível fundamental em PyTorch usando apenas operações lineares primitivas (nn.Linear), Sigmoid e Tanh. Com isso, os gates de Reset (r), Update (z) e New Memory (n) rodam com aceleração de hardware nativa no backend torch_directml sem falhas de compilação ou incompatibilidade de kernels!",
  
  "qual a arquitetura da rede?":
    "Minha arquitetura é a RosaGRU: 3 camadas recorrentes manuais DirectMLGRUCell empilhadas com estado oculto de 512 dimensões (hidden_size=512), vocabulário denso de 4.096 tokens, embedding vetorial de 512d e camada linear de projeção (fc) com CrossEntropyLoss. O otimizador Adam utiliza foreach=False para evitar a falha aten::lerp do DirectML. Checkpoint: models/rosa_brain.pth (28.5 MB).",
  
  "gerar texto autoregressivo":
    "Iniciando amostragem autoregressiva... A inferência calcula a distribuição de probabilidade Softmax sobre os 4.096 logits a cada timestep t. O token predito é amostrado estocasticamente via torch.multinomial com temperatura ajustável e realimentado como entrada para o timestep t+1, gerando a sequência em fluxo contínuo com baixa latência.",
  
  "status dos tensores":
    "--- TELEMETRIA DE TENSORES EM MEMÓRIA ---\n• x (Entrada):             torch.Size([1, seq_len]) [int64]\n• embedding(x):          torch.Size([1, seq_len, 512]) [float32]\n• hidden_state (3 caps):  torch.Size([3, 1, 512]) [float32]\n• Gates [r, z, n]:        Linear(512, 1536) -> chunk(3) [float32]\n• fc_logits (Saída):      torch.Size([1, 4096]) [float32]\n• Dispositivo VRAM:       AMD Radeon Graphics (dml:0)\n• Latência por Token:     ~0.54ms",
  
  "stats":
    "================ MÉTRICAS DE TREINAMENTO (ROSA V3) ================\n• Épocas Concluídas:  10.000 / 10.000 (100% convergido)\n• Loss Final:         0.0412 (CrossEntropyLoss em dataset)\n• Perplexidade:       1.0421\n• Dataset de Treino:  data/dataset.txt (13.866.203 caracteres)\n• Otimizador:         Adam(lr=0.002, foreach=False [DirectML Fix])\n• Grad Norm Clip:     5.0 | Batch Size: 64 | Seq Len: 128\n• Checkpoint Salvo:   models/rosa_brain.pth (28.488.684 bytes)",

  "gpu":
    "================ HARDWARE DIRECTML TELEMETRY ================\n• Dispositivo:        AMD Radeon Graphics (DirectML Device 0)\n• Backend PyTorch:    torch_directml (device: dml:0)\n• Kernel Execution:   Native DML Graph (Sem dependência de CUDA)\n• Alocação de VRAM:   1.42 GB / 4.00 GB (35.5%)\n• Otimização Especial: Adam foreach=False (aten::lerp fix)\n• Taxa de Inferência: 1.842 tokens/segundo em modo de chat\n• Status Térmico:     Normal (0% Throttling detectado)",

  "help":
    "Comandos disponíveis no terminal Rosa V3:\n  predict <texto>   - Executa inferência autoregressiva token-a-token\n  stats             - Exibe métricas de perda, perplexidade e épocas\n  gpu               - Exibe telemetria do hardware AMD DirectML\n  tensors           - Inspeciona dimensões das camadas da rede neural\n  clear             - Limpa o histórico da sessão\n  help              - Exibe esta mensagem de ajuda\nOu digite qualquer pergunta livre para conversar com a rede!"
};

const INITIAL_SYSTEM_LINES: TerminalMessage[] = [
  {
    id: "banner-1",
    type: "system",
    content: "==================================================",
  },
  {
    id: "banner-2",
    type: "system",
    content: " 🌹 ROSA V3 - GRU EDITION 🌹",
  },
  {
    id: "banner-3",
    type: "system",
    content: "==================================================",
  },
  {
    id: "sys-info-1",
    type: "info",
    content:
      "Device: AMD Radeon Graphics (DirectML) | Checkpoint: models/rosa_brain.pth | Vocab: 4,096 tokens",
  },
  {
    id: "sys-info-2",
    type: "info",
    content:
      "Arquitetura: RosaGRU (3 camadas manuais DirectMLGRUCell) | Otimizador: Adam(foreach=False)",
  },
  {
    id: "sys-info-3",
    type: "info",
    content:
      "Dica: Digite 'help', 'stats', 'gpu' ou clique em um preset abaixo para interagir.",
  },
];

export default function RosaNeuralMockup() {
  const [messages, setMessages] = useState<TerminalMessage[]>(INITIAL_SYSTEM_LINES);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [temperature, setTemperature] = useState<number>(0.7);
  const [loss, setLoss] = useState<number>(0.0412);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll terminal to bottom when messages or streaming text updates
  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
    };
  }, []);

  // Handle command execution with streaming response simulation
  const executePrompt = useCallback(
    (promptText: string) => {
      const cleanPrompt = promptText.trim();
      if (!cleanPrompt || isStreaming) return;

      // Add user command to history
      setHistory((prev) => [...prev, cleanPrompt]);
      setHistoryIndex(-1);

      // Add user message to terminal
      const userMsg: TerminalMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: cleanPrompt,
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");

      // Handle 'clear' command immediately
      if (cleanPrompt.toLowerCase() === "clear") {
        setMessages(INITIAL_SYSTEM_LINES);
        return;
      }

      // Determine response content
      const lower = cleanPrompt.toLowerCase();
      let targetResponse = "";

      if (lower.startsWith("predict ")) {
        const customPrompt = cleanPrompt.substring(8).trim();
        targetResponse = `Iniciando geração condicionada em: "${customPrompt}"\n\n[RosaGRU dml:0 T=${temperature.toFixed(
          1
        )}]: As conexões recorrentes da arquitetura processaram o tensor de entrada [1, ${
          customPrompt.length
        }]. Projeções lineares ativadas com sucesso sob aceleração DirectML AMD. O fluxo estocástico convergiu com taxa de amostragem consistente.`;
      } else if (KNOWLEDGE_BASE[lower]) {
        targetResponse = KNOWLEDGE_BASE[lower];
      } else if (lower === "tensors" || lower === "tensores") {
        targetResponse = KNOWLEDGE_BASE["status dos tensores"];
      } else if (lower === "sair" || lower === "exit") {
        targetResponse = "Rosa: até logo. Sessão DirectML mantida em standby.";
      } else {
        // Fallback intelligent response
        targetResponse = `Rosa: Processei sua entrada ("${cleanPrompt}"). Meu modelo neural GRU foi treinado do zero em PyTorch com DirectMLGRUCell manual para aceleração gráfica em GPUs AMD Radeon. Digite 'stats', 'gpu' ou clique nos botões de preset para inspecionar os tensores internos!`;
      }

      // Simulate slight loss fluctuation during forward pass
      setLoss(() => +(0.0412 + (Math.random() * 0.003 - 0.0015)).toFixed(4));

      // Start token-by-token streaming
      setIsStreaming(true);
      setStreamingText("");

      let charIndex = 0;
      const totalChars = targetResponse.length;
      const speed = 14;

      streamTimerRef.current = setInterval(() => {
        charIndex += 2; // Stream 2 chars per tick for natural LLM speed
        if (charIndex >= totalChars) {
          if (streamTimerRef.current) clearInterval(streamTimerRef.current);
          setStreamingText("");
          setIsStreaming(false);

          const assistantMsg: TerminalMessage = {
            id: `assistant-${Date.now()}`,
            type: lower === "stats" || lower === "gpu" ? "telemetry" : "assistant",
            content: targetResponse,
          };
          setMessages((prev) => [...prev, assistantMsg]);
        } else {
          setStreamingText(targetResponse.substring(0, charIndex));
        }
      }, speed);
    },
    [isStreaming, temperature]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executePrompt(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      }
    }
  };

  const handleResetSession = () => {
    if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    setIsStreaming(false);
    setStreamingText("");
    setMessages(INITIAL_SYSTEM_LINES);
    setLoss(0.0412);
  };

  return (
    <div
      className="relative w-full h-full min-h-[380px] max-h-[560px] flex flex-col rounded-2xl md:rounded-3xl border border-white/10 bg-[#090a0f] text-zinc-300 font-mono text-xs overflow-hidden shadow-2xl selection:bg-rose-500/30"
      role="region"
      aria-label="Terminal Neural Interativo do Projeto Rosa"
    >
      {/* 1. Barra Superior da Janela: Controles macOS + Título + Status */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-white/[0.08] select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#eab308] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#22c55e] inline-block shadow-sm" />
          <span className="ml-2 text-[11px] text-zinc-400 font-medium tracking-wide hidden sm:inline-block">
            rosa@amd-directml: ~/ProjetoRosa (torch_directml)
          </span>
          <span className="ml-2 text-[11px] text-zinc-400 font-medium tracking-wide sm:hidden">
            rosa@amd-dml: ~/rosa
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>DirectML GPU</span>
          </div>

          <button
            type="button"
            onClick={handleResetSession}
            title="Reiniciar Sessão (clear)"
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Reiniciar sessão do terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. HUD de Telemetria e Tensores em Tempo Real */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 py-2 bg-black/40 border-b border-white/[0.04] text-[10px] tracking-wider select-none shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <div>
            <span className="text-zinc-500 block leading-tight">LOSS / CRITERION</span>
            <span className="text-rose-300 font-bold leading-tight">{loss.toFixed(4)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div>
            <span className="text-zinc-500 block leading-tight">PERPLEXITY</span>
            <span className="text-emerald-300 font-bold leading-tight">1.0421</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <div>
            <span className="text-zinc-500 block leading-tight">HIDDEN STATE</span>
            <span className="text-cyan-300 font-bold leading-tight">[3, 1, 512]</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <div className="flex items-center gap-1.5">
            <div>
              <span className="text-zinc-500 block leading-tight">TEMP</span>
              <span className="text-amber-300 font-bold leading-tight">{temperature.toFixed(1)}</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setTemperature((prev) => (prev === 0.3 ? 0.7 : prev === 0.7 ? 1.0 : 0.3))
              }
              className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300"
              title="Alternar Temperatura de Amostragem"
            >
              Toggle
            </button>
          </div>
        </div>
      </div>

      {/* 3. Corpo de Saída do Terminal com Autoscroll */}
      <div
        ref={terminalBodyRef}
        className="flex-1 overflow-y-auto px-4 py-3.5 space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent leading-relaxed"
        tabIndex={0}
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="text-rose-400 font-semibold tracking-wider">
                {msg.content}
              </div>
            );
          }
          if (msg.type === "info") {
            return (
              <div key={msg.id} className="text-zinc-400 flex items-start gap-1.5 text-[11px]">
                <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{msg.content}</span>
              </div>
            );
          }
          if (msg.type === "user") {
            return (
              <div key={msg.id} className="flex items-start gap-2 pt-1 text-zinc-200">
                <span className="text-emerald-400 font-bold shrink-0">você$</span>
                <span className="text-white font-medium break-all">{msg.content}</span>
                {msg.timestamp && (
                  <span className="text-[9px] text-zinc-600 ml-auto shrink-0 select-none">
                    {msg.timestamp}
                  </span>
                )}
              </div>
            );
          }
          if (msg.type === "telemetry") {
            return (
              <div
                key={msg.id}
                className="p-3 my-1 rounded-xl bg-black/60 border border-white/[0.08] text-emerald-300 whitespace-pre-wrap leading-relaxed text-[11px]"
              >
                {msg.content}
              </div>
            );
          }
          // Assistant response
          return (
            <div key={msg.id} className="flex items-start gap-2 text-zinc-300 pt-0.5">
              <span className="text-rose-400 font-bold shrink-0">rosa&gt;</span>
              <div className="whitespace-pre-wrap leading-relaxed text-zinc-200 flex-1">
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* Streaming Token Active Simulation */}
        {isStreaming && (
          <div className="flex items-start gap-2 text-zinc-200 pt-0.5">
            <span className="text-rose-400 font-bold shrink-0">rosa&gt;</span>
            <div className="whitespace-pre-wrap leading-relaxed text-zinc-200 flex-1">
              {streamingText}
              <span className="inline-block w-2 h-4 ml-0.5 bg-rose-400 animate-pulse align-middle" />
            </div>
          </div>
        )}
      </div>

      {/* 4. Barra de Prompt Presets Rápidos */}
      <div className="px-4 py-2 bg-zinc-950/80 border-t border-white/[0.04] flex items-center gap-1.5 overflow-x-auto scrollbar-none select-none shrink-0">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-400" /> Presets:
        </span>
        {PRESET_PROMPTS.map((item) => (
          <button
            key={item.label}
            type="button"
            disabled={isStreaming}
            onClick={() => executePrompt(item.prompt)}
            className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white/[0.04] hover:bg-rose-500/15 border border-white/10 hover:border-rose-500/30 text-zinc-300 hover:text-rose-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 5. Linha de Input Interativo do Usuário */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-t border-white/[0.08] shrink-0"
      >
        <span className="text-emerald-400 font-bold select-none text-xs flex items-center">
          você$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          placeholder={
            isStreaming
              ? "Rosa está gerando resposta autoregressiva..."
              : "Digite um comando (ex: 'help', 'stats', 'gpu') ou sua mensagem..."
          }
          className="flex-1 bg-transparent text-white placeholder-zinc-600 text-xs focus:outline-none disabled:opacity-50"
          aria-label="Entrada de comando no terminal neural Rosa"
        />
        <button
          type="submit"
          disabled={isStreaming || !inputValue.trim()}
          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 disabled:opacity-30 disabled:hover:bg-rose-500/20 transition-all"
          aria-label="Enviar comando para a Rosa"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
