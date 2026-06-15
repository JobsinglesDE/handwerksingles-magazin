/** Personen-Hub-URL (Handwerker/Craftfluencer). */
export function getPersonHubUrl(slug: string): string {
  return `/handwerker/${slug}`;
}

/**
 * Kanonische Artikel-URL aus der Sektion (category).
 * - handwerk-news → /handwerk-news/{slug} (flach, keine Show-Ebene)
 * - handwerksberufe → /handwerksberufe/{slug}
 * - partnersuche (Default) → /singles-partnersuche/{slug}
 */
export function getArticleUrl(slug: string, category: string): string {
  switch (category) {
    case 'handwerk-news':
      return `/handwerk-news/${slug}`;
    case 'handwerksberufe':
      return `/handwerksberufe/${slug}`;
    case 'partnersuche':
    default:
      return `/singles-partnersuche/${slug}`;
  }
}

/** Bequemer Helfer: URL aus einem Keystatic-Collection-Item ({slug, entry}). */
export function articleHref(item: {
  slug: string;
  entry: { category: string };
}): string {
  return getArticleUrl(item.slug, item.entry.category);
}

// --- Stadt-Verzeichnis (Pilot: Konstanz) -----------------------------------
/** Stadt-Hub: /handwerksbetriebe/{bundesland}/{stadt} */
export function getCityUrl(bundesland: string, stadt: string): string {
  return `/handwerksbetriebe/${bundesland}/${stadt}`;
}
/** Gewerk×Stadt-Intent-Seite: /handwerksbetriebe/{bundesland}/{stadt}/{gewerk} */
export function getCityGewerkUrl(bundesland: string, stadt: string, gewerk: string): string {
  return `/handwerksbetriebe/${bundesland}/${stadt}/${gewerk}`;
}
/** Betriebs-Profil: /handwerksbetriebe/{bundesland}/{stadt}/{gewerk}/{betrieb} */
export function getBetriebUrl(bundesland: string, stadt: string, gewerk: string, betrieb: string): string {
  return `/handwerksbetriebe/${bundesland}/${stadt}/${gewerk}/${betrieb}`;
}
/** Beruf-Hub-URL fuer Cross-Link (informationaler Hub). */
export function getBerufHubUrl(berufSlug: string): string {
  return `/handwerksberufe/${berufSlug}`;
}
