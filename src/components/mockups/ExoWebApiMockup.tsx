// src/components/mockups/ExoWebApiMockup.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  ShieldCheck,
  Database,
  Play,
  Layers,
} from "lucide-react";

interface ApiEndpoint {
  method: "GET" | "POST" | "PUT";
  route: string;
  category: string;
  status: number;
  latency: string;
  linq: string;
  sql: string;
  responseJson: string;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    route: "/api/v1/usuarios/perfil",
    category: "Auth & Claims",
    status: 200,
    latency: "11.4ms",
    linq: `await _userRepository.GetByIdWithRolesAsync(userId, cancellationToken);`,
    sql: `SELECT u.[Id], u.[Nome], u.[Email], r.[RoleName]
FROM [Usuarios] u
INNER JOIN [UserRoles] ur ON u.[Id] = ur.[UserId]
INNER JOIN [Roles] r ON ur.[RoleId] = r.[Id]
WHERE u.[Id] = @userId AND u.[Ativo] = 1;`,
    responseJson: `{
  "statusCode": 200,
  "data": {
    "id": 104,
    "nome": "David Levy",
    "email": "david@empresa.com",
    "roles": ["EnterpriseAdmin", "SecurityAuditor"],
    "claims": {
      "departamento": "Engenharia de Software",
      "permissao": "FullAccess"
    }
  },
  "timestamp": "2026-11-14T02:30:00Z"
}`,
  },
  {
    method: "POST",
    route: "/api/v1/auth/login",
    category: "JWT Bearer Dispatch",
    status: 200,
    latency: "18.2ms",
    linq: `var token = _tokenService.GenerateJwtToken(user, claims);`,
    sql: `SELECT TOP(1) * FROM [Usuarios] 
WHERE [Email] = @email AND [PasswordHash] = @hash;`,
    responseJson: `{
  "statusCode": 200,
  "tokenType": "Bearer",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 7200,
  "authenticated": true
}`,
  },
  {
    method: "GET",
    route: "/api/v1/projetos/metricas",
    category: "Repository Pattern",
    status: 200,
    latency: "14.8ms",
    linq: `await _context.Projetos.AsNoTracking().Where(p => p.Status == Active).ToListAsync();`,
    sql: `SELECT [Id], [Nome], [Status], [Orcamento]
FROM [Projetos] WITH (NOLOCK)
WHERE [Status] = 'Active'
ORDER BY [DataCriacao] DESC;`,
    responseJson: `{
  "statusCode": 200,
  "totalRegistros": 28,
  "metricas": {
    "ativos": 24,
    "concluidos": 4,
    "eficiencia": "99.4%"
  }
}`,
  },
  {
    method: "PUT",
    route: "/api/v1/pedidos/processar",
    category: "Unit of Work",
    status: 201,
    latency: "22.1ms",
    linq: `await _unitOfWork.CommitAsync(cancellationToken);`,
    sql: `BEGIN TRANSACTION;
UPDATE [Pedidos] SET [Status] = 'Processado' WHERE [Id] = @pedidoId;
INSERT INTO [AuditoriaLogs] ([Acao], [Data]) VALUES ('ProcessarPedido', GETUTCDATE());
COMMIT TRANSACTION;`,
    responseJson: `{
  "statusCode": 201,
  "status": "Transação Concluída com Sucesso",
  "transactionId": "tx_9841f3e8a",
  "unitOfWork": "Committed"
}`,
  },
];

export default function ExoWebApiMockup() {
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"json" | "sql">("json");
  const [isExecuting, setIsExecuting] = useState(false);

  const endpoint = ENDPOINTS[selectedEndpointIndex];

  const handleSelectEndpoint = (index: number) => {
    setSelectedEndpointIndex(index);
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 450);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 450);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-5 sm:p-7 bg-zinc-950/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative select-none">
      {/* 1. Header Minimalista da API Corporativa */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span>ASP.NET Core 8 WebApi</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                .NET 8 LTS
              </span>
            </h4>
            <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>JWT Bearer Security • Repository Pattern • EF Core</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExecute}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3 h-3 text-purple-400 fill-purple-400" />
            <span className="hidden sm:inline">Disparar</span>
          </button>
        </div>
      </div>

      {/* 2. Seletor Rápido de Endpoints da API */}
      <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none shrink-0">
        {ENDPOINTS.map((item, idx) => (
          <button
            key={item.route}
            type="button"
            onClick={() => handleSelectEndpoint(idx)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 whitespace-nowrap transition-all border ${
              selectedEndpointIndex === idx
                ? "bg-purple-950/40 border-purple-500/40 text-purple-200 shadow-sm"
                : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
            }`}
          >
            <span
              className={`px-1 py-0.5 rounded text-[9px] font-bold ${
                item.method === "GET"
                  ? "bg-sky-500/20 text-sky-300"
                  : item.method === "POST"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}
            >
              {item.method}
            </span>
            <span className="truncate">{item.route}</span>
          </button>
        ))}
      </div>

      {/* 3. Pipeline de Execução em Camadas (Gateway -> Repository -> EF Core) */}
      <div className="grid grid-cols-3 gap-2 my-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] shrink-0">
        <div
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
            isExecuting ? "bg-purple-500/20 text-purple-200" : "bg-white/[0.02] text-zinc-300"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-zinc-400 leading-tight">Camada 1</p>
            <p className="text-xs font-medium truncate">JWT Middleware</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
            isExecuting ? "bg-purple-500/20 text-purple-200" : "bg-white/[0.02] text-zinc-300"
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-zinc-400 leading-tight">Camada 2</p>
            <p className="text-xs font-medium truncate">Repository Pattern</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
            isExecuting ? "bg-purple-500/20 text-purple-200" : "bg-white/[0.02] text-zinc-300"
          }`}
        >
          <Database className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-zinc-400 leading-tight">Camada 3</p>
            <p className="text-xs font-medium truncate">EF Core / SQL</p>
          </div>
        </div>
      </div>

      {/* 4. Painel de Resposta & Inspeção (JSON ou SQL Gerado) */}
      <div className="flex-1 flex flex-col min-h-[140px] rounded-xl bg-zinc-900/60 border border-white/[0.06] overflow-hidden">
        {/* Toggle de Abas */}
        <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-white/[0.06] bg-black/20 text-[11px] font-mono shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode("json")}
              className={`transition-colors flex items-center gap-1.5 ${
                viewMode === "json" ? "text-purple-300 font-semibold" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span>Payload JSON</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("sql")}
              className={`transition-colors flex items-center gap-1.5 ${
                viewMode === "sql" ? "text-purple-300 font-semibold" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <span>LINQ & SQL Server</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {endpoint.status} OK
            </span>
            <span>{endpoint.latency}</span>
          </div>
        </div>

        {/* Visualizador de Código */}
        <div className="flex-1 p-3 font-mono text-[11px] sm:text-xs overflow-y-auto leading-relaxed text-zinc-300">
          <AnimatePresence mode="wait">
            {viewMode === "json" ? (
              <motion.pre
                key="json-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-purple-200/90 whitespace-pre"
              >
                {endpoint.responseJson}
              </motion.pre>
            ) : (
              <motion.div
                key="sql-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <div>
                  <span className="text-[10px] text-indigo-400 font-semibold block mb-0.5">
                    {"// Expressão LINQ C# (Repository)"}
                  </span>
                  <p className="text-zinc-300 text-[11px] bg-black/30 p-2 rounded border border-white/[0.04]">
                    {endpoint.linq}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 font-semibold block mb-0.5">
                    {"-- Consulta SQL Server Traduzida pelo EF Core"}
                  </span>
                  <pre className="text-zinc-300 text-[11px] bg-black/30 p-2 rounded border border-white/[0.04] whitespace-pre-wrap">
                    {endpoint.sql}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
