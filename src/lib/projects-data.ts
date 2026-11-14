// src/lib/projects-data.ts

export interface Project {
  title: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  images?: string[];
  mockupType?: "lycloud" | "rosa" | "lyvia" | "s3scanner" | "exo" | string;
  tags: string[];
  architectureHighlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
  longDescriptionHtml?: string;
}

export const projectsData: Project[] = [
  {
    title: "LyMadhouse",
    slug: "lymadhouse",
    category: "Engenharia de Software / Desktop & WebRTC",
    description: "Plataforma desktop de comunicação em tempo real de alto desempenho desenvolvida em Electron e Next.js 16, equipada com motor nativo em C++ para captura Direct3D 11 via DXGI a 60 FPS e áudio WASAPI loopback.",
    imageUrl: "/images/projects/LyMadhouse/LyMadhouse 0.png",
    images: [
      "/images/projects/LyMadhouse/LyMadhouse 0.png",
      "/images/projects/LyMadhouse/LyMadhouse 1.png",
      "/images/projects/LyMadhouse/LyMadhouse 2.png",
      "/images/projects/LyMadhouse/LyMadhouse 3.png",
      "/images/projects/LyMadhouse/LyMadhouse 4.png",
      "/images/projects/LyMadhouse/LyMadhouse 5.png"
    ],
    tags: ["Next.js 16", "Electron", "TypeScript", "C++ (DirectX/DXGI)", "WASAPI Loopback", "WebRTC (LiveKit)", "Supabase", "Tailwind CSS"],
    architectureHighlights: [
      "Motor nativo C++ (DXGI Desktop Duplication a 60 FPS) via Node-API",
      "Áudio WASAPI Loopback com conversão PCM Float32 sem locks",
      "Pipeline WebRTC LiveKit com cancelamento de ruído Krisp AI"
    ],
    githubUrl: "https://github.com/David-Vy/LyMadhouse",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>LyMadhouse</strong> é uma solução de comunicação e colaboração de alta performance desenvolvida para ambientes que exigem streaming de vídeo e voz com baixíssima latência (1080p a 60 FPS).</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Engenharia de Baixo Nível & Motor C++</h3>
      <p class="mb-4">Para superar as limitações de performance do Electron tradicional, desenvolvi um addon nativo em <strong>C++ via Node-API (<code>ly_capture.node</code>)</strong> conectando-se diretamente às APIs do Windows <strong>DirectX 11 e DXGI Desktop Duplication (<code>IDXGIOutputDuplication</code>)</strong>. Essa arquitetura permite captura direta da GPU com compartilhamento de memória <strong>Zero-Copy IPC</strong>, reduzindo o consumo de CPU a patamares mínimos.</p>
      
      <p class="mb-4">A captura de áudio do sistema operacional utiliza <strong>WASAPI Loopback (<code>IAudioCaptureClient</code>)</strong>, convertendo fluxos PCM/IEEE Float em buffers Float32 transmitidos de forma assíncrona para a thread do Node.js através de <code>Napi::ThreadSafeFunction</code> sem provocar locks na interface.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Pipeline WebRTC & Cancelamento de Ruído por IA</h3>
      <p class="mb-4">A transmissão em tempo real é sustentada pela infraestrutura <strong>WebRTC via LiveKit SDK</strong>, com supressão acústica de ruído baseada em redes neurais profundas (<strong>Krisp AI</strong>) e suporte a <em>Push-to-Talk</em> nativo global com ganchos de baixo nível no Windows via <code>uiohook-napi</code>.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Segurança e Distribuição Resiliente</h3>
      <p>A camada de persistência utiliza <strong>PostgreSQL no Supabase</strong> blindada por políticas de <em>Row Level Security (RLS)</em>, criptografia local de credenciais RSA-2048, tratamento de estabilidade de GPU (<code>applyGpuHardening</code>) e pipeline automatizado de atualização diferencial com <strong>electron-updater</strong>.</p>
    `
  },
  {
    title: "LyCloud Server",
    slug: "lycloud-server",
    category: "Cloud Computing & Private BaaS",
    description: "Plataforma Backend-as-a-Service (BaaS) e orquestrador de computação em nuvem privada em Monorepo PNPM, com Object Storage compatível com AWS S3 (MinIO), banco NoSQL e telemetria WebSocket.",
    imageUrl: "/images/projects/lycloud-1.png",
    images: [
      "/images/projects/lycloud-1.png",
      "/images/projects/lycloud-logo.gif"
    ],
    mockupType: "lycloud",
    tags: ["Node.js", "TypeScript", "PNPM Workspaces", "Docker", "MinIO (S3)", "MongoDB", "WebSockets", "Electron", "Zod"],
    architectureHighlights: [
      "Monorepo PNPM com orquestrador BaaS e instâncias isoladas Docker",
      "Object Storage MinIO S3 & coleções dinâmicas NoSQL com validação Zod",
      "Telemetria de hardware (CPU/RAM) via WebSockets para painel Electron"
    ],
    githubUrl: "https://github.com/David-Vy/lycloud-server",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>LyCloud Server</strong> foi concebido como uma engine de nuvem privada e BaaS auto-hospedado voltado para desenvolvedores e infraestruturas que necessitam de soberania total sobre seus dados e microsserviços.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Orquestração Monorepo & Microsserviços</h3>
      <p class="mb-4">Estruturado sobre um <strong>Monorepo PNPM</strong> altamente coeso (dividindo <code>apps/electron-app</code>, <code>packages/backend</code>, <code>packages/sdk</code> e <code>packages/storage</code>), o sistema orquestra contêineres Docker para instâncias NoSQL com MongoDB e baldes de armazenamento compatíveis com a API da <strong>AWS S3</strong> através do MinIO.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Telemetria em Tempo Real & Engine WebSocket</h3>
      <p class="mb-4">Um supervisor residente monitora métricas do host em tempo real (utilização de CPU, alocação de memória RAM e volume de tráfego de rede via <code>os-utils</code>), transmitindo telemetria contínua via conexões bidirecionais <strong>WebSockets</strong> para o console administrativo em React e Electron.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Ecossistema SDK TypeScript</h3>
      <p>A plataforma inclui a biblioteca cliente oficial tipada <strong>@lycloud/sdk</strong>, permitindo que aplicações clientes realizem autenticação transparente com JWT e Hardware Fingerprint, consumam coleções reativas genéricas <code>&lt;T&gt;</code> e realizem uploads multipart para o Object Storage.</p>
    `
  },
  {
    title: "LyVia",
    slug: "lyvia",
    category: "Sistemas Distribuídos & Streaming HLS",
    description: "Ecossistema distribuído de streaming de mídia com backend de alta vazão em Fastify, transcodificação sob demanda com FFmpeg, geração dinâmica de manifestos HLS e cliente híbrido (Web e Android).",
    imageUrl: "/images/projects/LyVia/LyVia 0.png",
    images: [
      "/images/projects/LyVia/LyVia 0.png",
      "/images/projects/LyVia/LyVia 1.png",
      "/images/projects/LyVia/LyVia 2.png",
      "/images/projects/LyVia/LyVia 3.png",
      "/images/projects/LyVia/LyVia 4.png"
    ],
    tags: ["Fastify", "Node.js", "TypeScript", "FFmpeg", "HLS.js", "Docker", "Capacitor (Android)", "Supabase", "Oracle Cloud"],
    architectureHighlights: [
      "Smart Stream Orchestrator com balanceamento dinâmico de múltiplos provedores",
      "Transcodificação on-demand FFmpeg com playlists HLS adaptativas (.m3u8)",
      "Cluster Fastify de baixa sobrecarga e caching de episódios em IndexedDB"
    ],
    githubUrl: "https://github.com/David-Vy/LyVia",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>LyVia</strong> é uma plataforma moderna desenvolvida para entrega contínua de conteúdo multimídia em alta definição com otimização radical de largura de banda e custos operacionais.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Smart Stream Orchestrator & Transcodificação HLS</h3>
      <p class="mb-4">O núcleo do servidor em <strong>Fastify</strong> executa o <code>SmartStreamOrchestrator</code>, gerenciando múltiplos provedores de conteúdo com fallback autônomo e reconciliação de metadados via correspondência fuzzy de strings (<code>TitleMatcher</code>). O pipeline de mídia realiza remuxing dinâmico via FFmpeg, fatiando vídeos em chunks <code>.ts</code> e playlists <code>.m3u8</code> compatíveis com requisições HTTP 206 (Byte-Range).</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Cliente Híbrido & Resiliência Offline</h3>
      <p class="mb-4">A aplicação cliente foi desenvolvida como SPA em Vite + React 18 e encapsulada para Android nativo via <strong>Capacitor</strong>. Possui player adaptativo construído sobre <code>hls.js</code>, transições aceleradas por GPU com Framer Motion e cache offline de episódios e preferências utilizando <strong>IndexedDB (idb)</strong>.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Infraestrutura em Nuvem de Alta Vazão</h3>
      <p>A arquitetura containerizada em Docker é dimensionada para nós ARM Ampere na nuvem Oracle Cloud Infrastructure, usufruindo de canais de saída de 10 TB/mês e distribuição edge com políticas de cache otimizadas.</p>
    `
  },
  {
    title: "ICRE Web",
    slug: "icre-web",
    category: "Full-Stack & Fintech / Event Management",
    description: "Plataforma corporativa de gestão de eventos, bilhetagem eletrônica e credenciamento em tempo real com integração ao gateway bancário Asaas (PIX), geração de ingressos em PDF com Puppeteer e leitor de QR Code.",
    imageUrl: "/images/projects/ICRE/ICRE 0.png",
    images: [
      "/images/projects/ICRE/ICRE 0.png",
      "/images/projects/ICRE/ICRE 1.png",
      "/images/projects/ICRE/ICRE 2.png",
      "/images/projects/ICRE/ICRE 3.png"
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "Supabase SSR", "Gateway Asaas (PIX)", "Puppeteer", "html5-qrcode", "Tailwind CSS"],
    architectureHighlights: [
      "Gateway bancário Asaas com liquidação instantânea PIX e webhook assíncrono",
      "Geração programática de ingressos vetoriais PDF via Puppeteer headless",
      "Credenciamento de eventos com validação QR Code em tempo real via câmera"
    ],
    githubUrl: "https://github.com/David-Vy/icre-web",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>ICRE Web</strong> é uma plataforma robusta projetada para administração e credenciamento de eventos de grande porte, integrando automação financeira instantânea e validação perimetral na portaria.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Automação de Pagamentos & Webhooks</h3>
      <p class="mb-4">Desenvolvida sobre o <strong>Next.js 16</strong> e <strong>Supabase SSR</strong>, a plataforma integra-se diretamente ao gateway bancário do <strong>Asaas</strong>, suportando processamento de pagamentos via PIX dinâmico (QRCode e chave Copia e Cola) e cartão de crédito. Listeners de webhooks assíncronos tratam confirmações bancárias e garantem consistência atômica nos estoques de ingressos.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Geração de Ingressos & Credenciamento na Portaria</h3>
      <p class="mb-4">Emissão de ingressos e crachás em PDF de alta qualidade vetorial renderizados por instâncias headless de Chromium via <code>puppeteer</code> e <code>jspdf</code>. No local do evento, operadores utilizam o credenciador com leitura óptica de QR Codes pela câmera web (<code>html5-qrcode</code>), com validação anti-duplicidade em microssegundos.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Proteção & Resiliência</h3>
      <p>Proteção perimetral contra compras concorrentes automatizadas e ataques de negação de serviço com integração ao <strong>Cloudflare Turnstile</strong>.</p>
    `
  },
  {
    title: "IntelliStock",
    slug: "intellistock",
    category: "Full-Stack & Cloud SaaS ERP",
    description: "Sistema SaaS multitenant para gestão inteligente de inventário e suprimentos no varejo com painel de Business Intelligence analítico, controle de acesso RBAC e trilha de auditoria contínua.",
    imageUrl: "/images/projects/IntelliStock/IntelliStock 0.png",
    images: [
      "/images/projects/IntelliStock/IntelliStock 0.png",
      "/images/projects/IntelliStock/IntelliStock 1.png",
      "/images/projects/IntelliStock/IntelliStock 2.png",
      "/images/projects/IntelliStock/IntelliStock 3.png",
      "/images/projects/IntelliStock/IntelliStock 4.png",
      "/images/projects/IntelliStock/IntelliStock 5.png"
    ],
    tags: ["React 19", "TypeScript", "Firebase Firestore", "Authentication", "Recharts", "RBAC", "Tailwind CSS"],
    architectureHighlights: [
      "Arquitetura multitenant com segregação de dados por empresa no Cloud Firestore",
      "Dashboard de Business Intelligence com gráficos reativos de giro via Recharts",
      "Trilha de auditoria contínua de movimentações e controle de acesso RBAC"
    ],
    githubUrl: "https://github.com/David-Vy/IntelliStock",
    liveUrl: "https://intellistockapp.firebaseapp.com",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>IntelliStock</strong> resolve gargalos críticos na gestão de suprimentos e inventário de varejo de dispositivos eletrônicos através de uma arquitetura em nuvem ágil e intuitiva.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Arquitetura Multitenant & Firestore</h3>
      <p class="mb-4">Construído em <strong>React 19</strong> e <strong>Firebase</strong>, adota uma arquitetura multitenant com isolamento por empresa (<code>CompanyLobby</code>), operando transações atômicas de entrada/saída de mercadorias no <strong>Cloud Firestore</strong> para evitar inconsistências em vendas simultâneas.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Business Intelligence & Auditoria</h3>
      <p class="mb-4">Dashboard com visualizações analíticas construídas com <strong>Recharts</strong>, permitindo rastrear índice de rotatividade, alertas de ruptura de estoque e curvas financeiras. Conta com serviço de log contínuo (<code>ActivityLog</code>) que grava todas as ações executadas pelos operadores com autenticação RBAC.</p>
    `
  },
  {
    title: "Utilify",
    slug: "utilify",
    category: "Developer Tools & Client-Side Processing",
    description: "Plataforma modular com mais de 25 ferramentas utilitárias de engenharia de software executando algoritmos intensivos no cliente via WebAssembly (OCR), Myers Diff, AST Terser e Web Workers.",
    imageUrl: "/images/projects/Utilify/Utilify 0.png",
    images: [
      "/images/projects/Utilify/Utilify 0.png",
      "/images/projects/Utilify/Utilify 1.png",
      "/images/projects/Utilify/Utilify 2.png",
      "/images/projects/Utilify/Utilify 3.png"
    ],
    tags: ["Next.js 15", "React 19", "TypeScript", "Tesseract.js (WASM)", "diff-match-patch", "Terser AST", "Tailwind CSS", "Vercel"],
    architectureHighlights: [
      "25+ microsserviços utilitários executando inteiramente no cliente via Web Workers",
      "OCR local com Tesseract.js WASM e comparador de textos via Myers Diff",
      "Minificação de código JavaScript via AST Terser e gerador de interfaces TypeScript"
    ],
    githubUrl: "https://github.com/David-Vy/utilify",
    liveUrl: "https://utilify-zeta.vercel.app",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>Utilify</strong> é uma suíte completa de micro-ferramentas de produtividade e engenharia de software desenvolvida para processar dados de forma estritamente local no navegador do usuário, assegurando privacidade total e latência zero.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Processamento no Cliente & WebAssembly</h3>
      <p class="mb-4">A plataforma utiliza <strong>Tesseract.js compilado em WebAssembly</strong> para Reconhecimento Óptico de Caracteres (OCR) direto na GPU/CPU do cliente, motor de comparação textual baseado no <strong>Algoritmo Myers (<code>diff-match-patch</code>)</strong> e compressão de imagens via Web Workers sem tráfego de dados para servidores externos.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Engenharia de Compilação & AST</h3>
      <p class="mb-4">Inclui minificador de código JavaScript com análise sintática de nós <strong>Abstract Syntax Tree (AST) via Terser</strong>, transpilador dinâmico de objetos JSON arbitrários para contratos tipados TypeScript (<code>json-to-ts</code>) e paleta modal de comandos estilo Spotlight com navegação pelo teclado via <code>cmdk</code>.</p>
    `
  },
  {
    title: "Projeto Rosa",
    slug: "projeto-rosa",
    category: "Inteligência Artificial & Deep Learning",
    description: "Modelo de linguagem neural autoregressivo desenvolvido do zero em PyTorch com célula recorrente GRU customizada para aceleração por hardware em GPUs AMD no Windows via Microsoft DirectML.",
    imageUrl: "/images/projects/rosa-neural.png",
    mockupType: "rosa",
    tags: ["Python 3.11", "PyTorch", "DirectML (AMD GPU)", "Recurrent Neural Networks (GRU)", "NLP", "Matemática Computacional"],
    architectureHighlights: [
      "Célula GRU artesanal (DirectMLGRUCell) para aceleração em GPUs AMD no Windows",
      "Eliminação de dependências proprietárias CUDA via Microsoft DirectML",
      "Pipeline autoregressivo com amostragem estocástica por temperatura e top-k"
    ],
    githubUrl: "https://github.com/David-Vy/ProjetoRosa",
    longDescriptionHtml: `
      <p class="mb-4">O <strong>Projeto Rosa</strong> é uma implementação profunda e de código aberto de um modelo de linguagem autoregressivo em <strong>PyTorch</strong>, concebido para contornar limitações de compatibilidade de hardware proprietário (CUDA) e executar inferência acelerada em GPUs AMD sob Windows.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Célula GRU Fundamental & DirectML</h3>
      <p class="mb-4">Para superar incompatibilidades de operadores recorrentes nativos do PyTorch ao utilizar a extensão <code>torch_directml</code> em placas gráficas AMD Radeon, foi desenvolvida a <code>DirectMLGRUCell</code>: uma implementação manual das equações de portas de controle (Reset Gate, Update Gate e New Memory Candidate) através de camadas lineares puras (<code>nn.Linear</code>) e funções de ativação Sigmoid e Tanh.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Arquitetura de Rede & Treinamento</h3>
      <p class="mb-4">A rede <code>RosaGRU</code> integra camada de embedding vetorial denso, empilhamento manual de camadas recorrentes com desdobramento explícito de loop temporal e camada de projeção para o vocabulário. O modelo treinado (<code>rosa_brain.pth</code>) possui pipeline de decodificação com temperatura ajustável e amostragem top-k.</p>
    `
  },
  {
    title: "Exo WebApi (.NET Core)",
    slug: "exo-webapi",
    category: "Backend & API RESTful Corporativa",
    description: "API RESTful corporativa desenvolvida em ASP.NET Core (.NET 8) aplicando Repository Pattern, injeção de dependência nativa, autenticação perimetral com JWT Bearer Token e ORM Entity Framework Core.",
    imageUrl: "/images/projects/exo-webapi.png",
    mockupType: "exo",
    tags: ["C#", ".NET Core 8", "ASP.NET Core", "Entity Framework Core", "JWT Bearer", "SQL Server", "Repository Pattern", "Swagger / OpenAPI"],
    architectureHighlights: [
      "Arquitetura corporativa em camadas com Repository Pattern no ASP.NET Core",
      "Autenticação perimetral com JWT Bearer Token e controle de acesso por Claims",
      "Persistência em SQL Server via Entity Framework Core com documentação OpenAPI"
    ],
    githubUrl: "https://github.com/David-Vy/WebApi",
    longDescriptionHtml: `
      <p class="mb-4">API corporativa projetada sob princípios rigorosos de arquitetura em camadas e desacoplamento de serviços em C# e no ecossistema .NET moderno.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Padrões Arquiteturais & Injeção de Dependência</h3>
      <p class="mb-4">Implementação do <strong>Repository Pattern</strong> com injeção de dependência nativa do ASP.NET Core, desacoplando controladores de acesso direto a dados e facilitando a escrita de testes unitários. O mapeamento relacional de tabelas é gerenciado pelo <strong>Entity Framework Core</strong> com migrações automatizadas e consultas LINQ otimizadas.</p>
      
      <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Segurança Perimetral com JWT</h3>
      <p>Proteção perimetral contra acesso não-autorizado via tokens <strong>JWT Bearer</strong> assinados simetricamente, com validação de emissor (Issuer), audiência (Audience) e tempo de expiração por política de controle de acesso baseada em perfis (Claims).</p>
    `
  }
];
