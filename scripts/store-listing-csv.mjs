// Round-trip store-listing.json through a CSV, for handing the copy to whoever writes
// or translates it.
//
//   node scripts/store-listing-csv.mjs export > store-listing.csv
//   node scripts/store-listing-csv.mjs import < store-listing.csv
//
// JSON stays the source of truth: it carries the character limits, the scope notes and
// the two stores' differing field sets, none of which survive a flat table. The CSV is a
// working surface — one row per field, one column per language, which is the shape a
// spreadsheet and a translator both want.
//
// Import overwrites values from the CSV and leaves everything else in the JSON untouched.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_PATH = resolve(ROOT, 'store-listing.json');

const data = JSON.parse(readFileSync(JSON_PATH, 'utf8'));
const locales = data.$locales.keys;

/** Every addressable row: `<section>.<field>`, in a stable order. */
function rows() {
  const out = [];
  for (const [section, limits] of [['appStore', data.$limits.appStore], ['play', data.$limits.play]]) {
    const fields = Object.keys(data[section][locales[0]]).filter((f) => !f.startsWith('$'));
    for (const field of fields) out.push({ section, field, limit: limits[field] ?? '' });
  }
  for (const field of Object.keys(data.$urls[locales[0]])) {
    out.push({ section: '$urls', field, limit: '' });
  }
  return out;
}

// --- CSV primitives. Descriptions contain newlines and apostrophes, so quoting is not
// optional here; a naive join would corrupt the longest and most valuable fields.

function csvCell(value) {
  const s = value == null ? '' : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function parseCsv(text) {
  const rowsOut = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i += 1; } else { quoted = false; }
      } else cell += c;
      continue;
    }
    if (c === '"') { quoted = true; continue; }
    if (c === ',') { row.push(cell); cell = ''; continue; }
    if (c === '\r') continue;
    if (c === '\n') { row.push(cell); rowsOut.push(row); row = []; cell = ''; continue; }
    cell += c;
  }
  if (cell !== '' || row.length) { row.push(cell); rowsOut.push(row); }
  return rowsOut.filter((r) => r.some((v) => v !== ''));
}

function doExport() {
  const lines = [['key', 'limit', ...locales].map(csvCell).join(',')];
  for (const { section, field, limit } of rows()) {
    const values = locales.map((l) =>
      section === '$urls' ? data.$urls[l][field] : data[section][l][field]);
    lines.push([`${section}.${field}`, limit, ...values].map(csvCell).join(','));
  }
  process.stdout.write(`${lines.join('\n')}\n`);
}

function doImport() {
  const text = readFileSync(0, 'utf8');
  const parsed = parseCsv(text);
  const [header, ...body] = parsed;
  const cols = header.slice(2);
  let changed = 0;

  for (const row of body) {
    const [key, , ...values] = row;
    const dot = key.lastIndexOf('.');
    const section = key.slice(0, dot);
    const field = key.slice(dot + 1);
    cols.forEach((locale, i) => {
      const raw = values[i] ?? '';
      const value = raw === '' ? null : raw;
      const target = section === '$urls' ? data.$urls[locale] : data[section]?.[locale];
      if (!target || !(field in target)) return;
      if (target[field] !== value) { target[field] = value; changed += 1; }
    });
  }

  writeFileSync(JSON_PATH, `${JSON.stringify(data, null, 2)}\n`);
  console.error(`Updated ${changed} field(s) in store-listing.json`);
}

const mode = process.argv[2];
if (mode === 'export') doExport();
else if (mode === 'import') doImport();
else {
  console.error('usage: store-listing-csv.mjs export|import');
  process.exit(2);
}
