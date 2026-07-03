// Strukturierte Gehaltsdaten für das Occupation/Salary-Schema auf metzger-gehalt.
// GESETZ: nur belegte Zahlen. Beide Ebenen aus dem Entgeltatlas der Bundesagentur
// für Arbeit (direkt-verifiziert, Stand 2024):
//   Fleischer/in (Fachkraft, beruf/3666):        Median 2.818 €, Q1 2.408 €, Q3 3.312 €
//   Fleischermeister/in (Spezialist, beruf/3671): Median 3.731 €, Q1 3.035 €, Q3 4.877 €
// Metzger = Fleischer = Schlachter (regionale Bezeichnung, gleicher Ausbildungsberuf).
// Deckt die sichtbare Tabelle auf metzger-gehalt.
export const METZGER_GEHALT_ROWS: { gruppe: string; median: string; q1?: string; q3?: string }[] = [
  { gruppe: 'Fleischer/in / Metzger/in (Geselle/Fachkraft)', median: '2.818 €', q1: '2.408 €', q3: '3.312 €' },
  { gruppe: 'Fleischermeister/in', median: '3.731 €', q1: '3.035 €', q3: '4.877 €' },
];

export const METZGER_GEHALT_QUELLE =
  'Entgeltatlas der Bundesagentur für Arbeit (Fleischer/in und Fleischermeister/in, Median, Vollzeit brutto), Stand 2024';
