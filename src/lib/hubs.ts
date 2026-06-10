// src/lib/hubs.ts
// Single Source of Truth für alle Hub-/Kategorie-Metadaten.
// REGEL (Tommy): title (H1) enthaelt ❤️; seoTitle OHNE ❤️ (layout-Template "%s ❤️" haengt es an).
// seoTitle-Basis ≤57 Zeichen (final inkl. Herz ≤60), seoDescription ≤160.

export type Hub = {
  slug: string; // Pfad-Segment relativ zu basePath, ohne führenden Slash
  title: string; // H1 / Anzeigename, MUSS ❤️ enthalten
  description: string; // Intro-Absatz auf der Hub-Seite
  seoTitle: string; // <title>-Basis OHNE Herz
  seoDescription: string; // meta description, ≤160 Zeichen
};

// Sektion 1: Berufsbilder — Beruf-Hubs (DFS-validiert, nur Hubs mit Content).
// Welle 2 (erst mit Artikeln freischalten): maler-lackierer 880, anlagenmechaniker-shk 720, stuckateur 480.
export const BERUF_HUBS: Record<string, Hub> = {
  'elektriker': {
    slug: 'berufsbilder/elektriker',
    title: 'Elektriker ❤️ — Ausbildung, Gehalt & Alltag',
    description:
      'Berufsbild Elektriker: Ausbildung, Gehalt und der Alltag zwischen Baustelle und Kundendienst — plus Dating-Tipps für Elektro-Singles.',
    seoTitle: 'Elektriker: Ausbildung, Gehalt & Alltag',
    seoDescription:
      'Berufsbild Elektriker: Ausbildung, Gehalt, Karrierewege und der Arbeitsalltag — und warum Elektriker bei der Partnersuche punkten.',
  },
  'kfz-mechatroniker': {
    slug: 'berufsbilder/kfz-mechatroniker',
    title: 'KFZ-Mechatroniker ❤️ — Ausbildung, Gehalt & Werkstatt',
    description:
      'Berufsbild KFZ-Mechatroniker: Ausbildung, Gehalt und das Leben in der Werkstatt — plus Partnersuche-Tipps für Schrauber-Singles.',
    seoTitle: 'KFZ-Mechatroniker: Gehalt & Ausbildung',
    seoDescription:
      'KFZ-Mechatroniker werden: Ausbildung, Gehalt und Werkstatt-Alltag — kompakt erklärt, plus Dating-Tipps für Schrauber.',
  },
  'dachdecker': {
    slug: 'berufsbilder/dachdecker',
    title: 'Dachdecker ❤️ — Ausbildung, Gehalt & Höhenluft',
    description:
      'Berufsbild Dachdecker: Ausbildung, Gehalt und der Alltag über den Dächern — und warum Dachdecker-Singles gefragte Partner sind.',
    seoTitle: 'Dachdecker: Ausbildung, Gehalt & Alltag',
    seoDescription:
      'Dachdecker werden: Ausbildung, Gehalt und der Arbeitsalltag in luftiger Höhe — plus Partnersuche für Dachdecker-Singles.',
  },
  'tischler': {
    slug: 'berufsbilder/tischler',
    title: 'Tischler & Schreiner ❤️ — Ausbildung, Gehalt & Holz',
    description:
      'Berufsbild Tischler (Schreiner): Ausbildung, Gehalt und das Handwerk mit Holz — plus Dating-Tipps für Holz-Profis.',
    seoTitle: 'Tischler & Schreiner: Gehalt & Ausbildung',
    seoDescription:
      'Tischler oder Schreiner werden: Ausbildung, Gehalt und Karriere im Holzhandwerk — und warum Tischler gute Partner sind.',
  },
  'zimmermann': {
    slug: 'berufsbilder/zimmermann',
    title: 'Zimmermann ❤️ — Ausbildung, Gehalt & Walz',
    description:
      'Berufsbild Zimmermann: Ausbildung, Gehalt, Wanderjahre auf der Walz — und die Partnersuche zwischen Baustelle und Tradition.',
    seoTitle: 'Zimmermann: Ausbildung, Gehalt & Walz',
    seoDescription:
      'Zimmermann werden: Ausbildung, Gehalt und die Tradition der Walz — Berufsbild kompakt plus Dating-Tipps für Zimmerer.',
  },
  'maurer': {
    slug: 'berufsbilder/maurer',
    title: 'Maurer ❤️ — Ausbildung, Gehalt & Baustelle',
    description:
      'Berufsbild Maurer: Ausbildung, Gehalt und der Alltag auf dem Bau — plus Partnersuche-Tipps für Bau-Singles.',
    seoTitle: 'Maurer: Ausbildung, Gehalt & Baustelle',
    seoDescription:
      'Maurer werden: Ausbildung, Gehalt und Karriere auf dem Bau — Berufsbild kompakt, plus Dating für Handwerker-Singles.',
  },
};

// Sektion 2: Singles (Conversion-Hub, Pillar + 13 thematische Spokes)
export const SINGLE_HUB: Hub = {
  slug: 'singles-partnersuche',
  title: 'Handwerker-Singles ❤️ — Partnersuche für das Handwerk',
  description:
    'Partnersuche für Handwerkerinnen und Handwerker: früher Feierabend, Montage, Familienbetrieb — und trotzdem die große Liebe finden.',
  seoTitle: 'Handwerker-Singles: Partnersuche Handwerk',
  seoDescription:
    'Handwerker-Singles: Partnersuche für Elektriker, Dachdecker, Tischler & Co. Dating trotz Montage und früher Arbeitszeiten.',
};

// Sektion-Index-Hubs (oberste Ebene)
export const SECTION_HUBS: Record<string, Hub> = {
  'berufsbilder': {
    slug: 'berufsbilder',
    title: 'Handwerksberufe ❤️ — Elektriker, Dachdecker, Tischler & Co.',
    description:
      'Berufe im Handwerk: Ausbildung, Gehalt und Alltag von Elektriker bis Zimmermann — alle Berufsbilder im Überblick.',
    seoTitle: 'Handwerksberufe: Ausbildung & Gehalt',
    seoDescription:
      'Handwerksberufe im Überblick: Elektriker, KFZ-Mechatroniker, Dachdecker, Tischler, Zimmermann, Maurer — Ausbildung, Gehalt, Karriere.',
  },
  'handwerker': {
    slug: 'handwerker',
    title: 'Handwerker im Porträt ❤️ — Craftfluencer & Promis',
    description:
      'Die bekanntesten Gesichter des Handwerks: Craftfluencer wie tschulique und Dachdeckerin Chiara — Steckbriefe, Karriere und alle Artikel.',
    seoTitle: 'Handwerker im Porträt: Craftfluencer',
    seoDescription:
      'Craftfluencer & Handwerk-Promis im Porträt: tschulique, Dachdeckerin Chiara, Jonas Winkler & Co. — Steckbriefe und News.',
  },
  'handwerk-news': {
    slug: 'handwerk-news',
    title: 'Handwerk-News ❤️ — Craftfluencer, Trends & Promis',
    description:
      'Aktuelles aus dem Handwerk: Craftfluencer-News, Social-Media-Stars vom Bau und Promis mit Handwerkswurzeln.',
    seoTitle: 'Handwerk-News: Craftfluencer & Trends',
    seoDescription:
      'Handwerk-News: die Social-Media-Stars vom Bau, Craftfluencer-Porträts und Promis mit Handwerkswurzeln — immer aktuell.',
  },
};

// Alle Hubs flach (für Sitemap + QC)
export const ALL_HUBS: Hub[] = [
  SINGLE_HUB,
  ...Object.values(SECTION_HUBS),
  ...Object.values(BERUF_HUBS),
];
