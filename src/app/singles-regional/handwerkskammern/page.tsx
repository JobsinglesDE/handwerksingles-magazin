import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { HeartButton } from '@/components/ui/HeartButton';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { BUNDESLAENDER, BUNDESLAND_SLUGS } from '@/lib/bundeslaender';

const PILLAR_URL = 'https://handwerksingles.de/magazin/singles-regional/handwerkskammern';

export const metadata = {
  title: 'Handwerkskammern Deutschland: alle 53 Kammern im Überblick',
  description: 'Alle deutschen Handwerkskammern im Überblick: Weiterbildungen, Meisterprüfungen und Branchentreffs als Networking-Gelegenheit für Handwerker-Singles.',
  alternates: { canonical: PILLAR_URL },
  openGraph: {
    title: 'Handwerkskammern — Networking mit Liebes-Potenzial',
    description: 'Pro Bundesland: Kammer-Sitz, Mitgliedsbetriebe, Top-Events und wie Handwerker-Singles diese nutzen.',
    url: PILLAR_URL,
    type: 'website',
    siteName: 'Handwerksingles Magazin',
    locale: 'de_DE',
  },
};

const VEREIN_COLORS = [
  { r: 15, g: 139, b: 141 },
  { r: 47, g: 181, b: 184 },
  { r: 255, g: 122, b: 0 },
];

export default async function HandwerkskammernPillar() {
  const all = await reader.collections.handwerkskammern.all();
  const published = all.filter((a) => a.entry.status === 'published');

  function countByBL(slug: string) {
    return published.filter((a) => a.entry.bundesland === slug).length;
  }

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Handwerkskammern — Singles Regional',
          description: 'Alle 53 Handwerkskammern in Deutschland — nach Bundesland, mit Mitgliedsbetrieben und Kontakt.',
          url: PILLAR_URL,
          items: BUNDESLAND_SLUGS.map((s) => ({
            name: BUNDESLAENDER[s].name,
            url: `${PILLAR_URL}/${s}`,
          })),
        })}
      />

      <PillarHero
        title="Handwerkskammern"
        texts={[
          '53 Handwerkskammern',
          'Branchen-Netzwerk + Privates',
          'Meisterprüfung trifft Liebe',
          'Branchen-Treffs mit Mehrwert',
          'Handwerkskammern',
        ]}
        subtitle="Alle 53 Handwerkskammern in Deutschland — und wie Handwerker-Singles diese Treffs über das Fachprogramm hinaus nutzen."
        colors={VEREIN_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[
          { label: 'Singles Regional', href: '/singles-regional' },
          { label: 'Handwerkskammern', href: '/singles-regional/handwerkskammern' },
        ]} />
      </div>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <AnimatedGradientBorder borderRadius={16} borderWidth={2}>
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-base leading-relaxed">
                Eine Handwerkskammer ist nicht der erste Ort, an den du beim Wort «Liebe» denkst. Aber genau hier sammeln sich Elektriker, Dachdecker, Tischler und Maurer regelmäßig: Meisterprüfungen, Gesellenentlassungen, Branchenstammtische. Wer dort wach hingeht statt nur fachlich zu netzwerken, trifft Menschen, die deinen Berufsalltag nicht erst erklärt bekommen müssen.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Wähle dein Bundesland: wir zeigen dir, welche Kammer-Events tatsächlich offen sind, und wie du den Schritt von Branche zu Privatem wagst, ohne unprofessionell zu wirken.
              </p>
            </div>
          </AnimatedGradientBorder>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-6 px-6">
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>

      {/* Bundesland-Grid */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Wähle dein Bundesland
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Jedes Bundesland hat eigene Handwerkskammern mit spezifischen Angeboten für Handwerker-Singles.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BUNDESLAND_SLUGS.map((slug) => {
              const bl = BUNDESLAENDER[slug];
              const count = countByBL(slug);
              return (
                <Link
                  key={slug}
                  href={`/singles-regional/handwerkskammern/${slug}`}
                  className="group relative block p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{bl.emoji}</div>
                  <div className="text-base font-bold text-foreground group-hover:text-brand-orange transition-colors leading-tight">
                    {bl.name}
                  </div>
                  <div className="text-xs text-foreground/50 mt-2">
                    {count > 0 ? `${count} Verein${count > 1 ? 'e' : ''}` : 'In Vorbereitung'}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Direkt zur Stadt
          </h2>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Alle Handwerkskammern auf einen Blick, alphabetisch nach Stadt.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {published
              .slice()
              .sort((a, b) => (a.entry.stadt || '').localeCompare(b.entry.stadt || ''))
              .map((k) => (
                <Link
                  key={k.slug}
                  href={`/singles-regional/handwerkskammern/${k.entry.bundesland}/${k.entry.stadt}`}
                  className="block px-4 py-3 rounded-lg bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <div className="text-base font-bold text-foreground capitalize">
                    {(k.entry.stadt || '').replace(/-/g, ' ')}
                  </div>
                  <div className="text-xs text-foreground/50 mt-1">
                    {BUNDESLAENDER[k.entry.bundesland]?.name || k.entry.bundesland}
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="text-center py-16 px-6">
          <h2 className="text-2xl font-bold mb-4">Lieber direkt zum Match?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Handwerker-Singles aus jedem Bundesland — auf Handwerksingles.de.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
