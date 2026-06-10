#!/usr/bin/env node
/**
 * render-heroes-handwerk.mjs — Featured-Images für alle Content-Pieces ohne Bild.
 * Prompt-Quelle: featuredImageAlt (Motivbeschreibung der Content-Agents) + Style-Base.
 * FLUX.2-pro + Filter Warm Classic + Film Grain, 1200x640. Setzt featuredImage im Frontmatter.
 * Symbolbilder/Szenen — KEINE realen Personen (GESETZ: nie AI-Gesichter realer Menschen).
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const REPO = '/docker/projects/handwerksingles-magazin';
const W = 1200, H = 640;
const KEY = process.env.TOGETHER_API_KEY;
if (!KEY) { console.error('TOGETHER_API_KEY fehlt'); process.exit(1); }

const BASE = 'photorealistic, Canon R5 85mm f/1.4, natural skin texture with visible pores, golden hour warm light, shallow depth of field, no plastic look, documentary photography style, authentic German craftspeople and workshops';
const SUFFIX = 'No text, no logos, no readable signage, no brand labels.';

const SETS = [
  { dir: 'content/articles', out: 'public/images/articles', pub: '/images/articles' },
  { dir: 'content/handwerkskammern', out: 'public/images/handwerkskammern', pub: '/images/handwerkskammern' },
  { dir: 'content/stories', out: 'public/images/stories', pub: '/images/stories' },
];

function field(s, key) {
  const m = s.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

async function flux(prompt, a = 0) {
  const res = await fetch('https://api.together.xyz/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'black-forest-labs/FLUX.2-pro', prompt, width: W, height: H, n: 1 }),
  });
  if (res.status === 429 && a < 6) { await new Promise(r => setTimeout(r, 4000 * Math.pow(1.6, a) + Math.random()*2000)); return flux(prompt, a+1); }
  if (!res.ok) throw new Error(`Together ${res.status}: ${(await res.text()).slice(0,200)}`);
  const d = await res.json();
  const url = d.data?.[0]?.url;
  if (!url) throw new Error('No URL');
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

async function filter(buf) {
  const { width: w, height: h } = await sharp(buf).metadata();
  const g = Buffer.alloc(w * h * 3);
  for (let i = 0; i < g.length; i++) g[i] = 128 + Math.floor((Math.random()-0.5)*35);
  const grain = await sharp(g, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer();
  return sharp(buf)
    .modulate({ brightness: 1.03, saturation: 0.80 })
    .tint({ r: 255, g: 228, b: 192 })
    .gamma(1.05)
    .composite([{ input: grain, blend: 'overlay', opacity: 0.13 }])
    .webp({ quality: 85 }).toBuffer();
}

(async () => {
  let ok = 0, skip = 0, fail = 0;
  for (const set of SETS) {
    const dirAbs = path.join(REPO, set.dir);
    for (const f of fs.readdirSync(dirAbs).filter((x) => x.endsWith('.mdoc'))) {
      const fp = path.join(dirAbs, f);
      const raw = fs.readFileSync(fp, 'utf8');
      const slug = f.replace(/\.mdoc$/, '');
      if (field(raw, 'featuredImage')) { skip++; continue; }
      const alt = field(raw, 'featuredImageAlt');
      if (!alt) { console.error(`✗ ${slug}: kein featuredImageAlt`); fail++; continue; }
      const prompt = `${alt}. Editorial hero image for a German craftspeople magazine. ${BASE}. ${SUFFIX}`;
      try {
        const buf = await filter(await flux(prompt));
        const outDir = path.join(REPO, set.out, slug);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'featuredImage.webp'), buf);
        const pub = `${set.pub}/${slug}/featuredImage.webp`;
        fs.writeFileSync(fp, raw.replace(/^featuredImage:.*$/m, `featuredImage: ${pub}`));
        console.log(`✓ ${slug}`);
        ok++;
      } catch (e) {
        console.error(`✗ ${slug}: ${e.message}`); fail++;
      }
    }
  }
  console.log(`Fertig: ${ok} gerendert, ${skip} übersprungen, ${fail} Fehler`);
})();
