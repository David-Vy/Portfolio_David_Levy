// src/components/ProcessTimeline.tsx
"use client";

import { motion } from "framer-motion";
import DepthCard from "./DepthCard";
import { Compass, Cpu, Play, Code2, Sparkles, Rocket } from "lucide-react";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Mapeamento & Objetivos",
    subtitle: "Briefing & Visão Técnica",
    description: "Análise profunda de requisitos, modelagem de domínio de negócios e definição da arquitetura de fluxo de dados para sistemas web e desktop corporativos.",
    icon: <Compass className="w-5 h-5 text-white" />
  },
  {
    number: "02",
    title: "Arquitetura & Sistemas",
    subtitle: "Planejamento Modular",
    description: "Estruturação desacoplada de microsserviços e APIs RESTful, modelagem de bancos relacionais (PostgreSQL/Supabase) e NoSQL (MongoDB/Firestore), e tipagem estrita com TypeScript.",
    icon: <Cpu className="w-5 h-5 text-white" />
  },
  {
    number: "03",
    title: "Prototipagem Interativa",
    subtitle: "Feedback Precoce",
    description: "Desenvolvimento de PoCs e interfaces funcionais para validação antecipada de fluxos críticos, usabilidade, responsividade e comunicação em tempo real.",
    icon: <Play className="w-5 h-5 text-white" />
  },
  {
    number: "04",
    title: "Produção & Engenharia",
    subtitle: "Implementação Robusta",
    description: "Construção de código escalável seguindo Clean Code e SOLID: streaming de baixa latência (WebRTC), WebSockets, autenticação segura (JWT/OAuth/RLS) e interfaces reativas.",
    icon: <Code2 className="w-5 h-5 text-white" />
  },
  {
    number: "05",
    title: "Otimização & Polimento",
    subtitle: "Performance & Resiliência",
    description: "Profiling de consumo de memória, redução de latência de rede, otimização de consultas a banco de dados, auditoria de acessibilidade e testes de carga.",
    icon: <Sparkles className="w-5 h-5 text-white" />
  },
  {
    number: "06",
    title: "Deploy & Observabilidade",
    subtitle: "Entrega Contínua",
    description: "Orquestração em containers Docker, pipelines de CI/CD automatizadas (Vercel, nuvem) e instrumentação de logs e telemetria para monitoramento contínuo.",
    icon: <Rocket className="w-5 h-5 text-white" />
  }
];

export default function ProcessTimeline() {
  return (
    <section id="processo" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
              03 — Metodologia & Processo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Como Cada Projeto Ganha Vida
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Um fluxo de desenvolvimento estruturado que garante previsibilidade, arquitetura de software escalável e acabamento de alto nível.
        </p>
      </div>

      {/* Grid de Etapas com Profundidade 3D */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              delay: idx * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <DepthCard
              maxTilt={7}
              glowColor="rgba(255, 255, 255, 0.1)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <span className="text-sm font-mono font-bold tracking-wider text-zinc-500 group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                </div>

                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="text-xl font-bold text-white tracking-tight mb-4 group-hover:text-zinc-100 transition-colors">
                  {step.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-600">
                <span>Fase 0{idx + 1} de 06</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>
            </DepthCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
