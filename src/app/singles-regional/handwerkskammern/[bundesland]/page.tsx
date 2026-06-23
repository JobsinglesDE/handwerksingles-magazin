import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reader } from '@/lib/keystatic';
import { ArticleCard } from '@/components/content/ArticleCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS, bundeslandName, bundeslandEmoji } from '@/lib/bundeslaender';

export async function generateStaticParams() {
  return BUNDESLAND_SLUGS.map((bundesland) => ({ bundesland }));
}

export async function generateMetadata({ params }: { params: Promise<{ bundesland: string }> }) {
  const { bundesland } = await params;
  if (!BUNDESLAENDER[bundesland]) return {};
  const name = bundeslandName(bundesland);
  const url = `https://handwerksingles.de/magazin/singles-regional/handwerkskammern/${bundesland}`;
  return {
    title: `Handwerkskammer ${name} — Singles & Netzwerk`,
    description: `Handwerkskammern in ${name}: Mitgliedsbetriebe, Events, wie Handwerker-Singles diese für Networking nutzen.`,
    alternates: { canonical: url },
    openGraph: { url, type: 'website', siteName: 'Handwerksingles Magazin', locale: 'de_DE' },
  };
}

export default async function HandwerkskammerBundeslandPage({ params }: { params: Promise<{ bundesland: string }> }) {
  const { bundesland } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();

  const all = await reader.collections.handwerkskammern.all();
  const inBL = all
    .filter((a) => a.entry.status === 'published' && a.entry.bundesland === bundesland)
    .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || '', 'de'));

  const blName = bundeslandName(bundesland);
  const url = `https://handwerksingles.de/magazin/singles-regional/handwerkskammern/${bundesland}`;

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `Handwerkskammer ${blName}`,
          description: `Handwerkskammern in ${blName}.`,
          url,
          items: inBL.map((a) => ({
            name: a.entry.title,
            url: `https://handwerksingles.de/magazin/singles-regional/handwerkskammern/${bundesland}/${a.entry.stadt}`,
          })),
        })}
      />

      <section className="relative overflow-hidden min-h-[280px] md:min-h-[360px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/40 via-surface-dark to-background" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="text-7xl mb-4">{bundeslandEmoji(bundesland)}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            Handwerkskammer <span className="text-brand-orange-text">{blName}</span>
          </h1>
          <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mt-4 leading-relaxed">
            Handwerkskammern in {blName} — Handwerker-Networking mit Liebes-Potenzial.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Handwerkskammern', href: '/singles-regional/handwerkskammern' },
          { label: blName, href: `/singles-regional/handwerkskammern/${bundesland}` },
        ]} />
      </div>

      {inBL.length === 0 ? (
        <ScrollReveal>
          <section className="max-w-3xl mx-auto px-6 py-16 text-center">
            <p className="text-lg text-foreground/70 mb-6">
              Pages für {blName} sind in Vorbereitung. Während wir die Recherche finalisieren —
              Handwerksingles.de wartet nicht.
            </p>
            <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </section>
        </ScrollReveal>
      ) : (
        <ScrollReveal>
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-brand-orange">
              Handwerkskammern in {blName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inBL.map((a) => (
                <ArticleCard
                  key={a.slug}
                  title={a.entry.title}
                  excerpt={a.entry.excerpt}
                  href={`/singles-regional/handwerkskammern/${bundesland}/${a.entry.stadt}`}
                  image={a.entry.featuredImage || undefined}
                  imageAlt={a.entry.featuredImageAlt || undefined}
                  category={a.entry.kammerBezirk || 'Handwerkskammer'}
                  date={a.entry.publishedAt || undefined}
                />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <Link
            href="/singles-regional/handwerkskammern"
            className="text-brand-orange-text hover:underline text-sm"
          >
            ← zurück zur Handwerkskammern-Übersicht
          </Link>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Direkt zu den Singles in {blName}?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Lokale Handwerker-Singles auf Handwerksingles.de finden.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
