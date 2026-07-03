// Zentrale Registry für das Occupation/Salary-Schema auf handwerk Gehalt-Hubs.
// Skaliert den Rollout: neue Hubs = ein Eintrag hier (statt Slug-Branch in ArticleView).
// GESETZ: nur Entgeltatlas-verifizierte Zahlen (Direkt-Extract beruf/<id>), Schema==sichtbare Zahl.
// Rollout-Rezept für die restlichen ~35 Gehalt-Hubs: pro Beruf `tavily-research.py extract
// https://web.arbeitsagentur.de/entgeltatlas/beruf/<id>` → median/Q1/Q3 → Eintrag ergänzen,
// Zahl mit der sichtbaren Tabelle/FAQ des Artikels abgleichen (nie Prosa blind parsen).
import { ELEKTRONIKER_GEHALT_ROWS, ELEKTRONIKER_GEHALT_QUELLE } from './elektroniker-gehalt-daten';
import { KONDITOR_GEHALT_ROWS, KONDITOR_GEHALT_QUELLE } from './konditor-gehalt-daten';
import { METZGER_GEHALT_ROWS, METZGER_GEHALT_QUELLE } from './metzger-gehalt-daten';
import { BAECKER_GEHALT_ROWS, BAECKER_GEHALT_QUELLE } from './baecker-gehalt-daten';

export type GehaltRow = { gruppe: string; median: string; q1?: string; q3?: string };
export type GehaltEntry = { name: string; description: string; rows: GehaltRow[]; quelle: string };

export const HANDWERK_GEHALT_REGISTRY: Record<string, GehaltEntry> = {
  'elektroniker-gehalt': {
    name: 'Elektroniker / Elektronikerin',
    description: 'Median-Gehalt nach Fachrichtung (Entgeltatlas).',
    rows: ELEKTRONIKER_GEHALT_ROWS,
    quelle: ELEKTRONIKER_GEHALT_QUELLE,
  },
  'konditor-gehalt': {
    name: 'Konditor / Konditorin',
    description: 'Gehalt im Konditor-Handwerk (Geselle und Meister).',
    rows: KONDITOR_GEHALT_ROWS,
    quelle: KONDITOR_GEHALT_QUELLE,
  },
  'metzger-gehalt': {
    name: 'Fleischer / Metzger',
    description: 'Gehalt im Fleischer-Handwerk (Geselle und Meister).',
    rows: METZGER_GEHALT_ROWS,
    quelle: METZGER_GEHALT_QUELLE,
  },
  'baecker-gehalt': {
    name: 'Bäcker / Bäckerin',
    description: 'Gehalt im Bäcker-Handwerk (Geselle und Meister).',
    rows: BAECKER_GEHALT_ROWS,
    quelle: BAECKER_GEHALT_QUELLE,
  },
  'anlagenmechaniker-shk-gehalt': {
    name: 'Anlagenmechaniker/in – Sanitär, Heizung, Klima (SHK)',
    description: 'Median-Gehalt im SHK-Handwerk (Fachkraft).',
    // Entgeltatlas beruf/15625, direkt-verifiziert (Median 3.717, Q1 3.154, Q3 4.318).
    // Hinweis: Artikel-Prosa nannte 3.709 — Schema nutzt die verifizierte 3.717.
    rows: [
      { gruppe: 'Anlagenmechaniker/in – SHK (Fachkraft)', median: '3.717 €', q1: '3.154 €', q3: '4.318 €' },
    ],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (Anlagenmechaniker/in SHK, beruf/15625, Median, Vollzeit brutto), Stand 2024',
  },
  // Batch 2026-07-03 — Entgeltatlas direkt-verifiziert UND Artikel-konsistent (Schema==sichtbare Zahl):
  'dachdecker-gehalt': {
    name: 'Dachdecker/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Dachdecker/in', median: '3.611 €', q1: '3.156 €', q3: '4.070 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4051, Median, Vollzeit brutto), Stand 2024',
  },
  // ── Tranche 1 (2026-07-03): Direkt-Extract verifiziert UND Artikel-Zahl angeglichen (Schema==sichtbar) ──
  'zimmermann-gehalt': {
    name: 'Zimmerer / Zimmerin',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Zimmerer/Zimmerin', median: '3.636 €', q1: '3.190 €', q3: '4.100 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4007, Median, Vollzeit brutto), Stand 2024',
  },
  'landschaftsgaertner-gehalt': {
    name: 'Landschaftsgärtner/in (Garten- und Landschaftsbau)',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Gärtner/in – Garten- und Landschaftsbau', median: '3.256 €', q1: '2.762 €', q3: '3.799 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/585, Median, Vollzeit brutto), Stand 2024',
  },
  'elektriker-gehalt': {
    name: 'Elektroniker/in – Energie- und Gebäudetechnik',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft, Fachrichtung Energie- und Gebäudetechnik).',
    rows: [{ gruppe: 'Elektroniker/in – Energie- und Gebäudetechnik', median: '3.765 €', q1: '3.188 €', q3: '4.542 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/15637, Median, Vollzeit brutto), Stand 2024',
  },
  'augenoptiker-gehalt': {
    name: 'Augenoptiker/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Augenoptiker/in', median: '2.931 €', q1: '2.540 €', q3: '3.403 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/2629, Median, Vollzeit brutto), Stand 2024',
  },
  'hoerakustiker-gehalt': {
    name: 'Hörakustiker/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Hörakustiker/in', median: '2.964 €', q1: '2.560 €', q3: '3.763 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/129407, Median, Vollzeit brutto), Stand 2024',
  },
  'kosmetikerin-gehalt': {
    name: 'Kosmetiker/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Kosmetiker/in', median: '2.259 €', q1: '1.793 €', q3: '2.773 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/14672, Median, Vollzeit brutto), Stand 2024',
  },
  'raumausstatter-gehalt': {
    name: 'Raumausstatter/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Raumausstatter/in', median: '2.943 €', q1: '2.488 €', q3: '3.495 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4403, Median, Vollzeit brutto), Stand 2024',
  },
  'metallbauer-gehalt': {
    name: 'Metallbauer/in (Konstruktionstechnik)',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Metallbauer/in – Konstruktionstechnik', median: '3.606 €', q1: '3.047 €', q3: '4.294 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/14442, Median, Vollzeit brutto), Stand 2024',
  },
  'karosseriebauer-gehalt': {
    name: 'Karosseriebauer/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Karosserie- und Fahrzeugbaumechaniker/in', median: '3.588 €', q1: '2.966 €', q3: '4.537 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/15832, Median, Vollzeit brutto), Stand 2024',
  },
  'schweisser-gehalt': {
    name: 'Schweißer/in (Fachkraft Schweißtechnik)',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Schweißer/in – Anlagen- und Apparatebau', median: '3.697 €', q1: '3.079 €', q3: '4.430 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/2050, Median, Vollzeit brutto), Stand 2024',
  },
  'tischler-gehalt': {
    name: 'Tischler/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Tischler/in', median: '3.224 €', q1: '2.776 €', q3: '3.702 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4456, Median, Vollzeit brutto), Stand 2024',
  },
  // ── Tranche 2 (2026-07-03): Direkt-Extract verifiziert; Artikel-Zahl angeglichen bzw. Entgeltatlas eingeführt ──
  'bodenleger-gehalt': {
    name: 'Bodenleger/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Bodenleger/in (Bodenverlegung)', median: '2.957 €', q1: '2.544 €', q3: '3.432 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/132733, Median, Vollzeit brutto), Stand 2024',
  },
  'schaedlingsbekaempfer-gehalt': {
    name: 'Schädlingsbekämpfer/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Schädlingsbekämpfer/in', median: '3.369 €', q1: '2.895 €', q3: '3.939 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/27397, Median, Vollzeit brutto), Stand 2024',
  },
  'zweiradmechatroniker-gehalt': {
    name: 'Zweiradmechatroniker/in (Fahrradtechnik)',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft, Fachrichtung Fahrradtechnik).',
    rows: [{ gruppe: 'Zweiradmechatroniker/in – Fahrradtechnik', median: '2.741 €', q1: '2.411 €', q3: '3.160 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/124407, Median, Vollzeit brutto), Stand 2024',
  },
  'stuckateur-gehalt': {
    name: 'Stuckateur/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Stuckateur/in (Gipsbildhauer/in)', median: '3.352 €', q1: '2.954 €', q3: '3.781 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4258, Median, Vollzeit brutto), Stand 2024',
  },
  'goldschmied-gehalt': {
    name: 'Goldschmied/in (Schmuck)',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft, Fachrichtung Schmuck).',
    rows: [{ gruppe: 'Goldschmied/in – Schmuck', median: '2.959 €', q1: '2.359 €', q3: '3.734 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/2584, Median, Vollzeit brutto), Stand 2024',
  },
  'fliesenleger-gehalt': {
    name: 'Fliesenleger/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Fliesen-, Platten- und Mosaikleger/in', median: '3.494 €', q1: '3.025 €', q3: '3.983 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4320, Median, Vollzeit brutto), Stand 2024',
  },
  // ── Tranche 3 (2026-07-03): Direkt-Extract verifiziert (Triangulation Median+Q1+Q3); Artikel-Zahl angeglichen ──
  'maurer-gehalt': {
    name: 'Maurer/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    // Wichtig: beruf/3935 = allgemeine Maurer/in-Fachkraft (NICHT beruf/3972 = Restaurierung 5.170!).
    rows: [{ gruppe: 'Maurer/in', median: '3.709 €', q1: '3.144 €', q3: '4.177 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/3935, Median, Vollzeit brutto), Stand 2024',
  },
  'maler-lackierer-gehalt': {
    name: 'Maler/in und Lackierer/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Maler/in und Lackierer/in', median: '3.211 €', q1: '2.843 €', q3: '3.536 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/134953, Median, Vollzeit brutto), Stand 2024',
  },
  'zahntechniker-gehalt': {
    name: 'Zahntechniker/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Zahntechniker/in', median: '3.109 €', q1: '2.553 €', q3: '3.853 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/2618, Median, Vollzeit brutto), Stand 2024',
  },
  'glaser-gehalt': {
    name: 'Glaser/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft; beide Fachrichtungen gleichauf).',
    rows: [{ gruppe: 'Glaser/in (Verglasung/Glasbau & Fenster-/Glasfassadenbau)', median: '3.360 €', q1: '2.868 €', q3: '3.892 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4362, Median, Vollzeit brutto), Stand 2024',
  },
  'kfz-mechatroniker-gehalt': {
    name: 'Kfz-Mechatroniker/in (Pkw-Technik)',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft, Fachrichtung Pkw-Technik).',
    rows: [{ gruppe: 'Kfz-Mechatroniker/in – Pkw-Technik', median: '3.588 €', q1: '2.966 €', q3: '4.537 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/14798, Median, Vollzeit brutto), Stand 2024',
  },
  // ── Tranche 3b (2026-07-03): verifiziert + artikel-konsistent (Sub-Kategorie transparent im Artikel benannt) ──
  'steinmetz-gehalt': {
    name: 'Steinmetz/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft; Industrie/Grabsteinmetz).',
    rows: [{ gruppe: 'Steinmetz/in (Industrie/Grabsteinmetz)', median: '3.295 €', q1: '2.872 €', q3: '3.779 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/849, Median, Vollzeit brutto), Stand 2024',
  },
  'gebaeudereiniger-gehalt': {
    name: 'Gebäudereiniger/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft Gebäudereinigung).',
    rows: [{ gruppe: 'Gebäudereiniger/in (Gebäudereinigung)', median: '2.634 €', q1: '2.310 €', q3: '3.051 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/10234, Median, Vollzeit brutto), Stand 2024',
  },
  // ── Tranche 4 (2026-07-03): datenlimitierte Rest-Hubs frisch verifiziert (10 offen → 4 baubar; Rest bewusst ohne Schema, s. Übergabe) ──
  'schuhmacher-gehalt': {
    name: 'Schuhmacher/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Schuhmacher/in', median: '2.817 €', q1: '2.500 €', q3: '3.166 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/3500, Median, Vollzeit brutto), Stand 2024',
  },
  'geruestbauer-gehalt': {
    name: 'Gerüstbauer/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft).',
    rows: [{ gruppe: 'Gerüstbauer/in', median: '3.454 €', q1: '2.958 €', q3: '4.037 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/4066, Median, Vollzeit brutto), Stand 2024',
  },
  'schornsteinfeger-gehalt': {
    name: 'Schornsteinfeger/in',
    description: 'Statistischer Median über alle Beschäftigten (Entgeltatlas, Fachkraft); Tarif TG 1–3 im Artikel.',
    rows: [{ gruppe: 'Schornsteinfeger/in', median: '3.912 €', q1: '3.534 €', q3: '4.054 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/8211, Median, Vollzeit brutto), Stand 2024',
  },
  'uhrmacher-gehalt': {
    name: 'Uhrmacher/in',
    description: 'Median-Gehalt (Entgeltatlas, Fachkraft; keine Quartile veröffentlicht).',
    rows: [{ gruppe: 'Uhrmacher/in', median: '3.431 €' }],
    quelle: 'Entgeltatlas der Bundesagentur für Arbeit (beruf/2500, Median, Vollzeit brutto), Stand 2024',
  },
};
