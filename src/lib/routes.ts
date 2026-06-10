/** Personen-Hub-URL (Handwerker/Craftfluencer). */
export function getPersonHubUrl(slug: string): string {
  return `/handwerker/${slug}`;
}

/**
 * Kanonische Artikel-URL aus der Sektion (category).
 * - handwerk-news → /handwerk-news/{slug} (flach, keine Show-Ebene)
 * - berufsbilder → /berufsbilder/{slug}
 * - partnersuche (Default) → /singles-partnersuche/{slug}
 */
export function getArticleUrl(slug: string, category: string): string {
  switch (category) {
    case 'handwerk-news':
      return `/handwerk-news/${slug}`;
    case 'berufsbilder':
      return `/berufsbilder/${slug}`;
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
