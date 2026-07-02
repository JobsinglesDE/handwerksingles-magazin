// Strukturierte Gehaltsdaten für das Occupation/Salary-Schema auf elektroniker-gehalt.
// GESETZ: nur belegte Zahlen aus dem Entgeltatlas der Bundesagentur für Arbeit
// (Median + Quartile, Vollzeit brutto/Monat, Datenstand 2024). Betriebstechnik-Median
// mit begrenzter Fallzahl (siehe beruf/15624). Deckt sich 1:1 mit der sichtbaren Tabelle.
export const ELEKTRONIKER_GEHALT_ROWS: { gruppe: string; median: string; q1?: string; q3?: string }[] = [
  { gruppe: 'Elektroniker/in für Betriebstechnik', median: '4.627 €', q1: '3.863 €', q3: '5.350 €' },
  { gruppe: 'Elektroniker/in für Automatisierungs- und Systemtechnik', median: '4.358 €', q1: '3.580 €', q3: '5.291 €' },
  { gruppe: 'Elektroniker/in für Geräte und Systeme', median: '4.057 €', q1: '3.344 €', q3: '4.981 €' },
  { gruppe: 'Elektroniker/in für Energie- und Gebäudetechnik', median: '3.765 €', q1: '3.188 €', q3: '4.542 €' },
];

export const ELEKTRONIKER_GEHALT_QUELLE =
  'Entgeltatlas der Bundesagentur für Arbeit (Median, Vollzeit brutto, Deutschland, Datenstand 2024)';
