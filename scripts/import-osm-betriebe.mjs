// scripts/import-osm-betriebe.mjs
//
// Importiert Handwerks-/Dienstleistungs-Betriebe aus OpenStreetMap (Overpass)
// fuer eine Stadt und schreibt src/data/betriebe/<stadt>.json.
//
// Datenquelle: OpenStreetMap, Lizenz ODbL — Attribution Pflicht (steckt im JSON
// und wird auf jeder Verzeichnis-Seite gerendert). KEIN Google Places / Cylex.
//
// Lauf:  node scripts/import-osm-betriebe.mjs konstanz
//
// Die Gewerk-Slugs hier MUESSEN mit DIRECTORY_GEWERKE in src/lib/staedte.ts
// uebereinstimmen (das Script validiert das am Ende und warnt bei Drift).

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Stadt-Konfiguration
// ---------------------------------------------------------------------------
const CITIES = {
  konstanz: { name: 'Konstanz', citySlug: 'konstanz', bundesland: 'baden-wuerttemberg' },
};

// ---------------------------------------------------------------------------
// OSM-Tag -> Verzeichnis-Gewerk-Slug
// schluesseldienst (key_cutter/locksmith) BEWUSST NICHT gemappt -> Scammer/Marken-Risiko.
// ---------------------------------------------------------------------------
const CRAFT_MAP = {
  electrician: 'elektriker',
  plumber: 'sanitaer',
  hvac: 'sanitaer',
  heating_engineer: 'sanitaer',
  roofer: 'dachdecker',
  carpenter: 'zimmerer',
  joiner: 'schreiner',
  cabinet_maker: 'schreiner',
  painter: 'maler',
  tiler: 'fliesenleger',
  plasterer: 'stuckateur',
  metal_construction: 'metallbauer',
  blacksmith: 'metallbauer',
  scaffolder: 'geruestbauer',
  glaziery: 'glaser',
  chimney_sweeper: 'schornsteinfeger',
  stonemason: 'steinmetz',
  floorer: 'bodenleger',
  parquet_layer: 'bodenleger',
  gardener: 'garten',
  jeweller: 'juwelier',
  goldsmith: 'juwelier',
  watchmaker: 'uhrmacher',
  shoemaker: 'schuhmacher',
  saddler: 'sattler',
  optician: 'optiker',
};
const SHOP_MAP = {
  hairdresser: 'friseur',
  beauty: 'kosmetik',
  cosmetics: 'kosmetik',
  car_repair: 'kfz',
  optician: 'optiker',
  jewelry: 'juwelier',
  tattoo: 'tattoo',
};

// Muss zu src/lib/staedte.ts DIRECTORY_GEWERKE passen (Drift-Check unten):
const KNOWN_SLUGS = new Set([
  'elektriker', 'sanitaer', 'dachdecker', 'zimmerer', 'schreiner', 'maler',
  'fliesenleger', 'stuckateur', 'metallbauer', 'geruestbauer', 'glaser',
  'schornsteinfeger', 'steinmetz', 'bodenleger', 'garten', 'juwelier',
  'uhrmacher', 'schuhmacher', 'sattler', 'optiker', 'friseur', 'kosmetik',
  'kfz', 'tattoo',
]);

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

// ---------------------------------------------------------------------------
// Helfer
// ---------------------------------------------------------------------------
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, '-und-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function gewerkForTags(tags) {
  if (tags.craft && CRAFT_MAP[tags.craft]) return CRAFT_MAP[tags.craft];
  if (tags.shop && SHOP_MAP[tags.shop]) return SHOP_MAP[tags.shop];
  return null;
}

function buildQuery(cityName) {
  // Area-by-name (admin_level 8) -> kein bbox-Uebergriff ueber die CH-Grenze.
  const shopFilter = '^(hairdresser|beauty|cosmetics|car_repair|optician|jewelry|tattoo)$';
  return `[out:json][timeout:90];
area["name"="${cityName}"]["admin_level"="8"]["boundary"="administrative"]->.a;
(
  nwr["craft"](area.a);
  nwr["shop"~"${shopFilter}"](area.a);
);
out center tags;`;
}

async function fetchOverpass(query) {
  let lastErr;
  for (const ep of OVERPASS_ENDPOINTS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'handwerksingles-magazin OSM-Import (Kontakt: jobsingles@gmail.com)',
          },
          body: 'data=' + encodeURIComponent(query),
        });
        if (res.status === 429 || res.status === 504) {
          console.warn(`  ${ep} -> ${res.status}, retry...`);
          await new Promise((r) => setTimeout(r, 3000 * attempt));
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json.elements) throw new Error('keine elements im Response');
        console.log(`  Overpass OK via ${ep} (${json.elements.length} Elemente)`);
        return json;
      } catch (e) {
        lastErr = e;
        console.warn(`  ${ep} Versuch ${attempt} fehlgeschlagen: ${e.message}`);
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      }
    }
  }
  throw new Error(`Alle Overpass-Endpoints fehlgeschlagen: ${lastErr?.message}`);
}

// ---------------------------------------------------------------------------
// Optional: fehlende Adressen via Nominatim reverse-geocoden (legal, OSM/ODbL)
// Validierung gegen OSM-Ground-Truth (Konstanz): ~96% Straße+Hausnr, 100% ≤40m.
// Akzeptanz-Filter: Hausnummer vorhanden UND Treffer ≤60m vom Node -> Ausreißer raus.
// ---------------------------------------------------------------------------
function haversine(la1, lo1, la2, lo2) {
  const R = 6371000, p = Math.PI / 180;
  const a = Math.sin(((la2 - la1) * p) / 2) ** 2 +
    Math.cos(la1 * p) * Math.cos(la2 * p) * Math.sin(((lo2 - lo1) * p) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

async function reverseGeocode(lat, lon) {
  const url = 'https://nominatim.openstreetmap.org/reverse?' +
    new URLSearchParams({ lat: String(lat), lon: String(lon), format: 'json', addressdetails: '1' });
  const res = await fetch(url, {
    headers: { 'User-Agent': 'handwerksingles-magazin OSM-Import (Kontakt: jobsingles@gmail.com)' },
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function geocodeMissing(betriebe, citySlug) {
  const cachePath = resolve(REPO, 'src/data/betriebe', `geocode-cache-${citySlug}.json`);
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, 'utf8')) : {};
  const missing = betriebe.filter((b) => !b.street && b.lat && b.lon);
  console.log(`\nGeocoding: ${missing.length} Betriebe ohne Adresse (Nominatim, max 1/s, ≤60m + Hausnr.)...`);
  let filled = 0, rejected = 0, fromCache = 0;
  for (const b of missing) {
    const key = `${b.osmType}/${b.osmId}`;
    let r = cache[key];
    if (r === undefined) {
      try {
        const d = await reverseGeocode(b.lat, b.lon);
        const a = d.address || {};
        const dist = haversine(b.lat, b.lon, parseFloat(d.lat), parseFloat(d.lon));
        r = (a.road && a.house_number && dist <= 60)
          ? { street: `${a.road} ${a.house_number}`, plz: a.postcode || null, city: a.city || a.town || a.village || null }
          : null;
        cache[key] = r;
        await new Promise((res) => setTimeout(res, 1100));
      } catch (e) {
        console.warn(`  geocode '${b.name}': ${e.message}`);
        r = null;
      }
    } else {
      fromCache++;
    }
    if (r) {
      b.street = r.street;
      if (r.plz && !b.plz) b.plz = r.plz;
      if (r.city) b.city = r.city;
      b.addressSource = 'nominatim';
      filled++;
    } else {
      rejected++;
    }
  }
  writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf8');
  console.log(`  Adressen ergänzt: ${filled} · verworfen (unsicher): ${rejected} · aus Cache: ${fromCache}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const citySlug = process.argv[2];
if (!citySlug || !CITIES[citySlug]) {
  console.error(`Stadt unbekannt. Verfuegbar: ${Object.keys(CITIES).join(', ')}`);
  process.exit(1);
}
const city = CITIES[citySlug];

console.log(`OSM-Import: ${city.name} (${city.bundesland})`);
const data = await fetchOverpass(buildQuery(city.name));

const seen = new Map(); // dedup-key -> true
const slugCounts = new Map();
const betriebe = [];
let skipped = 0;
let nameless = 0;

for (const el of data.elements) {
  const tags = el.tags || {};
  const name = (tags.name || '').trim();
  if (!name) { nameless++; continue; }
  const gewerk = gewerkForTags(tags);
  if (!gewerk) { skipped++; continue; }

  const street = [tags['addr:street'], tags['addr:housenumber']].filter(Boolean).join(' ').trim();
  const dedupKey = `${slugify(name)}|${slugify(street)}`;
  if (seen.has(dedupKey)) continue;
  seen.set(dedupKey, true);

  const lat = el.lat ?? el.center?.lat ?? null;
  const lon = el.lon ?? el.center?.lon ?? null;

  betriebe.push({
    slug: '', // unten vergeben (dedupe pro gewerk)
    name,
    gewerk,
    street: street || undefined,
    plz: tags['addr:postcode'] || undefined,
    city: tags['addr:city'] || city.name,
    lat,
    lon,
    phone: tags.phone || tags['contact:phone'] || undefined,
    website: tags.website || tags['contact:website'] || undefined,
    openingHours: tags.opening_hours || undefined,
    osmType: el.type,
    osmId: el.id,
    addressSource: street ? 'osm' : undefined,
  });
  slugCounts.set(gewerk, (slugCounts.get(gewerk) || 0) + 1);
}

// Optional: fehlende Adressen via Nominatim ergänzen (--geocode)
if (process.argv.includes('--geocode')) {
  await geocodeMissing(betriebe, citySlug);
}

// Slugs vergeben, eindeutig je Stadt
const usedSlugs = new Map();
for (const b of betriebe) {
  let base = slugify(b.name) || `betrieb-${b.osmId}`;
  let slug = base;
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
  usedSlugs.set(slug, true);
  b.slug = slug;
}

betriebe.sort((a, b) => a.gewerk.localeCompare(b.gewerk) || a.name.localeCompare(b.name, 'de'));

const out = {
  city: city.name,
  citySlug: city.citySlug,
  bundesland: city.bundesland,
  attribution: '© OpenStreetMap-Mitwirkende (ODbL)',
  generatedAt: new Date().toISOString(),
  betriebe,
};

const outDir = resolve(REPO, 'src/data/betriebe');
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, `${citySlug}.json`);
writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');

// Summary
console.log(`\n=== ${city.name}: ${betriebe.length} Betriebe geschrieben -> ${outPath}`);
console.log(`    (${nameless} ohne Namen, ${skipped} ohne Gewerk-Mapping uebersprungen)\n`);
const sorted = [...slugCounts.entries()].sort((a, b) => b[1] - a[1]);
for (const [g, c] of sorted) {
  const known = KNOWN_SLUGS.has(g) ? '' : '  ⚠️ NICHT in KNOWN_SLUGS (Drift!)';
  console.log(`    ${String(c).padStart(3)}  ${g}${known}`);
}
console.log('\nODbL: Daten © OpenStreetMap-Mitwirkende — Attribution auf jeder Seite Pflicht.');
