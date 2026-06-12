import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { withBasePath } from '@/lib/url';
import { SECTION_HUBS } from '@/lib/hubs';

const HUB_URL = 'https://handwerksingles.de/magazin/handwerk-news';
const HUB = SECTION_HUBS['handwerk-news'];

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

const CLUSTERS = [
  {
    title: 'Craftfluencer Deutschland',
    excerpt: 'Die bekanntesten Handwerker auf Social Media: tschulique, Dachdeckerin Chiara, Jonas Winkler und mehr. Porträts, Reichweite und ihre Botschaft.',
    href: '/handwerker',
    icon: '⭐',
  },
  {
    title: 'Handwerkskammern & Verbände',
    excerpt: 'Die 53 Handwerkskammern in Deutschland plus Zentralverband des Deutschen Handwerks. Was sich in der Handwerkspolitik gerade bewegt.',
    href: '/singles-regional/handwerkskammern',
    icon: '🏛️',
  },
  {
    title: 'Handwerksberufe',
    excerpt: 'Elektriker, KFZ-Mechatroniker, Dachdecker, Tischler, Zimmermann, Maurer — was der Beruf wirklich heißt, mit ehrlichem Blick auf Ausbildung und Alltag.',
    href: '/handwerksberufe',
    icon: '🪚',
  },
  {
    title: 'Partnersuche im Handwerk',
    excerpt: 'Dating-Guides für Handwerker-Singles: Montage, Frühschicht, Familienbetrieb — und trotzdem die große Liebe finden.',
    href: '/singles-partnersuche',
    icon: '❤️',
  },
];

export default async function HandwerkNewsHub() {
  const articles = await reader.collections.articles.all();

  const recentArticles = articles
    .filter((a) => a.entry.status === 'published')
    .filter((a) => {
      const cat = a.entry.category;
      return cat === 'handwerk-news' || cat === 'handwerksberufe' || a.entry.type === 'pillar' || a.entry.type === 'berufsbild' || a.entry.type === 'news';
    })
    .sort((a, b) => {
      const da = a.entry.publishedAt || '';
      const db = b.entry.publishedAt || '';
      return db.localeCompare(da);
    })
    .slice(0, 20);

  const clusterItems = CLUSTERS.map((c) => ({
    name: c.title,
    url: `https://handwerksingles.de/magazin${c.href}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Handwerk-News & Craftfluencer — Magazin-Hub',
          description: 'Craftfluencer, Handwerkskammern und Handwerksberufe-Hubs auf Handwerksingles.',
          url: HUB_URL,
          items: clusterItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://handwerksingles.de/magazin' },
          { name: 'Handwerk-News', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Handwerk-News & Craftfluencer"
        texts={[
          'Craftfluencer im Porträt',
          'Handwerkskammern & Verbände',
          'Handwerksberufe-Hubs',
          'Magazin-Spur',
        ]}
        subtitle="Craftfluencer, Handwerkskammern und Handwerksberufe — alles, was die deutsche Handwerksszene gerade bewegt."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Handwerk-News', href: '/handwerk-news' }]} />
      </div>

      {/* 4 Cluster-Cards */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">Magazin-Bereiche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLUSTERS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group block p-6 rounded-2xl bg-surface border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{c.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Newest Articles */}
      {recentArticles.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-primary">Aktuelle Artikel</h2>
            <ul className="divide-y divide-foreground/10">
              {recentArticles.map((a) => (
                <li key={a.slug} className="py-5">
                  <Link href={articleHref(a)} className="group flex gap-4 items-start">
                    {a.entry.featuredImage && (
                      <img
                        width="200" height="140"
                        src={withBasePath(a.entry.featuredImage)}
                        alt={a.entry.featuredImageAlt || a.entry.title}
                        className="w-24 h-16 object-cover rounded-lg shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      {a.entry.category && (
                        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">{a.entry.category}</p>
                      )}
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">{a.entry.title}</p>
                      {a.entry.excerpt && (
                        <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{a.entry.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>
      )}
    </>
  );
}
