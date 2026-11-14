// src/components/mockups/RosaNeuralMockup.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { ROSA_DIALOGUES, RosaDialogue } from "@/lib/rosa-dialogues";

interface ChatMessage {
  id: string;
  sender: "user" | "rosa";
  text: string;
  isStreaming?: boolean;
}

/**
 * Ícone de Coração com geometria equilibrada e centralização óptica milimétrica
 * no viewBox 24x24 (margens uniformes de 2px nas laterais e 2.6px verticalmente).
 */
function RosaAvatarHeart({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="rgba(244, 63, 94, 0.45)"
      stroke="#fda4af"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function RosaNeuralMockup() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const usedIndicesRef = useRef<number[]>([]);
  const isMountedRef = useRef<boolean>(true);

  // Auto-scroll suave para o final do chat sempre que mensagens mudam ou texto é transmitido
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, streamingText]);

  // Sorteia próximo diálogo sem repetir os últimos 20
  const getNextDialogue = (): RosaDialogue => {
    const total = ROSA_DIALOGUES.length;
    let candidate = Math.floor(Math.random() * total);

    let attempts = 0;
    while (usedIndicesRef.current.includes(candidate) && attempts < 50) {
      candidate = Math.floor(Math.random() * total);
      attempts++;
    }

    usedIndicesRef.current.push(candidate);
    if (usedIndicesRef.current.length > 20) {
      usedIndicesRef.current.shift();
    }

    return ROSA_DIALOGUES[candidate];
  };

  // Motor principal da simulação generativa e ciclo de 5 segundos
  useEffect(() => {
    isMountedRef.current = true;
    let timer: NodeJS.Timeout | null = null;
    let streamTimer: NodeJS.Timeout | null = null;
    let countdownInterval: NodeJS.Timeout | null = null;

    const runCycle = () => {
      if (!isMountedRef.current) return;

      const dialogue = getNextDialogue();

      // 1. Pessoa envia a mensagem
      const userMsgId = `user-${Date.now()}`;
      setMessages((prev) => [
        // Mantém no máximo as últimas 4 mensagens para layout limpo e performático
        ...prev.slice(-3),
        { id: userMsgId, sender: "user", text: dialogue.prompt },
      ]);

      // 2. Rosa entra em estado de pensamento
      timer = setTimeout(() => {
        if (!isMountedRef.current) return;
        setIsThinking(true);

        // 3. Rosa começa a responder de forma generativa (typewriter)
        timer = setTimeout(() => {
          if (!isMountedRef.current) return;
          setIsThinking(false);

          const fullResponse = dialogue.response;
          const words = fullResponse.split(" ");
          let wordIdx = 0;
          let currentStr = "";

          const rosaMsgId = `rosa-${Date.now()}`;

          streamTimer = setInterval(() => {
            if (!isMountedRef.current) {
              if (streamTimer) clearInterval(streamTimer);
              return;
            }

            if (wordIdx < words.length) {
              currentStr += (wordIdx === 0 ? "" : " ") + words[wordIdx];
              setStreamingText(currentStr);
              wordIdx++;
            } else {
              // Resposta finalizada! Fixa mensagem no histórico
              if (streamTimer) clearInterval(streamTimer);
              setStreamingText("");
              setMessages((prev) => [
                ...prev,
                { id: rosaMsgId, sender: "rosa", text: fullResponse },
              ]);

              // 4. Aguarda exatamente 5 segundos após a Rosa responder para iniciar o próximo ciclo
              let secondsLeft = 5;

              countdownInterval = setInterval(() => {
                if (!isMountedRef.current) {
                  if (countdownInterval) clearInterval(countdownInterval);
                  return;
                }
                secondsLeft -= 1;
                if (secondsLeft <= 0) {
                  if (countdownInterval) clearInterval(countdownInterval);
                  runCycle(); // Próximo ciclo!
                }
              }, 1000);
            }
          }, 65); // Velocidade natural de fala da IA
        }, 900); // Latência de inferência neural DirectML
      }, 500);
    };

    // Inicia o primeiro ciclo com um diálogo caloroso de boas-vindas
    const initialDialogue = ROSA_DIALOGUES[0];
    usedIndicesRef.current.push(0);
    setMessages([
      { id: "init-user", sender: "user", text: initialDialogue.prompt },
      { id: "init-rosa", sender: "rosa", text: initialDialogue.response },
    ]);

    // Primeira transição após 4 segundos do carregamento inicial
    timer = setTimeout(() => {
      runCycle();
    }, 4000);

    return () => {
      isMountedRef.current = false;
      if (timer) clearTimeout(timer);
      if (streamTimer) clearInterval(streamTimer);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative select-none">
      {/* 1. Área Central de Conversação Fluida */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar da Rosa: Ícone de Coração Centralizado com Precisão Óptica */}
              {msg.sender === "rosa" && (
                <div className="w-7 h-7 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5 text-rose-300 shadow-sm">
                  <RosaAvatarHeart />
                </div>
              )}

              {/* Balão de Mensagem */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed transition-all ${
                  msg.sender === "user"
                    ? "bg-zinc-800/90 border border-white/10 text-zinc-100 rounded-tr-sm shadow-md"
                    : "bg-rose-950/25 border border-rose-500/25 text-rose-50 rounded-tl-sm backdrop-blur-md shadow-[0_4px_24px_rgba(244,63,94,0.08)]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 opacity-70 text-[10px] font-mono">
                  <span>{msg.sender === "user" ? "Você" : "Rosa"}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* Avatar do Usuário */}
              {msg.sender === "user" && (
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-zinc-300">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Estado de Pensamento da Rosa (Typing Indicator) */}
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 justify-start"
            >
              <div className="w-7 h-7 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-300">
                <RosaAvatarHeart className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                  className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"
                />
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"
                />
                <span className="text-[11px] font-mono text-rose-300/80 ml-2">
                  pensando com carinho...
                </span>
              </div>
            </motion.div>
          )}

          {/* Resposta Sendo Digitada em Tempo Real (Generativa / Streaming) */}
          {streamingText && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 justify-start"
            >
              <div className="w-7 h-7 rounded-full bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-300">
                <RosaAvatarHeart />
              </div>
              <div className="max-w-[85%] sm:max-w-[80%] bg-rose-950/25 border border-rose-500/25 text-rose-50 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs sm:text-sm leading-relaxed backdrop-blur-md shadow-[0_4px_24px_rgba(244,63,94,0.08)]">
                <div className="flex items-center gap-1.5 mb-1 opacity-70 text-[10px] font-mono text-rose-300">
                  <span>Rosa</span>
                  <span className="animate-pulse">● digitando</span>
                </div>
                <p className="whitespace-pre-wrap">
                  {streamingText}
                  <span className="inline-block w-1.5 h-3.5 bg-rose-400 ml-1 translate-y-0.5 animate-pulse" />
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. Rodapé Minimalista Simulando a Interface de Envio */}
      <footer className="p-3.5 bg-zinc-950/90 border-t border-white/[0.06] flex items-center gap-3 shrink-0">
        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="truncate">Rosa conversa com você através do modelo DirectML GRU...</span>
        </div>
        <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
          <RosaAvatarHeart className="w-4 h-4" />
        </div>
      </footer>
    </div>
  );
}
