import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SINGLE_HUB } from '@/lib/hubs';

const HUB_URL = 'https://handwerksingles.de/magazin/singles-partnersuche';

export const metadata = {
  title: SINGLE_HUB.seoTitle,
  description: SINGLE_HUB.seoDescription,
  alternates: { canonical: HUB_URL },
  openGraph: {
    title: SINGLE_HUB.seoTitle,
    description: SINGLE_HUB.seoDescription,
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

const PILLARS = [
  {
    title: 'Elektriker & Techniker',
    excerpt: 'Partnersuche zwischen Baustelle, Kundendienst und Schaltanlagen. Dating-Tipps für Elektro-Singles und Techniker im Handwerk.',
    href: '/singles-partnersuche',
    icon: '⚡',
  },
  {
    title: 'Bau & Holz',
    excerpt: 'Dating für Dachdecker, Tischler, Zimmermann und Maurer. Frühschicht, Montage und Familienbetrieb — Partnersuche mit Verständnis.',
    href: '/singles-partnersuche',
    icon: '🪚',
  },
];

export default async function SinglesPartnersuche() {
  const articles = await reader.collections.articles.all();

  const pillarItems = PILLARS.map((p) => ({
    name: p.title,
    url: `https://handwerksingles.de/magazin${p.href}`,
  }));

  const highlights = articles
    .filter((a) => a.entry.status === 'published' && a.entry.category === 'partnersuche')
    .sort((a, b) => (b.entry.publishedAt || '').localeCompare(a.entry.publishedAt || ''))
    .slice(0, 4);

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche im Handwerk — Hub für Handwerker-Singles',
          description: 'Dating-Guides für Elektriker, Dachdecker, Tischler, Zimmermann und Maurer.',
          url: HUB_URL,
          items: pillarItems,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: 'https://handwerksingles.de/magazin' },
          { name: 'Singles & Partnersuche', url: HUB_URL },
        ])}
      />

      <PillarHero
        title="Singles & Partnersuche"
        texts={[
          'Liebe im Handwerk',
          'Montage trifft Beziehung',
          'Baustelle & Herz',
          'Werkzeug-Match',
          'Handwerksingles',
        ]}
        subtitle="Partnersuche für Handwerker-Singles: Elektriker, Dachdecker, Tischler, Zimmermann und Maurer. Branchen-Verständnis ohne Erklärung."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Singles & Partnersuche', href: '/singles-partnersuche' }]} />
      </div>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">Wähle deinen Bereich</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p) => (
              <Link
                key={p.href + p.title}
                href={p.href}
                className="group block p-6 rounded-2xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
              >
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-orange transition-colors">{p.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {highlights.length > 0 && (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((a) => (
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
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Bereit für die Partnersuche?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Handwerker-Singles warten auf dich. Elektriker, Dachdecker, Tischler, Zimmermann und Maurer.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
