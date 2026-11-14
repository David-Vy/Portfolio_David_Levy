// src/app/projects/[slug]/page.tsx

import { projectsData } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectPageClient from "./ProjectPageClient";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Geração estática dos 8 slugs em tempo de build (SSG)
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// Metadados dinâmicos para SEO e abas do navegador
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projeto Não Encontrado | David Levy",
    };
  }

  return {
    title: `${project.title} — ${project.category} | David Levy`,
    description: project.description,
    openGraph: {
      title: `${project.title} | David Levy - Engenharia de Software`,
      description: project.description,
      type: "article",
      images: project.imageUrl ? [{ url: project.imageUrl }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectPageClient project={project} />;
}
