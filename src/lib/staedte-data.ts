// src/lib/staedte-data.ts
// Loader + Typen fuer das Stadt-Verzeichnis (OSM-Betriebsdaten).
// Quelle: src/data/betriebe/<stadt>.json (generiert von scripts/import-osm-betriebe.mjs).
// Lizenz der Daten: ODbL (© OpenStreetMap-Mitwirkende) — Attribution Pflicht.

import konstanz from '@/data/betriebe/konstanz.json';

export type Betrieb = {
  slug: string;
  name: string;
  gewerk: string;
  street?: string;
  plz?: string;
  city: string;
  lat: number | null;
  lon: number | null;
  phone?: string;
  website?: string;
  openingHours?: string;
  osmType: string;
  osmId: number;
  addressSource?: 'osm' | 'nominatim';
};

export type CityData = {
  city: string;
  citySlug: string;
  bundesland: string;
  attribution: string;
  generatedAt: string;
  betriebe: Betrieb[];
};

const CITIES: Record<string, CityData> = {
  konstanz: konstanz as CityData,
};

export function listCities(): CityData[] {
  return Object.values(CITIES);
}

export function getCity(citySlug: string): CityData | null {
  return CITIES[citySlug] ?? null;
}

/** Findet eine Stadt ueber Bundesland + Stadt-Slug (fuer Routen mit beiden Params). */
export function getCityByBundesland(bundesland: string, citySlug: string): CityData | null {
  const c = CITIES[citySlug];
  return c && c.bundesland === bundesland ? c : null;
}

/** Gewerke einer Stadt mit Betriebs-Anzahl, absteigend sortiert. */
export function gewerkeInCity(city: CityData): { gewerk: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const b of city.betriebe) counts.set(b.gewerk, (counts.get(b.gewerk) ?? 0) + 1);
  return [...counts.entries()]
    .map(([gewerk, count]) => ({ gewerk, count }))
    .sort((a, b) => b.count - a.count);
}

export function businessesByGewerk(city: CityData, gewerk: string): Betrieb[] {
  return city.betriebe
    .filter((b) => b.gewerk === gewerk)
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

export function getBusiness(city: CityData, gewerk: string, betriebSlug: string): Betrieb | null {
  return city.betriebe.find((b) => b.gewerk === gewerk && b.slug === betriebSlug) ?? null;
}
