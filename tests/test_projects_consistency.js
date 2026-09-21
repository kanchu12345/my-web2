/**
 * tests/test_projects_consistency.js
 * Verifies consistency of projects data between homepage and projects data source.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PROJECTS_JSON_PATH = path.join(ROOT_DIR, 'data', 'projects.json');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const MAIN_JS_PATH = path.join(ROOT_DIR, 'js', 'main.js');

function runConsistencyTests() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🧪 RUNNING PROJECTS DATA CONSISTENCY TESTS');
  console.log('═══════════════════════════════════════════════════════\n');

  let passed = 0;
  let total = 0;

  function assert(cond, msg) {
    total++;
    if (cond) {
      console.log(`  ✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
      throw new Error(`Assertion failed: ${msg}`);
    }
  }

  // 1. Check data/projects.json exists and is valid JSON
  assert(fs.existsSync(PROJECTS_JSON_PATH), 'data/projects.json exists');
  const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf-8'));
  assert(Array.isArray(projects) && projects.length >= 6, `data/projects.json contains ${projects.length} projects`);

  // 2. Verify Hiri Surf School naming consistency
  const hiri = projects.find(p => (p.url || '').includes('hirisurfschool.com'));
  assert(hiri !== undefined, 'Hiri Surf School exists in data/projects.json');
  assert(hiri.title === 'Hiri Surf School', `Hiri title is canonical: "${hiri.title}"`);
  assert(hiri.featured === true, 'Hiri Surf School is marked as featured');

  // 3. Verify no "Hikka" naming discrepancy exists in project data
  const hasHikka = projects.some(p => (p.title || '').toLowerCase().includes('hikka'));
  assert(!hasHikka, 'Zero occurrences of "Hikka" project discrepancy');

  // 4. Verify exactly 6 featured projects in data/projects.json
  const featured = projects.filter(p => p.featured);
  assert(featured.length === 6, `Exactly 6 featured projects defined (found ${featured.length})`);

  // 5. Verify index.html has #featuredProjectsGrid container
  const indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
  assert(indexHtml.includes('id="featuredProjectsGrid"'), 'index.html has dynamic container #featuredProjectsGrid');

  // 6. Verify js/main.js references both #projGrid and #featuredProjectsGrid
  const mainJs = fs.readFileSync(MAIN_JS_PATH, 'utf-8');
  assert(mainJs.includes('#featuredProjectsGrid'), 'js/main.js queries #featuredProjectsGrid');
  assert(mainJs.includes('loadProjects();'), 'js/main.js invokes loadProjects() on DOMContentLoaded');

  // 7. Verify consistent 18+ Live Projects claim on index.html
  assert(indexHtml.includes('18+ Live Projects'), 'index.html displays canonical "18+ Live Projects" claim');

  // 8. Verify consistent 18+ Live Projects claim on portfolio.html
  const portfolioHtml = fs.readFileSync(path.join(ROOT_DIR, 'portfolio.html'), 'utf-8');
  assert(portfolioHtml.includes('18+ Live Projects'), 'portfolio.html displays canonical "18+ Live Projects" claim');

  // 9. Verify zero occurrences of obsolete "11+ Live Projects" or "16+ Live Projects"
  assert(!indexHtml.includes('16+ Live Projects'), 'Zero occurrences of legacy "16+ Live Projects" on index.html');
  assert(!portfolioHtml.includes('16+ Live Projects'), 'Zero occurrences of legacy "16+ Live Projects" on portfolio.html');

  console.log(`\n═══════════════════════════════════════════════════════`);
  console.log(`🎉 ALL TESTS PASSED: ${passed} / ${total} assertions verified.`);
  console.log(`═══════════════════════════════════════════════════════\n`);
}

runConsistencyTests();
