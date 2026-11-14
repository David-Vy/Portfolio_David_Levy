// src/lib/skills-data.ts

export interface SkillApplication {
  projectName: string;
  projectSlug: string;
  context: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName?: "terminal" | "monitor" | "server" | "database" | "shield";
  accentColor?: string;
}

export const SKILL_APPLICATIONS: Record<string, SkillApplication> = {
  "C / C++ (Node-API)": {
    projectName: "LyMadhouse",
    projectSlug: "lymadhouse",
    context: "Motor gráfico nativo DXGI a 60 FPS & WASAPI loopback sem locks",
  },
  "WebRTC (Streaming de Baixa Latência)": {
    projectName: "LyMadhouse",
    projectSlug: "lymadhouse",
    context: "Pipeline LiveKit com supressão de ruído por IA Krisp",
  },
  "Electron (Desktop Nativo)": {
    projectName: "LyMadhouse & LyCloud",
    projectSlug: "lymadhouse",
    context: "Arquitetura multi-processo, IPC de alta velocidade e painel desktop",
  },
  "TypeScript & JavaScript": {
    projectName: "LyMadhouse, LyVia & Utilify",
    projectSlug: "lymadhouse",
    context: "Tipagem estrita ponta a ponta e arquiteturas orientadas a eventos",
  },
  "React.js & Next.js 15": {
    projectName: "LyMadhouse & Utilify",
    projectSlug: "lymadhouse",
    context: "App Router, Server Components e interface reativa de alto desempenho",
  },
  "Node.js (Express & Fastify)": {
    projectName: "LyVia & LyCloud",
    projectSlug: "lyvia",
    context: "Cluster Fastify de baixa sobrecarga e Smart Stream Orchestrator",
  },
  "AWS S3 / MinIO (Object Storage)": {
    projectName: "LyCloud Server",
    projectSlug: "lycloud-server",
    context: "Object Storage S3 com upload multipart e buckets privados",
  },
  "Docker & Docker Compose": {
    projectName: "LyCloud & LyVia",
    projectSlug: "lycloud-server",
    context: "Orquestração de microsserviços e contêineres de banco e mídia",
  },
  "PostgreSQL & Supabase (RLS)": {
    projectName: "LyMadhouse & ICRE Web",
    projectSlug: "lymadhouse",
    context: "Políticas de Row Level Security (RLS) e persistência relacional",
  },
  "Python": {
    projectName: "Projeto Rosa",
    projectSlug: "projeto-rosa",
    context: "Rede neural autoregressiva DirectMLGRUCell acelerada em GPU AMD",
  },
  "C# (.NET Core & MVC)": {
    projectName: "Exo WebApi",
    projectSlug: "exo-webapi",
    context: "Repository Pattern e autenticação perimetral JWT Bearer",
  },
  "Entity Framework Core": {
    projectName: "Exo WebApi",
    projectSlug: "exo-webapi",
    context: "ORM relacional, migrações automatizadas e consultas LINQ otimizadas",
  },
  "Firebase Firestore & Auth": {
    projectName: "IntelliStock",
    projectSlug: "intellistock",
    context: "Persistência NoSQL reativa multitenant com transações atômicas",
  },
  "Integração Financeira & PIX (Asaas API)": {
    projectName: "ICRE Web",
    projectSlug: "icre-web",
    context: "Gateway bancário com liquidação instantânea e webhook assíncrono",
  },
  "WebSockets (Telemetria Real-Time)": {
    projectName: "LyCloud Server",
    projectSlug: "lycloud-server",
    context: "Monitoramento contínuo de hardware (CPU/RAM) com telemetria contínua",
  },
  "Microsserviços & Monorepos (PNPM)": {
    projectName: "LyCloud Server",
    projectSlug: "lycloud-server",
    context: "Monorepo PNPM Workspaces com SDKs e serviços isolados",
  },
  "MongoDB & Mongoose (NoSQL)": {
    projectName: "LyCloud Server",
    projectSlug: "lycloud-server",
    context: "Coleções de dados flexíveis e dinâmicas com validação Zod",
  },
};

export const skillsData: SkillCategory[] = [
  {
    title: "Linguagens de Programação",
    iconName: "terminal",
    accentColor: "rgba(168, 85, 247, 0.15)",
    skills: [
      "TypeScript & JavaScript",
      "Python",
      "SQL (PostgreSQL & MySQL)",
      "C# (.NET Core & MVC)",
      "Java",
      "Dart (Flutter)",
      "PHP (Laravel)",
      "C / C++ (Node-API)",
      "HTML5 & CSS3"
    ],
  },
  {
    title: "Front-end & Desktop",
    iconName: "monitor",
    accentColor: "rgba(59, 130, 246, 0.15)",
    skills: [
      "React.js & Next.js 15",
      "Electron (Desktop Nativo)",
      "Tailwind CSS & CSS Modules",
      "Vite & Webpack",
      "Radix UI & Shadcn",
      "Framer Motion",
      "TanStack Table",
      "Design Systems & Responsividade"
    ],
  },
  {
    title: "Back-end & Cloud",
    iconName: "server",
    accentColor: "rgba(16, 185, 129, 0.15)",
    skills: [
      "Node.js (Express & Fastify)",
      "APIs RESTful & Endpoints Seguros",
      "WebSockets (Telemetria Real-Time)",
      "WebRTC (Streaming de Baixa Latência)",
      "Microsserviços & Monorepos (PNPM)",
      "AWS S3 / MinIO (Object Storage)",
      "Serverless Functions (Vercel)",
      "Integração Financeira & PIX (Asaas API)"
    ],
  },
  {
    title: "Bancos de Dados & DevOps",
    iconName: "database",
    accentColor: "rgba(245, 158, 11, 0.15)",
    skills: [
      "PostgreSQL & Supabase (RLS)",
      "MongoDB & Mongoose (NoSQL)",
      "Firebase Firestore & Auth",
      "Docker & Docker Compose",
      "Git & GitHub (Versionamento Ágil)",
      "CI/CD Pipelines",
      "Linux & Shell Scripting",
      "Entity Framework Core"
    ],
  },
  {
    title: "Engenharia & Práticas de Software",
    iconName: "shield",
    accentColor: "rgba(244, 63, 94, 0.15)",
    skills: [
      "Arquitetura Limpa & Clean Code",
      "Princípios SOLID & DRY",
      "Segurança (JWT, OAuth, RLS, Zero-Copy)",
      "Metodologias Ágeis (Scrum / Kanban)",
      "Testes Automatizados (Jest, Supertest)",
      "Inglês (Intermediário — CIL)",
      "Espanhol (Avançado/Fluente — CIL 440h)"
    ],
  },
];
