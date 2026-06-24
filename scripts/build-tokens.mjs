#!/usr/bin/env node
// Generate tokens.css from tokens.json (and, when the Android checkout is
// present, the Kotlin CalmidoTokens.kt consumed by calmido-phone-android).
// Source of truth: tokens.json. Do not hand-edit the generated artifacts.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

// ── Kotlin emitter (issue #2, Phase 2) ─────────────────────────────────────
// The generator writes CalmidoTokens.kt straight into the Android source tree
// so calmido-phone-android consumes tokens instead of hand-copying them.
// Names mirror the DS token names (kebab-case → camelCase).
const ANDROID_REPO = resolve(ROOT, '..', 'calmido-phone-android');
const KT_OUT = resolve(
  ANDROID_REPO,
  'app/src/main/java/com/calmido/app/ui/theme/generated/CalmidoTokens.kt',
);

const camel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

// #RRGGBB → 0xFFRRGGBB ; #RRGGBBAA → 0xAARRGGBB (Compose wants ARGB).
function composeHex(hex) {
  const h = hex.replace('#', '').toUpperCase();
  if (h.length === 6) return `0xFF${h}`;
  if (h.length === 8)
    return `0x${h.slice(6, 8)}${h.slice(0, 6)}`;
  throw new Error(`Cannot convert hex to Compose ARGB: ${hex}`);
}

function ktObject(name, body) {
  return [`object ${name} {`, ...body, '}', ''];
}

function emitKotlin() {
  const out = [
    '// AUTO-GENERATED from Calmido/design-system tokens.json by',
    '// scripts/build-tokens.mjs. Do not edit by hand — change tokens.json and',
    '// re-run `npm run build:tokens` in the design-system repo.',
    '',
    'package com.calmido.app.ui.theme.generated',
    '',
    'import androidx.compose.ui.graphics.Color',
    'import androidx.compose.ui.unit.dp',
    '',
  ];

  const colorBody = [];
  for (const t of tokens.color) {
    if (t.comment !== undefined) { colorBody.push(`    // ${t.comment}`); continue; }
    const note = t.note ? `  // ${t.note}` : '';
    colorBody.push(`    val ${camel(t.name)} = Color(${composeHex(t.value)})${note}`);
  }
  out.push(...ktObject('CalmidoColors', colorBody));

  const inkBody = [];
  for (const t of tokens['font-ink']) {
    if (t.comment !== undefined) { inkBody.push(`    // ${t.comment}`); continue; }
    const ref = /^\{color\.([^}]+)\}$/.exec(t.value);
    const rhs = ref ? `CalmidoColors.${camel(ref[1])}` : `Color(${composeHex(t.value)})`;
    const note = t.note ? `  // ${t.note}` : '';
    inkBody.push(`    val ${camel(t.name)} = ${rhs}${note}`);
  }
  out.push(...ktObject('CalmidoFontInk', inkBody));

  const spaceBody = tokens.spacing
    .filter((t) => t.name !== undefined)
    .map((t) => `    val s${t.name} = ${parseInt(t.value, 10)}.dp`);
  out.push(...ktObject('CalmidoSpacing', spaceBody));

  const radiusBody = tokens.radius
    .filter((t) => t.name !== undefined)
    .map((t) => `    val ${camel(t.name)} = ${parseInt(t.value, 10)}.dp`);
  out.push(...ktObject('CalmidoRadius', radiusBody));

  return out.join('\n');
}

if (existsSync(ANDROID_REPO)) {
  mkdirSync(dirname(KT_OUT), { recursive: true });
  writeFileSync(KT_OUT, emitKotlin());
  console.log(`Wrote ${KT_OUT}`);
} else {
  console.log('Android checkout not found alongside design-system; skipped CalmidoTokens.kt');
}
