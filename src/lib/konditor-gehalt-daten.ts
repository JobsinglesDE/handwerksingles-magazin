// Strukturierte Gehaltsdaten für das Occupation/Salary-Schema auf konditor-gehalt.
// GESETZ: nur belegte Zahlen. Konditormeister = Entgeltatlas der Bundesagentur für Arbeit
// (beruf/3655, Median 3.731 €, unteres Quartil 3.035 €). Geselle/Fachkraft = Gehaltsportale
// (Median ~2.800 €, vergleichbar Bäcker/in Entgeltatlas 2.848 €). Deckt sichtbare Tabelle.
export const KONDITOR_GEHALT_ROWS: { gruppe: string; median: string; q1?: string; q3?: string }[] = [
  { gruppe: 'Konditor/in (Geselle/Fachkraft)', median: '2.800 €' },
  { gruppe: 'Konditormeister/in', median: '3.731 €', q1: '3.035 €' },
];

export const KONDITOR_GEHALT_QUELLE =
  'Entgeltatlas der Bundesagentur für Arbeit (Konditormeister/in, Median, Vollzeit brutto); Gehaltsportale (Geselle/Fachkraft), Stand 2026';
