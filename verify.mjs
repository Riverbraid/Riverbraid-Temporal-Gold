import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fatal = (msg) => { console.error(`VERIFY FAILED: ${msg}`); process.exit(1); };

const contractPath = join(__dirname, 'identity.contract.json');
if (!existsSync(contractPath)) fatal('Missing identity.contract.json');
const contract = JSON.parse(readFileSync(contractPath, 'utf8'));

for (const rel of contract.governed_files) {
  const full = join(__dirname, rel);
  if (!existsSync(full)) fatal(`Missing governed file: ${rel}`);
  if (readFileSync(full, 'utf8').trim().length === 0) fatal(`Empty governed file: ${rel}`);
}

const forbidden = ['Date.now', 'Math.random', 'crypto.randomUUID', 'new Date(', 'performance.now', 'process.env'];
for (const rel of contract.governed_files) {
  if (!rel.endsWith('.js') && !rel.endsWith('.mjs')) continue;
  const content = readFileSync(join(__dirname, rel), 'utf8');
  for (const tok of forbidden) {
    if (content.includes(tok)) fatal(`Forbidden token in ${rel}: ${tok}`);
  }
}

const indexContent = readFileSync(join(__dirname, 'index.js'), 'utf8');
if (!indexContent.includes('Riverbraid-Temporal-Gold')) {
  fatal('RB_PETAL_ID mismatch in index.js');
}

console.log('[Signal: SEQUENCE-INTEGRITY | Braid: CLOSED-LOOP]');
console.log('STATUS: STATIONARY');
