/**
 * tests/e2e/runner.js
 * Central unified test runner for Portfolio Software Engineering & Editorial Overhaul E2E test suite.
 * 
 * Provides:
 * - Tiered test registry (Tier 1: Feature Coverage, Tier 2: Boundaries, Tier 3: Cross-Feature, Tier 4: Acceptance)
 * - Flexible assertion library (expect with toBe, toEqual, toContain, toMatch, toBeGreaterThanOrEqual, etc.)
 * - Deep codebase introspection helpers (TypeScript transpileModule evaluation, AST/file scanners, build execution)
 * - Clear ANSI colored reporting, per-test timing, and ASCII summary table
 * - Process exit code (0 on success, 1 on failure)
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

// Project root is the portfolio directory
const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..');

// ANSI Color formatting
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

// Test Registry
const tiers = {
  tier1: { name: 'Tier 1: Feature Coverage', tests: [] },
  tier2: { name: 'Tier 2: Boundary & Corner Cases', tests: [] },
  tier3: { name: 'Tier 3: Cross-Feature Interactions', tests: [] },
  tier4: { name: 'Tier 4: Real-World Acceptance Scenarios', tests: [] },
};

let currentTierKey = 'tier1';
let currentSuiteName = '';

function setTier(tierKey) {
  if (!tiers[tierKey]) {
    throw new Error(`Unknown tier: ${tierKey}`);
  }
  currentTierKey = tierKey;
}

function describe(suiteName, fn) {
  const previousSuite = currentSuiteName;
  currentSuiteName = suiteName;
  try {
    fn();
  } finally {
    currentSuiteName = previousSuite;
  }
}

function test(testName, fn) {
  const fullName = currentSuiteName ? `${currentSuiteName} > ${testName}` : testName;
  tiers[currentTierKey].tests.push({
    name: fullName,
    shortName: testName,
    suite: currentSuiteName,
    tierKey: currentTierKey,
    fn,
  });
}

const it = test;

// Custom Assertion Library
class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, k) || !deepEqual(a[k], b[k])) return false;
  }
  return true;
}

function formatValue(v, maxLength = 160) {
  if (typeof v === 'string') {
    if (v.length > maxLength) {
      return `"${v.slice(0, maxLength).replace(/\r?\n/g, '\\n')}..." [truncated, total: ${v.length} chars]`;
    }
    return `"${v.replace(/\r?\n/g, '\\n')}"`;
  }
  if (typeof v === 'undefined') return 'undefined';
  if (v === null) return 'null';
  if (typeof v === 'function') return '[Function]';
  if (typeof v === 'object') {
    try {
      const s = JSON.stringify(v);
      return s.length > maxLength ? `${s.slice(0, maxLength)}... [truncated]` : s;
    } catch {
      return String(v);
    }
  }
  return String(v);
}

function expect(actual) {
  const createMatcher = (isNot) => ({
    toBe(expected) {
      const pass = actual === expected;
      if (isNot ? pass : !pass) {
        throw new AssertionError(
          `Expected ${formatValue(actual)} ${isNot ? 'NOT to be' : 'to be'} ${formatValue(expected)}`,
          actual,
          expected
        );
      }
    },
    toEqual(expected) {
      const pass = deepEqual(actual, expected);
      if (isNot ? pass : !pass) {
        throw new AssertionError(
          `Expected ${formatValue(actual)} ${isNot ? 'NOT to equal' : 'to equal'} ${formatValue(expected)}`,
          actual,
          expected
        );
      }
    },
    toContain(expected) {
      let pass = false;
      if (typeof actual === 'string') {
        pass = actual.includes(expected);
      } else if (Array.isArray(actual)) {
        pass = actual.some(item => (typeof expected === 'object' ? deepEqual(item, expected) : item === expected));
      } else if (actual && typeof actual === 'object') {
        pass = Object.prototype.hasOwnProperty.call(actual, expected);
      }
      if (isNot ? pass : !pass) {
        throw new AssertionError(
          `Expected ${formatValue(actual)} ${isNot ? 'NOT to contain' : 'to contain'} ${formatValue(expected)}`,
          actual,
          expected
        );
      }
    },
    toMatch(regex) {
      const re = typeof regex === 'string' ? new RegExp(regex) : regex;
      const pass = typeof actual === 'string' && re.test(actual);
      if (isNot ? pass : !pass) {
        throw new AssertionError(
          `Expected ${formatValue(actual)} ${isNot ? 'NOT to match' : 'to match'} pattern ${regex}`,
          actual,
          regex
        );
      }
    },
    toBeGreaterThan(expected) {
      const pass = actual > expected;
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected ${actual} ${isNot ? 'NOT to be >' : 'to be >'} ${expected}`, actual, expected);
      }
    },
    toBeGreaterThanOrEqual(expected) {
      const pass = actual >= expected;
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected ${actual} ${isNot ? 'NOT to be >=' : 'to be >='} ${expected}`, actual, expected);
      }
    },
    toBeLessThan(expected) {
      const pass = actual < expected;
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected ${actual} ${isNot ? 'NOT to be <' : 'to be <'} ${expected}`, actual, expected);
      }
    },
    toBeLessThanOrEqual(expected) {
      const pass = actual <= expected;
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected ${actual} ${isNot ? 'NOT to be <=' : 'to be <='} ${expected}`, actual, expected);
      }
    },
    toBeTruthy() {
      const pass = Boolean(actual);
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected ${formatValue(actual)} ${isNot ? 'NOT to be truthy' : 'to be truthy'}`, actual, true);
      }
    },
    toBeFalsy() {
      const pass = !actual;
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected ${formatValue(actual)} ${isNot ? 'NOT to be falsy' : 'to be falsy'}`, actual, false);
      }
    },
    toBeDefined() {
      const pass = typeof actual !== 'undefined';
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected value ${isNot ? 'NOT to be defined' : 'to be defined'}`, actual, 'defined');
      }
    },
    toBeUndefined() {
      const pass = typeof actual === 'undefined';
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected value ${isNot ? 'NOT to be undefined' : 'to be undefined'}`, actual, 'undefined');
      }
    },
    toHaveLength(len) {
      const actualLen = actual ? actual.length : undefined;
      const pass = actualLen === len;
      if (isNot ? pass : !pass) {
        throw new AssertionError(`Expected length ${isNot ? 'NOT to be' : 'to be'} ${len}, but got ${actualLen}`, actualLen, len);
      }
    },
  });

  const matcher = createMatcher(false);
  matcher.not = createMatcher(true);
  return matcher;
}

// Helpers for Codebase Inspection
const helpers = {
  WORKSPACE_ROOT,

  resolvePath(...segments) {
    return path.resolve(WORKSPACE_ROOT, ...segments);
  },

  fileExists(relPath) {
    const fullPath = path.resolve(WORKSPACE_ROOT, relPath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();
  },

  directoryExists(relPath) {
    const fullPath = path.resolve(WORKSPACE_ROOT, relPath);
    return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
  },

  readFile(relPath) {
    const fullPath = path.resolve(WORKSPACE_ROOT, relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File does not exist: ${relPath}`);
    }
    return fs.readFileSync(fullPath, 'utf8');
  },

  listFiles(relDir, recursive = true) {
    const fullDir = path.resolve(WORKSPACE_ROOT, relDir);
    if (!fs.existsSync(fullDir)) return [];

    const results = [];
    function scan(dir) {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullItem = path.join(dir, item);
        const stat = fs.statSync(fullItem);
        if (stat.isDirectory() && recursive) {
          scan(fullItem);
        } else if (stat.isFile()) {
          results.push(path.relative(WORKSPACE_ROOT, fullItem).replace(/\\/g, '/'));
        }
      }
    }
    scan(fullDir);
    return results;
  },

  searchInFile(relPath, pattern) {
    try {
      const content = helpers.readFile(relPath);
      const re = typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern;
      const matches = content.match(re);
      return matches ? matches.length : 0;
    } catch {
      return 0;
    }
  },

  searchInDirectory(relDir, pattern, extensions = ['.ts', '.tsx', '.js', '.jsx', '.css']) {
    const files = helpers.listFiles(relDir, true);
    const matchedFiles = [];
    const re = typeof pattern === 'string' ? new RegExp(pattern, 'gi') : pattern;

    for (const file of files) {
      if (extensions.some(ext => file.endsWith(ext))) {
        const content = helpers.readFile(file);
        const matches = content.match(re);
        if (matches && matches.length > 0) {
          matchedFiles.push({ file, count: matches.length, matches });
        }
      }
    }
    return matchedFiles;
  },

  getProjectsData() {
    const filePath = 'src/lib/projects-data.ts';
    const content = helpers.readFile(filePath);

    try {
      const ts = require('typescript');
      const transpiled = ts.transpileModule(content, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      });
      const vm = require('vm');
      const ctx = { exports: {}, module: { exports: {} }, require };
      vm.createContext(ctx);
      vm.runInContext(transpiled.outputText, ctx);
      return ctx.exports.projectsData || (ctx.exports.default && ctx.exports.default.projectsData) || ctx.exports.default || ctx.module.exports.projectsData || [];
    } catch (err) {
      const errMsg = (err && err.message) || String(err);
      throw new Error(`Failed to parse projects-data.ts: ${errMsg}`);
    }
  },

  getSkillsData() {
    const filePath = 'src/lib/skills-data.ts';
    const content = helpers.readFile(filePath);

    try {
      const ts = require('typescript');
      const transpiled = ts.transpileModule(content, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      });
      const vm = require('vm');
      const ctx = { exports: {}, module: { exports: {} }, require };
      vm.createContext(ctx);
      vm.runInContext(transpiled.outputText, ctx);
      return ctx.exports.skillsData || (ctx.exports.default && ctx.exports.default.skillsData) || ctx.exports.default || ctx.module.exports.skillsData || [];
    } catch (err) {
      const errMsg = (err && err.message) || String(err);
      throw new Error(`Failed to parse skills-data.ts: ${errMsg}`);
    }
  },

  runCommand(cmd, timeoutMs = 120000) {
    try {
      const stdout = execSync(cmd, {
        cwd: WORKSPACE_ROOT,
        timeout: timeoutMs,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      return { status: 0, stdout, stderr: '' };
    } catch (err) {
      return {
        status: err.status || 1,
        stdout: err.stdout ? err.stdout.toString() : '',
        stderr: err.stderr ? err.stderr.toString() : err.message,
      };
    }
  },
};

// Test Runner Execution Engine
async function runAll() {
  console.log(`\n${colors.bright}${colors.cyan}======================================================================${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}             PORTFOLIO E2E AUTOMATED TEST SUITE RUNNER                ${colors.reset}`);
  console.log(`${colors.dim}  Framework: Native Node.js Test Harness | Root: ${WORKSPACE_ROOT}${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}======================================================================${colors.reset}\n`);

  const startTime = Date.now();
  const results = {
    tier1: { passed: 0, failed: 0, total: 0, tests: [] },
    tier2: { passed: 0, failed: 0, total: 0, tests: [] },
    tier3: { passed: 0, failed: 0, total: 0, tests: [] },
    tier4: { passed: 0, failed: 0, total: 0, tests: [] },
  };

  const allFailures = [];

  for (const [tierKey, tierInfo] of Object.entries(tiers)) {
    console.log(`${colors.bright}${colors.blue}▶ Running ${tierInfo.name} (${tierInfo.tests.length} tests)...${colors.reset}`);
    results[tierKey].total = tierInfo.tests.length;

    for (const testItem of tierInfo.tests) {
      const testStart = Date.now();
      try {
        const ret = testItem.fn();
        if (ret && typeof ret.then === 'function') {
          await ret;
        }
        const testElapsed = Date.now() - testStart;
        results[tierKey].passed++;
        results[tierKey].tests.push({ name: testItem.name, status: 'pass', elapsed: testElapsed });
        console.log(`  ${colors.green}✓ PASS${colors.reset} ${colors.white}${testItem.name}${colors.reset} ${colors.dim}(${testElapsed}ms)${colors.reset}`);
      } catch (err) {
        const testElapsed = Date.now() - testStart;
        results[tierKey].failed++;
        results[tierKey].tests.push({ name: testItem.name, status: 'fail', elapsed: testElapsed, error: err });
        allFailures.push({ tier: tierInfo.name, name: testItem.name, error: err });
        console.log(`  ${colors.red}✗ FAIL${colors.reset} ${colors.bright}${colors.white}${testItem.name}${colors.reset} ${colors.dim}(${testElapsed}ms)${colors.reset}`);
        const errMsg = (err && err.message) ? err.message : String(err);
        console.log(`    ${colors.red}↳ ${errMsg}${colors.reset}`);
      }
    }
    console.log();
  }

  const totalElapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  const totalPassed = Object.values(results).reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = Object.values(results).reduce((sum, r) => sum + r.failed, 0);
  const totalTests = Object.values(results).reduce((sum, r) => sum + r.total, 0);

  // Print Summary Table
  console.log(`${colors.bright}${colors.cyan}╔═════════════════════════════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║                             E2E TEST SUITE SUMMARY                                  ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╠══════════════════════════════════════════════╦════════╦════════╦═══════╦════════════╣${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║ Test Tier                                    ║ Passed ║ Failed ║ Total ║  Pass Rate ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╠══════════════════════════════════════════════╬════════╬════════╬═══════╬════════════╣${colors.reset}`);

  for (const [tierKey, tierInfo] of Object.entries(tiers)) {
    const res = results[tierKey];
    const passRate = res.total > 0 ? ((res.passed / res.total) * 100).toFixed(1) + '%' : '0.0%';
    const nameCol = tierInfo.name.padEnd(44);
    const passCol = String(res.passed).padStart(6);
    const failCol = String(res.failed).padStart(6);
    const totalCol = String(res.total).padStart(5);
    const rateCol = passRate.padStart(10);
    console.log(`║ ${nameCol} ║ ${colors.green}${passCol}${colors.reset} ║ ${res.failed > 0 ? colors.red : colors.dim}${failCol}${colors.reset} ║ ${totalCol} ║ ${rateCol} ║`);
  }

  console.log(`${colors.bright}${colors.cyan}╠══════════════════════════════════════════════╬════════╬════════╬═══════╬════════════╣${colors.reset}`);
  const grandPassRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) + '%' : '0.0%';
  const totNameCol = 'TOTAL TEST SUITE'.padEnd(44);
  const totPassCol = String(totalPassed).padStart(6);
  const totFailCol = String(totalFailed).padStart(6);
  const totTotalCol = String(totalTests).padStart(5);
  const totRateCol = grandPassRate.padStart(10);
  console.log(`║ ${colors.bright}${totNameCol}${colors.reset} ║ ${colors.bright}${colors.green}${totPassCol}${colors.reset} ║ ${totalFailed > 0 ? colors.bright + colors.red : colors.dim}${totFailCol}${colors.reset} ║ ${colors.bright}${totTotalCol}${colors.reset} ║ ${colors.bright}${totRateCol}${colors.reset} ║`);
  console.log(`${colors.bright}${colors.cyan}╚══════════════════════════════════════════════╩════════╩════════╩═══════╩════════════╝${colors.reset}\n`);

  console.log(`Total execution time: ${totalElapsed}s`);

  if (allFailures.length > 0) {
    console.log(`\n${colors.bright}${colors.red}========================== DIAGNOSTIC FAILURE REPORT ==========================${colors.reset}`);
    allFailures.forEach((f, idx) => {
      const displayName = f.name.startsWith(f.tier) ? f.name : `${f.tier} > ${f.name}`;
      console.log(`\n${colors.bright}${colors.red}[${idx + 1}] ${displayName}${colors.reset}`);
      const failMsg = (f.error && f.error.message) ? f.error.message : String(f.error);
      console.log(`    ${colors.yellow}Error: ${failMsg}${colors.reset}`);
      if (f.error && f.error.actual !== undefined && f.error.expected !== undefined) {
        console.log(`    ${colors.dim}Expected: ${formatValue(f.error.expected)}${colors.reset}`);
        console.log(`    ${colors.dim}Actual:   ${formatValue(f.error.actual)}${colors.reset}`);
      }
      if (f.error && f.error.stack) {
        const stackLines = f.error.stack.split('\n').slice(1, 4).join('\n');
        console.log(`    ${colors.dim}${stackLines}${colors.reset}`);
      }
    });
    console.log(`\n${colors.bright}${colors.red}OVERALL STATUS: FAILURES DETECTED (${totalFailed} failed / ${totalTests} total)${colors.reset}`);
    process.exitCode = 1;
    return false;
  } else {
    console.log(`\n${colors.bright}${colors.green}OVERALL STATUS: ALL ${totalTests} TESTS PASSED SUCCESSFULLY! (100%)${colors.reset}`);
    process.exitCode = 0;
    return true;
  }
}

// Module exports for test files
module.exports = {
  setTier,
  describe,
  test,
  it,
  expect,
  helpers,
  runAll,
};

// Direct runner execution
if (require.main === module) {
  // Load all 4 test tiers
  require('./tier1-feature-coverage.test.js');
  require('./tier2-boundaries-corners.test.js');
  require('./tier3-cross-feature.test.js');
  require('./tier4-acceptance-scenarios.test.js');

  runAll().catch(err => {
    console.error('Fatal Test Runner Crash:', err);
    process.exit(1);
  });
}
