# E2E Test Infra: Portfolio Software Engineering & Editorial Overhaul

## Test Philosophy
- **Opaque-Box & Requirement-Driven**: Tests are designed directly from the user specifications in `ORIGINAL_REQUEST.md`, visual design references, and the official curriculum without coupling to volatile implementation internals.
- **Methodology**: Category-Partition, Boundary Value Analysis (BVA), Pairwise Combinatorial Testing, and Real-World Recruitment Acceptance Auditing.
- **Strict Verification Standards**:
  1. Complete removal of all game development references across all source files.
  2. Authentic curriculum credentials (Anhanguera Software Engineering 2030, ETSM 1200h, SENAI Full-Stack 670h, CIL Spanish 440h, English).
  3. Structural compliance with the open editorial row layout (no closed card frames / `DepthCard`).
  4. Real-world validation: `npm run build` exits 0 with all project static routes rendered without compile or type errors.

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 (≥5) | Tier 2 (≥5) | Tier 3 (Pairwise) | Tier 4 (Workload) |
|---|---------|---------------------|:-----------:|:-----------:|:-----------------:|:-----------------:|
| 1 | Editorial Row Layout (No Cards) | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | Mobile & Desktop Responsiveness | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 3 | Multi-Image Media Gallery | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 4 | Interactive Code Mockups | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 5 | Flagship SE Catalog (LyMadhouse, LyVia, LyCloud) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 6 | Zero Game Dev Removal (Strict 0 occurrences) | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |
| 7 | Full Curriculum & Skills Integration | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- **Directory Layout**:
  ```
  tests/
  └── e2e/
      ├── runner.js                         # Central unified test runner with reporting
      ├── tier1-feature-coverage.test.js    # 35 tests: 5 tests per feature across 7 features
      ├── tier2-boundaries-corners.test.js  # 35 tests: boundary, edge, resilience tests
      ├── tier3-cross-feature.test.js       # 12 tests: pairwise feature interactions
      └── tier4-acceptance-scenarios.test.js# 6 tests: full recruitment & build acceptance
  ```
- **Test Runner Invocation**:
  - Direct execution: `node tests/e2e/runner.js`
  - NPM Script: `npm run test:e2e`
- **Pass/Fail Semantics**:
  - Exit code `0` on 100% pass rate.
  - Non-zero exit code if any assertion fails or an unexpected exception occurs.
  - Colored ANSI terminal output with detailed diagnostics, timing, and breakdown by tier.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity | Acceptance Target |
|---|----------|--------------------|------------|-------------------|
| 1 | Tech Recruiter / Hiring Manager Comprehensive Audit | F5, F6, F7 | High | All professional profile, curriculum milestones, degree, hours, and SE positioning match 100% |
| 2 | Production Build & Static Site Generation (SSG) Validation | F1, F3, F4, F5 | High | `npm run build` succeeds cleanly with exit code 0; all `/projects/[slug]` routes generated |
| 3 | Project Deep-Dive Navigation & Integrity | F1, F3, F4, F5 | Medium | Each flagship project has a valid slug, title, description, tags, and detail view |
| 4 | Editorial Visual Layout Scannability & Card Eradication | F1, F2 | Medium | Zero closed card wrapper elements in projects section; media/text layout separation verified |
| 5 | Media & Interactive Wireframe Fallback Resilience | F3, F4 | Medium | Every project without static images reliably renders an interactive code mockup |
| 6 | Global Strict Zero Game Dev Regex Sweep | F6 | High | Zero matches for game, unity, gameplay, rpg, or chronomage across entire codebase |

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: ≥35 tests (5 tests × 7 features)
- **Tier 2 (Boundary & Corner Cases)**: ≥35 tests (5 boundary/corner tests × 7 features)
- **Tier 3 (Cross-Feature Combinations)**: ≥10 tests (pairwise coverage of layout, media, mockups, curriculum, and navigation)
- **Tier 4 (Real-World Acceptance Scenarios)**: ≥5 comprehensive scenarios
- **Total Suite Minimum**: ≥85 tests passing 100%
