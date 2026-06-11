import { reader } from '@/lib/keystatic';
import { getPersonHubUrl } from '@/lib/routes';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeriesCard } from '@/components/content/SeriesCard';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { SECTION_HUBS } from '@/lib/hubs';

const BASE = 'https://handwerksingles.de/magazin';
const HUB = SECTION_HUBS['handwerker'];

export async function generateMetadata() {
  const url = `${BASE}/handwerker`;
  return {
    title: HUB.seoTitle,
    description: HUB.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: HUB.seoTitle, description: HUB.seoDescription, url, type: 'website', siteName: 'Handwerksingles Magazin', locale: 'de-DE' },
  };
}

export default async function HandwerkerIndex() {
  const persons = (await reader.collections.persons.all())
    .filter((p) => p.entry.status !== 'draft')
    .sort((a, b) => a.entry.name.localeCompare(b.entry.name, 'de'));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Promi-Handwerker — Craftfluencer im Porträt',
          description: 'Steckbriefe und Porträts der bekanntesten Craftfluencer und Handwerks-Promis.',
          url: `${BASE}/handwerker`,
          items: persons.map((p) => ({
            name: p.entry.name,
            url: `${BASE}${getPersonHubUrl(p.slug)}`,
          })),
        })}
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: 'Promi-Handwerker', href: '/handwerker' }]} />

        <header className="mt-6 mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-orange">
            Craftfluencer
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-2 mb-4">
            Promi-Handwerker im Porträt
          </h1>
          <p className="text-foreground/70 leading-relaxed max-w-2xl">
            Steckbrief, Karriere und alle Artikel zu den bekanntesten Craftfluencern und Handwerks-Promis — von tschulique bis zur Dachdeckerin Chiara.
          </p>
        </header>

        {persons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {persons.map((p) => (
              <SeriesCard
                key={p.slug}
                title={p.entry.name}
                excerpt={p.entry.intro || p.entry.role || ''}
                href={getPersonHubUrl(p.slug)}
                image={p.entry.featuredImage || undefined}
                imageAlt={p.entry.featuredImageAlt || undefined}
                seriesLabel={p.entry.role || 'Handwerker'}
              />
            ))}
          </div>
        )}
        {persons.length === 0 && (
          <p className="text-foreground/50 text-center py-12">Porträts folgen in Kürze.</p>
        )}
      </div>
    </>
  );
}
