import type { MetadataRoute } from 'next';
import { reader } from '@/lib/keystatic';
import { getArticleUrl, getPersonHubUrl, getCityUrl, getCityGewerkUrl, getBetriebUrl } from '@/lib/routes';
import { ALL_HUBS } from '@/lib/hubs';
import { listCities, gewerkeInCity } from '@/lib/staedte-data';
import { shouldIndexGewerk, shouldIndexBetrieb } from '@/lib/staedte';

const BASE = 'https://handwerksingles.de/magazin';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, stories, handwerkskammern, persons] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.stories.all(),
    reader.collections.handwerkskammern.all().catch(() => []),
    reader.collections.persons.all().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/singles-regional`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/singles-regional/handwerkskammern`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/erfolgsgeschichten`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/ueber-uns`, priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/kontakt`, priority: 0.5, changeFrequency: 'monthly' },
    // Sektion- + Beruf-Hubs (zentral aus hubs.ts, je mit ❤️-Meta)
    ...ALL_HUBS.map((h) => ({
      url: `${BASE}/${h.slug}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    })),
  ];

  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({
      url: `${BASE}${getArticleUrl(a.slug, a.entry.category)}`,
      priority: a.entry.isFeatured ? 0.9 : 0.7,
      changeFrequency: 'monthly' as const,
    }));

  const storyPages: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${BASE}/erfolgsgeschichten/${s.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  // Handwerkskammern: Bundesland-Hubs + Stadt-Detailseiten
  const kammerBundeslaender = [...new Set(handwerkskammern.map((a) => a.entry.bundesland))];
  const kammerBundeslandPages: MetadataRoute.Sitemap = kammerBundeslaender.map((b) => ({
    url: `${BASE}/singles-regional/handwerkskammern/${b}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));
  const kammerPages: MetadataRoute.Sitemap = handwerkskammern
    .filter((a) => a.entry.status === 'published')
    .map((a) => ({
      url: `${BASE}/singles-regional/handwerkskammern/${a.entry.bundesland}/${a.entry.stadt}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }));

  // Handwerker-Personen-Hubs
  const personPages: MetadataRoute.Sitemap = (persons || [])
    .filter((p) => p.entry.status !== 'draft')
    .map((p) => ({
      url: `${BASE}${getPersonHubUrl(p.slug)}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }));

  // Stadt-Verzeichnis (Pilot Konstanz): NUR indexierbare URLs (Hub + Volumen-Gewerke + datenreiche Profile)
  const staedtePages: MetadataRoute.Sitemap = [];
  for (const c of listCities()) {
    staedtePages.push({ url: `${BASE}${getCityUrl(c.bundesland, c.citySlug)}`, priority: 0.7, changeFrequency: 'monthly' });
    for (const { gewerk, count } of gewerkeInCity(c)) {
      if (shouldIndexGewerk(gewerk, count)) {
        staedtePages.push({ url: `${BASE}${getCityGewerkUrl(c.bundesland, c.citySlug, gewerk)}`, priority: 0.7, changeFrequency: 'monthly' });
      }
    }
    for (const b of c.betriebe) {
      if (shouldIndexBetrieb(b)) {
        staedtePages.push({ url: `${BASE}${getBetriebUrl(c.bundesland, c.citySlug, b.gewerk, b.slug)}`, priority: 0.5, changeFrequency: 'monthly' });
      }
    }
  }

  const all = [...staticPages, ...personPages, ...articlePages, ...storyPages, ...kammerBundeslandPages, ...kammerPages, ...staedtePages];
  // Dedupe nach URL (SINGLE_HUB taucht in staticPages + ALL_HUBS auf)
  const seen = new Set<string>();
  return all.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)));
}
