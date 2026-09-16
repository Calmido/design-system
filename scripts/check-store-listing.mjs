// Report what is still missing from store-listing.json, and anything already over a
// store's character limit.
//
// Deliberately NOT wired into CI. This file is a central place to keep the copy, not a
// build input — nothing consumes it yet, and no build fails because of it. Run it by hand:
//
//   node scripts/check-store-listing.mjs
//
// Exits 0 always. It reports; it does not gate.

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(ROOT, 'store-listing.json'), 'utf8'));

const locales = data.$locales.keys;
const missing = [];
const overLimit = [];
let written = 0;
let total = 0;

for (const store of ['appStore', 'play']) {
  const limits = data.$limits[store];
  for (const locale of locales) {
    const entry = data[store][locale] ?? {};
    for (const [field, value] of Object.entries(entry)) {
      if (field.startsWith('$')) continue;
      total += 1;
      if (value === null || value === '') {
        missing.push(`${store}.${locale}.${field}`);
        continue;
      }
      written += 1;
      const limit = limits[field];
      if (limit && value.length > limit) {
        overLimit.push(`${store}.${locale}.${field}: ${value.length}/${limit}`);
      }
    }
  }
}

const pct = total ? Math.round((written / total) * 100) : 0;
console.log(`store-listing.json — ${written}/${total} fields written (${pct}%)\n`);

if (overLimit.length) {
  console.log('OVER LIMIT:');
  for (const line of overLimit) console.log(`  ${line}`);
  console.log('');
}

if (missing.length) {
  console.log('Still to write:');
  for (const line of missing) console.log(`  ${line}`);
  console.log('');
  // The Play values are an export, not a writing job — worth saying so, because it
  // changes who does the work and in what order.
  if (missing.some((m) => m.startsWith('play.'))) {
    console.log('Note: the play.* fields exist in the Play Console already (Android is live).');
    console.log('      Export them rather than writing from scratch.\n');
  }
} else {
  console.log('Nothing missing.\n');
}
