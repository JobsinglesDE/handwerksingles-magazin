// src/lib/staedte.ts
// Registry + redaktionelle Texte + Statistik fuer das Stadt-Verzeichnis.
//
// Slugs MUESSEN zu scripts/import-osm-betriebe.mjs passen (Drift-Check dort).
// `indexable` = Volumen-Gate (DataForSEO). Zusaetzlich verlangt der Seiten-Generator
// eine Mindest-Betriebszahl (MIN_BETRIEBE_INDEX) — sonst noindex (thin content).

export const MIN_BETRIEBE_INDEX = 3;

export type GewerkDef = {
  /** = URL-Token = OSM-Mapping-Slug */
  singular: string;
  plural: string;
  /** beruf-Enum-Slug fuer Cross-Link zum /handwerksberufe/-Hub (null = kein Hub) */
  berufHub: string | null;
  /** Volumen-Gate: hat das Gewerk×Stadt echtes Suchvolumen? */
  indexable: boolean;
};

// Jeder Slug, den der Importer erzeugen kann, MUSS hier stehen.
export const DIRECTORY_GEWERKE: Record<string, GewerkDef> = {
  friseur: { singular: 'Friseur', plural: 'Friseure', berufHub: 'friseur', indexable: true },
  kosmetik: { singular: 'Kosmetik- & Nagelstudio', plural: 'Kosmetik- & Nagelstudios', berufHub: 'kosmetikerin', indexable: true },
  optiker: { singular: 'Optiker', plural: 'Optiker', berufHub: 'augenoptiker', indexable: true },
  tattoo: { singular: 'Tattoo-Studio', plural: 'Tattoo-Studios', berufHub: 'taetowierer', indexable: true },
  juwelier: { singular: 'Juwelier', plural: 'Juweliere & Goldschmiede', berufHub: 'goldschmied', indexable: true },
  kfz: { singular: 'KFZ-Werkstatt', plural: 'KFZ-Werkstätten', berufHub: 'kfz-mechatroniker', indexable: true },
  sanitaer: { singular: 'Sanitär- & Heizungsbetrieb', plural: 'Sanitär & Heizung', berufHub: 'anlagenmechaniker-shk', indexable: true },
  // vorhanden, aber zu wenig Volumen/Betriebe -> noindex (im Stadt-Hub gelistet)
  elektriker: { singular: 'Elektriker', plural: 'Elektriker', berufHub: 'elektriker', indexable: false },
  maler: { singular: 'Maler & Lackierer', plural: 'Maler & Lackierer', berufHub: 'maler-lackierer', indexable: false },
  schreiner: { singular: 'Schreiner', plural: 'Schreiner & Tischler', berufHub: 'tischler', indexable: false },
  dachdecker: { singular: 'Dachdecker', plural: 'Dachdecker', berufHub: 'dachdecker', indexable: false },
  fliesenleger: { singular: 'Fliesenleger', plural: 'Fliesenleger', berufHub: 'fliesenleger', indexable: false },
  zimmerer: { singular: 'Zimmerei', plural: 'Zimmereien', berufHub: 'zimmermann', indexable: false },
  stuckateur: { singular: 'Stuckateur', plural: 'Stuckateure', berufHub: 'stuckateur', indexable: false },
  metallbauer: { singular: 'Metallbauer', plural: 'Metallbau', berufHub: 'metallbauer', indexable: false },
  geruestbauer: { singular: 'Gerüstbauer', plural: 'Gerüstbau', berufHub: 'geruestbauer', indexable: false },
  glaser: { singular: 'Glaser', plural: 'Glaser', berufHub: 'glaser', indexable: false },
  schornsteinfeger: { singular: 'Schornsteinfeger', plural: 'Schornsteinfeger', berufHub: 'schornsteinfeger', indexable: false },
  steinmetz: { singular: 'Steinmetz', plural: 'Steinmetze', berufHub: 'steinmetz', indexable: false },
  bodenleger: { singular: 'Bodenleger', plural: 'Bodenleger', berufHub: 'bodenleger', indexable: false },
  garten: { singular: 'Garten- & Landschaftsbau', plural: 'Garten- & Landschaftsbau', berufHub: 'landschaftsgaertner', indexable: false },
  uhrmacher: { singular: 'Uhrmacher', plural: 'Uhrmacher', berufHub: 'uhrmacher', indexable: false },
  schuhmacher: { singular: 'Schuhmacher', plural: 'Schuhmacher', berufHub: 'schuhmacher', indexable: false },
  sattler: { singular: 'Sattler', plural: 'Sattler', berufHub: 'sattler', indexable: false },
};

export function gewerkDef(slug: string): GewerkDef | undefined {
  return DIRECTORY_GEWERKE[slug];
}

export function gewerkLabel(slug: string): string {
  return DIRECTORY_GEWERKE[slug]?.plural ?? slug;
}

/** Gewerk → schema.org LocalBusiness-Subtyp (präziseres Entity-Signal). */
export const GEWERK_SCHEMA_TYPE: Record<string, string> = {
  friseur: 'HairSalon',
  kosmetik: 'BeautySalon',
  optiker: 'Optician',
  kfz: 'AutoRepair',
  juwelier: 'JewelryStore',
  tattoo: 'TattooParlor',
  sanitaer: 'Plumber',
  elektriker: 'Electrician',
  dachdecker: 'RoofingContractor',
  maler: 'HousePainter',
};
export function gewerkSchemaType(gewerk: string): string {
  return GEWERK_SCHEMA_TYPE[gewerk] ?? 'LocalBusiness';
}

/** Wird die Gewerk×Stadt-Seite indexiert? Volumen-Flag UND genug Betriebe. */
export function shouldIndexGewerk(slug: string, count: number): boolean {
  return Boolean(DIRECTORY_GEWERKE[slug]?.indexable) && count >= MIN_BETRIEBE_INDEX;
}

/**
 * Wird ein Betriebs-Profil indexiert?
 * Nur datenreiche Profile (Adresse + mind. ein Kontakt/Öffnungszeiten) — das sind
 * vollwertige Local-Pages (Extra-Futter + Vanity-Suche). Nackte Namen-Stubs bleiben
 * noindex, damit Google die Domain nicht wegen Thin-Content abstraft.
 */
export function shouldIndexBetrieb(b: {
  street?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
}): boolean {
  return Boolean(b.street) && Boolean(b.phone || b.website || b.openingHours);
}

/**
 * Bekommt der Betrieb eine eigene (klickbare) Profil-Seite?
 * Nur wenn es etwas Verwertbares über den Namen hinaus gibt (Adresse ODER Kontakt).
 * Reine Namens-/Nur-Öffnungszeiten-Einträge (z.B. "Barber Shop") bleiben inline auf
 * der Gewerk-Liste — keine leere Profil-Seite.
 */
export function hasProfile(b: { street?: string; phone?: string; website?: string }): boolean {
  return Boolean(b.street || b.phone || b.website);
}

// ---------------------------------------------------------------------------
// Stadt-Intros (Hub) + Gewerk×Stadt-Intros (Intent-Seiten) = die "geilen Texte"
// Lokal, faktisch, humanisiert — gleicht die duenne OSM-Liste aus (SEO-Futter).
// ---------------------------------------------------------------------------
export const CITY_INTROS: Record<string, string> = {
  konstanz:
    'Konstanz ist mit rund 85.000 Einwohnern die größte Stadt am Bodensee — und ein eigener Kosmos für Handwerk und Dienstleistung. Universität und HTWG bringen tausende Studierende in die Stadt, die Altstadt mit Niederburg und Markstätte lebt von kleinen Betrieben, und über die Grenze kommt Laufkundschaft aus dem schweizerischen Kreuzlingen. Wer hier einen Friseur, eine KFZ-Werkstatt oder einen Optiker sucht, hat die Wahl. Diese Übersicht bündelt Handwerks- und Dienstleistungsbetriebe in Konstanz nach Gewerk, mit Adresse und — wo vorhanden — Öffnungszeiten und Kontakt. Die Betriebsdaten stammen aus OpenStreetMap.',
};

export const GEWERK_CITY_INTROS: Record<string, Record<string, string>> = {
  konstanz: {
    friseur:
      'Friseure gehören in Konstanz zu den am dichtesten vertretenen Betrieben — kein Wunder bei einer Studentenstadt mit hoher Fluktuation und viel Schweizer Kundschaft aus Kreuzlingen, die den günstigeren Kurs nutzt. Das Spektrum reicht vom klassischen Salon in der Altstadt über moderne Barbershops in der Niederburg bis zu Studios in Petershausen und Wollmatingen. Viele Salons arbeiten mit Termin, in der Innenstadt findest du aber auch Walk-in-Angebote. Wer Wert auf Naturfriseur, Balayage oder Herrenschnitt legt, wird in Konstanz schnell fündig. Unten siehst du Friseurbetriebe in Konstanz mit Adresse und Lage.',
    kosmetik:
      'Kosmetik- und Nagelstudios haben in Konstanz Konjunktur: Maniküre, Gesichtsbehandlung, Wimpern und Waxing werden quer durch die Stadt angeboten, von der Altstadt bis Petershausen. Gerade rund um Nagelstudios ist die Nachfrage hoch — entsprechend viele Adressen gibt es. Achte beim ersten Termin auf Hygiene, sichtbare Preislisten und ob ohne Voranmeldung etwas frei ist; in der Hauptsaison und am Wochenende sind die beliebten Studios oft ausgebucht. Diese Liste zeigt Kosmetik- und Nagelstudios in Konstanz mit Standort.',
    optiker:
      'Optiker in Konstanz reichen von den großen Ketten in der Fußgängerzone bis zu inhabergeführten Fachgeschäften mit eigener Werkstatt. Sehtest, Brillenanpassung, Kontaktlinsen und Reparaturen gehören zum Standard; einige Betriebe sind auf randlose Brillen, Sportoptik oder Kinderbrillen spezialisiert. Wer aus dem Umland oder aus Kreuzlingen kommt, findet die meisten Geschäfte fußläufig in der Altstadt rund um die Markstätte. Unten findest du Optiker in Konstanz mit Adresse.',
    tattoo:
      'Die Tattoo-Szene in Konstanz ist klein, aber fein. Die Studios arbeiten überwiegend nach Termin und Beratungsgespräch — spontan reinlaufen klappt selten, gute Künstler sind Wochen im Voraus gebucht. Stilrichtungen reichen von Fineline und Blackwork bis zu Realistik. Achte auf ein sauberes Studio, Einweg-Material und eine ehrliche Beratung zu Motiv, Platzierung und Heilung. Diese Übersicht listet Tattoo-Studios in Konstanz mit Standort.',
    juwelier:
      'Juweliere und Goldschmiede prägen das Bild der Konstanzer Altstadt — vom Traditionshaus mit Markenuhren bis zur kleinen Goldschmiede, die Trauringe und Einzelstücke von Hand fertigt. Neben Verkauf bieten viele auch Reparatur, Umarbeitung und Batteriewechsel an. Wer Trauringe sucht, sollte mehrere Termine einplanen; Goldschmiede mit eigener Werkstatt fertigen oft nach Maß. Unten siehst du Juweliere und Goldschmiede in Konstanz mit Adresse.',
    kfz:
      'KFZ-Werkstätten in Konstanz decken vom Markenservice bis zur freien Werkstatt alles ab: Inspektion, HU/AU-Vorbereitung, Reifenwechsel, Klimaservice und Unfallinstandsetzung. Freie Werkstätten sind bei älteren Fahrzeugen oft günstiger, Markenbetriebe punkten bei Garantie und Spezialdiagnose. In der Hauptsaison und vor dem Winter lohnt es sich, Termine für Reifen und HU früh zu buchen. Diese Liste zeigt KFZ-Werkstätten in Konstanz mit Standort und Kontakt.',
    sanitaer:
      'Sanitär- und Heizungsbetriebe sind in Konstanz gefragt — die historische Altstadt mit ihren Altbauten bedeutet viel Arbeit an Bad, Leitungen und Heizung, dazu kommt der Trend zu Wärmepumpe und moderner Badsanierung. Gute SHK-Betriebe sind entsprechend ausgelastet; bei Notfällen wie Rohrbruch oder Heizungsausfall im Winter fragst du am besten direkt nach dem Notdienst. Wer eine Badsanierung plant, sollte mehrere Angebote einholen. Unten findest du Sanitär- und Heizungsbetriebe in Konstanz.',
  },
};

export function gewerkIntro(citySlug: string, gewerk: string): string | undefined {
  return GEWERK_CITY_INTROS[citySlug]?.[gewerk];
}

// ---------------------------------------------------------------------------
// Gewerk-spezifische Partner-CTAs (Cross-Network statt generischem Handwerksingles-Pitch).
// Bei Nischen mit besser passender Partner-Börse: Tattoo → Christians dich-mit-stich.de.
// Affiliate-Pattern Elflirt/ICONY: /registration/?AID=th · extern = sponsored nofollow (GESETZ).
// ---------------------------------------------------------------------------
export type PartnerCta = { headline: string; sub: string; buttonLabel: string; url: string; image?: string };

export const GEWERK_PARTNER_CTA: Record<string, PartnerCta> = {
  tattoo: {
    headline: 'Du suchst als Tätowierte:r die große Liebe?',
    sub: 'Auf dich-mit-stich.de triffst du Singles mit Tattoos und Piercings — Menschen, die deinen Stil teilen.',
    buttonLabel: 'Zu dich-mit-stich.de',
    url: 'https://www.dich-mit-stich.de/registration/?AID=th',
    image: '/images/partner/dich-mit-stich.jpg',
  },
};

export function partnerCta(gewerk: string): PartnerCta | undefined {
  return GEWERK_PARTNER_CTA[gewerk];
}

// ---------------------------------------------------------------------------
// "Handwerk in Zahlen" — echte, zitierte Statistik (gegen OSM-Duennheit)
// ---------------------------------------------------------------------------
export type CityStats = {
  facts: { label: string; value: string }[];
  sources: { label: string; url: string }[];
  note?: string;
};

export const CITY_STATS: Record<string, CityStats> = {
  konstanz: {
    facts: [
      { label: 'Handwerksbetriebe im Kammerbezirk', value: 'rund 13.500' },
      { label: 'Beschäftigte im Handwerk', value: 'rund 70.000' },
      { label: 'Betriebe in diesem Verzeichnis', value: '154 in Konstanz' },
    ],
    sources: [
      { label: 'Handwerkskammer Konstanz (Stand 31.12.2024)', url: 'https://www.hwk-konstanz.de/handwerk/' },
      { label: 'OpenStreetMap-Mitwirkende (ODbL)', url: 'https://www.openstreetmap.org/copyright' },
    ],
    note: 'Der Kammerbezirk Konstanz umfasst die Landkreise Konstanz, Tuttlingen, Schwarzwald-Baar und Rottweil.',
  },
};

export function cityStats(citySlug: string): CityStats | undefined {
  return CITY_STATS[citySlug];
}
