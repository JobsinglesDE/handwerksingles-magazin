import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { TableOfContents } from '@/components/content/TableOfContents';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SECTION_HUBS } from '@/lib/hubs';

const HUB_URL = 'https://handwerksingles.de/magazin/handwerksberufe';
const HUB = SECTION_HUBS['handwerksberufe'];

export const metadata = {
  title: HUB.seoTitle,
  description: HUB.seoDescription,
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: HUB.seoTitle,
    description: HUB.seoDescription,
    url: HUB_URL,
    type: 'website',
    siteName: 'Handwerksingles Magazin',
    locale: 'de-DE',
  },
};

const HUB_COLORS = [
  { r: 82, g: 35, b: 15 },
  { r: 122, g: 58, b: 29 },
  { r: 224, g: 121, b: 77 },
];

type BerufSection = {
  beruf: string;
  tocLabel: string;
  heading: string;
  gehalt: string;
  paragraphs: string[];
};

// Gehalts-Spannen aus den Berufsbild-Artikeln (DFS-/Tavily-validiert beim Aufbau)
const SECTIONS: BerufSection[] = [
  {
    beruf: 'dachdecker',
    tocLabel: 'Dachdecker: Ausbildung & Höhenluft',
    heading: 'Dachdecker: Ausbildung, Gehalt & Leben in der Höhe',
    gehalt: '2.500–4.000 €',
    paragraphs: [
      'Dachdecker arbeiten dort, wo andere nicht hinkommen — und sind mit Solar- und Gründach-Boom gefragter denn je. Die Ausbildung dauert drei Jahre, der Lohn liegt zwischen 2.500 und 4.000 Euro, mit Zuschlägen für Höhe und Witterung.',
    ],
  },
  {
    beruf: 'elektriker',
    tocLabel: 'Elektriker: Ausbildung, Gehalt & Karriere',
    heading: 'Elektriker: Ausbildung, Gehalt & Karriere',
    gehalt: '2.500–4.500 €',
    paragraphs: [
      'Elektroniker für Energie- und Gebäudetechnik sind die gefragtesten Fachkräfte im Handwerk: Ohne sie läuft keine Baustelle, kein Smart Home, keine Wärmepumpe. Die Ausbildung dauert 3,5 Jahre, das Gehalt liegt je nach Region und Spezialisierung zwischen 2.500 und 4.500 Euro.',
    ],
  },
  {
    beruf: 'kfz-mechatroniker',
    tocLabel: 'KFZ-Mechatroniker: Werkstatt & Gehalt',
    heading: 'KFZ-Mechatroniker: Werkstatt, Diagnose & Gehalt',
    gehalt: '2.400–4.200 €',
    paragraphs: [
      'Vom Ölwechsel zur Hochvolt-Diagnose: Der KFZ-Beruf hat sich mit der E-Mobilität stärker verändert als fast jedes andere Gewerk. Wer die Hochvolt-Qualifikation mitbringt, verdient deutlich über dem Schnitt von 2.400 bis 4.200 Euro.',
    ],
  },
  {
    beruf: 'maurer',
    tocLabel: 'Maurer: Ausbildung & Alltag auf dem Bau',
    heading: 'Maurer: Ausbildung, Gehalt & Alltag auf dem Bau',
    gehalt: '2.400–4.200 €',
    paragraphs: [
      'Maurer sind das Rückgrat jedes Rohbaus. Die Bau-Tarifbindung sorgt für solide 2.400 bis 4.200 Euro, und der Fachkräftemangel auf dem Bau macht den Beruf so sicher wie kaum einen anderen.',
    ],
  },
  {
    beruf: 'tischler',
    tocLabel: 'Tischler & Schreiner: Holzhandwerk',
    heading: 'Tischler & Schreiner: Ausbildung, Gehalt & Holzhandwerk',
    gehalt: '2.300–4.000 €',
    paragraphs: [
      'Tischler — südlich der Mainlinie Schreiner — verbinden Handwerk mit Gestaltung: Möbel, Innenausbau, Restaurierung. Drei Jahre Ausbildung, 2.300 bis 4.000 Euro Gehalt, und mit Meistertitel der direkte Weg in den eigenen Betrieb.',
    ],
  },
  {
    beruf: 'zimmermann',
    tocLabel: 'Zimmermann: Ausbildung, Gehalt & Walz',
    heading: 'Zimmermann: Ausbildung, Gehalt & die Walz',
    gehalt: '2.400–4.500 €',
    paragraphs: [
      'Holzbau boomt — vom Dachstuhl bis zum mehrgeschossigen Holzhaus. Zimmerleute verdienen 2.400 bis 4.500 Euro, und die traditionelle Walz nach der Gesellenprüfung ist bis heute gelebte Praxis: drei Jahre und ein Tag auf Wanderschaft.',
    ],
  },
  // --- Welle 2 (2026-06-12) ---
  {
    beruf: 'anlagenmechaniker-shk',
    tocLabel: 'Anlagenmechaniker SHK: Wärmepumpe & Bad',
    heading: 'Anlagenmechaniker SHK: Ausbildung, Gehalt & Wärmepumpen-Boom',
    gehalt: '3.150–4.300 €',
    paragraphs: [
      'Anlagenmechaniker SHK — umgangssprachlich Klempner oder Heizungsbauer — sind die Fachkräfte der Wärmewende. Der Median liegt laut Entgeltatlas bei 3.709 Euro, die Ausbildung dauert 3,5 Jahre, und der Wärmepumpen-Boom sorgt für volle Auftragsbücher: Bundesweit fehlen über 12.000 SHK-Fachkräfte.',
    ],
  },
  {
    beruf: 'fliesenleger',
    tocLabel: 'Fliesenleger: Gehalt & Meisterpflicht',
    heading: 'Fliesenleger: Ausbildung, Gehalt & Meisterpflicht',
    gehalt: '3.300–4.800 €',
    paragraphs: [
      'Fliesen-, Platten- und Mosaikleger verdienen laut Entgeltatlas zwischen 3.314 und 4.844 Euro. Der Bau-Tarif setzt ab April 2026 bei 26,79 Euro pro Stunde an, und seit 2020 gilt wieder die Meisterpflicht — gut für Qualität und Preise.',
    ],
  },
  {
    beruf: 'friseur',
    tocLabel: 'Friseur: Ausbildung, Gehalt & Salon',
    heading: 'Friseur: Ausbildung, Gehalt & Salon-Alltag',
    gehalt: '2.200–2.600 €',
    paragraphs: [
      'Friseurinnen und Friseure verdienen zwischen 2.200 und 2.600 Euro — der Branchen-Mindestlohn von 13,90 Euro pro Stunde setzt die Untergrenze. Die dreijährige Ausbildung startet bei 724 Euro Vergütung, mit Meisterbrief und Spezialisierung sind 3.000 Euro und mehr drin.',
    ],
  },
  {
    beruf: 'geruestbauer',
    tocLabel: 'Gerüstbauer: Höhenarbeit & Tarif',
    heading: 'Gerüstbauer: Ausbildung, Gehalt & Höhenarbeit',
    gehalt: '2.900–4.100 €',
    paragraphs: [
      'Gerüstbauer arbeiten dort, wo alle anderen Gewerke erst hinkommen müssen. Der Entgeltatlas weist 3.454 Euro Median aus, die Tariferhöhung von 7,5 Prozent ab November 2025 schiebt das Richtung 3.700 bis 3.800 Euro — plus allgemeinverbindlicher Mindestlohn von 14,35 Euro ab 2026.',
    ],
  },
  {
    beruf: 'maler-lackierer',
    tocLabel: 'Maler & Lackierer: Beruf & Ausbildung',
    heading: 'Maler & Lackierer: Ausbildung, Gehalt & Fachrichtungen',
    gehalt: '2.850–3.550 €',
    paragraphs: [
      'Maler und Lackierer verdienen laut Entgeltatlas im Median 3.146 Euro. Drei Fachrichtungen, drei Jahre Ausbildung — und die energetische Sanierung mit Wärmedämmverbundsystemen macht den Beruf zum Wachstumsfeld. Der Ecklohn knackt ab Juni 2026 die 20-Euro-Marke.',
    ],
  },
  {
    beruf: 'metallbauer',
    tocLabel: 'Metallbauer: Konstruktion & Gestaltung',
    heading: 'Metallbauer: Ausbildung, Gehalt & Fachrichtungen',
    gehalt: '3.050–4.300 €',
    paragraphs: [
      'Metallbauer — früher Schlosser genannt — arbeiten in drei Fachrichtungen: Konstruktionstechnik, Metallgestaltung und Nutzfahrzeugbau. Der Median liegt laut Entgeltatlas bei 3.460 Euro, die Ausbildung dauert 3,5 Jahre, mit Meisterbrief sind 4.500 bis 5.000 Euro realistisch.',
    ],
  },
  {
    beruf: 'schornsteinfeger',
    tocLabel: 'Schornsteinfeger: Tarif & Kehrbezirk',
    heading: 'Schornsteinfeger: Ausbildung, Gehalt & Kehrbezirk',
    gehalt: '3.380–4.050 €',
    paragraphs: [
      'Schornsteinfeger verdienen nach Bundestarifvertrag zwischen 3.378 und 4.047 Euro — plus eine Jahressonderzahlung in Höhe eines vollen Monatsgehalts. Heute geht es um Energieberatung und Feuerstättenschau statt nur Kehren, und der eigene Kehrbezirk ist ein Alleinstellungsmerkmal im Handwerk.',
    ],
  },
  {
    beruf: 'schweisser',
    tocLabel: 'Schweißer: Verfahren, DVS & Verdienst',
    heading: 'Schweißer: Qualifikation, Gehalt & Verfahren',
    gehalt: '3.100–4.450 €',
    paragraphs: [
      'Schweißer ist kein klassischer Ausbildungsberuf — der Einstieg läuft über DVS-Lehrgänge und die Schweißerprüfung nach ISO 9606-1. Der Median liegt bei rund 3.700 Euro, Schweißfachleute kommen auf 4.761 Euro, und auf Montage im Rohrleitungs- oder Offshore-Bereich sind bis zu 7.000 Euro möglich.',
    ],
  },
  {
    beruf: 'steinmetz',
    tocLabel: 'Steinmetz: Naturstein & Denkmalpflege',
    heading: 'Steinmetz: Ausbildung, Gehalt & Denkmalpflege',
    gehalt: '2.870–3.780 €',
    paragraphs: [
      'Steinmetze bearbeiten Naturstein für Grabmale, Fassaden und Restaurierungen. Der Entgeltatlas weist 3.295 Euro Median aus, die dreijährige Ausbildung wird mit 945 bis 1.195 Euro vergütet — und Denkmalpflege-Spezialisten sind gefragte Leute.',
    ],
  },
  {
    beruf: 'stuckateur',
    tocLabel: 'Stuckateur: Stuck, Putz & Fassade',
    heading: 'Stuckateur: Ausbildung, Gehalt & Ausbau',
    gehalt: '2.600–3.700 €',
    paragraphs: [
      'Stuckateure beherrschen das Spektrum von historischer Stuck-Restaurierung bis zur Fassadendämmung. Das Gehalt liegt zwischen 2.600 und 3.700 Euro — Baden-Württemberg führt mit 3.658 Euro —, und die energetische Sanierung macht das Ausbau-Gewerk zum Zukunftsfeld.',
    ],
  },
  // --- Welle 3 (2026-06-12) ---
  {
    beruf: 'augenoptiker',
    tocLabel: 'Augenoptiker: Gesundheitshandwerk',
    heading: 'Augenoptiker: Ausbildung, Gehalt & Optometrie',
    gehalt: '2.540–3.400 €',
    paragraphs: [
      'Augenoptiker vereinen Glasschliff, Refraktion und Beratung im Gesundheitshandwerk. Der Median liegt laut Entgeltatlas bei 2.931 Euro, Augenoptikermeister erzielen 4.248 Euro — und die Weiterbildung zum Optometristen öffnet zusätzliche Türen.',
    ],
  },
  {
    beruf: 'bodenleger',
    tocLabel: 'Bodenleger: Vinyl, Teppich & Akkord',
    heading: 'Bodenleger: Ausbildung, Gehalt & Berufsalltag',
    gehalt: '2.540–3.430 €',
    paragraphs: [
      'Bodenleger verlegen elastische und textile Beläge von Vinyl bis Linoleum. Der Median liegt laut Entgeltatlas bei 2.957 Euro — und im Akkord, im Bodenlegehandwerk Standard, sind bis zu 20 Prozent Mehrverdienst über dem Stundensatz möglich.',
    ],
  },
  {
    beruf: 'gebaeudereiniger',
    tocLabel: 'Gebäudereiniger: größtes Handwerk',
    heading: 'Gebäudereiniger: Ausbildung, Gehalt & Karriere',
    gehalt: '2.630–3.770 €',
    paragraphs: [
      'Mit rund 700.000 Beschäftigten ist die Gebäudereinigung Deutschlands beschäftigungsstärkstes Handwerk. Der Branchenmindestlohn liegt ab 2026 bei 15,00 Euro pro Stunde, Glas- und Fassadenprofis kommen auf 18,40 Euro — und der Meister auf 3.771 Euro Median.',
    ],
  },
  {
    beruf: 'glaser',
    tocLabel: 'Glaser: Verglasung & Fassadenbau',
    heading: 'Glaser: Ausbildung, Gehalt & Glasbau',
    gehalt: '2.980–3.300 €',
    paragraphs: [
      'Glaser arbeiten an Fenstern, Fassaden und historischen Bleiverglasungen — zwei Fachrichtungen mit eigenen Gehaltsniveaus. Der Fenster- und Glasfassadenbau liegt im Median bei rund 3.300 Euro, und die energetische Sanierung mit Dreifachverglasung treibt die Nachfrage.',
    ],
  },
  {
    beruf: 'hoerakustiker',
    tocLabel: 'Hörakustiker: Gesundheitshandwerk',
    heading: 'Hörakustiker: Ausbildung, Gehalt & Karriere',
    gehalt: '2.300–3.600 €',
    paragraphs: [
      'Hörakustiker ist ein zulassungspflichtiges Gesundheitshandwerk — die Ausbildung läuft über die Bundesberufsschule in Lübeck. Der Median liegt laut Entgeltatlas bei 2.964 Euro, mit Meisterbrief und eigener Filiale sind 3.500 bis 4.200 Euro realistisch.',
    ],
  },
  {
    beruf: 'karosseriebauer',
    tocLabel: 'Karosseriebauer: Blech, Alu & Carbon',
    heading: 'Karosseriebauer: Ausbildung, Gehalt & KFZ-Handwerk',
    gehalt: '2.970–4.540 €',
    paragraphs: [
      'Karosserie- und Fahrzeugbaumechaniker richten Unfallschäden und arbeiten zunehmend an Alu- und Carbon-Karosserien moderner E-Autos. Der Median liegt laut Entgeltatlas bei rund 3.650 Euro, die 3,5-jährige Ausbildung vergütet 864 bis 1.192 Euro je Lehrjahr.',
    ],
  },
  {
    beruf: 'landschaftsgaertner',
    tocLabel: 'Landschaftsgärtner: GaLaBau & Klima',
    heading: 'Landschaftsgärtner: Ausbildung, Gehalt & GaLaBau',
    gehalt: '2.760–3.800 €',
    paragraphs: [
      'Landschaftsgärtner — offiziell Gärtner der Fachrichtung Garten- und Landschaftsbau — verdienen im Median 3.256 Euro, mit Meisterbrief 4.293 Euro. Klimaanpassung, Schwammstadt und Dachbegrünung machen den GaLaBau zum Wachstumsfeld.',
    ],
  },
  {
    beruf: 'raumausstatter',
    tocLabel: 'Raumausstatter: Boden, Polster & Wand',
    heading: 'Raumausstatter: Ausbildung, Gehalt & Gestaltung',
    gehalt: '2.450–3.900 €',
    paragraphs: [
      'Raumausstatter gestalten Wände, Böden und Polster — ein Handwerk mit echtem Kreativanteil und Schwerpunkt-Prüfung am Ende der dreijährigen Ausbildung. Der Median liegt laut Entgeltatlas bei 2.943 Euro, Meister erreichen im oberen Quartil 4.892 Euro.',
    ],
  },
  {
    beruf: 'strassenbauer',
    tocLabel: 'Straßenbauer: Asphalt & Infrastruktur',
    heading: 'Straßenbauer: Ausbildung, Gehalt & Infrastruktur',
    gehalt: '3.180–3.940 €',
    paragraphs: [
      'Straßenbauer bauen das Fundament, auf dem Deutschland rollt. Der Median liegt laut Entgeltatlas bei 3.539 Euro, und die über 52 Milliarden Euro Bundes-Investitionen in die Verkehrsinfrastruktur bis 2029 machen den Beruf zum Job-Garanten.',
    ],
  },
  {
    beruf: 'zahntechniker',
    tocLabel: 'Zahntechniker: Dentallabor & CAD/CAM',
    heading: 'Zahntechniker: Ausbildung, Gehalt & Dentallabor',
    gehalt: '3.110–4.250 €',
    paragraphs: [
      'Zahntechniker verbinden filigrane Handarbeit mit CAD/CAM-Fertigung im Dentallabor. Der Median liegt laut Entgeltatlas bei 3.109 Euro, mit Meisterbrief bei 4.248 Euro — die 3,5-jährige Ausbildung startet bei 724 Euro Vergütung.',
    ],
  },
  // --- Welle 4 (2026-06-12) ---
  {
    beruf: 'feinwerkmechaniker',
    tocLabel: 'Feinwerkmechaniker: CNC & Werkzeugbau',
    heading: 'Feinwerkmechaniker: Ausbildung, Gehalt & Präzision',
    gehalt: '3.180–3.750 €',
    paragraphs: [
      'Feinwerkmechaniker — dazu zählt auch der klassische Werkzeugmacher — fertigen Bauteile auf Hundertstel Millimeter genau. Der Median liegt bei 3.750 Euro im Westen und 3.180 Euro im Osten, und wer CNC- und CAM-Kompetenz mitbringt, verdient spürbar mehr.',
    ],
  },
  {
    beruf: 'goldschmied',
    tocLabel: 'Goldschmied: Schmuck & Edelmetall',
    heading: 'Goldschmied: Ausbildung, Gehalt & Schmuckhandwerk',
    gehalt: '2.000–3.500 €',
    paragraphs: [
      'Goldschmiede fertigen Schmuck aus Edelmetallen mit Präzision auf Zehntelmillimeter. Der Schnitt liegt bei 2.858 Euro, und seit August 2025 heißt der neu geordnete Ausbildungsberuf Gold- und Silberschmied — mit den Fachrichtungen Goldschmieden und Silberschmieden.',
    ],
  },
  {
    beruf: 'hufschmied',
    tocLabel: 'Hufschmied: Pferde & Schmiedefeuer',
    heading: 'Hufschmied: Ausbildung, Verdienst & Pferde',
    gehalt: '2.800–4.000 €',
    paragraphs: [
      'Hufbeschlagschmied ist kein dualer Ausbildungsberuf — der Weg führt nach Hufbeschlaggesetz über Lehrgang, zwei Jahre Praxis und Hufbeschlagschule. Angestellte verdienen rund 3.480 Euro nach Tarif, Selbstständige 3.000 bis 4.000 Euro — ein Beschlag aller vier Hufe kostet 80 bis 150 Euro.',
    ],
  },
  {
    beruf: 'kosmetikerin',
    tocLabel: 'Kosmetikerin: Studio & Spezialisierung',
    heading: 'Kosmetikerin: Ausbildung, Gehalt & Studio',
    gehalt: '2.000–2.600 €',
    paragraphs: [
      'Kosmetikerinnen arbeiten in Studios, Spas und Wellness-Hotels — oder selbstständig. Der Median liegt laut Entgeltatlas bei 2.259 Euro; den Hebel nach oben bilden Spezialisierungen wie apparative Kosmetik oder Permanent Make-up und das eigene Studio. Die Ausbildung gibt es dual (3 Jahre, vergütet) oder schulisch.',
    ],
  },
  {
    beruf: 'sattler',
    tocLabel: 'Sattler: Leder, Reitsport & Fahrzeug',
    heading: 'Sattler: Ausbildung, Gehalt & Lederhandwerk',
    gehalt: '2.400–3.750 €',
    paragraphs: [
      'Sattler verarbeiten Leder in drei Fachrichtungen: Reitsportsattlerei, Fahrzeugsattlerei und Feintäschnerei. Der Median liegt bei rund 3.000 Euro, der Meisterbrief bringt im Schnitt 3.704 Euro — und die Oldtimer-Sattlerei ist eine gefragte Nische.',
    ],
  },
  {
    beruf: 'schaedlingsbekaempfer',
    tocLabel: 'Schädlingsbekämpfer: IHK & Sachkunde',
    heading: 'Schädlingsbekämpfer: Ausbildung, Gehalt & Sachkunde',
    gehalt: '2.900–3.940 €',
    paragraphs: [
      'Schädlingsbekämpfer ist seit 2004 ein dreijähriger IHK-Ausbildungsberuf. Der Median liegt laut Entgeltatlas bei rund 3.400 Euro, das obere Quartil bei 3.939 Euro — und Bettwanzen-Boom plus Klimawandel treiben die Nachfrage stetig.',
    ],
  },
  {
    beruf: 'schuhmacher',
    tocLabel: 'Schuhmacher: Reparatur & Maßschuh',
    heading: 'Schuhmacher: Ausbildung, Gehalt & Maßschuhe',
    gehalt: '2.470–3.730 €',
    paragraphs: [
      'Schuhmacher verdienen im Median 2.817 Euro — wer Maßschuhe fertigt, mit Preisen ab 3.000 Euro pro Paar, erzielt deutlich mehr. Der Nachwuchsmangel ist so groß, dass Gesellen nach der dreijährigen Ausbildung praktisch überall sofort unterkommen.',
    ],
  },
  {
    beruf: 'taetowierer',
    tocLabel: 'Tätowierer: Studio & Apprenticeship',
    heading: 'Tätowierer: Einstieg, Verdienst & Studio',
    gehalt: '800–8.000 €',
    paragraphs: [
      'Tätowierer ist kein anerkannter Ausbildungsberuf — der Einstieg läuft über ein Studio-Apprenticeship von 12 bis 24 Monaten. Einsteiger verdienen 800 bis 1.800 Euro, erfahrene Selbstständige mit 90 bis 110 Euro Stundensatz kommen auf 4.000 bis 8.000 Euro.',
    ],
  },
  {
    beruf: 'uhrmacher',
    tocLabel: 'Uhrmacher: Manufaktur & Restaurierung',
    heading: 'Uhrmacher: Ausbildung, Gehalt & Manufaktur',
    gehalt: '2.600–4.500 €',
    paragraphs: [
      'Uhrmacher gehören zu den seltensten Fachkräften im Handwerk — bundesweit werden jährlich nur wenige Hundert ausgebildet. Gesellen starten mit 2.600 bis 3.000 Euro, in Manufakturen sind 3.500 bis 4.500 Euro drin, und der Vintage-Boom füllt die Werkstätten.',
    ],
  },
  {
    beruf: 'zweiradmechatroniker',
    tocLabel: 'Zweiradmechatroniker: E-Bike & Motorrad',
    heading: 'Zweiradmechatroniker: Ausbildung, Gehalt & E-Bike-Boom',
    gehalt: '2.410–3.160 €',
    paragraphs: [
      'Zweiradmechatroniker warten Fahrräder, E-Bikes und Motorräder — ein Beruf mit Rückenwind: 2 Millionen verkaufte E-Bikes allein 2025, über 17 Millionen im Umlauf. Der Median liegt laut Entgeltatlas bei rund 2.730 Euro, die Tarif-Ausbildungsvergütung startet bei 1.040 Euro.',
    ],
  },
];

// Alphabetisch sortiert (Tommy-Regel 2026-06-12), Sektions-Buchstaben dynamisch
const SORTED_SECTIONS = [...SECTIONS].sort((a, b) => a.heading.localeCompare(b.heading, 'de'));
// Excel-Stil: A…Z, AA, AB… — fromCharCode allein läuft ab Sektion 27 in Sonderzeichen ([, \, ])
const letterOf = (i: number) => {
  let s = '';
  let n = i + 1;
  while (n > 0) {
    n--;
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return s;
};

export default async function HandwerksberufeHub() {
  const articles = await reader.collections.articles.all();
  const berufArticles = articles.filter(
    (a) => a.entry.status === 'published' && a.entry.category === 'handwerksberufe'
  );
  const byBeruf = (beruf: string) =>
    berufArticles
      .filter((a) => a.entry.beruf === beruf)
      .sort((a, b) => (a.entry.type === 'berufsbild' ? -1 : b.entry.type === 'berufsbild' ? 1 : 0));

  const tocItems = [
    ...SORTED_SECTIONS.map((s, i) => ({ label: `${letterOf(i)}. ${s.tocLabel}`, id: s.beruf })),
    { label: `Gehalt im Handwerk: ${SECTIONS.length} Berufe im Vergleich`, id: 'gehaltsvergleich' },
  ];

  const itemList = berufArticles.map((a) => ({
    name: a.entry.title,
    url: `https://handwerksingles.de/magazin${articleHref(a)}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Handwerksberufe: Ausbildung, Gehalt & Karriere — alle Berufe im Überblick',
          description: HUB.seoDescription,
          url: HUB_URL,
          items: itemList,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://handwerksingles.de/magazin' },
          { name: 'Handwerk-News', url: 'https://handwerksingles.de/magazin/handwerk-news' },
          { name: 'Handwerksberufe', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Handwerksberufe"
        texts={[
          `${SECTIONS.length} Handwerksberufe`,
          'Elektriker · Dachdecker · Tischler',
          'Ausbildung, Gehalt, Realität',
          'Bau · Holz · Technik',
        ]}
        subtitle="Die wichtigsten Handwerksberufe im Überblick — mit Ausbildung, Gehalts-Bandbreite und Partnersuche-Tipps für Handwerker-Singles."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Handwerk-News', href: '/handwerk-news' },
          { label: 'Handwerksberufe', href: '/handwerksberufe' },
        ]} />
      </div>

      {/* Intro + TOC */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Handwerksberufe bieten, was vielen Bürojobs fehlt: sichere Nachfrage, ehrliches Gehalt und ein
            Ergebnis, das man am Feierabend anfassen kann. Hier findest du die wichtigsten Berufsbilder im
            Überblick — von der Ausbildung über realistische Gehaltszahlen bis zum Arbeitsalltag.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80 mb-8">
            Jede Sektion fasst das Berufsbild kurz zusammen und verlinkt auf den kompletten Guide sowie
            vertiefende Artikel zu Gehalt und Ausbildung.
          </p>
          <TableOfContents items={tocItems} showFaq={false} />
        </section>
      </ScrollReveal>

      {/* Beruf-Sektionen, alphabetisch */}
      {SORTED_SECTIONS.map((section, i) => {
        const sectionArticles = byBeruf(section.beruf);
        return (
          <ScrollReveal key={section.beruf}>
            <section id={section.beruf} className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
                {letterOf(i)}. {section.heading}
              </h2>
              <div className="max-w-3xl">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </div>
              {sectionArticles.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-8 mb-5 text-foreground/90">
                    Guide & vertiefende Artikel
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sectionArticles.map((a) => (
                      <ArticleCard
                        key={a.slug}
                        title={a.entry.title}
                        excerpt={a.entry.excerpt}
                        href={articleHref(a)}
                        image={a.entry.featuredImage || undefined}
                        imageAlt={a.entry.featuredImageAlt || undefined}
                        category={a.entry.category}
                        date={a.entry.publishedAt || undefined}
                      />
                    ))}
                  </div>
                </>
              )}
            </section>
          </ScrollReveal>
        );
      })}

      {/* Gehaltsvergleich */}
      <ScrollReveal>
        <section id="gehaltsvergleich" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Gehalt im Handwerk: {SECTIONS.length} Berufe im Vergleich
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6 max-w-3xl">
            Brutto-Monatsgehälter für Gesellen, je nach Region, Berufserfahrung und Betrieb. Mit Meistertitel
            oder eigener Firma liegen die Werte deutlich darüber.
          </p>
          <dl className="divide-y divide-foreground/10 rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
            {SORTED_SECTIONS.map((s) => (
              <div key={s.beruf} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-foreground/60">
                  <Link href={`/handwerksberufe/${s.beruf}`} className="hover:text-brand-orange transition-colors">
                    {s.heading.split(':')[0]}
                  </Link>
                </dt>
                <dd className="font-semibold text-right">{s.gehalt}</dd>
              </div>
            ))}
          </dl>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Singles aus diesen Berufen kennenlernen?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Elektriker, Dachdecker, Tischler, Zimmermann und Maurer — auf Handwerksingles triffst du Menschen,
            die deinen Alltag verstehen. Mehr dazu im{' '}
            <Link href="/singles-partnersuche" className="text-brand-orange hover:underline">
              Partnersuche-Guide für Handwerker
            </Link>.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
