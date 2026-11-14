// src/components/ProcessTimeline.tsx
"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Arquitetura & Domínio",
    description: "Análise profunda de requisitos, modelagem relacional e NoSQL, e estruturação de fluxo de dados para microsserviços e aplicações distribuídas.",
  },
  {
    number: "02",
    title: "Engenharia & Clean Code",
    description: "Implementação modular com TypeScript, princípios SOLID, controle rigoroso de concorrência e camadas seguras de autenticação e autorização.",
  },
  {
    number: "03",
    title: "Performance & Validação",
    description: "Otimização de latência e consumo de memória, comunicação em tempo real via WebSockets/WebRTC e testes automatizados de integração.",
  },
  {
    number: "04",
    title: "Deploy & Observabilidade",
    description: "Orquestração em contêineres Docker, integração e entrega contínua (CI/CD) e instrumentação de logs e telemetria para monitoramento contínuo.",
  },
];

export default function ProcessTimeline() {
  return (
    <section id="processo" className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Metodologia de Engenharia
          </h2>
        </div>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
          Um fluxo de desenvolvimento estruturado que garante previsibilidade, arquitetura escalável e entrega de software com alto rigor técnico.
        </p>
      </div>

      {/* Grid Editorial Aberto (Sem cartões fechados nem 3D tilt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="flex flex-col pt-6 border-t border-white/[0.08]"
          >
            <span className="text-xs font-mono text-zinc-500 mb-3 block">
              {step.number}
            </span>

            <h3 className="text-lg font-medium text-white tracking-tight mb-2">
              {step.title}
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed font-normal">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
