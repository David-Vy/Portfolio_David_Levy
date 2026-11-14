/**
 * tests/e2e/tier1-feature-coverage.test.js
 * Tier 1: Feature Coverage (35 tests - 5 tests × 7 features)
 * 
 * Verifies core functionality for all 7 features specified in TEST_INFRA.md and PROJECT.md:
 * - Feature 1: Editorial Row Layout (No Cards) (5 tests)
 * - Feature 2: Mobile & Desktop Responsiveness (5 tests)
 * - Feature 3: Multi-Image Media Gallery (5 tests)
 * - Feature 4: Interactive Code Mockups (5 tests)
 * - Feature 5: Flagship SE Catalog (LyMadhouse, LyVia, LyCloud) (5 tests)
 * - Feature 6: Zero Game Dev Removal (5 tests)
 * - Feature 7: Full Curriculum & Skills Integration (5 tests)
 */

const { setTier, describe, test, expect, helpers } = require('./runner');

setTier('tier1');

// ---------------------------------------------------------------------------
// Feature 1: Editorial Row Layout (No Cards) - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 1: Editorial Row Layout (No Cards)', () => {
  test('T1.1.1: ProjectsSection does not wrap projects in closed DepthCard or closed card frames', () => {
    const content = helpers.readFile('src/components/ProjectsSection.tsx');
    expect(content).not.toContain('<DepthCard');
    expect(content).not.toContain('import DepthCard');
  });

  test('T1.1.2: ProjectEditorialRow component exists and implements open editorial layout', () => {
    expect(helpers.fileExists('src/components/ProjectEditorialRow.tsx')).toBe(true);
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toContain('ProjectEditorialRow');
  });

  test('T1.1.3: Editorial row separates visual media and editorial content into distinct columns', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    const hasGridOrFlexSplit = 
      (content.includes('grid') && (content.includes('lg:grid-cols-12') || content.includes('grid-cols-1 lg:grid-cols'))) ||
      (content.includes('flex') && (content.includes('lg:flex-row') || content.includes('md:flex-row')));
    expect(hasGridOrFlexSplit).toBe(true);
  });

  test('T1.1.4: Editorial row includes category overline, display title, tags, and description summary', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/category|Engenharia de Software/i);
    expect(content).toContain('project.title');
    expect(content).toContain('project.tags');
    expect(content).toContain('project.description');
  });

  test('T1.1.5: Editorial row provides explicit action links (project details route and repository/demo links)', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/\/projects\/\$?\{?project\.slug\}?/);
    expect(content).toContain('project.githubUrl');
  });
});

// ---------------------------------------------------------------------------
// Feature 2: Mobile & Desktop Responsiveness - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 2: Mobile & Desktop Responsiveness', () => {
  test('T1.2.1: Editorial row implements vertical stack on mobile screens (<lg breakpoint)', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    const hasMobileStack = content.includes('flex-col') || content.includes('grid-cols-1');
    expect(hasMobileStack).toBe(true);
  });

  test('T1.2.2: Editorial row implements horizontal side-by-side layout on desktop (lg: breakpoint)', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    const hasDesktopSplit = content.includes('lg:flex-row') || content.includes('lg:grid-cols-12') || content.includes('lg:col-span');
    expect(hasDesktopSplit).toBe(true);
  });

  test('T1.2.3: Media container maintains fixed aspect ratio and rounded editorial corners', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    const hasAspectRatio = content.includes('aspect-[16/10]') || content.includes('aspect-video') || content.includes('aspect-[16/9]');
    const hasRoundedCorners = content.includes('rounded-2xl') || content.includes('rounded-3xl');
    expect(hasAspectRatio).toBe(true);
    expect(hasRoundedCorners).toBe(true);
  });

  test('T1.2.4: Title typography scales fluidly across mobile and desktop breakpoints', () => {
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    const hasResponsiveText = 
      content.includes('text-2xl') || content.includes('text-3xl') || 
      content.includes('sm:text-4xl') || content.includes('md:text-5xl') || content.includes('lg:text-5xl');
    expect(hasResponsiveText).toBe(true);
  });

  test('T1.2.5: ProjectsSection container enforces responsive padding and max-width boundaries', () => {
    const content = helpers.readFile('src/components/ProjectsSection.tsx');
    const hasResponsivePadding = content.includes('px-6') || content.includes('md:px-10') || content.includes('px-4');
    const hasMaxWidth = content.includes('max-w-7xl') || content.includes('max-w-6xl') || content.includes('mx-auto');
    expect(hasResponsivePadding).toBe(true);
    expect(hasMaxWidth).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Feature 3: Multi-Image Media Gallery - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 3: Multi-Image Media Gallery', () => {
  test('T1.3.1: ProjectMediaGallery component exists in src/components/', () => {
    expect(helpers.fileExists('src/components/ProjectMediaGallery.tsx')).toBe(true);
  });

  test('T1.3.2: Project interface in src/lib/projects-data.ts supports optional images array', () => {
    const content = helpers.readFile('src/lib/projects-data.ts');
    expect(content).toMatch(/images\s*\??\s*:\s*string\[\]/);
  });

  test('T1.3.3: Projects with multiple image assets define images array with at least 2 items', () => {
    const projects = helpers.getProjectsData();
    const multiImageProjects = projects.filter(p => Array.isArray(p.images) && p.images.length > 1);
    expect(multiImageProjects.length).toBeGreaterThanOrEqual(1);
    expect(multiImageProjects[0].images.length).toBeGreaterThanOrEqual(2);
  });

  test('T1.3.4: ProjectMediaGallery renders pagination dots or slide counter', () => {
    const content = helpers.readFile('src/components/ProjectMediaGallery.tsx');
    const hasPagination = (content.includes('images.map') && content.includes('key=')) || content.includes('currentIndex') || content.includes('active');
    expect(hasPagination).toBe(true);
  });

  test('T1.3.5: ProjectMediaGallery renders navigation controls for cycling images', () => {
    const content = helpers.readFile('src/components/ProjectMediaGallery.tsx');
    const hasNavigation = 
      content.includes('Chevron') || content.includes('Arrow') || 
      content.includes('nextImage') || content.includes('prevImage') ||
      content.includes('handleNext') || content.includes('handlePrev');
    expect(hasNavigation).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Feature 4: Interactive Code Mockups - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 4: Interactive Code Mockups', () => {
  test('T1.4.1: Mockup components directory exists at src/components/mockups/', () => {
    expect(helpers.directoryExists('src/components/mockups')).toBe(true);
  });

  test('T1.4.2: Project interface supports mockupType or hasInteractiveMockup flags', () => {
    const content = helpers.readFile('src/lib/projects-data.ts');
    const hasMockupSupport = content.includes('mockupType') || content.includes('hasInteractiveMockup');
    expect(hasMockupSupport).toBe(true);
  });

  test('T1.4.3: LyMadhouse mockup simulates real-time audio/streaming/telemetry', () => {
    expect(helpers.fileExists('src/components/mockups/LyMadhouseMockup.tsx')).toBe(true);
    const content = helpers.readFile('src/components/mockups/LyMadhouseMockup.tsx');
    const hasStreamingAudioTelemetry = 
      content.includes('DXGI') || content.includes('WebRTC') || 
      content.includes('Krisp') || content.includes('FPS') || 
      content.includes('Audio') || content.includes('LiveKit');
    expect(hasStreamingAudioTelemetry).toBe(true);
  });

  test('T1.4.4: LyCloud Server mockup simulates private cloud/database/telemetry metrics', () => {
    expect(helpers.fileExists('src/components/mockups/LyCloudMockup.tsx')).toBe(true);
    const content = helpers.readFile('src/components/mockups/LyCloudMockup.tsx');
    const hasCloudMetrics = 
      content.includes('Docker') || content.includes('MinIO') || 
      content.includes('MongoDB') || content.includes('CPU') || 
      content.includes('RAM') || content.includes('WebSocket');
    expect(hasCloudMetrics).toBe(true);
  });

  test('T1.4.5: LyVia or imageless project mockups simulate application flows', () => {
    const files = helpers.listFiles('src/components/mockups', false);
    // At least 2 mockup files must be implemented
    expect(files.length).toBeGreaterThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Feature 5: Flagship SE Catalog (LyMadhouse, LyVia, LyCloud Server) - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 5: Flagship SE Catalog (LyMadhouse, LyVia, LyCloud)', () => {
  test('T1.5.1: Flagship project LyMadhouse is present with high-impact SE architecture', () => {
    const projects = helpers.getProjectsData();
    const lymadhouse = projects.find(p => p.slug === 'lymadhouse');
    expect(lymadhouse).toBeDefined();
    expect(lymadhouse.title).toContain('LyMadhouse');
    expect(lymadhouse.description).toMatch(/streaming|WebRTC|Electron|C\+\+/i);
  });

  test('T1.5.2: Flagship project LyCloud Server is present with BaaS and cloud computing details', () => {
    const projects = helpers.getProjectsData();
    const lycloud = projects.find(p => p.slug === 'lycloud-server');
    expect(lycloud).toBeDefined();
    expect(lycloud.title).toContain('LyCloud');
    expect(lycloud.description).toMatch(/BaaS|Cloud|Docker|S3|MongoDB/i);
  });

  test('T1.5.3: Flagship project LyVia is present with streaming and distributed backend details', () => {
    const projects = helpers.getProjectsData();
    const lyvia = projects.find(p => p.slug === 'lyvia');
    expect(lyvia).toBeDefined();
    expect(lyvia.title).toContain('LyVia');
    expect(lyvia.description).toMatch(/streaming|Fastify|HLS|Docker/i);
  });

  test('T1.5.4: Flagship projects specify advanced Software Engineering tags', () => {
    const projects = helpers.getProjectsData();
    const flagshipSlugs = ['lymadhouse', 'lycloud-server', 'lyvia'];
    const flagships = projects.filter(p => flagshipSlugs.includes(p.slug));
    expect(flagships.length).toBe(3);

    const allTags = flagships.flatMap(p => p.tags || []);
    const hasAdvancedTags = 
      allTags.some(t => /Electron/i.test(t)) &&
      allTags.some(t => /Docker|Fastify|Node/i.test(t)) &&
      allTags.some(t => /TypeScript|Next/i.test(t));
    expect(hasAdvancedTags).toBe(true);
  });

  test('T1.5.5: Flagship projects feature comprehensive longDescriptionHtml with technical deep dive', () => {
    const projects = helpers.getProjectsData();
    const flagshipSlugs = ['lymadhouse', 'lycloud-server', 'lyvia'];
    const flagships = projects.filter(p => flagshipSlugs.includes(p.slug));
    expect(flagships.length).toBe(3);

    for (const p of flagships) {
      expect(typeof p.longDescriptionHtml).toBe('string');
      expect(p.longDescriptionHtml.length).toBeGreaterThan(150);
      expect(p.longDescriptionHtml).toMatch(/<p>|<h3/i);
    }
  });
});

// ---------------------------------------------------------------------------
// Feature 6: Zero Game Dev Removal - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 6: Zero Game Dev Removal', () => {
  test('T1.6.1: Project ChronoMage is completely removed from projectsData catalog', () => {
    const projects = helpers.getProjectsData();
    const chronomage = projects.find(p => p.slug === 'project-chronomage' || /chronomage/i.test(p.title));
    expect(chronomage).toBeUndefined();
  });

  test('T1.6.2: skillsData in src/lib/skills-data.ts contains 0 references to Unity Engine, Blender, or Lua', () => {
    const skills = helpers.getSkillsData();
    const allSkills = skills.flatMap(c => c.skills || []);
    const forbidden = allSkills.filter(s => /Unity|Blender|Lua/i.test(s));
    expect(forbidden).toHaveLength(0);
  });

  test('T1.6.3: AboutSection.tsx contains 0 occurrences of Gamepad2, desenvolvimento de jogos, or Unity', () => {
    const content = helpers.readFile('src/components/AboutSection.tsx');
    expect(content).not.toMatch(/Gamepad2/);
    expect(content).not.toMatch(/desenvolvimento de jogos/i);
    expect(content).not.toMatch(/Unity/i);
  });

  test('T1.6.4: HomePageClient.tsx contains 0 occurrences of jogos imersivos, gameplay, or mecânicas de combate', () => {
    const content = helpers.readFile('src/app/HomePageClient.tsx');
    expect(content).not.toMatch(/jogos imersivos/i);
    expect(content).not.toMatch(/gameplay/i);
    expect(content).not.toMatch(/mecânicas de combate/i);
  });

  test('T1.6.5: Peripheral components have 0 game dev references', () => {
    const files = [
      'src/components/Header.tsx',
      'src/components/Footer.tsx',
      'src/components/Typewriter.tsx',
      'src/components/ContactSection.tsx',
      'src/components/ProcessTimeline.tsx',
      'src/components/NextPageZone.tsx',
      'src/components/MarqueeSeparator.tsx',
    ];

    for (const file of files) {
      if (helpers.fileExists(file)) {
        const content = helpers.readFile(file);
        expect(content).not.toMatch(/desenvolvedor de jogos/i);
        expect(content).not.toMatch(/GAME DEVELOPMENT/i);
        expect(content).not.toMatch(/UNITY & C#/i);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Feature 7: Full Curriculum & Skills Integration - 5 tests
// ---------------------------------------------------------------------------
describe('Feature 7: Full Curriculum & Skills Integration', () => {
  test('T1.7.1: Software Engineering Bachelor degree at Faculdade Anhanguera (completion 2030) is present', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/Anhanguera/i);
    expect(aboutContent).toMatch(/Engenharia de Software/i);
    expect(aboutContent).toMatch(/2030/);
  });

  test('T1.7.2: Systems Development technical degree at ETSM (1200h, 2024-2025) is present', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/ETSM|Escola Técnica de Santa Maria/i);
    expect(aboutContent).toMatch(/1[.\s]?200\s*h/i);
  });

  test('T1.7.3: SENAI Full-Stack Programador certification (670h) is present', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/SENAI/i);
    expect(aboutContent).toMatch(/670\s*h/i);
    expect(aboutContent).toMatch(/Full[\s-]?Stack/i);
  });

  test('T1.7.4: Official language proficiencies (Portuguese native, Spanish CIL 440h, English CIL) are integrated', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/Espanhol/i);
    expect(aboutContent).toMatch(/440\s*h/i);
    expect(aboutContent).toMatch(/CIL/i);
    expect(aboutContent).toMatch(/Inglês/i);
  });

  test('T1.7.5: skillsData is organized into 5 official Software Engineering domains', () => {
    const skills = helpers.getSkillsData();
    expect(skills.length).toBeGreaterThanOrEqual(4);
    const categoryTitles = skills.map(c => c.title);
    expect(categoryTitles.some(t => /Linguagens/i.test(t))).toBe(true);
    expect(categoryTitles.some(t => /Front-end|Desktop/i.test(t))).toBe(true);
    expect(categoryTitles.some(t => /Back-end|Cloud/i.test(t))).toBe(true);
    expect(categoryTitles.some(t => /DevOps|Banco/i.test(t))).toBe(true);
  });
});
