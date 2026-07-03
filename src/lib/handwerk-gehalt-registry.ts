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
};
