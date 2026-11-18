// src/lib/translations.ts

export type Language = "pt" | "en";

export interface ProjectTranslation {
  title?: string;
  category: string;
  description: string;
  longDescriptionHtml?: string;
}

export interface TranslationDictionary {
  header: {
    projects: string;
    skills: string;
    process: string;
    about: string;
    contact: string;
    role: string;
    switchToPt: string;
    switchToEn: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title: string;
    role: string;
    description: string;
    exploreProjects: string;
    contact: string;
  };
  statement: {
    quote: string;
    p1: string;
    p2: string;
  };
  projects: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewCaseStudy: string;
    githubCode: string;
    liveDemo: string;
    download: string;
    prevProject: string;
    nextProject: string;
    feedNavigation: string;
    exoFallback: string;
    items: Record<string, ProjectTranslation>;
  };
  skills: {
    sectionTitle: string;
    sectionSubtitle: string;
    skillsCount: string;
    categories: Record<string, string>;
  };
  process: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  about: {
    sectionTitle: string;
    sectionSubtitle: string;
    location: string;
    principlesTitle: string;
    principles: string[];
    bioGreeting: string;
    bioP1: string;
    bioP2: string;
    bioP3: string;
    academicTitle: string;
    credentials: {
      role: string;
      period: string;
      institution: string;
      description: string;
    }[];
    languagesTitle: string;
    languages: {
      name: string;
      level: string;
      institution: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    connectLinkedIn: string;
    location: string;
  };
  footer: {
    role: string;
    backToTop: string;
  };
  projectDetail: {
    backToProjects: string;
    overviewArchitecture: string;
    projectLinks: string;
    documentationPending: string;
    githubRepo: string;
    livePlatform: string;
    downloadBuild: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  pt: {
    header: {
      projects: "Projetos",
      skills: "Competências",
      process: "Processo",
      about: "Sobre",
      contact: "Contato",
      role: "SOFTWARE ENGINEER",
      switchToPt: "Mudar idioma para Português",
      switchToEn: "Mudar idioma para Inglês",
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
    },
    hero: {
      title: "David Levy",
      role: "Engenheiro de Software & Desenvolvedor Full-Stack",
      description:
        "Desenvolvendo aplicações web e desktop de alto desempenho, arquiteturas distribuídas e ecossistemas escaláveis com foco em código limpo, microsserviços e engenharia moderna.",
      exploreProjects: "Explorar Projetos",
      contact: "Entrar em Contato",
    },
    statement: {
      quote:
        "Assim como na mecânica celeste, a engenharia de software atinge sua maturidade quando arquitetura robusta, tolerância a falhas e alta performance convergem em perfeita harmonia.",
      p1:
        "Da telemetria em tempo real via WebRTC e aceleração nativa em C++ — operando sob latência crítica como pulsos no vácuo — até a constelação de microsserviços orquestrados com Docker, bancos relacionais e NoSQL.",
      p2:
        "Cada sistema é concebido com o rigor da engenharia de missão crítica: código sustentável, princípios SOLID, controle de concorrência e resiliência para navegar na imensidão da escala.",
    },
    projects: {
      sectionTitle: "Projetos Selecionados",
      sectionSubtitle:
        "Sistemas distribuídos em tempo real, plataformas de streaming de baixa latência, arquiteturas em nuvem e aplicações de alto desempenho.",
      viewCaseStudy: "Ver Estudo de Caso",
      githubCode: "Ver no GitHub",
      liveDemo: "Demonstração ao Vivo",
      download: "Download da Build",
      prevProject: "Projeto anterior",
      nextProject: "Próximo projeto",
      feedNavigation: "Navegação do Feed de Projetos",
      exoFallback:
        "Arquitetura corporativa em camadas com Repository Pattern, autenticação JWT Bearer e ORM Entity Framework Core.",
      items: {
        lymadhouse: {
          category: "Engenharia de Software / Desktop & WebRTC",
          description:
            "Plataforma desktop de comunicação em tempo real de alto desempenho desenvolvida em Electron e Next.js 16, equipada com motor nativo em C++ para captura Direct3D 11 via DXGI a 60 FPS e áudio WASAPI loopback.",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>LyMadhouse</strong> é uma solução de comunicação e colaboração de alta performance desenvolvida para ambientes que exigem streaming de vídeo e voz com baixíssima latência (1080p a 60 FPS).</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Engenharia de Baixo Nível & Motor C++</h3>
            <p class="mb-4">Para superar as limitações de performance do Electron tradicional, desenvolvi um addon nativo em <strong>C++ via Node-API (<code>ly_capture.node</code>)</strong> conectando-se diretamente às APIs do Windows <strong>DirectX 11 e DXGI Desktop Duplication (<code>IDXGIOutputDuplication</code>)</strong>. Essa arquitetura permite captura direta da GPU com compartilhamento de memória <strong>Zero-Copy IPC</strong>, reduzindo o consumo de CPU a patamares mínimos.</p>
            <p class="mb-4">A captura de áudio do sistema operacional utiliza <strong>WASAPI Loopback (<code>IAudioCaptureClient</code>)</strong>, convertendo fluxos PCM/IEEE Float em buffers Float32 transmitidos de forma assíncrona para a thread do Node.js através de <code>Napi::ThreadSafeFunction</code> sem provocar locks na interface.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Pipeline WebRTC & Cancelamento de Ruído por IA</h3>
            <p class="mb-4">A transmissão em tempo real é sustentada pela infraestrutura <strong>WebRTC via LiveKit SDK</strong>, com supressão acústica de ruído baseada em redes neurais profundas (<strong>Krisp AI</strong>) e suporte a <em>Push-to-Talk</em> nativo global com ganchos de baixo nível no Windows via <code>uiohook-napi</code>.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Segurança e Distribuição Resiliente</h3>
            <p>A camada de persistência utiliza <strong>PostgreSQL no Supabase</strong> blindada por políticas de <em>Row Level Security (RLS)</em>, criptografia local de credenciais RSA-2048, tratamento de estabilidade de GPU (<code>applyGpuHardening</code>) e pipeline automatizado de atualização diferencial com <strong>electron-updater</strong>.</p>
          `,
        },
        "lycloud-server": {
          category: "Cloud Computing & Private BaaS",
          description:
            "Plataforma Backend-as-a-Service (BaaS) e orquestrador de computação em nuvem privada em Monorepo PNPM, com Object Storage compatível com AWS S3 (MinIO), banco NoSQL e telemetria WebSocket.",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>LyCloud Server</strong> foi concebido como uma engine de nuvem privada e BaaS auto-hospedado voltado para desenvolvedores e infraestruturas que necessitam de soberania total sobre seus dados e microsserviços.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Orquestração Monorepo & Microsserviços</h3>
            <p class="mb-4">Estruturado sobre um <strong>Monorepo PNPM</strong> altamente coeso (dividindo <code>apps/electron-app</code>, <code>packages/backend</code>, <code>packages/sdk</code> e <code>packages/storage</code>), o sistema orquestra contêineres Docker para instâncias NoSQL com MongoDB e baldes de armazenamento compatíveis com a API da <strong>AWS S3</strong> através do MinIO.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Telemetria em Tempo Real & Engine WebSocket</h3>
            <p class="mb-4">Um supervisor residente monitora métricas do host em tempo real (utilização de CPU, alocação de memória RAM e volume de tráfego de rede via <code>os-utils</code>), transmitindo telemetria contínua via conexões bidirecionais <strong>WebSockets</strong> para o console administrativo em React e Electron.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Ecossistema SDK TypeScript</h3>
            <p>A plataforma inclui a biblioteca cliente oficial tipada <strong>@lycloud/sdk</strong>, permitindo que aplicações clientes realizem autenticação transparente com JWT e Hardware Fingerprint, consumam coleções reativas genéricas <code>&lt;T&gt;</code> e realizem uploads multipart para o Object Storage.</p>
          `,
        },
        lyvia: {
          category: "Sistemas Distribuídos & Streaming HLS",
          description:
            "Ecossistema distribuído de streaming de mídia com backend de alta vazão em Fastify, transcodificação sob demanda com FFmpeg, geração dinâmica de manifestos HLS e cliente híbrido (Web e Android).",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>LyVia</strong> é uma plataforma moderna desenvolvida para entrega contínua de conteúdo multimídia em alta definição com otimização radical de largura de banda e custos operacionais.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Smart Stream Orchestrator & Transcodificação HLS</h3>
            <p class="mb-4">O núcleo do servidor em <strong>Fastify</strong> executa o <code>SmartStreamOrchestrator</code>, gerenciando múltiplos provedores de conteúdo com fallback autônomo e reconciliação de metadados via correspondência fuzzy de strings (<code>TitleMatcher</code>). O pipeline de mídia realiza remuxing dinâmico via FFmpeg, fatiando vídeos em chunks <code>.ts</code> e playlists <code>.m3u8</code> compatíveis com requisições HTTP 206 (Byte-Range).</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Cliente Híbrido & Resiliência Offline</h3>
            <p class="mb-4">A aplicação cliente foi desenvolvida como SPA em Vite + React 18 e encapsulada para Android nativo via <strong>Capacitor</strong>. Possui player adaptativo construído sobre <code>hls.js</code>, transições aceleradas por GPU com Framer Motion e cache offline de episódios e preferências utilizando <strong>IndexedDB (idb)</strong>.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Infraestrutura em Nuvem de Alta Vazão</h3>
            <p>A arquitetura containerizada em Docker é dimensionada para nós ARM Ampere na nuvem Oracle Cloud Infrastructure, usufruindo de canais de saída de 10 TB/mês e distribuição edge com políticas de cache otimizadas.</p>
          `,
        },
        "icre-web": {
          category: "Full-Stack & Fintech / Event Management",
          description:
            "Plataforma corporativa de gestão de eventos, bilhetagem eletrônica e credenciamento em tempo real com integração ao gateway bancário Asaas (PIX), geração de ingressos em PDF com Puppeteer e leitor de QR Code.",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>ICRE Web</strong> é uma plataforma robusta projetada para administração e credenciamento de eventos de grande porte, integrando automação financeira instantânea e validação perimetral na portaria.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Automação de Pagamentos & Webhooks</h3>
            <p class="mb-4">Desenvolvida sobre o <strong>Next.js 16</strong> e <strong>Supabase SSR</strong>, a plataforma integra-se diretamente ao gateway bancário do <strong>Asaas</strong>, suportando processamento de pagamentos via PIX dinâmico (QRCode e chave Copia e Cola) e cartão de crédito. Listeners de webhooks assíncronos tratam confirmações bancárias e garantem consistência atômica nos estoques de ingressos.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Geração de Ingressos & Credenciamento na Portaria</h3>
            <p class="mb-4">Emissão de ingressos e crachás em PDF de alta qualidade vetorial renderizados por instâncias headless de Chromium via <code>puppeteer</code> e <code>jspdf</code>. No local do evento, operadores utilizam o credenciador com leitura óptica de QR Codes pela câmera web (<code>html5-qrcode</code>), com validação anti-duplicidade em microssegundos.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Proteção & Resiliência</h3>
            <p>Proteção perimetral contra compras concorrentes automatizadas e ataques de negação de serviço com integração ao <strong>Cloudflare Turnstile</strong>.</p>
          `,
        },
        intellistock: {
          category: "Full-Stack & Cloud SaaS ERP",
          description:
            "Sistema SaaS multitenant para gestão inteligente de inventário e suprimentos no varejo com painel de Business Intelligence analítico, controle de acesso RBAC e trilha de auditoria contínua.",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>IntelliStock</strong> resolve gargalos críticos na gestão de suprimentos e inventário de varejo de dispositivos eletrônicos através de uma arquitetura em nuvem ágil e intuitiva.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Arquitetura Multitenant & Firestore</h3>
            <p class="mb-4">Construído em <strong>React 19</strong> e <strong>Firebase</strong>, adota uma arquitetura multitenant com isolamento por empresa (<code>CompanyLobby</code>), operando transações atômicas de entrada/saída de mercadorias no <strong>Cloud Firestore</strong> para evitar inconsistências em vendas simultâneas.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Business Intelligence & Auditoria</h3>
            <p class="mb-4">Dashboard com visualizações analíticas construídas com <strong>Recharts</strong>, permitindo rastrear índice de rotatividade, alertas de ruptura de estoque e curvas financeiras. Conta com serviço de log contínuo (<code>ActivityLog</code>) que grava todas as ações executadas pelos operadores com autenticação RBAC.</p>
          `,
        },
        utilify: {
          category: "Developer Tools & Client-Side Processing",
          description:
            "Plataforma modular com mais de 25 ferramentas utilitárias de engenharia de software executando algoritmos intensivos no cliente via WebAssembly (OCR), Myers Diff, AST Terser e Web Workers.",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>Utilify</strong> é uma suíte completa de micro-ferramentas de produtividade e engenharia de software desenvolvida para processar dados de forma estritamente local no navegador do usuário, assegurando privacidade total e latência zero.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Processamento no Cliente & WebAssembly</h3>
            <p class="mb-4">A plataforma utiliza <strong>Tesseract.js compilado em WebAssembly</strong> para Reconhecimento Óptico de Caracteres (OCR) direto na GPU/CPU do cliente, motor de comparação textual baseado no <strong>Algoritmo Myers (<code>diff-match-patch</code>)</strong> e compressão de imagens via Web Workers sem tráfego de dados para servidores externos.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Engenharia de Compilação & AST</h3>
            <p class="mb-4">Inclui minificador de código JavaScript com análise sintática de nós <strong>Abstract Syntax Tree (AST) via Terser</strong>, transpilador dinâmico de objetos JSON arbitrários para contratos tipados TypeScript (<code>json-to-ts</code>) e paleta modal de comandos estilo Spotlight com navegação pelo teclado via <code>cmdk</code>.</p>
          `,
        },
        "projeto-rosa": {
          category: "Inteligência Artificial & Deep Learning",
          description:
            "Modelo de linguagem neural autoregressivo desenvolvido do zero em PyTorch com célula recorrente GRU customizada para aceleração por hardware em GPUs AMD no Windows via Microsoft DirectML.",
          longDescriptionHtml: `
            <p class="mb-4">O <strong>Projeto Rosa</strong> é uma implementação profunda e de código aberto de um modelo de linguagem autoregressivo em <strong>PyTorch</strong>, concebido para contornar limitações de compatibilidade de hardware proprietário (CUDA) e executar inferência acelerada em GPUs AMD sob Windows.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Célula GRU Fundamental & DirectML</h3>
            <p class="mb-4">Para superar incompatibilidades de operadores recorrentes nativos do PyTorch ao utilizar a extensão <code>torch_directml</code> em placas gráficas AMD Radeon, foi desenvolvida a <code>DirectMLGRUCell</code>: uma implementação manual das equações de portas de controle (Reset Gate, Update Gate e New Memory Candidate) através de camadas lineares puras (<code>nn.Linear</code>) e funções de ativação Sigmoid e Tanh.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Arquitetura de Rede & Treinamento</h3>
            <p class="mb-4">A rede <code>RosaGRU</code> integra camada de embedding vetorial denso, empilhamento manual de camadas recorrentes com desdobramento explícito de loop temporal e camada de projeção para o vocabulário. O modelo treinado (<code>rosa_brain.pth</code>) possui pipeline de decodificação com temperatura ajustável e amostragem top-k.</p>
          `,
        },
        "exo-webapi": {
          category: "Backend & API RESTful Corporativa",
          description:
            "API RESTful corporativa desenvolvida em ASP.NET Core (.NET 8) aplicando Repository Pattern, injeção de dependência nativa, autenticação perimetral com JWT Bearer Token e ORM Entity Framework Core.",
          longDescriptionHtml: `
            <p class="mb-4">API corporativa projetada sob princípios rigorosos de arquitetura em camadas e desacoplamento de serviços em C# e no ecossistema .NET moderno.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Padrões Arquiteturais & Injeção de Dependência</h3>
            <p class="mb-4">Implementação do <strong>Repository Pattern</strong> com injeção de dependência nativa do ASP.NET Core, desacoplando controladores de acesso direto a dados e facilitando a escrita de testes unitários. O mapeamento relacional de tabelas é gerenciado pelo <strong>Entity Framework Core</strong> com migrações automatizadas e consultas LINQ otimizadas.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Segurança Perimetral com JWT</h3>
            <p>Proteção perimetral contra acesso não-autorizado via tokens <strong>JWT Bearer</strong> assinados simetricamente, com validação de emissor (Issuer), audiência (Audience) e tempo de expiração por política de controle de acesso baseada em perfis (Claims).</p>
          `,
        },
      },
    },
    skills: {
      sectionTitle: "Competências Técnicas",
      sectionSubtitle:
        "Linguagens, frameworks e ferramentas consolidadas no desenvolvimento de sistemas web, desktop e serviços distribuídos em nuvem.",
      skillsCount: "competências",
      categories: {
        "Linguagens & Fundamentos": "Linguagens & Fundamentos",
        "Front-end & Desktop": "Front-end & Desktop",
        "Back-end & Cloud": "Back-end & Cloud",
        "Bancos de Dados & DevOps": "Bancos de Dados & DevOps",
        "Engenharia & Práticas de Software": "Engenharia & Práticas de Software",
      },
    },
    process: {
      sectionTitle: "Metodologia de Engenharia",
      sectionSubtitle:
        "Um fluxo de desenvolvimento estruturado que garante previsibilidade, arquitetura escalável e entrega de software com alto rigor técnico.",
      steps: [
        {
          number: "01",
          title: "Arquitetura & Domínio",
          description:
            "Análise profunda de requisitos, modelagem relacional e NoSQL, e estruturação de fluxo de dados para microsserviços e aplicações distribuídas.",
        },
        {
          number: "02",
          title: "Engenharia & Clean Code",
          description:
            "Implementação modular com TypeScript, princípios SOLID, controle rigoroso de concorrência e camadas seguras de autenticação e autorização.",
        },
        {
          number: "03",
          title: "Performance & Validação",
          description:
            "Otimização de latência e consumo de memória, comunicação em tempo real via WebSockets/WebRTC e testes automatizados de integração.",
        },
        {
          number: "04",
          title: "Deploy & Observabilidade",
          description:
            "Orquestração em contêineres Docker, integração e entrega contínua (CI/CD) e instrumentação de logs e telemetria para monitoramento contínuo.",
        },
      ],
    },
    about: {
      sectionTitle: "Sobre David Levy",
      sectionSubtitle:
        "Trajetória em Engenharia de Software, fundamentação acadêmica e princípios de desenvolvimento.",
      location: "Brasília, DF — Disponível para atuação presencial, remota ou híbrida",
      principlesTitle: "Princípios de Engenharia",
      principles: [
        "Clean Architecture & SOLID",
        "Sistemas Distribuídos & WebRTC",
        "Código Limpo, Testável & Escalável",
      ],
      bioGreeting:
        "Olá, sou David Levy. Estudante de Engenharia de Software e desenvolvedor Full-Stack.",
      bioP1:
        "Tenho experiência prática no desenvolvimento de aplicações Web e Desktop de alto desempenho utilizando React, Next.js, TypeScript, Node.js e Electron. Minha atuação é orientada à engenharia de software estruturada, com ênfase em sistemas distribuídos, microsserviços e comunicação em tempo real.",
      bioP2:
        "Construo ecossistemas completos — desde soluções desktop com streaming de baixa latência em WebRTC e aceleração nativa via hardware em C++ (DirectX/DXGI), até plataformas privadas com orquestração em Docker, monorepos e persistência relacional com PostgreSQL e NoSQL.",
      bioP3:
        "Busco oportunidades de estágio ou posição técnica/júnior em Engenharia de Software e desenvolvimento Full-Stack, com foco em arquitetura limpa, código sustentável e evolução contínua.",
      academicTitle: "Formação Acadêmica & Certificações",
      credentials: [
        {
          role: "Bacharelado em Engenharia de Software",
          period: "Previsão Jan/2030",
          institution: "Faculdade Anhanguera",
          description:
            "Fundamentos de engenharia web, arquitetura de sistemas e computação em nuvem.",
        },
        {
          role: "Técnico em Desenvolvimento de Sistemas",
          period: "2024–2025 (1.200h)",
          institution: "Escola Técnica de Santa Maria (ETSM)",
          description:
            "Lógica avançada de programação, modelagem relacional de dados e desenvolvimento de software.",
        },
        {
          role: "Programador Full-Stack",
          period: "Concluído (670h)",
          institution: "SENAI — Unidade Integrada SIG Brasília",
          description:
            "Metodologias ágeis (Scrum), APIs RESTful, SQL/NoSQL e testes automatizados.",
        },
      ],
      languagesTitle: "Idiomas & Proficiência Internacional",
      languages: [
        {
          name: "Português",
          level: "Nativo",
          institution: "Língua Materna",
          description: "Comunicação nativa e articulação técnica fluida.",
        },
        {
          name: "Espanhol",
          level: "Avançado (440h)",
          institution: "Centro Interescolar de Línguas (CIL 01)",
          description:
            "Formação concluída de 440h no CIL com proficiência oral e escrita.",
        },
        {
          name: "Inglês",
          level: "Intermediário",
          institution: "Centro Interescolar de Línguas (CIL 01)",
          description:
            "Leitura técnica, documentação e conversação (Previsão 2026).",
        },
      ],
    },
    contact: {
      title: "Vamos conversar?",
      subtitle:
        "Estou aberto a oportunidades de estágio e nível júnior em Engenharia de Software, sistemas distribuídos e desenvolvimento Full-Stack. Sinta-se à vontade para me contatar diretamente por e-mail ou pelas redes profissionais.",
      connectLinkedIn: "Conectar no LinkedIn",
      location: "Brasília, DF (UTC-3)",
    },
    footer: {
      role: "David Levy · Software Engineer",
      backToTop: "Voltar ao topo",
    },
    projectDetail: {
      backToProjects: "Voltar aos Projetos",
      overviewArchitecture: "Visão Geral & Arquitetura",
      projectLinks: "Links do Projeto",
      documentationPending:
        "A documentação detalhada deste projeto está sendo preparada.",
      githubRepo: "Repositório no GitHub",
      livePlatform: "Acessar Plataforma Online",
      downloadBuild: "Baixar Executável / Build",
    },
  },
  en: {
    header: {
      projects: "Projects",
      skills: "Skills",
      process: "Process",
      about: "About",
      contact: "Contact",
      role: "SOFTWARE ENGINEER",
      switchToPt: "Switch language to Portuguese",
      switchToEn: "Switch language to English",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    hero: {
      title: "David Levy",
      role: "Software Engineer & Full-Stack Developer",
      description:
        "Engineering high-performance web and desktop applications, distributed architectures, and scalable ecosystems focused on clean code, microservices, and modern engineering.",
      exploreProjects: "Explore Projects",
      contact: "Get in Touch",
    },
    statement: {
      quote:
        "Much like celestial mechanics, software engineering reaches maturity when robust architecture, fault tolerance, and high performance converge in seamless harmony.",
      p1:
        "From real-time WebRTC telemetry and native C++ hardware acceleration — operating under mission-critical latency like pulses across the void — to constellations of microservices orchestrated with Docker, relational databases, and NoSQL.",
      p2:
        "Each system is engineered with the rigor of mission-critical systems: sustainable code, SOLID principles, concurrency management, and resilience to navigate massive scale.",
    },
    projects: {
      sectionTitle: "Featured Projects",
      sectionSubtitle:
        "Real-time distributed systems, low-latency streaming platforms, cloud architectures, and high-performance applications.",
      viewCaseStudy: "View Case Study",
      githubCode: "View on GitHub",
      liveDemo: "Live Demo",
      download: "Download Build",
      prevProject: "Previous project",
      nextProject: "Next project",
      feedNavigation: "Project Feed Navigation",
      exoFallback:
        "Corporate layered architecture with Repository Pattern, JWT Bearer authentication, and Entity Framework Core ORM.",
      items: {
        lymadhouse: {
          category: "Software Engineering / Desktop & WebRTC",
          description:
            "High-performance real-time desktop communication platform built with Electron and Next.js 16, powered by a native C++ engine for Direct3D 11 capture via DXGI at 60 FPS and WASAPI loopback audio.",
          longDescriptionHtml: `
            <p class="mb-4"><strong>LyMadhouse</strong> is a high-performance communication and collaboration solution built for environments requiring ultra-low-latency voice and video streaming (1080p at 60 FPS).</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Low-Level Engineering & C++ Engine</h3>
            <p class="mb-4">To overcome traditional Electron performance bottlenecks, I developed a native addon in <strong>C++ via Node-API (<code>ly_capture.node</code>)</strong> interfacing directly with Windows <strong>DirectX 11 and DXGI Desktop Duplication (<code>IDXGIOutputDuplication</code>)</strong> APIs. This architecture enables direct GPU frame grabbing with <strong>Zero-Copy IPC</strong> shared memory, minimizing CPU overhead.</p>
            <p class="mb-4">Operating system audio capture leverages <strong>WASAPI Loopback (<code>IAudioCaptureClient</code>)</strong>, converting PCM/IEEE Float audio streams into Float32 buffers transmitted asynchronously to the Node.js event loop via <code>Napi::ThreadSafeFunction</code> without blocking the UI thread.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">WebRTC Pipeline & AI Noise Cancellation</h3>
            <p class="mb-4">Real-time media transmission is backed by <strong>WebRTC via LiveKit SDK</strong>, featuring deep neural acoustic noise suppression (<strong>Krisp AI</strong>) and global system-wide <em>Push-to-Talk</em> via Windows low-level hooks with <code>uiohook-napi</code>.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Security and Resilient Distribution</h3>
            <p>Persistence uses <strong>PostgreSQL on Supabase</strong> fortified with <em>Row Level Security (RLS)</em> policies, local RSA-2048 credential encryption, GPU stability hardening (<code>applyGpuHardening</code>), and an automated differential update pipeline powered by <strong>electron-updater</strong>.</p>
          `,
        },
        "lycloud-server": {
          category: "Cloud Computing & Private BaaS",
          description:
            "Backend-as-a-Service (BaaS) and private cloud computing orchestrator structured in PNPM Monorepo, featuring AWS S3-compatible Object Storage (MinIO), NoSQL database, and WebSocket telemetry.",
          longDescriptionHtml: `
            <p class="mb-4"><strong>LyCloud Server</strong> was conceived as a self-hosted private cloud engine and BaaS targeted at developers and infrastructures demanding total sovereignty over their data and microservices.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Monorepo Orchestration & Microservices</h3>
            <p class="mb-4">Organized across a cohesive <strong>PNPM Monorepo</strong> (splitting <code>apps/electron-app</code>, <code>packages/backend</code>, <code>packages/sdk</code>, and <code>packages/storage</code>), the system orchestrates Docker containers for NoSQL MongoDB instances and <strong>AWS S3-compatible</strong> storage buckets via MinIO.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Real-Time Telemetry & WebSocket Engine</h3>
            <p class="mb-4">A background supervisor continuously measures host metrics (CPU load, RAM consumption, and network I/O via <code>os-utils</code>), streaming real-time telemetry over bidirectional <strong>WebSockets</strong> to the React and Electron admin console.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">TypeScript SDK Ecosystem</h3>
            <p>The platform includes the official typed client library <strong>@lycloud/sdk</strong>, allowing client applications to perform transparent JWT authentication with hardware fingerprinting, consume generic reactive collections <code>&lt;T&gt;</code>, and execute multipart uploads to Object Storage.</p>
          `,
        },
        lyvia: {
          category: "Distributed Systems & HLS Streaming",
          description:
            "Distributed media streaming ecosystem with high-throughput Fastify backend, on-demand FFmpeg transcoding, dynamic HLS manifest generation, and hybrid client (Web and Android).",
          longDescriptionHtml: `
            <p class="mb-4"><strong>LyVia</strong> is a modern platform built for continuous high-definition multimedia delivery with aggressive bandwidth and operational cost optimization.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Smart Stream Orchestrator & HLS Transcoding</h3>
            <p class="mb-4">The core <strong>Fastify</strong> server runs the <code>SmartStreamOrchestrator</code>, managing multiple content providers with autonomous fallback and metadata reconciliation via fuzzy string matching (<code>TitleMatcher</code>). The media pipeline executes dynamic remuxing via FFmpeg, slicing video into <code>.ts</code> chunks and adaptive <code>.m3u8</code> playlists supporting HTTP 206 (Byte-Range) streaming.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Hybrid Client & Offline Resilience</h3>
            <p class="mb-4">The client application is built as an SPA in Vite + React 18, wrapped for native Android via <strong>Capacitor</strong>. It includes an adaptive player built on <code>hls.js</code>, GPU-accelerated transitions via Framer Motion, and offline episode caching using <strong>IndexedDB (idb)</strong>.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">High-Throughput Cloud Infrastructure</h3>
            <p>The Dockerized container architecture is provisioned on ARM Ampere nodes in Oracle Cloud Infrastructure, taking advantage of 10 TB/month outbound bandwidth and edge distribution with optimized caching policies.</p>
          `,
        },
        "icre-web": {
          category: "Full-Stack & Fintech / Event Management",
          description:
            "Enterprise event management, electronic ticketing, and real-time accreditation platform integrating Asaas banking gateway (PIX), vector PDF ticket generation via Puppeteer, and QR Code scanner.",
          longDescriptionHtml: `
            <p class="mb-4"><strong>ICRE Web</strong> is a resilient platform engineered for large-scale event administration and admissions, unifying instant financial automation and perimeter accreditation.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Payment Automation & Webhooks</h3>
            <p class="mb-4">Engineered on <strong>Next.js 16</strong> and <strong>Supabase SSR</strong>, the platform interfaces directly with the <strong>Asaas</strong> payment gateway, supporting dynamic PIX (QR Code and Copy-Paste keys) and credit cards. Asynchronous webhook listeners process settlement notifications ensuring atomic consistency in ticket inventories.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Ticket Generation & Gate Accreditation</h3>
            <p class="mb-4">Issues high-resolution vector PDF tickets rendered by headless Chromium instances via <code>puppeteer</code> and <code>jspdf</code>. At venue gates, staff use the optical scanner with real-time web camera feeds (<code>html5-qrcode</code>) performing anti-duplicate validation within microseconds.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Protection & Resilience</h3>
            <p>Perimeter defenses guard against automated concurrent purchasing and denial-of-service attempts via <strong>Cloudflare Turnstile</strong> integration.</p>
          `,
        },
        intellistock: {
          category: "Full-Stack & Cloud SaaS ERP",
          description:
            "Multitenant SaaS for intelligent retail inventory and supply chain management with analytical Business Intelligence dashboard, RBAC access control, and continuous audit trail.",
          longDescriptionHtml: `
            <p class="mb-4"><strong>IntelliStock</strong> resolves critical bottlenecks in electronic equipment retail inventory and supply chain operations through an agile, intuitive cloud architecture.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Multitenant Architecture & Firestore</h3>
            <p class="mb-4">Built with <strong>React 19</strong> and <strong>Firebase</strong>, it adopts multitenancy with company isolation (<code>CompanyLobby</code>), running atomic inventory transaction batches on <strong>Cloud Firestore</strong> to prevent race conditions during concurrent sales.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Business Intelligence & Audit Trail</h3>
            <p class="mb-4">Features analytical dashboards rendered via <strong>Recharts</strong> to track turnover rates, stock rupture alerts, and revenue trends. Includes a continuous audit service (<code>ActivityLog</code>) logging all operator actions backed by RBAC authentication.</p>
          `,
        },
        utilify: {
          category: "Developer Tools & Client-Side Processing",
          description:
            "Modular suite of 25+ software engineering utilities running compute-heavy algorithms purely on the client via WebAssembly (OCR), Myers Diff, AST Terser, and Web Workers.",
          longDescriptionHtml: `
            <p class="mb-4"><strong>Utilify</strong> is a complete software engineering productivity suite engineered to process data strictly within the user's browser, guaranteeing total privacy and zero latency.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Client-Side Compute & WebAssembly</h3>
            <p class="mb-4">The platform utilizes <strong>Tesseract.js compiled to WebAssembly</strong> for client-side Optical Character Recognition (OCR), text comparison powered by the <strong>Myers Algorithm (<code>diff-match-patch</code>)</strong>, and image compression via background Web Workers with zero data transmission to external servers.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Compilation & AST Engineering</h3>
            <p class="mb-4">Features a JavaScript minifier with <strong>Abstract Syntax Tree (AST) analysis via Terser</strong>, a dynamic transpiler converting arbitrary JSON objects into strict TypeScript interfaces (<code>json-to-ts</code>), and a keyboard-driven Spotlight command palette powered by <code>cmdk</code>.</p>
          `,
        },
        "projeto-rosa": {
          category: "Artificial Intelligence & Deep Learning",
          description:
            "Autoregressive neural language model built from scratch in PyTorch with custom GRU recurrent cell for hardware acceleration on AMD GPUs under Windows via Microsoft DirectML.",
          longDescriptionHtml: `
            <p class="mb-4"><strong>Projeto Rosa</strong> is an open-source autoregressive neural language model built in <strong>PyTorch</strong> designed to bypass proprietary hardware lock-ins (CUDA) and deliver accelerated inference on AMD GPUs under Windows.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Custom GRU Cell & DirectML</h3>
            <p class="mb-4">To circumvent native PyTorch recurrent operator limitations when using <code>torch_directml</code> on AMD Radeon graphics cards, I engineered <code>DirectMLGRUCell</code>: a manual mathematical formulation of gating mechanisms (Reset Gate, Update Gate, and Candidate State) using pure linear layers (<code>nn.Linear</code>) and Sigmoid/Tanh activations.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Network Architecture & Training</h3>
            <p class="mb-4">The <code>RosaGRU</code> network integrates dense vector embeddings, manual recurrent layer stacking with unrolled time-steps, and vocabulary projection. The trained model (<code>rosa_brain.pth</code>) features an inference decoding pipeline with configurable temperature and top-k stochastic sampling.</p>
          `,
        },
        "exo-webapi": {
          category: "Backend & Enterprise RESTful API",
          description:
            "Enterprise RESTful API engineered in ASP.NET Core (.NET 8) implementing Repository Pattern, native dependency injection, perimeter JWT Bearer Token security, and Entity Framework Core ORM.",
          longDescriptionHtml: `
            <p class="mb-4">Enterprise backend architecture designed under rigorous principles of separation of concerns and layered services in C# and the modern .NET ecosystem.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Architectural Patterns & Dependency Injection</h3>
            <p class="mb-4">Implements the <strong>Repository Pattern</strong> coupled with native ASP.NET Core dependency injection, decoupling controllers from direct persistence layers to facilitate isolated unit testing. Relational database mapping is managed by <strong>Entity Framework Core</strong> with automated migrations and LINQ query optimization.</p>
            <h3 class="font-title text-2xl font-bold text-white mt-8 mb-4 border-b border-white/[0.06] pb-2">Perimeter Security with JWT</h3>
            <p>Perimeter defenses against unauthorized access via symmetrically signed <strong>JWT Bearer</strong> tokens, verifying issuer, audience, and expiration times across a claims-based authorization framework.</p>
          `,
        },
      },
    },
    skills: {
      sectionTitle: "Technical Skills",
      sectionSubtitle:
        "Languages, frameworks, and consolidated tools for building web systems, desktop applications, and distributed cloud services.",
      skillsCount: "competencies",
      categories: {
        "Linguagens & Fundamentos": "Languages & Fundamentals",
        "Front-end & Desktop": "Front-End & Desktop",
        "Back-end & Cloud": "Back-End & Cloud",
        "Bancos de Dados & DevOps": "Databases & DevOps",
        "Engenharia & Práticas de Software": "Software Engineering & Practices",
      },
    },
    process: {
      sectionTitle: "Engineering Methodology",
      sectionSubtitle:
        "A structured development lifecycle ensuring predictability, scalable architecture, and software delivery with high technical rigor.",
      steps: [
        {
          number: "01",
          title: "Architecture & Domain",
          description:
            "In-depth requirements analysis, relational and NoSQL modeling, and data flow design for microservices and distributed applications.",
        },
        {
          number: "02",
          title: "Engineering & Clean Code",
          description:
            "Modular implementation with TypeScript, SOLID principles, strict concurrency control, and secure authentication and authorization layers.",
        },
        {
          number: "03",
          title: "Performance & Validation",
          description:
            "Latency and memory optimization, real-time communication via WebSockets/WebRTC, and automated integration testing.",
        },
        {
          number: "04",
          title: "Deployment & Observability",
          description:
            "Container orchestration with Docker, continuous integration and delivery (CI/CD), and log instrumentation and telemetry for ongoing observability.",
        },
      ],
    },
    about: {
      sectionTitle: "About David Levy",
      sectionSubtitle:
        "Software Engineering trajectory, academic foundation, and development principles.",
      location: "Brasília, Brazil — Available for on-site, remote, or hybrid roles",
      principlesTitle: "Engineering Principles",
      principles: [
        "Clean Architecture & SOLID",
        "Distributed Systems & WebRTC",
        "Clean, Testable & Scalable Code",
      ],
      bioGreeting:
        "Hello, I am David Levy. Software Engineering student and Full-Stack developer.",
      bioP1:
        "I have practical experience developing high-performance Web and Desktop applications using React, Next.js, TypeScript, Node.js, and Electron. My focus is oriented toward structured software engineering, emphasizing distributed systems, microservices, and real-time communication.",
      bioP2:
        "I build complete ecosystems — from desktop solutions with low-latency WebRTC streaming and native C++ hardware acceleration (DirectX/DXGI), to private platforms orchestrated with Docker, monorepos, and relational persistence with PostgreSQL and NoSQL.",
      bioP3:
        "I am seeking internship or junior software engineering opportunities focused on clean architecture, sustainable code, and continuous growth.",
      academicTitle: "Academic Background & Certifications",
      credentials: [
        {
          role: "Bachelor of Science in Software Engineering",
          period: "Expected Jan/2030",
          institution: "Anhanguera University",
          description:
            "Web engineering fundamentals, systems architecture, and cloud computing.",
        },
        {
          role: "Technical Degree in Systems Development",
          period: "2024–2025 (1,200 hrs)",
          institution: "Santa Maria Technical School (ETSM)",
          description:
            "Advanced programming logic, relational data modeling, and software engineering.",
        },
        {
          role: "Full-Stack Developer Certification",
          period: "Completed (670 hrs)",
          institution: "SENAI — SIG Brasília Integrated Unit",
          description:
            "Agile methodologies (Scrum), RESTful APIs, SQL/NoSQL, and automated testing.",
        },
      ],
      languagesTitle: "Languages & Global Proficiency",
      languages: [
        {
          name: "Portuguese",
          level: "Native",
          institution: "Native Tongue",
          description: "Native communication and fluent technical articulation.",
        },
        {
          name: "Spanish",
          level: "Advanced (440 hrs)",
          institution: "Inter-School Language Center (CIL 01)",
          description:
            "Completed 440-hour formal training at CIL with oral and written proficiency.",
        },
        {
          name: "English",
          level: "Intermediate",
          institution: "Inter-School Language Center (CIL 01)",
          description:
            "Technical literature, documentation, and conversational fluency (Target 2026).",
        },
      ],
    },
    contact: {
      title: "Let's Connect",
      subtitle:
        "I am open to internship and junior-level opportunities in Software Engineering, distributed systems, and Full-Stack development. Feel free to reach out directly via email or professional networks.",
      connectLinkedIn: "Connect on LinkedIn",
      location: "Brasília, Brazil (UTC-3)",
    },
    footer: {
      role: "David Levy · Software Engineer",
      backToTop: "Back to top",
    },
    projectDetail: {
      backToProjects: "Back to Projects",
      overviewArchitecture: "Overview & Architecture",
      projectLinks: "Project Links",
      documentationPending:
        "Detailed documentation for this project is being prepared.",
      githubRepo: "GitHub Repository",
      livePlatform: "Access Live Platform",
      downloadBuild: "Download Executable / Build",
    },
  },
};
