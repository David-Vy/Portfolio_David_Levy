/**
 * tests/e2e/tier4-acceptance-scenarios.test.js
 * Tier 4: Real-World Application Scenarios (6 tests)
 * 
 * Comprehensive end-to-end audit scenarios:
 * 1. Tech Recruiter / Hiring Manager Comprehensive Audit (F5, F6, F7)
 * 2. Production Build & Static Site Generation (SSG) Validation (F1, F3, F4, F5)
 * 3. Project Deep-Dive Navigation & Integrity (F1, F3, F4, F5)
 * 4. Editorial Visual Layout Scannability & Card Eradication (F1, F2)
 * 5. Media & Interactive Wireframe Fallback Resilience (F3, F4)
 * 6. Global Strict Zero Game Dev Regex Sweep (F6)
 */

const { setTier, describe, test, expect, helpers } = require('./runner');
const path = require('path');

setTier('tier4');

describe('Tier 4: Real-World Acceptance Scenarios', () => {
  test('Scenario 1: Tech Recruiter / Hiring Manager Comprehensive Audit (F5, F6, F7)', () => {
    // 1. Verify professional title and SE positioning
    const heroContent = helpers.readFile('src/app/HomePageClient.tsx');
    expect(heroContent).toMatch(/Engenharia de Software|Engenheiro de Software|Desenvolvedor Full-Stack/i);

    // 2. Verify authentic curriculum credentials in AboutSection.tsx
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    
    // Degree: Anhanguera Bachelor (2030)
    expect(aboutContent).toMatch(/Anhanguera/i);
    expect(aboutContent).toMatch(/Engenharia de Software/i);
    expect(aboutContent).toMatch(/2030/);

    // Technical Qualification: ETSM (1200h, 2024-2025)
    expect(aboutContent).toMatch(/ETSM|Escola Técnica de Santa Maria/i);
    expect(aboutContent).toMatch(/1[.\s]?200\s*h/i);

    // Certification: SENAI Programador Full-Stack (670h)
    expect(aboutContent).toMatch(/SENAI/i);
    expect(aboutContent).toMatch(/670\s*h/i);

    // Languages: Portuguese, Spanish CIL 440h, English CIL 2026
    expect(aboutContent).toMatch(/Português/i);
    expect(aboutContent).toMatch(/Espanhol/i);
    expect(aboutContent).toMatch(/440\s*h/i);
    expect(aboutContent).toMatch(/Inglês/i);

    // 3. Verify Flagship SE projects in catalog
    const projects = helpers.getProjectsData();
    const slugs = projects.map(p => p.slug);
    expect(slugs).toContain('lymadhouse');
    expect(slugs).toContain('lycloud-server');
    expect(slugs).toContain('lyvia');
  });

  test('Scenario 2: Production Build & Static Site Generation (SSG) Validation (F1, F3, F4, F5)', async () => {
    // Run npm run build and verify exit code 0
    console.log('    [Executing npm run build - please wait...]');
    const result = helpers.runCommand('npm run build', 120000);

    if (result.status !== 0) {
      console.log('    Build output stdout:\n', result.stdout.slice(-1000));
      console.log('    Build output stderr:\n', result.stderr.slice(-1000));
    }

    expect(result.status).toBe(0);

    // Verify .next directory and SSG output exists
    expect(helpers.directoryExists('.next')).toBe(true);
  });

  test('Scenario 3: Project Deep-Dive Navigation & Detail View Integrity (F1, F3, F4, F5)', () => {
    // Verify static params generator and detail page architecture
    expect(helpers.fileExists('src/app/projects/[slug]/page.tsx')).toBe(true);
    const pageContent = helpers.readFile('src/app/projects/[slug]/page.tsx');
    expect(pageContent).toContain('generateStaticParams');

    // Verify all projects have valid slugs and technical depth
    const projects = helpers.getProjectsData();
    for (const project of projects) {
      expect(typeof project.slug).toBe('string');
      expect(project.slug.length).toBeGreaterThan(2);
      expect(typeof project.title).toBe('string');
      expect(project.title.length).toBeGreaterThan(2);
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThanOrEqual(1);
    }
  });

  test('Scenario 4: Editorial Visual Layout Scannability & Card Eradication (F1, F2)', () => {
    // Verify complete eradication of DepthCard from ProjectsSection
    const projectsSection = helpers.readFile('src/components/ProjectsSection.tsx');
    expect(projectsSection).not.toMatch(/DepthCard/);

    // Verify open row layout component exists and is referenced
    expect(projectsSection).toMatch(/ProjectEditorialRow|EditorialProjectRow|EditorialRow/);
  });

  test('Scenario 5: Media & Interactive Wireframe Fallback Resilience (F3, F4)', () => {
    const projects = helpers.getProjectsData();

    // Every project must either have valid image asset(s) or an interactive mockup
    for (const project of projects) {
      const hasImages = (typeof project.imageUrl === 'string' && project.imageUrl.length > 0) ||
                        (Array.isArray(project.images) && project.images.length > 0);
      const hasMockup = Boolean(project.mockupType || project.hasInteractiveMockup);

      expect(hasImages || hasMockup).toBe(true);
    }
  });

  test('Scenario 6: Global Strict Zero Game Dev Regex Sweep (F6)', () => {
    // Sweep entire src/ directory for forbidden game dev terms
    const forbiddenPatterns = [
      { name: 'standalone game/games', regex: /\b(?:game|games|jogos?)\b/i },
      { name: 'gameplay', regex: /gameplay/i },
      { name: 'unity', regex: /\bunity\b/i },
      { name: 'chronomage', regex: /chronomage/i },
      { name: 'rpg', regex: /\brpg\b/i },
      { name: 'gamepad icon', regex: /Gamepad2?/ },
      { name: 'blender', regex: /\bblender\b/i },
      { name: 'lua', regex: /\blua\b/i },
    ];

    const violations = [];

    const srcFiles = helpers.listFiles('src', true).filter(f => 
      /\.(?:tsx?|jsx?|css)$/.test(f)
    );

    for (const file of srcFiles) {
      const content = helpers.readFile(file);
      for (const { name, regex } of forbiddenPatterns) {
        if (regex.test(content)) {
          violations.push({ file, pattern: name });
        }
      }
    }

    if (violations.length > 0) {
      const summary = violations.map(v => `${v.file} (matched ${v.pattern})`).join(', ');
      throw new Error(`Strict Zero Game Dev violations detected in ${violations.length} instances: ${summary}`);
    }

    expect(violations.length).toBe(0);
  });
});
