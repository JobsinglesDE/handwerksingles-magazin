// Strukturierte Gehaltsdaten für das Occupation/Salary-Schema auf baecker-gehalt.
// GESETZ: nur belegte Zahlen. Beide Ebenen aus dem Entgeltatlas der Bundesagentur
// für Arbeit (direkt-verifiziert, Stand 2024):
//   Bäcker/in (Fachkraft, beruf/3623):          Median 2.848 €, Q1 2.461 €, Q3 3.327 €
//   Bäckermeister/in (Spezialist, beruf/3625):  Median 3.731 €, Q1 3.035 €, Q3 4.877 €
// Deckt die sichtbare Tabelle auf baecker-gehalt.
export const BAECKER_GEHALT_ROWS: { gruppe: string; median: string; q1?: string; q3?: string }[] = [
  { gruppe: 'Bäcker/in (Geselle/Fachkraft)', median: '2.848 €', q1: '2.461 €', q3: '3.327 €' },
  { gruppe: 'Bäckermeister/in', median: '3.731 €', q1: '3.035 €', q3: '4.877 €' },
];

export const BAECKER_GEHALT_QUELLE =
  'Entgeltatlas der Bundesagentur für Arbeit (Bäcker/in und Bäckermeister/in, Median, Vollzeit brutto), Stand 2024';
