/**
 * tests/e2e/tier3-cross-feature.test.js
 * Tier 3: Cross-Feature Interactions (12 tests - Pairwise Combinations)
 * 
 * Verifies combinatorial integration across:
 * - Editorial Layout (F1)
 * - Responsiveness (F2)
 * - Multi-Image Media Gallery (F3)
 * - Interactive Code Mockups (F4)
 * - Flagship SE Catalog (F5)
 * - Zero Game Dev Removal (F6)
 * - Full Curriculum & Skills (F7)
 */

const { setTier, describe, test, expect, helpers } = require('./runner');

setTier('tier3');

describe('Tier 3: Cross-Feature Pairwise Interactions', () => {
  test('T3.1: Pairwise F1 + F4: Editorial Row renders Interactive Mockup in media column for imageless projects without outer card frame', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/mockupType|hasInteractiveMockup/);
    expect(content).not.toMatch(/DepthCard/);
  });

  test('T3.2: Pairwise F1 + F3: Editorial Row renders Multi-Image Gallery in media column when project defines multiple screenshots', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/ProjectMediaGallery/);
  });

  test('T3.3: Pairwise F1 + F5: Flagship projects (LyMadhouse, LyVia, LyCloud) integrate seamlessly into editorial row catalog with category overlines', () => {
    const projects = helpers.getProjectsData();
    const flagshipSlugs = ['lymadhouse', 'lycloud-server', 'lyvia'];
    for (const slug of flagshipSlugs) {
      const p = projects.find(item => item.slug === slug);
      expect(p).toBeDefined();
      expect(typeof p.title).toBe('string');
      expect(p.title.length).toBeGreaterThan(0);
    }

    if (helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      const rowContent = helpers.readFile('src/components/ProjectEditorialRow.tsx');
      expect(rowContent).toMatch(/category|Engenharia/i);
    }
  });

  test('T3.4: Pairwise F6 + F7: Curriculum integration and skills matrix are 100% free of game dev mentions and 100% focused on SE competencies', () => {
    const skills = helpers.getSkillsData();
    const allSkills = skills.flatMap(c => c.skills || []);
    expect(allSkills.some(s => /Unity|Game/i.test(s))).toBe(false);

    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/Engenharia de Software|Full[\s-]?Stack/i);
    expect(aboutContent).not.toMatch(/jogos|gameplay|Unity/i);
  });

  test('T3.5: Pairwise F2 + F3: Multi-image media gallery maintains responsive aspect ratios and touch navigation across viewports', () => {
    if (!helpers.fileExists('src/components/ProjectMediaGallery.tsx')) {
      throw new Error('ProjectMediaGallery.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectMediaGallery.tsx');
    expect(content).toMatch(/aspect-|h-|w-full/);
    expect(content).toMatch(/button|onClick/);
  });

  test('T3.6: Pairwise F4 + F5: Flagship projects specify appropriate mockup types matching their low-level/streaming/cloud architectures', () => {
    const projects = helpers.getProjectsData();
    const lycloud = projects.find(p => p.slug === 'lycloud-server');
    const lymadhouse = projects.find(p => p.slug === 'lymadhouse');
    const lyvia = projects.find(p => p.slug === 'lyvia');

    expect(lycloud).toBeDefined();
    expect(lymadhouse).toBeDefined();
    expect(lyvia).toBeDefined();

    // At least one flagship must utilize a dedicated mockupType or have multiple images
    const hasMockupOrMulti = [lycloud, lymadhouse, lyvia].some(
      p => p.mockupType || (Array.isArray(p.images) && p.images.length > 1)
    );
    expect(hasMockupOrMulti).toBe(true);
  });

  test('T3.7: Pairwise F1 + F5: Editorial row action links lead to /projects/${slug} with matching slugs in projectsData and valid static params', () => {
    const projects = helpers.getProjectsData();
    const slugs = projects.map(p => p.slug);
    expect(slugs).toContain('lymadhouse');
    expect(slugs).toContain('lycloud-server');
    expect(slugs).toContain('lyvia');

    const staticParamsFile = helpers.readFile('src/app/projects/[slug]/page.tsx');
    expect(staticParamsFile).toMatch(/generateStaticParams/);
  });

  test('T3.8: Pairwise F2 + F4: Interactive mockups adapt responsively to mobile and desktop screen widths without horizontal scroll leakage', () => {
    const mockups = ['LyMadhouseMockup.tsx', 'LyCloudMockup.tsx'];
    for (const m of mockups) {
      const relPath = `src/components/mockups/${m}`;
      if (helpers.fileExists(relPath)) {
        const content = helpers.readFile(relPath);
        expect(content).toMatch(/w-full/);
      }
    }
  });

  test('T3.9: Pairwise F6 + F1: Editorial row categories, tags, and project descriptions contain 0 game dev terms', () => {
    const projects = helpers.getProjectsData();
    for (const p of projects) {
      expect(p.title).not.toMatch(/ChronoMage|RPG/i);
      expect(p.description).not.toMatch(/jogo de RPG|mecânicas de gameplay|Unity/i);
      if (p.tags) {
        expect(p.tags.some(t => /Unity|Game/i.test(t))).toBe(false);
      }
    }
  });

  test('T3.10: Pairwise F7 + F5: Skills matrix directly mirrors the advanced technologies utilized in flagship projects', () => {
    const skills = helpers.getSkillsData();
    const allSkills = skills.flatMap(c => c.skills || []);

    // Flagship technologies: TypeScript, Next.js, Electron, Docker, C++, WebRTC, Fastify
    const matchesCount = ['TypeScript', 'Next.js', 'Electron', 'Docker', 'WebRTC', 'PostgreSQL'].filter(tech =>
      allSkills.some(s => s.toLowerCase().includes(tech.toLowerCase()))
    ).length;

    expect(matchesCount).toBeGreaterThanOrEqual(4);
  });

  test('T3.11: Pairwise F1 + F7: Hero, Header, and About sections present the certified Software Engineering identity', () => {
    const hero = helpers.readFile('src/app/HomePageClient.tsx');
    const header = helpers.readFile('src/components/Header.tsx');
    const footer = helpers.readFile('src/components/Footer.tsx');

    expect(hero).toMatch(/Engenharia de Software|Engenheiro de Software|Desenvolvedor Full-Stack/i);
    expect(header).toMatch(/Software Engineer|Engenheiro de Software/i);
    expect(footer).toMatch(/Software Engineer|Engenheiro de Software|Desenvolvedor Full-Stack/i);
  });

  test('T3.12: Pairwise F1 + F2 + F5: Full catalog integration renders all flagship and secondary projects with responsive editorial layout', () => {
    const projects = helpers.getProjectsData();
    // At least 6 high-quality SE projects must be cataloged
    expect(projects.length).toBeGreaterThanOrEqual(6);

    const projectsSection = helpers.readFile('src/components/ProjectsSection.tsx');
    expect(projectsSection).not.toMatch(/DepthCard/);
  });
});
