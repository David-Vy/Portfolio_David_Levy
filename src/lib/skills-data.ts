// src/lib/skills-data.ts

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Linguagens de Programação",
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
