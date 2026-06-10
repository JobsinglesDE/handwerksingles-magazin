#!/usr/bin/env node
// Einmal-Render: Startseiten-Hero (Handwerk-Team, 1920x1080) → public/images/hero-startseite.webp
import fs from 'fs';
import sharp from 'sharp';

const KEY = process.env.TOGETHER_API_KEY;
if (!KEY) { console.error('TOGETHER_API_KEY fehlt'); process.exit(1); }

const prompt = `Group of four young German craftspeople standing together in a bright modern workshop — a woman in mason work clothes with rolled sleeves, a male electrician with tool belt, a female carpenter holding a wood plane, a male roofer with safety harness — relaxed confident smiles, warm camaraderie, golden hour light through workshop windows, fine sawdust in the air. photorealistic, Canon R5 35mm, natural skin texture with visible pores, warm light, documentary photography, no plastic look. No text, no logos, no readable labels.`;

const res = await fetch('https://api.together.xyz/v1/images/generations', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'black-forest-labs/FLUX.2-pro', prompt, width: 1920, height: 1088, n: 1 }),
});
if (!res.ok) { console.error('Together', res.status, (await res.text()).slice(0, 200)); process.exit(1); }
const d = await res.json();
const buf = Buffer.from(await (await fetch(d.data[0].url)).arrayBuffer());
const out = await sharp(buf)
  .resize(1920, 1080, { fit: 'cover' })
  .modulate({ brightness: 1.03, saturation: 0.8 })
  .tint({ r: 255, g: 228, b: 192 })
  .gamma(1.05)
  .webp({ quality: 85 })
  .toBuffer();
fs.writeFileSync('public/images/hero-startseite.webp', out);
console.log('✓ hero-startseite.webp', out.length, 'bytes');
