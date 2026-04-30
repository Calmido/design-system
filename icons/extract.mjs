#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, 'Fonts and Icons.svg'), 'utf8');
const outDir = join(here, 'extracted');
mkdirSync(outDir, { recursive: true });

const masks = new Map();
const maskRe =
  /<mask id="(mask\d+_1_269)"[^>]*>\s*<rect x="(\d+)" y="(\d+)" width="24" height="24"[^/]*\/>\s*<\/mask>/g;
let m;
while ((m = maskRe.exec(src))) {
  masks.set(m[1], { x: Number(m[2]), y: Number(m[3]) });
}

const groupRe = /<g mask="url\(#(mask\d+_1_269)\)">([\s\S]*?)<\/g>/g;
const icons = [];
while ((m = groupRe.exec(src))) {
  const id = m[1];
  const pos = masks.get(id);
  if (!pos) continue;
  const inner = m[2]
    .trim()
    .replace(/fill="#[0-9A-Fa-f]+"/g, 'fill="currentColor"');
  icons.push({ ...pos, inner });
}

icons.sort((a, b) => a.y - b.y || a.x - b.x);

const pad = (n, w) => String(n).padStart(w, '0');
icons.forEach((ic, i) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <g transform="translate(${-ic.x} ${-ic.y})">
    ${ic.inner}
  </g>
</svg>
`;
  const name = `icon_${pad(i + 1, 3)}_r${ic.y}_c${ic.x}.svg`;
  writeFileSync(join(outDir, name), svg);
});

console.log(`Extracted ${icons.length} icons to ${outDir}`);
