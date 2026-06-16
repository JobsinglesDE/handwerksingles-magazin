import Link from 'next/link';
import { articleHref } from '@/lib/routes';
import { reader } from '@/lib/keystatic';
import { PillarHero } from '@/components/content/PillarHero';
import { BerufDirectory, type BerufEntry } from '@/components/content/BerufDirectory';
import { HeartButton } from '@/components/ui/HeartButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { SECTION_HUBS } from '@/lib/hubs';

const HUB_URL = 'https://handwerksingles.de/magazin/handwerksberufe';
const HUB = SECTION_HUBS['handwerksberufe'];

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
    locale: 'de_DE',
  },
};

const HUB_COLORS = [
  { r: 82, g: 35, b: 15 },
  { r: 122, g: 58, b: 29 },
  { r: 224, g: 121, b: 77 },
];

type BerufSection = {
  beruf: string;
  name: string;
  gehalt: string;
};

// Gehalts-Spannen aus den Berufsbild-Artikeln (DFS-/Tavily-validiert beim Aufbau)
const SECTIONS: BerufSection[] = [
  { beruf: 'dachdecker', name: 'Dachdecker', gehalt: '2.500–4.000 €' },
  { beruf: 'elektriker', name: 'Elektriker', gehalt: '2.500–4.500 €' },
  { beruf: 'kfz-mechatroniker', name: 'KFZ-Mechatroniker', gehalt: '2.400–4.200 €' },
  { beruf: 'maurer', name: 'Maurer', gehalt: '2.400–4.200 €' },
  { beruf: 'tischler', name: 'Tischler & Schreiner', gehalt: '2.300–4.000 €' },
  { beruf: 'zimmermann', name: 'Zimmermann', gehalt: '2.400–4.500 €' },
  { beruf: 'anlagenmechaniker-shk', name: 'Anlagenmechaniker SHK', gehalt: '3.150–4.300 €' },
  { beruf: 'fliesenleger', name: 'Fliesenleger', gehalt: '3.300–4.800 €' },
  { beruf: 'friseur', name: 'Friseur', gehalt: '2.200–2.600 €' },
  { beruf: 'geruestbauer', name: 'Gerüstbauer', gehalt: '2.900–4.100 €' },
  { beruf: 'maler-lackierer', name: 'Maler & Lackierer', gehalt: '2.850–3.550 €' },
  { beruf: 'metallbauer', name: 'Metallbauer', gehalt: '3.050–4.300 €' },
  { beruf: 'schornsteinfeger', name: 'Schornsteinfeger', gehalt: '3.380–4.050 €' },
  { beruf: 'schweisser', name: 'Schweißer', gehalt: '3.100–4.450 €' },
  { beruf: 'steinmetz', name: 'Steinmetz', gehalt: '2.870–3.780 €' },
  { beruf: 'stuckateur', name: 'Stuckateur', gehalt: '2.600–3.700 €' },
  { beruf: 'augenoptiker', name: 'Augenoptiker', gehalt: '2.540–3.400 €' },
  { beruf: 'bodenleger', name: 'Bodenleger', gehalt: '2.540–3.430 €' },
  { beruf: 'gebaeudereiniger', name: 'Gebäudereiniger', gehalt: '2.630–3.770 €' },
  { beruf: 'glaser', name: 'Glaser', gehalt: '2.980–3.300 €' },
  { beruf: 'hoerakustiker', name: 'Hörakustiker', gehalt: '2.300–3.600 €' },
  { beruf: 'karosseriebauer', name: 'Karosseriebauer', gehalt: '2.970–4.540 €' },
  { beruf: 'landschaftsgaertner', name: 'Landschaftsgärtner', gehalt: '2.760–3.800 €' },
  { beruf: 'raumausstatter', name: 'Raumausstatter', gehalt: '2.450–3.900 €' },
  { beruf: 'strassenbauer', name: 'Straßenbauer', gehalt: '3.180–3.940 €' },
  { beruf: 'zahntechniker', name: 'Zahntechniker', gehalt: '3.110–4.250 €' },
  { beruf: 'feinwerkmechaniker', name: 'Feinwerkmechaniker', gehalt: '3.180–3.750 €' },
  { beruf: 'goldschmied', name: 'Goldschmied', gehalt: '2.000–3.500 €' },
  { beruf: 'hufschmied', name: 'Hufschmied', gehalt: '2.800–4.000 €' },
  { beruf: 'kosmetikerin', name: 'Kosmetikerin', gehalt: '2.000–2.600 €' },
  { beruf: 'sattler', name: 'Sattler', gehalt: '2.400–3.750 €' },
  { beruf: 'schaedlingsbekaempfer', name: 'Schädlingsbekämpfer', gehalt: '2.900–3.940 €' },
  { beruf: 'schuhmacher', name: 'Schuhmacher', gehalt: '2.470–3.730 €' },
  { beruf: 'taetowierer', name: 'Tätowierer', gehalt: '800–8.000 €' },
  { beruf: 'uhrmacher', name: 'Uhrmacher', gehalt: '2.600–4.500 €' },
  { beruf: 'zweiradmechatroniker', name: 'Zweiradmechatroniker', gehalt: '2.410–3.160 €' },
];

// Alphabetisch (Tommy-Regel 2026-06-12)
const SORTED_SECTIONS = [...SECTIONS].sort((a, b) => a.name.localeCompare(b.name, 'de'));

export default async function HandwerksberufeHub() {
  const articles = await reader.collections.articles.all();
  const berufArticles = articles.filter(
    (a) => a.entry.status === 'published' && a.entry.category === 'handwerksberufe'
  );
  const bySlug = new Map(berufArticles.map((a) => [a.slug, a]));

  // Ein kompakter Directory-Eintrag pro Beruf; Intent-Pills nur wenn der Spoke existiert
  const entries: BerufEntry[] = SORTED_SECTIONS.map((s) => {
    const main = bySlug.get(s.beruf);
    const ausbildung = bySlug.get(`${s.beruf}-ausbildung`);
    const gehalt = bySlug.get(`${s.beruf}-gehalt`);
    return {
      beruf: s.beruf,
      name: s.name,
      gehalt: s.gehalt,
      href: `/handwerksberufe/${s.beruf}`,
      image: main?.entry.featuredImage || undefined,
      imageAlt: main?.entry.featuredImageAlt || undefined,
      ausbildungHref: ausbildung ? articleHref(ausbildung) : undefined,
      gehaltHref: gehalt ? articleHref(gehalt) : undefined,
    };
  });

  const itemList = berufArticles.map((a) => ({
    name: a.entry.title,
    url: `https://handwerksingles.de/magazin${articleHref(a)}`,
  }));

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: 'Handwerksberufe: Ausbildung, Gehalt & Karriere — alle Berufe im Überblick',
          description: HUB.seoDescription,
          url: HUB_URL,
          items: itemList,
        })}
      />

      <PillarHero
        title="Handwerksberufe"
        texts={[
          `${SECTIONS.length} Handwerksberufe`,
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
          { label: 'Handwerksberufe', href: '/handwerksberufe' },
        ]} />
      </div>

      {/* Intro */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 pt-10 pb-4">
          <p className="text-lg leading-relaxed text-foreground/80 mb-4">
            Handwerksberufe bieten, was vielen Bürojobs fehlt: sichere Nachfrage, ehrliches Gehalt und ein
            Ergebnis, das man am Feierabend anfassen kann. Hier findest du die wichtigsten Berufsbilder im
            Überblick — von der Ausbildung über realistische Gehaltszahlen bis zum Arbeitsalltag.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80">
            Tippe einen Beruf in die Suche oder spring über das A–Z-Register direkt hin — jede Karte führt
            zum kompletten Berufsbild und verlinkt die vertiefenden Artikel zu Ausbildung und Gehalt.
          </p>
        </section>
      </ScrollReveal>

      {/* Berufe-Directory: Suche + A–Z + ein Eintrag pro Beruf */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <BerufDirectory entries={entries} />
      </section>

      {/* Gehaltsvergleich */}
      <ScrollReveal>
        <section id="gehaltsvergleich" className="max-w-3xl mx-auto px-6 py-10 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-2 border-b-2 border-brand-orange">
            Gehalt im Handwerk: {SECTIONS.length} Berufe im Vergleich
          </h2>
          <p className="text-foreground/80 leading-relaxed mb-6 max-w-3xl">
            Brutto-Monatsgehälter für Gesellen, je nach Region, Berufserfahrung und Betrieb. Mit Meistertitel
            oder eigener Firma liegen die Werte deutlich darüber.
          </p>
          <dl className="divide-y divide-foreground/10 rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
            {SORTED_SECTIONS.map((s) => (
              <div key={s.beruf} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-foreground/60">
                  <Link href={`/handwerksberufe/${s.beruf}`} className="hover:text-brand-orange transition-colors">
                    {s.name}
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
