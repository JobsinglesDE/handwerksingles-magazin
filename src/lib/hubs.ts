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

// Sektion 1: Handwerksberufe — Beruf-Hubs (DFS-validiert, nur Hubs mit Content).
// Welle 2 LIVE 2026-06-12 (Head-Volumen/mo): friseur 550k, schornsteinfeger 27.1k, metallbauer 22.2k,
// fliesenleger 18.1k, stuckateur/steinmetz/schweißer/gerüstbauer je 14.8k, maler-lackierer 8.1k, shk 6.6k.
export const BERUF_HUBS: Record<string, Hub> = {
  'elektriker': {
    slug: 'handwerksberufe/elektriker',
    title: 'Elektriker ❤️ — Ausbildung, Gehalt & Alltag',
    description:
      'Berufsbild Elektriker: Ausbildung, Gehalt und der Alltag zwischen Baustelle und Kundendienst — plus Dating-Tipps für Elektro-Singles.',
    seoTitle: 'Elektriker: Ausbildung, Gehalt & Alltag',
    seoDescription:
      'Berufsbild Elektriker: Ausbildung, Gehalt, Karrierewege und der Arbeitsalltag — und warum Elektriker bei der Partnersuche punkten.',
  },
  'kfz-mechatroniker': {
    slug: 'handwerksberufe/kfz-mechatroniker',
    title: 'KFZ-Mechatroniker ❤️ — Ausbildung, Gehalt & Werkstatt',
    description:
      'Berufsbild KFZ-Mechatroniker: Ausbildung, Gehalt und das Leben in der Werkstatt — plus Partnersuche-Tipps für Schrauber-Singles.',
    seoTitle: 'KFZ-Mechatroniker: Gehalt & Ausbildung',
    seoDescription:
      'KFZ-Mechatroniker werden: Ausbildung, Gehalt und Werkstatt-Alltag — kompakt erklärt, plus Dating-Tipps für Schrauber.',
  },
  'dachdecker': {
    slug: 'handwerksberufe/dachdecker',
    title: 'Dachdecker ❤️ — Ausbildung, Gehalt & Höhenluft',
    description:
      'Berufsbild Dachdecker: Ausbildung, Gehalt und der Alltag über den Dächern — und warum Dachdecker-Singles gefragte Partner sind.',
    seoTitle: 'Dachdecker: Ausbildung, Gehalt & Alltag',
    seoDescription:
      'Dachdecker werden: Ausbildung, Gehalt und der Arbeitsalltag in luftiger Höhe — plus Partnersuche für Dachdecker-Singles.',
  },
  'tischler': {
    slug: 'handwerksberufe/tischler',
    title: 'Tischler & Schreiner ❤️ — Ausbildung, Gehalt & Holz',
    description:
      'Berufsbild Tischler (Schreiner): Ausbildung, Gehalt und das Handwerk mit Holz — plus Dating-Tipps für Holz-Profis.',
    seoTitle: 'Tischler & Schreiner: Gehalt & Ausbildung',
    seoDescription:
      'Tischler oder Schreiner werden: Ausbildung, Gehalt und Karriere im Holzhandwerk — und warum Tischler gute Partner sind.',
  },
  'zimmermann': {
    slug: 'handwerksberufe/zimmermann',
    title: 'Zimmermann ❤️ — Ausbildung, Gehalt & Walz',
    description:
      'Berufsbild Zimmermann: Ausbildung, Gehalt, Wanderjahre auf der Walz — und die Partnersuche zwischen Baustelle und Tradition.',
    seoTitle: 'Zimmermann: Ausbildung, Gehalt & Walz',
    seoDescription:
      'Zimmermann werden: Ausbildung, Gehalt und die Tradition der Walz — Berufsbild kompakt plus Dating-Tipps für Zimmerer.',
  },
  'maurer': {
    slug: 'handwerksberufe/maurer',
    title: 'Maurer ❤️ — Ausbildung, Gehalt & Baustelle',
    description:
      'Berufsbild Maurer: Ausbildung, Gehalt und der Alltag auf dem Bau — plus Partnersuche-Tipps für Bau-Singles.',
    seoTitle: 'Maurer: Ausbildung, Gehalt & Baustelle',
    seoDescription:
      'Maurer werden: Ausbildung, Gehalt und Karriere auf dem Bau — Berufsbild kompakt, plus Dating für Handwerker-Singles.',
  },
  'anlagenmechaniker-shk': {
    slug: 'handwerksberufe/anlagenmechaniker-shk',
    title: 'Anlagenmechaniker SHK ❤️ — Ausbildung, Gehalt & Wärmepumpe',
    description:
      'Berufsbild Anlagenmechaniker SHK (Klempner, Heizungsbauer): Ausbildung, Gehalt und der Wärmepumpen-Boom — plus Dating-Tipps für SHK-Singles.',
    seoTitle: 'Anlagenmechaniker SHK: Gehalt & Ausbildung',
    seoDescription:
      'Anlagenmechaniker SHK (Klempner/Heizungsbauer): Ausbildung, Gehalt nach Region und Karrierewege bis zum Meister. Aktuelle Zahlen 2026.',
  },
  'fliesenleger': {
    slug: 'handwerksberufe/fliesenleger',
    title: 'Fliesenleger ❤️ — Ausbildung, Gehalt & Meisterpflicht',
    description:
      'Berufsbild Fliesenleger: Ausbildung, Gehalt und was die Meisterpflicht seit 2020 bedeutet — plus Partnersuche-Tipps für Ausbau-Singles.',
    seoTitle: 'Fliesenleger: Ausbildung, Gehalt & Meister',
    seoDescription:
      'Fliesenleger werden: Ausbildungsdauer, Gehalt laut Entgeltatlas, Tarifvertrag Bau und Meisterpflicht — alle Fakten kompakt.',
  },
  'friseur': {
    slug: 'handwerksberufe/friseur',
    title: 'Friseur ❤️ — Ausbildung, Gehalt & Salon',
    description:
      'Berufsbild Friseur und Friseurin: Ausbildung, Gehalt und der Salon-Alltag — plus Dating-Tipps für Friseur-Singles.',
    seoTitle: 'Friseur: Ausbildung, Gehalt & Karriere',
    seoDescription:
      'Friseur oder Friseurin werden: Ausbildungsdauer, Vergütung je Lehrjahr, Gehalt nach Erfahrung und Karrierewege bis zum Meister. Zahlen 2026.',
  },
  'geruestbauer': {
    slug: 'handwerksberufe/geruestbauer',
    title: 'Gerüstbauer ❤️ — Ausbildung, Gehalt & Höhenarbeit',
    description:
      'Berufsbild Gerüstbauer: Ausbildung, Gehalt und der Alltag in der Kolonne — und warum Gerüstbauer-Singles anpacken können.',
    seoTitle: 'Gerüstbauer: Ausbildung, Gehalt & Alltag',
    seoDescription:
      'Gerüstbauer werden: Ausbildung (3 Jahre), Gehalt nach Tarif, Höhenarbeit und Aufstiegswege — Berufsbild kompakt mit aktuellen Zahlen.',
  },
  'maler-lackierer': {
    slug: 'handwerksberufe/maler-lackierer',
    title: 'Maler & Lackierer ❤️ — Ausbildung, Gehalt & Fachrichtungen',
    description:
      'Berufsbild Maler und Lackierer: Ausbildung, Gehalt und drei Fachrichtungen — plus Partnersuche-Tipps für Maler-Singles.',
    seoTitle: 'Maler & Lackierer: Gehalt & Ausbildung',
    seoDescription:
      'Maler und Lackierer werden: Fachrichtungen, Ausbildung, Gehalt nach Region und warum WDVS den Beruf zum Wachstumsberuf macht.',
  },
  'metallbauer': {
    slug: 'handwerksberufe/metallbauer',
    title: 'Metallbauer ❤️ — Ausbildung, Gehalt & Fachrichtungen',
    description:
      'Berufsbild Metallbauer (früher Schlosser): Ausbildung, Gehalt und drei Fachrichtungen — plus Dating-Tipps für Metall-Singles.',
    seoTitle: 'Metallbauer: Ausbildung, Gehalt & Karriere',
    seoDescription:
      'Metallbauer (früher Schlosser): Fachrichtungen, Ausbildungsdauer, Gehalt nach Region und Karrierewege bis zum Meister. Zahlen 2026.',
  },
  'schornsteinfeger': {
    slug: 'handwerksberufe/schornsteinfeger',
    title: 'Schornsteinfeger ❤️ — Ausbildung, Gehalt & Kehrbezirk',
    description:
      'Berufsbild Schornsteinfeger: Ausbildung, Tarif-Gehalt und der Weg zum eigenen Kehrbezirk — plus Dating-Tipps für Glücksbringer.',
    seoTitle: 'Schornsteinfeger: Gehalt & Ausbildung',
    seoDescription:
      'Schornsteinfeger werden: Ausbildung (3 Jahre), Gehalt nach Tarifstufe, Feuerstättenschau und Weg zum Kehrbezirk. Tarifzahlen 2026.',
  },
  'schweisser': {
    slug: 'handwerksberufe/schweisser',
    title: 'Schweißer ❤️ — Qualifikation, Gehalt & Verfahren',
    description:
      'Berufsbild Schweißer: DVS-Qualifikation statt klassischer Lehre, Gehalt nach Verfahren und Montage — plus Dating-Tipps für Schweißer-Singles.',
    seoTitle: 'Schweißer: Qualifikation, Gehalt & Karriere',
    seoDescription:
      'Schweißer werden: DVS-Lehrgänge, Schweißerprüfung, Gehalt nach Verfahren (MAG/WIG) und Montage-Zulagen. Aktuelle Zahlen 2026.',
  },
  'steinmetz': {
    slug: 'handwerksberufe/steinmetz',
    title: 'Steinmetz ❤️ — Ausbildung, Gehalt & Denkmalpflege',
    description:
      'Berufsbild Steinmetz: Ausbildung, Gehalt und das Handwerk zwischen Grabmal, Fassade und Denkmalpflege — plus Dating-Tipps.',
    seoTitle: 'Steinmetz: Ausbildung, Gehalt & Karriere',
    seoDescription:
      'Steinmetz werden: Fachrichtungen, Ausbildungsdauer, Gehalt nach Erfahrung und Meisterpflicht. Aktuelle Zahlen aus dem Entgeltatlas.',
  },
  'stuckateur': {
    slug: 'handwerksberufe/stuckateur',
    title: 'Stuckateur ❤️ — Ausbildung, Gehalt & Ausbau',
    description:
      'Berufsbild Stuckateur: Ausbildung, Gehalt und das Spektrum von Stuck-Restaurierung bis Fassadendämmung — plus Dating-Tipps.',
    seoTitle: 'Stuckateur: Ausbildung, Gehalt & Karriere',
    seoDescription:
      'Stuckateur werden: Tätigkeiten, Ausbildungsdauer, Gehalt nach Region und Karrierewege bis zum Meister. Aktuelle Zahlen 2026.',
  },
  // Welle 3 (2026-06-12): gebäudereiniger 22.2k, hörakustiker 9.9k, zahntechniker 8.1k (gehalt 4.4k!),
  // karosseriebauer 8.1k, raumausstatter 8.1k, augenoptiker 6.6k, landschaftsgärtner/straßenbauer/glaser/bodenleger je 5.4k.
  'augenoptiker': {
    slug: 'handwerksberufe/augenoptiker',
    title: 'Augenoptiker ❤️ — Ausbildung, Gehalt & Optometrie',
    description:
      'Berufsbild Augenoptiker: Ausbildung, Gehalt und das Gesundheitshandwerk zwischen Werkstatt und Beratung — plus Dating-Tipps.',
    seoTitle: 'Augenoptiker: Ausbildung, Gehalt & Optometrie',
    seoDescription:
      'Augenoptiker im Überblick: Aufgaben, Gehalt, Ausbildung und Karrierewege bis zum Meister oder Optometristen. Aktuelle Zahlen 2026.',
  },
  'bodenleger': {
    slug: 'handwerksberufe/bodenleger',
    title: 'Bodenleger ❤️ — Ausbildung, Gehalt & Beläge',
    description:
      'Berufsbild Bodenleger: Ausbildung, Gehalt und der Alltag zwischen Vinyl, Teppich und Linoleum — plus Dating-Tipps.',
    seoTitle: 'Bodenleger: Ausbildung, Gehalt & Beruf',
    seoDescription:
      'Bodenleger werden: Tätigkeiten, Median-Gehalt, 3-jährige Ausbildung und Abgrenzung zum Parkettleger. Aktuelle Fakten zum Beruf.',
  },
  'gebaeudereiniger': {
    slug: 'handwerksberufe/gebaeudereiniger',
    title: 'Gebäudereiniger ❤️ — Ausbildung, Gehalt & Karriere',
    description:
      'Berufsbild Gebäudereiniger: Deutschlands beschäftigungsstärkstes Handwerk — Ausbildung, Branchenmindestlohn und Aufstieg bis zum Meister.',
    seoTitle: 'Gebäudereiniger: Ausbildung & Gehalt',
    seoDescription:
      'Gebäudereiniger — Deutschlands beschäftigungsstärkstes Handwerk: Branchenmindestlohn, Ausbildung und Karriere bis zum Meister.',
  },
  'glaser': {
    slug: 'handwerksberufe/glaser',
    title: 'Glaser ❤️ — Ausbildung, Gehalt & Glasbau',
    description:
      'Berufsbild Glaser: Ausbildung, Gehalt und zwei Fachrichtungen von Bleiverglasung bis Glasfassade — plus Dating-Tipps.',
    seoTitle: 'Glaser: Ausbildung, Gehalt & Karriere',
    seoDescription:
      'Glaser werden: Fachrichtungen, Ausbildungsdauer, Gehalt nach Entgeltatlas und Karrierewege bis zum Glasermeister. Zahlen 2026.',
  },
  'hoerakustiker': {
    slug: 'handwerksberufe/hoerakustiker',
    title: 'Hörakustiker ❤️ — Ausbildung, Gehalt & Gesundheitshandwerk',
    description:
      'Berufsbild Hörakustiker: Ausbildung in Lübeck, Gehalt und das Gesundheitshandwerk mit Zukunft — plus Dating-Tipps.',
    seoTitle: 'Hörakustiker: Ausbildung, Gehalt & Karriere',
    seoDescription:
      'Hörakustiker — Gesundheitshandwerk mit Meisterpflicht: Ausbildung in Lübeck, Gehalt laut Entgeltatlas, Karriere bis zur eigenen Filiale.',
  },
  'karosseriebauer': {
    slug: 'handwerksberufe/karosseriebauer',
    title: 'Karosseriebauer ❤️ — Ausbildung, Gehalt & KFZ-Handwerk',
    description:
      'Berufsbild Karosserie- und Fahrzeugbaumechaniker: Ausbildung, Gehalt und der Wandel zu Alu- und Carbon-Karosserien — plus Dating-Tipps.',
    seoTitle: 'Karosseriebauer: Ausbildung, Gehalt & Beruf',
    seoDescription:
      'Karosseriebauer: Fachrichtungen, Ausbildungsdauer, Gehalt nach Region und Karrierewege bis zum Meister. Aktuelle Entgeltatlas-Zahlen.',
  },
  'landschaftsgaertner': {
    slug: 'handwerksberufe/landschaftsgaertner',
    title: 'Landschaftsgärtner ❤️ — Ausbildung, Gehalt & GaLaBau',
    description:
      'Berufsbild Landschaftsgärtner: Ausbildung im GaLaBau, Gehalt und Klimaanpassung als Wachstumsfeld — plus Dating-Tipps.',
    seoTitle: 'Landschaftsgärtner: Ausbildung & Gehalt',
    seoDescription:
      'Landschaftsgärtner werden: Ausbildung im GaLaBau, Gehalt nach Entgeltatlas und Karrierewege bis zum Meister. Aktuelle Zahlen 2026.',
  },
  'raumausstatter': {
    slug: 'handwerksberufe/raumausstatter',
    title: 'Raumausstatter ❤️ — Ausbildung, Gehalt & Gestaltung',
    description:
      'Berufsbild Raumausstatter: Ausbildung, Gehalt und Kreativarbeit zwischen Boden, Polster und Wand — plus Dating-Tipps.',
    seoTitle: 'Raumausstatter: Ausbildung, Gehalt & Beruf',
    seoDescription:
      'Raumausstatter werden: Schwerpunkte, Ausbildungsdauer, Gehalt nach Entgeltatlas und Karrierewege bis zum Meister. Alle Fakten kompakt.',
  },
  'strassenbauer': {
    slug: 'handwerksberufe/strassenbauer',
    title: 'Straßenbauer ❤️ — Ausbildung, Gehalt & Infrastruktur',
    description:
      'Berufsbild Straßenbauer: Ausbildung, Bau-Tarif-Gehalt und die Infrastruktur-Milliarden als Job-Garant — plus Dating-Tipps.',
    seoTitle: 'Straßenbauer: Ausbildung, Gehalt & Jobs',
    seoDescription:
      'Straßenbauer werden: Ausbildung, Tarif-Vergütung, Median-Gehalt und warum Infrastruktur-Investitionen den Beruf sichern. Zahlen 2026.',
  },
  'zahntechniker': {
    slug: 'handwerksberufe/zahntechniker',
    title: 'Zahntechniker ❤️ — Ausbildung, Gehalt & Dentallabor',
    description:
      'Berufsbild Zahntechniker: Ausbildung, Gehalt und Präzisionsarbeit zwischen Handwerk und CAD/CAM — plus Dating-Tipps.',
    seoTitle: 'Zahntechniker: Ausbildung, Gehalt & Labor',
    seoDescription:
      'Zahntechniker-Beruf: Was Zahntechniker machen, was sie verdienen, wie die Ausbildung läuft und welche Wege der Meisterbrief öffnet.',
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
  'handwerksberufe': {
    slug: 'handwerksberufe',
    title: 'Handwerksberufe ❤️ — Elektriker, Dachdecker, Tischler & Co.',
    description:
      'Berufe im Handwerk: Ausbildung, Gehalt und Alltag von Anlagenmechaniker bis Zimmermann — 26 Handwerksberufe im Überblick.',
    seoTitle: 'Handwerksberufe: Ausbildung & Gehalt',
    seoDescription:
      '26 Handwerksberufe im Überblick: Elektriker, Friseur, Zahntechniker, Gebäudereiniger, Metallbauer & Co. — Ausbildung, Gehalt, Karriere.',
  },
  'handwerker': {
    slug: 'handwerker',
    title: 'Promi-Handwerker ❤️ — Craftfluencer im Porträt',
    description:
      'Die bekanntesten Gesichter des Handwerks: Craftfluencer wie tschulique und Dachdeckerin Chiara — Steckbriefe, Karriere und alle Artikel.',
    seoTitle: 'Promi-Handwerker: Craftfluencer im Porträt',
    seoDescription:
      'Promi-Handwerker & Craftfluencer im Porträt: tschulique, Dachdeckerin Chiara, Jonas Winkler & Co. — Steckbriefe und News.',
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
