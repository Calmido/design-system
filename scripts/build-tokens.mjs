#!/usr/bin/env node
// Generate tokens.css from tokens.json.
// Source of truth: tokens.json. Do not hand-edit tokens.css.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC  = resolve(ROOT, 'tokens.json');
const OUT  = resolve(ROOT, 'tokens.css');

const tokens = JSON.parse(readFileSync(SRC, 'utf8'));
const prefixes = tokens.$prefixes;
const groupKeys = Object.keys(tokens).filter(k => !k.startsWith('$'));

const cssVar = (group, name) => `${prefixes[group]}${name}`;

// Resolve {group.name} refs against the parsed JSON.
function resolveValue(raw) {
  return raw.replace(/\{([^.}]+)\.([^}]+)\}/g, (_, g, n) => {
    if (!prefixes[g]) throw new Error(`Unknown group in ref: ${g}`);
    const items = tokens[g];
    if (!Array.isArray(items) || !items.some(t => t.name === n)) {
      throw new Error(`Unknown ref target: {${g}.${n}}`);
    }
    return `var(${cssVar(g, n)})`;
  });
}

const lines = [];
lines.push('/* AUTO-GENERATED from tokens.json by scripts/build-tokens.mjs.');
lines.push(' * Do not edit by hand — run `npm run build:tokens` after changing tokens.json. */');
lines.push(':root {');

for (const group of groupKeys) {
  const items = tokens[group];
  if (!Array.isArray(items)) {
    throw new Error(`Group "${group}" must be an array of {name,value}/{comment} entries`);
  }

  // First pass: name length within group (for alignment), skipping comment markers.
  const named = items.filter(t => t.name !== undefined);
  const pad = Math.max(0, ...named.map(t => cssVar(group, t.name).length)) + 1;

  lines.push('');
  for (const item of items) {
    if (item.comment !== undefined) {
      lines.push(`  /* ── ${item.comment} ── */`);
      continue;
    }
    const decl = cssVar(group, item.name) + ':';
    const value = resolveValue(item.value);
    const note  = item.note ? `  /* ${item.note} */` : '';
    lines.push(`  ${decl.padEnd(pad)} ${value};${note}`);
  }
}

lines.push('}');
lines.push('');

writeFileSync(OUT, lines.join('\n'));
console.log(`Wrote ${OUT} (${lines.length} lines)`);
