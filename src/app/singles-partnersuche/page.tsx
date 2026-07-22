import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { ArticleCard } from '@/components/content/ArticleCard';
import { TableOfContents } from '@/components/content/TableOfContents';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { SINGLE_HUB } from '@/lib/hubs';

const HUB_URL = 'https://handwerksingles.de/magazin/singles-partnersuche';
const GUIDE_SLUG = 'der-ultimative-guide-zur-partnersuche-fuer-handwerker';

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
    locale: 'de_DE',
  },
};

const HUB_COLORS = [
  { r: 82, g: 35, b: 15 },
  { r: 122, g: 58, b: 29 },
  { r: 224, g: 121, b: 77 },
];

type Section = {
  id: string;
  letter: string;
  tocLabel: string;
  heading: string;
  paragraphs: string[];
};

const SECTIONS: Section[] = [
  {
    id: 'grundlagen',
    letter: 'A',
    tocLabel: 'Grundlagen: Partnersuche im Handwerk',
    heading: 'Grundlagen: Die Realität der Partnersuche im Handwerk',
    paragraphs: [
      'Knapp 5,6 Millionen Menschen arbeiten laut Zentralverband des Deutschen Handwerks (ZDH) in gut einer Million Handwerksbetrieben. Trotzdem fühlen sich viele bei der Partnersuche wie auf einer Baustelle ohne Plan. Der Grund ist nicht mangelndes Interesse — es ist der Alltag. Wer um 6:30 Uhr auf der Baustelle steht, lebt in einem anderen Rhythmus als die meisten Singles.',
      'Das eigentliche Problem ist Energie, nicht Zeit. Nach einem körperlich harten Arbeitstag bleibt wenig Kapazität für aufwendiges Kennenlernen. Dafür gibt es einen unterschätzten Vorteil: den frühen Feierabend. Was an Handwerkern wirklich dran ist — und welche Klischees man getrost vergessen kann — zeigen diese Artikel.',
    ],
  },
  {
    id: 'online-dating',
    letter: 'B',
    tocLabel: 'Online kennenlernen: Dating-Apps im Test',
    heading: 'Online kennenlernen: Dating-Apps für Handwerker im Test',
    paragraphs: [
      'Im Kollegenkreis trifft man selten jemanden zum Kennenlernen — das Handwerk bleibt ein männerdominiertes Feld. Online-Dating ist deshalb für Handwerker keine Ausweichlösung, sondern der sinnvollste erste Schritt. Eine Dating-Plattform speziell für das Handwerk wie Handwerksingles bringt dabei Menschen zusammen, die Frühschicht und Montage bereits kennen — anders als Auftrags- und Job-Matching-Apps wie Baumatch oder Meistermatch, die nur Betriebe und Kunden vernetzen. Entscheidend ist das Profil: Wer schreibt „Ich baue Dinge, die bleiben — und genieße Feierabend um 16 Uhr", wirkt anders als „Ich arbeite viel und bin oft müde".',
      'Fotos in Arbeitskleidung funktionieren. Ehrlichkeit bei Montage-Zeiten spart Enttäuschungen. Und: lieber eine Plattform sorgfältig nutzen als vier halbherzig. Welche Dating-App im Handwerker-Alltag wirklich passt und wie Frauen und Männer im Handwerk gezielt suchen, steht hier.',
    ],
  },
  {
    id: 'dates',
    letter: 'C',
    tocLabel: 'Erstes Date & Date-Ideen',
    heading: 'Erstes Date & Date-Ideen: Tipps für den Feierabend',
    paragraphs: [
      'Der frühe Feierabend ist beim ersten Date der Handwerker-Trumpf: Während andere noch im Büro sitzen, ist um 16 Uhr Zeit für einen Spaziergang, einen Biergarten oder den Markt. Wer das bewusst plant, datet entspannter als jeder Großraumbüro-Single nach 19 Uhr.',
      'Auch die Saison spielt mit: Frühjahr und Sommer bedeuten Volllast auf den Baustellen, Herbst und Winter lassen mehr Luft. Konkrete Date-Ideen für jede Jahreszeit und Tipps fürs Kennenlernen nach Feierabend gibt es in diesen Artikeln.',
    ],
  },
  {
    id: 'beziehung',
    letter: 'D',
    tocLabel: 'Beziehung, Montage & Fernbeziehung',
    heading: 'Beziehung & Alltag: Montage, Wochenendbeziehung, eigener Betrieb',
    paragraphs: [
      'Montageeinsätze sind keine Beziehungskiller — wenn beide Seiten klare Erwartungen setzen. Wer unter der Woche auswärts übernachtet, führt faktisch eine Wochenendbeziehung. Die hält, wenn vorab kommuniziert ist: Wann bin ich weg, wann komme ich zurück, wie erreichen wir uns.',
      'Selbstständige und Meister im Familienbetrieb bringen eine eigene Dynamik mit: Das Handy klingelt samstags, die Familie arbeitet mit, Beruf und Privatleben verschwimmen. Wie Beziehungen diesen Alltag aushalten, zeigen die folgenden Guides.',
    ],
  },
  {
    id: 'lebenslagen',
    letter: 'E',
    tocLabel: 'Spezielle Lebenslagen',
    heading: 'Spezielle Lebenslagen: Vom Azubi bis zur Meisterschule',
    paragraphs: [
      'Ausbildung und Meisterschule sind unterschätzte Kontaktzonen: Wer gerade die Lehre abschließt oder die Meisterprüfung vorbereitet, trifft Menschen in ähnlicher Lebenssituation. Auch Innungsveranstaltungen und Messen bringen Menschen aus dem Gewerk zusammen — mit eingebautem Gesprächsthema.',
    ],
  },
];

export default async function SinglesPartnersuche() {
  const [articles, stories, kammern, guide] = await Promise.all([
    reader.collections.articles.all(),
    reader.collections.stories.all(),
    reader.collections.handwerkskammern.all(),
    reader.collections.articles.read(GUIDE_SLUG),
  ]);

  const spokes = articles.filter(
    (a) => a.entry.status === 'published' && a.entry.category === 'partnersuche' && a.entry.type === 'pillar-sub'
  );
  const byCluster = (cluster: string) =>
    spokes
      .filter((a) => a.entry.cluster === cluster)
      .sort((a, b) => (a.entry.title || '').localeCompare(b.entry.title || ''));

  const tocItems = [
    ...SECTIONS.map((s) => ({ label: `${s.letter}. ${s.tocLabel}`, id: s.id })),
    { label: 'F. Regionale Partnersuche: Handwerkskammern', id: 'regional' },
    { label: 'G. Erfolgsgeschichten aus dem Handwerk', id: 'erfolgsgeschichten' },
    { label: 'Partnersuche im Handwerk: Zahlen & Fakten', id: 'zahlen-fakten' },
  ];

  const spokeItems = spokes.map((a) => ({
    name: a.entry.title,
    url: `https://handwerksingles.de/magazin${articleHref(a)}`,
  }));

  const faqItems = guide?.faqItems ?? [];
  const takeaways = (guide?.takeaways ?? []) as string[];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Partnersuche im Handwerk — der große Guide für Handwerker-Singles',
          description: SINGLE_HUB.seoDescription,
          url: HUB_URL,
          items: spokeItems,
        })}
      />
      {faqItems.length > 0 && <JsonLd data={faqJsonLd(faqItems)} />}

      <PillarHero
        title="Partnersuche im Handwerk"
        texts={[
          'Liebe im Handwerk',
          'Montage trifft Beziehung',
          'Baustelle & Herz',
          'Werkzeug-Match',
          'Handwerksingles',
        ]}
        subtitle="Der große Guide für Handwerker-Singles: Elektriker, Dachdecker, Tischler, Zimmermann und Maurer. Branchen-Verständnis ohne Erklärung."
        colors={HUB_COLORS}
      />

      <div className="max-w-6xl mx-auto px-6">
        <Breadcrumbs items={[{ label: 'Singles & Partnersuche', href: '/singles-partnersuche' }]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Die Partnersuche im Handwerk folgt eigenen Regeln: Frühschicht statt After-Work, Montagewochen statt
            Spontandates, körperlich harte Tage statt Bildschirmmüdigkeit. Dieser Guide zeigt ehrlich und praktisch,
            wie Handwerkerinnen und Handwerker trotzdem die passende Partnerin oder den passenden Partner finden —
            vom Online-Profil über das erste Date bis zur Beziehung mit eigenem Betrieb.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80 mb-8">
            Jede Sektion fasst das Wichtigste zusammen und verlinkt auf vertiefende Artikel zum Thema. Wer lieber
            direkt loslegt: Das Inhaltsverzeichnis führt zum passenden Abschnitt.
          </p>
          <TableOfContents items={tocItems} showFaq />
          {takeaways.length > 0 && <TakeawayBox items={takeaways} />}
        </section>
      </ScrollReveal>

      {/* Themen-Sektionen A–E */}
      {SECTIONS.map((section) => {
        const sectionSpokes = byCluster(section.id);
        return (
          <ScrollReveal key={section.id}>
            <section id={section.id} className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
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
              {sectionSpokes.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-8 mb-5 text-foreground/90">
                    Vertiefende Artikel zu diesem Thema
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sectionSpokes.map((a) => (
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

      {/* F. Regional */}
      <ScrollReveal>
        <section id="regional" className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            F. Regionale Partnersuche: Handwerkskammern als Treffpunkt
          </h2>
          <div className="max-w-3xl">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Das Handwerk ist lokal organisiert — und genau das ist eine Chance. Handwerkskammern, Innungen und
              Zunftveranstaltungen bringen Menschen aus dem gleichen Umfeld zusammen, von der Meisterfeier bis zum
              Innungsabend. Wer regional sucht, findet hier den Einstieg für die eigene Stadt.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {kammern.map((k) => (
              <Link
                key={k.slug}
                href={`/singles-regional/handwerkskammern/${k.entry.bundesland}/${k.entry.stadt}`}
                className="group block p-4 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 transition-colors"
              >
                <span className="font-semibold group-hover:text-brand-orange transition-colors capitalize">
                  {String(k.entry.stadt).replace(/-/g, ' ')}
                </span>
                <span className="block text-xs text-foreground/50 mt-1">Handwerkskammer & Singles</span>
              </Link>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/singles-regional/handwerkskammern" className="text-brand-orange font-semibold hover:underline">
              Alle Handwerkskammern im Überblick →
            </Link>
          </p>
        </section>
      </ScrollReveal>

      {/* G. Erfolgsgeschichten */}
      <ScrollReveal>
        <section id="erfolgsgeschichten" className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            G. Erfolgsgeschichten: Echte Paare aus dem Handwerk
          </h2>
          <div className="max-w-3xl">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Theorie ist das eine — hier sind Paare, bei denen es geklappt hat: mit Schichtdienst, eigenem Betrieb
              und Auftragsspitzen. Echte Geschichten von Menschen, die über Handwerksingles zueinandergefunden haben.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {stories.map((s) => (
              <ArticleCard
                key={s.slug}
                title={s.entry.title}
                excerpt={s.entry.excerpt}
                href={`/erfolgsgeschichten/${s.slug}`}
                image={s.entry.featuredImage || undefined}
                imageAlt={s.entry.featuredImageAlt || undefined}
                category="erfolgsgeschichten"
                date={s.entry.publishedAt || undefined}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Zahlen & Fakten */}
      <ScrollReveal>
        <section id="zahlen-fakten" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Partnersuche im Handwerk: Zahlen & Fakten
          </h2>
          <dl className="divide-y divide-foreground/10 rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
            {[
              ['Beschäftigte im deutschen Handwerk', 'ca. 5,6 Millionen (ZDH)'],
              ['Handwerksbetriebe in Deutschland', 'rund 1 Million (ZDH)'],
              ['Frauenanteil an den Beschäftigten', 'rund ein Drittel (ZDH, 2024)'],
              ['Frauenanteil bei den Auszubildenden', '17,3 Prozent (ZDH, 2024)'],
              ['Typischer Arbeitsbeginn auf der Baustelle', 'zwischen 6 und 7 Uhr'],
              ['Der Dating-Vorteil', 'Feierabend oft schon ab 16 Uhr'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-foreground/60">{label}</dt>
                <dd className="font-semibold text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <ScrollReveal>
          <section id="haeufige-fragen" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
              Häufige Fragen zur Partnersuche im Handwerk
            </h2>
            <FAQAccordion items={faqItems} />
          </section>
        </ScrollReveal>
      )}

      {/* Fazit + CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl font-bold mb-4">Fazit: Handwerker suchen anders — das ist kein Nachteil</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Frühschicht, Montage, Arbeitshose — das ist kein Makel, das ist Identität. Die richtige Person findet
            genau das anziehend. Handwerker-Singles warten schon.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </>
  );
}
