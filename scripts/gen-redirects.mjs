// scripts/gen-redirects.mjs
// Generiert 301-Redirects von alten flachen /{slug}-URLs auf die neuen Hub-Prefix-URLs.
// Muss die Logik von src/lib/routes.ts:getArticleUrl spiegeln.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'content/articles';

function field(s, key) {
  const m = s.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
}

const out = [];
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.mdoc'))) {
  const s = readFileSync(join(DIR, f), 'utf8');
  const slug = f.replace(/\.mdoc$/, '');
  const cat = field(s, 'category');
  let dest;
  if (cat === 'handwerk-news') dest = `/handwerk-news/${slug}`;
  else if (cat === 'handwerksberufe') dest = `/handwerksberufe/${slug}`;
  else dest = `/singles-partnersuche/${slug}`;
  if (dest !== `/${slug}`) out.push({ source: `/${slug}`, destination: dest, permanent: true });
}

writeFileSync('redirects.generated.json', JSON.stringify(out, null, 2));
console.log(`${out.length} Redirects generiert`);
