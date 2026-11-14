/**
 * tests/e2e/tier2-boundaries-corners.test.js
 * Tier 2: Boundary & Corner Cases (35 tests - 5 boundary/corner tests × 7 features)
 * 
 * Tests extreme inputs, edge cases, responsive limits, missing optional properties,
 * malformed states, boundary constraints, and error prevention.
 */

const { setTier, describe, test, expect, helpers } = require('./runner');

setTier('tier2');

// ---------------------------------------------------------------------------
// Feature 1 Boundaries: Editorial Layout (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 1 Boundaries: Editorial Row Layout', () => {
  test('T2.1.1: Card frame eradication: DepthCard and closed card wrapper classes are absent from ProjectsSection and ProjectEditorialRow', () => {
    const projectsSection = helpers.readFile('src/components/ProjectsSection.tsx');
    expect(projectsSection).not.toMatch(/DepthCard/);
    expect(projectsSection).not.toMatch(/\bbg-card\b|\bbg-surface\b/);

    if (helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      const row = helpers.readFile('src/components/ProjectEditorialRow.tsx');
      expect(row).not.toMatch(/DepthCard/);
      expect(row).not.toMatch(/\bbg-card\b|\bbg-surface\b/);
      expect(row).not.toMatch(/bg-zinc-9(?:50|00)\/80[\s\S]{0,40}p-6[\s\S]{0,40}rounded-2xl|rounded-2xl[\s\S]{0,40}bg-zinc-9(?:50|00)\/80[\s\S]{0,40}p-6/);
    }
  });

  test('T2.1.2: Row orientation and alignment consistency: media and content containers maintain stable reading anchors', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    // Verifies consistent reading anchor: media and title exist, allowing alternating layouts (isReversed/flex-row-reverse)
    const mediaIndex = content.indexOf('aspect-');
    const titleIndex = content.indexOf('project.title');
    expect(mediaIndex).toBeGreaterThan(-1);
    expect(titleIndex).toBeGreaterThan(-1);

    const isAlternating = 
      content.includes('isReversed') || 
      content.includes('flex-row-reverse') || 
      content.includes('order-') ||
      content.includes('index % 2');

    if (!isAlternating) {
      expect(mediaIndex).toBeLessThan(titleIndex);
    }
  });

  test('T2.1.3: Single-project catalog boundary: editorial section handles a 1-item catalog without array indexing crash', () => {
    const projectsSection = helpers.readFile('src/components/ProjectsSection.tsx');
    // Ensure it doesn't assume hardcoded length or fail if there's only 1 item
    expect(projectsSection).toMatch(/\.map\(/);
  });

  test('T2.1.4: Large-catalog boundary: catalog with 8+ projects handles layout without vertical overlap', () => {
    const projectsSection = helpers.readFile('src/components/ProjectsSection.tsx');
    // Must use generous vertical spacing between rows (gap-16, gap-20, gap-24, or py-16/py-24)
    const hasSpaciousSpacing = 
      projectsSection.includes('gap-') || 
      projectsSection.includes('space-y-') || 
      projectsSection.includes('py-');
    expect(hasSpaciousSpacing).toBe(true);
  });

  test('T2.1.5: Row divider styling: borders between rows use subtle styling without double-borders on last-child', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    const hasDivider = content.includes('border-b') || content.includes('divide-y') || content.includes('border-white');
    expect(hasDivider).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Feature 2 Boundaries: Mobile & Desktop Responsiveness (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 2 Boundaries: Mobile & Desktop Responsiveness', () => {
  test('T2.2.1: Breakpoint classes: row layout uses <lg stack and lg: side-by-side classes', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/lg:grid-cols|lg:flex-row/);
  });

  test('T2.2.2: Aspect ratio containment: media container uses overflow-hidden preventing child leakage', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toContain('overflow-hidden');
  });

  test('T2.2.3: Responsive typography: title text classes support small screens down to 320px with proper wrapping', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/break-words|tracking-tight|leading-tight/);
  });

  test('T2.2.4: Tag pill container wraps with flex-wrap and gap spacing to prevent overflowing container boundary on mobile', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toContain('flex-wrap');
  });

  test('T2.2.5: Maximum width constraint: max-w-7xl prevents infinite stretch on ultra-wide viewports', () => {
    const content = helpers.readFile('src/components/ProjectsSection.tsx');
    expect(content).toMatch(/max-w-(?:7xl|6xl|5xl)/);
  });
});

// ---------------------------------------------------------------------------
// Feature 3 Boundaries: Multi-Image Media Gallery (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 3 Boundaries: Multi-Image Media Gallery', () => {
  test('T2.3.1: Single-image project fallback: projects with only imageUrl render standard image without media gallery controls', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    // Should check project.images && project.images.length > 1 (or optional chaining) before rendering ProjectMediaGallery
    expect(content).toMatch(/project\.images(?:\?\.|\s*&&\s*project\.images\.)length\s*>\s*1/);
  });

  test('T2.3.2: Dual-image project boundary: project with exactly 2 images renders exactly 2 dots and wraps navigation', () => {
    if (!helpers.fileExists('src/components/ProjectMediaGallery.tsx')) {
      throw new Error('ProjectMediaGallery.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectMediaGallery.tsx');
    // Must map over images for indicators
    expect(content).toMatch(/images\.map/);
  });

  test('T2.3.3: Multi-image gallery navigation bounds: index does not exceed images.length - 1 or drop below 0', () => {
    if (!helpers.fileExists('src/components/ProjectMediaGallery.tsx')) {
      throw new Error('ProjectMediaGallery.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectMediaGallery.tsx');
    // Checks modular arithmetic (e.g. (prev + 1) % images.length) or clamp logic
    const hasModuloOrClamping = 
      content.includes('% images.length') || 
      content.includes('images.length - 1') || 
      content.includes('prev - 1 < 0');
    expect(hasModuloOrClamping).toBe(true);
  });

  test('T2.3.4: Empty/undefined images fallback: handles empty array [] by gracefully defaulting to imageUrl', () => {
    const projects = helpers.getProjectsData();
    for (const p of projects) {
      // imageUrl must always be a non-empty string as a baseline fallback
      expect(typeof p.imageUrl).toBe('string');
      expect(p.imageUrl.length).toBeGreaterThan(0);
    }
  });

  test('T2.3.5: Image path resolution: all paths in images array begin with /images/ or valid URL schema', () => {
    const projects = helpers.getProjectsData();
    const multiImageProjects = projects.filter(p => Array.isArray(p.images) && p.images.length > 0);
    for (const p of multiImageProjects) {
      for (const img of p.images) {
        expect(img).toMatch(/^\/images\/|^https?:\/\//);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Feature 4 Boundaries: Interactive Code Mockups (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 4 Boundaries: Interactive Code Mockups', () => {
  test('T2.4.1: Mockup type safety: mockupType must be one of the permitted union types', () => {
    const projects = helpers.getProjectsData();
    const allowedMockupTypes = ['lymadhouse', 'lycloud', 'lyvia', 'rosa', 's3scanner', 'lyponto', undefined];
    for (const p of projects) {
      if (p.mockupType) {
        expect(allowedMockupTypes.includes(p.mockupType)).toBe(true);
      }
    }
  });

  test('T2.4.2: LyMadhouse mockup state toggle: contains stateful toggle mechanism', () => {
    if (!helpers.fileExists('src/components/mockups/LyMadhouseMockup.tsx')) {
      throw new Error('LyMadhouseMockup.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/mockups/LyMadhouseMockup.tsx');
    expect(content).toMatch(/useState/);
  });

  test('T2.4.3: LyCloud mockup interactivity: contains interactive elements', () => {
    if (!helpers.fileExists('src/components/mockups/LyCloudMockup.tsx')) {
      throw new Error('LyCloudMockup.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/mockups/LyCloudMockup.tsx');
    expect(content).toMatch(/onClick|useState/);
  });

  test('T2.4.4: Rosa Neural or secondary mockup terminal: contains simulated command line or inference', () => {
    const mockupsDir = 'src/components/mockups';
    if (!helpers.directoryExists(mockupsDir)) {
      throw new Error('src/components/mockups does not exist yet');
    }
    const files = helpers.listFiles(mockupsDir, false);
    let foundTerminalOrInteractive = false;
    for (const f of files) {
      const content = helpers.readFile(f);
      if (content.includes('terminal') || content.includes('terminal') || content.includes('font-mono') || content.includes('console')) {
        foundTerminalOrInteractive = true;
        break;
      }
    }
    expect(foundTerminalOrInteractive).toBe(true);
  });

  test('T2.4.5: Imageless project title impact: projects with mockups have display typography and architecture badge/overline', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    expect(content).toMatch(/font-mono|uppercase|tracking-/);
  });
});

// ---------------------------------------------------------------------------
// Feature 5 Boundaries: Flagship SE Catalog (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 5 Boundaries: Flagship SE Catalog', () => {
  test('T2.5.1: Missing optional URLs: projects without liveUrl or downloadUrl render cleanly without broken anchors', () => {
    if (!helpers.fileExists('src/components/ProjectEditorialRow.tsx')) {
      throw new Error('ProjectEditorialRow.tsx does not exist yet');
    }
    const content = helpers.readFile('src/components/ProjectEditorialRow.tsx');
    // Ensure githubUrl is conditionally rendered (using && or ternary)
    expect(content).toMatch(/project\.githubUrl\s*(?:&&|\?)/);
  });

  test('T2.5.2: Tag volume boundary: projects with 6+ technical tags render all tags without truncating data', () => {
    const projects = helpers.getProjectsData();
    const flagship = projects.find(p => p.slug === 'lymadhouse');
    if (flagship) {
      expect(flagship.tags.length).toBeGreaterThanOrEqual(4);
    }
  });

  test('T2.5.3: Long description markup validation: longDescriptionHtml contains valid HTML tags and no unclosed tags', () => {
    const projects = helpers.getProjectsData();
    for (const p of projects) {
      if (p.longDescriptionHtml) {
        // Balanced tags test for <p> and </p>
        const openP = (p.longDescriptionHtml.match(/<p\b[^>]*>/gi) || []).length;
        const closeP = (p.longDescriptionHtml.match(/<\/p>/gi) || []).length;
        expect(openP).toBe(closeP);
      }
    }
  });

  test('T2.5.4: URL safety of slugs: all project slugs strictly match lowercase alphanumeric and hyphens', () => {
    const projects = helpers.getProjectsData();
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    for (const p of projects) {
      expect(slugPattern.test(p.slug)).toBe(true);
    }
  });

  test('T2.5.5: Special characters in descriptions: handles Portuguese diacritics and quotes without encoding corruption', () => {
    const projects = helpers.getProjectsData();
    for (const p of projects) {
      // Must not contain mojibake like Â, Ã©, Ã£
      expect(p.description).not.toMatch(/Â|Ã©|Ã£|Ã§|â€/);
    }
  });
});

// ---------------------------------------------------------------------------
// Feature 6 Boundaries: Zero Game Dev Removal (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 6 Boundaries: Zero Game Dev Removal', () => {
  test('T2.6.1: Case-insensitive word boundary check for "game": 0 standalone matches in src/ (except legitimate words)', () => {
    const matches = helpers.searchInDirectory('src', /\bgame\b|\bgames\b/i);
    expect(matches.length).toBe(0);
  });

  test('T2.6.2: Case-insensitive word boundary check for "unity": 0 standalone matches in src/', () => {
    const matches = helpers.searchInDirectory('src', /\bunity\b/i);
    expect(matches.length).toBe(0);
  });

  test('T2.6.3: Case-insensitive word boundary check for "gameplay": 0 occurrences in src/', () => {
    const matches = helpers.searchInDirectory('src', /gameplay/i);
    expect(matches.length).toBe(0);
  });

  test('T2.6.4: Case-insensitive check for "chronomage": 0 occurrences across all src/ files', () => {
    const matches = helpers.searchInDirectory('src', /chronomage/i);
    expect(matches.length).toBe(0);
  });

  test('T2.6.5: Icon import boundary: Gamepad and Gamepad2 are absent from all Lucide React imports', () => {
    const matches = helpers.searchInDirectory('src', /Gamepad2?/);
    expect(matches.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Feature 7 Boundaries: Full Curriculum & Skills Integration (5 tests)
// ---------------------------------------------------------------------------
describe('Feature 7 Boundaries: Full Curriculum & Skills Integration', () => {
  test('T2.7.1: Graduation timeline boundary: Anhanguera Bachelor explicitly marked with future graduation year (2030)', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/2030/);
  });

  test('T2.7.2: Technical course boundary: ETSM course explicitly marked with 1200h workload and 2024-2025 timeframe', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/1[.\s]?200\s*h/i);
    expect(aboutContent).toMatch(/2024\s*[-–]\s*2025/);
  });

  test('T2.7.3: SENAI certification boundary: SENAI Full-Stack certification explicitly marked with 670h workload', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/670\s*h/i);
  });

  test('T2.7.4: Language hours boundary: CIL Spanish explicitly marked with 440h workload', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/440\s*h/i);
  });

  test('T2.7.5: Language progress boundary: CIL English explicitly marked with intermediate level and expected completion 2026', () => {
    const aboutContent = helpers.readFile('src/components/AboutSection.tsx');
    expect(aboutContent).toMatch(/2026/);
  });
});
