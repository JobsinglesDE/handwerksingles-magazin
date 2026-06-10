import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';
import { SECTION_HUBS, BERUF_HUBS } from '@/lib/hubs';

const HUB_URL = 'https://handwerksingles.de/magazin/berufsbilder';
const HUB = SECTION_HUBS['berufsbilder'];

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

// Handwerk-Berufsgruppen — Keys matchen BERUF_HUBS in hubs.ts
const GROUPS = [
  {
    title: 'Elektro & Technik',
    icon: '⚡',
    berufe: [
      { slug: 'elektriker', kurz: 'Elektroinstallation · 2.500–4.500 €' },
    ],
  },
  {
    title: 'Fahrzeug & Metall',
    icon: '🔧',
    berufe: [
      { slug: 'kfz-mechatroniker', kurz: 'Werkstatt & Diagnose · 2.400–4.200 €' },
    ],
  },
  {
    title: 'Dach & Holz',
    icon: '🪚',
    berufe: [
      { slug: 'dachdecker', kurz: 'Dach & Fassade · 2.500–4.000 €' },
      { slug: 'tischler', kurz: 'Holzhandwerk & Möbel · 2.300–4.000 €' },
      { slug: 'zimmermann', kurz: 'Holzbau & Walz · 2.400–4.500 €' },
    ],
  },
  {
    title: 'Bau & Ausbau',
    icon: '🏗️',
    berufe: [
      { slug: 'maurer', kurz: 'Rohbau & Hochbau · 2.400–4.200 €' },
    ],
  },
];

export default async function BerufsbilderHub() {
  const articles = await reader.collections.articles.all();
  const groupArticles = GROUPS.map((g) => ({
    ...g,
    berufe: g.berufe.map((b) => {
      const a = articles.find((x) => x.slug === b.slug);
      return a ? { ...a, kurz: b.kurz } : null;
    }).filter(Boolean) as any[],
  }));

  const hubEntries = Object.entries(BERUF_HUBS).map(([key, hub]) => ({
    name: hub.title.split(' ❤️')[0],
    url: `https://handwerksingles.de/magazin/${hub.slug}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Handwerksberufe — Übersicht',
          description: 'Die wichtigsten Handwerksberufe im Überblick: Ausbildung, Gehalt, Alltag.',
          url: HUB_URL,
          items: hubEntries,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://handwerksingles.de/magazin' },
          { name: 'Handwerk-News', url: 'https://handwerksingles.de/magazin/handwerk-news' },
          { name: 'Berufsbilder', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Handwerksberufe"
        texts={[
          '6 Handwerksberufe',
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
          { label: 'Berufsbilder', href: '/berufsbilder' },
        ]} />
      </div>

      {groupArticles.map((g) => (
        <ScrollReveal key={g.title}>
          <section className="max-w-6xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-primary flex items-center gap-3">
              <span className="text-3xl">{g.icon}</span>{g.title}
            </h2>
            {g.berufe.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {g.berufe.map((a: any) => (
                  <Link
                    key={a.slug}
                    href={articleHref(a)}
                    className="group block bg-surface rounded-2xl overflow-hidden border border-foreground/10 hover:border-primary/50 transition-colors"
                  >
                    {a.entry.featuredImage && (
                      <img
                        width="400" height="240"
                        src={withBasePath(a.entry.featuredImage)}
                        alt={a.entry.featuredImageAlt || a.entry.title}
                        className="w-full aspect-[5/3] object-cover group-hover:scale-[1.02] transition-transform"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {a.entry.title}
                      </h3>
                      <p className="text-xs text-foreground/60 mt-2">{a.kurz}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-foreground/50 text-sm py-4">Artikel in Vorbereitung.</p>
            )}
          </section>
        </ScrollReveal>
      ))}
    </>
  );
}
