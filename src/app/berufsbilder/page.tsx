import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { TableOfContents } from '@/components/content/TableOfContents';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { SECTION_HUBS } from '@/lib/hubs';

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

type BerufSection = {
  beruf: string;
  letter: string;
  tocLabel: string;
  heading: string;
  gehalt: string;
  paragraphs: string[];
};

// Gehalts-Spannen aus den Berufsbild-Artikeln (DFS-/Tavily-validiert beim Aufbau)
const SECTIONS: BerufSection[] = [
  {
    beruf: 'dachdecker',
    letter: 'A',
    tocLabel: 'Dachdecker: Ausbildung & Höhenluft',
    heading: 'Dachdecker: Ausbildung, Gehalt & Leben in der Höhe',
    gehalt: '2.500–4.000 €',
    paragraphs: [
      'Dachdecker arbeiten dort, wo andere nicht hinkommen — und sind mit Solar- und Gründach-Boom gefragter denn je. Die Ausbildung dauert drei Jahre, der Lohn liegt zwischen 2.500 und 4.000 Euro, mit Zuschlägen für Höhe und Witterung.',
    ],
  },
  {
    beruf: 'elektriker',
    letter: 'B',
    tocLabel: 'Elektriker: Ausbildung, Gehalt & Karriere',
    heading: 'Elektriker: Ausbildung, Gehalt & Karriere',
    gehalt: '2.500–4.500 €',
    paragraphs: [
      'Elektroniker für Energie- und Gebäudetechnik sind die gefragtesten Fachkräfte im Handwerk: Ohne sie läuft keine Baustelle, kein Smart Home, keine Wärmepumpe. Die Ausbildung dauert 3,5 Jahre, das Gehalt liegt je nach Region und Spezialisierung zwischen 2.500 und 4.500 Euro.',
    ],
  },
  {
    beruf: 'kfz-mechatroniker',
    letter: 'C',
    tocLabel: 'KFZ-Mechatroniker: Werkstatt & Gehalt',
    heading: 'KFZ-Mechatroniker: Werkstatt, Diagnose & Gehalt',
    gehalt: '2.400–4.200 €',
    paragraphs: [
      'Vom Ölwechsel zur Hochvolt-Diagnose: Der KFZ-Beruf hat sich mit der E-Mobilität stärker verändert als fast jedes andere Gewerk. Wer die Hochvolt-Qualifikation mitbringt, verdient deutlich über dem Schnitt von 2.400 bis 4.200 Euro.',
    ],
  },
  {
    beruf: 'maurer',
    letter: 'D',
    tocLabel: 'Maurer: Ausbildung & Alltag auf dem Bau',
    heading: 'Maurer: Ausbildung, Gehalt & Alltag auf dem Bau',
    gehalt: '2.400–4.200 €',
    paragraphs: [
      'Maurer sind das Rückgrat jedes Rohbaus. Die Bau-Tarifbindung sorgt für solide 2.400 bis 4.200 Euro, und der Fachkräftemangel auf dem Bau macht den Beruf so sicher wie kaum einen anderen.',
    ],
  },
  {
    beruf: 'tischler',
    letter: 'E',
    tocLabel: 'Tischler & Schreiner: Holzhandwerk',
    heading: 'Tischler & Schreiner: Ausbildung, Gehalt & Holzhandwerk',
    gehalt: '2.300–4.000 €',
    paragraphs: [
      'Tischler — südlich der Mainlinie Schreiner — verbinden Handwerk mit Gestaltung: Möbel, Innenausbau, Restaurierung. Drei Jahre Ausbildung, 2.300 bis 4.000 Euro Gehalt, und mit Meistertitel der direkte Weg in den eigenen Betrieb.',
    ],
  },
  {
    beruf: 'zimmermann',
    letter: 'F',
    tocLabel: 'Zimmermann: Ausbildung, Gehalt & Walz',
    heading: 'Zimmermann: Ausbildung, Gehalt & die Walz',
    gehalt: '2.400–4.500 €',
    paragraphs: [
      'Holzbau boomt — vom Dachstuhl bis zum mehrgeschossigen Holzhaus. Zimmerleute verdienen 2.400 bis 4.500 Euro, und die traditionelle Walz nach der Gesellenprüfung ist bis heute gelebte Praxis: drei Jahre und ein Tag auf Wanderschaft.',
    ],
  },
];

export default async function BerufsbilderHub() {
  const articles = await reader.collections.articles.all();
  const berufArticles = articles.filter(
    (a) => a.entry.status === 'published' && a.entry.category === 'berufsbilder'
  );
  const byBeruf = (beruf: string) =>
    berufArticles
      .filter((a) => a.entry.beruf === beruf)
      .sort((a, b) => (a.entry.type === 'berufsbild' ? -1 : b.entry.type === 'berufsbild' ? 1 : 0));

  const tocItems = [
    ...SECTIONS.map((s) => ({ label: `${s.letter}. ${s.tocLabel}`, id: s.beruf })),
    { label: 'Gehalt im Handwerk: 6 Berufe im Vergleich', id: 'gehaltsvergleich' },
  ];

  const itemList = berufArticles.map((a) => ({
    name: a.entry.title,
    url: `https://handwerksingles.de/magazin${articleHref(a)}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Handwerksberufe: Ausbildung, Gehalt & Karriere — alle Berufsbilder',
          description: HUB.seoDescription,
          url: HUB_URL,
          items: itemList,
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

      {/* Intro + TOC */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Handwerksberufe bieten, was vielen Bürojobs fehlt: sichere Nachfrage, ehrliches Gehalt und ein
            Ergebnis, das man am Feierabend anfassen kann. Hier findest du die wichtigsten Berufsbilder im
            Überblick — von der Ausbildung über realistische Gehaltszahlen bis zum Arbeitsalltag.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80 mb-8">
            Jede Sektion fasst das Berufsbild kurz zusammen und verlinkt auf den kompletten Guide sowie
            vertiefende Artikel zu Gehalt und Ausbildung.
          </p>
          <TableOfContents items={tocItems} showFaq={false} />
        </section>
      </ScrollReveal>

      {/* Beruf-Sektionen A–F */}
      {SECTIONS.map((section) => {
        const sectionArticles = byBeruf(section.beruf);
        return (
          <ScrollReveal key={section.beruf}>
            <section id={section.beruf} className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
                {section.letter}. {section.heading}
              </h2>
              <div className="max-w-3xl">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
              </div>
              {sectionArticles.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-8 mb-5 text-foreground/90">
                    Guide & vertiefende Artikel
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sectionArticles.map((a) => (
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
                </>
              )}
            </section>
          </ScrollReveal>
        );
      })}

      {/* Gehaltsvergleich */}
      <ScrollReveal>
        <section id="gehaltsvergleich" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Gehalt im Handwerk: 6 Berufe im Vergleich
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6 max-w-3xl">
            Brutto-Monatsgehälter für Gesellen, je nach Region, Berufserfahrung und Betrieb. Mit Meistertitel
            oder eigener Firma liegen die Werte deutlich darüber.
          </p>
          <dl className="divide-y divide-foreground/10 rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
            {SECTIONS.map((s) => (
              <div key={s.beruf} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-foreground/60">
                  <Link href={`/berufsbilder/${s.beruf}`} className="hover:text-brand-orange transition-colors">
                    {s.heading.split(':')[0]}
                  </Link>
                </dt>
                <dd className="font-semibold text-right">{s.gehalt}</dd>
              </div>
            ))}
          </dl>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Singles aus diesen Berufen kennenlernen?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Elektriker, Dachdecker, Tischler, Zimmermann und Maurer — auf Handwerksingles triffst du Menschen,
            die deinen Alltag verstehen. Mehr dazu im{' '}
            <Link href="/singles-partnersuche" className="text-brand-orange hover:underline">
              Partnersuche-Guide für Handwerker
            </Link>.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
