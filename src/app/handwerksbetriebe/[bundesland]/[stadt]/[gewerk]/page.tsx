import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { BetriebList } from '@/components/content/BetriebList';
import { StaedteCTA } from '@/components/content/StaedteCTA';
import { StaedteSources } from '@/components/content/StaedteSources';
import { PartnerCTA } from '@/components/content/PartnerCTA';
import { bundeslandName, BUNDESLAENDER } from '@/lib/bundeslaender';
import {
  listCities,
  getCityByBundesland,
  gewerkeInCity,
  businessesByGewerk,
} from '@/lib/staedte-data';
import {
  gewerkDef,
  gewerkIntro,
  shouldIndexGewerk,
  partnerCta,
} from '@/lib/staedte';
import { getCityUrl, getBerufHubUrl, getCityGewerkUrl } from '@/lib/routes';

const BASE_URL = 'https://handwerksingles.de/magazin';
type Params = Promise<{ bundesland: string; stadt: string; gewerk: string }>;

export async function generateStaticParams() {
  const params: { bundesland: string; stadt: string; gewerk: string }[] = [];
  for (const c of listCities()) {
    for (const { gewerk } of gewerkeInCity(c)) {
      params.push({ bundesland: c.bundesland, stadt: c.citySlug, gewerk });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { bundesland, stadt, gewerk } = await params;
  const city = getCityByBundesland(bundesland, stadt);
  const def = gewerkDef(gewerk);
  if (!city || !def) return {};
  const count = businessesByGewerk(city, gewerk).length;
  const url = `${BASE_URL}${getCityGewerkUrl(bundesland, stadt, gewerk)}`;
  const title = `${def.singular} ${city.city}: ${count} Betriebe & Adressen`;
  const description = `${count} ${def.plural} in ${city.city} im Überblick — mit Adresse, Kontakt und Lage. Finde den passenden Betrieb in deiner Nähe.`;
  const index = shouldIndexGewerk(gewerk, count);
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Handwerksingles Magazin',
      locale: 'de_DE',
      images: [{ url: `${BASE_URL}/logos/jobsingles-logo.png`, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function GewerkStadtPage({ params }: { params: Params }) {
  const { bundesland, stadt, gewerk } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();
  const city = getCityByBundesland(bundesland, stadt);
  const def = gewerkDef(gewerk);
  if (!city || !def) notFound();

  const betriebe = businessesByGewerk(city, gewerk);
  if (betriebe.length === 0) notFound();

  const blName = bundeslandName(bundesland);
  const url = `${BASE_URL}${getCityGewerkUrl(bundesland, stadt, gewerk)}`;
  const intro = gewerkIntro(city.citySlug, gewerk);
  const partner = partnerCta(gewerk);

  // Andere Gewerke derselben Stadt (Cross-Link unten)
  const otherGewerke = gewerkeInCity(city)
    .filter((g) => g.gewerk !== gewerk)
    .slice(0, 8);

  const faqItems = [
    {
      question: `Wie viele ${def.plural} gibt es in ${city.city}?`,
      answer: `In unserem Verzeichnis sind aktuell ${betriebe.length} ${def.plural} in ${city.city} gelistet. Die Daten stammen aus OpenStreetMap und werden laufend ergänzt.`,
    },
    {
      question: `Woher stammen die Betriebsdaten?`,
      answer: `Die Adressen und Kontaktdaten stammen aus OpenStreetMap (ODbL). Wir prüfen und ergänzen die Einträge fortlaufend. Betriebe können ihren Eintrag übernehmen und korrigieren.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `${def.singular} ${city.city}`,
          description: `${def.plural} in ${city.city} mit Adresse und Kontakt.`,
          url,
          items: betriebe.map((b) => ({ name: b.name, url })),
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Handwerksbetriebe', url: `${BASE_URL}/handwerksbetriebe` },
          { name: blName, url: `${BASE_URL}/handwerksbetriebe/${bundesland}` },
          { name: city.city, url: `${BASE_URL}${getCityUrl(bundesland, stadt)}` },
          { name: def.singular, url },
        ])}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Handwerksbetriebe', href: '/handwerksbetriebe' },
            { label: blName, href: `/handwerksbetriebe/${bundesland}` },
            { label: city.city, href: getCityUrl(bundesland, stadt) },
            { label: def.singular, href: getCityGewerkUrl(bundesland, stadt, gewerk) },
          ]}
        />

        <header className="mt-6 mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange-text">
            {def.singular} · {city.city}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2">
            {def.plural} in {city.city}
          </h1>
          <p className="text-foreground/60 mt-2">
            {betriebe.length} Betriebe mit Adresse und Kontakt
          </p>
        </header>

        {intro && <p className="text-foreground/80 leading-relaxed mb-10">{intro}</p>}

        <BetriebList bundesland={bundesland} stadt={stadt} betriebe={betriebe} />

        {/* Cross-Link: informationaler Beruf-Hub (kein Kannibalisieren) */}
        {def.berufHub && (
          <p className="mt-8 text-sm text-foreground/70">
            Mehr zum Beruf:{' '}
            <Link href={getBerufHubUrl(def.berufHub)} className="text-brand-orange-text hover:underline font-semibold">
              Berufsbild {def.singular} – Ausbildung &amp; Gehalt
            </Link>
          </p>
        )}

        {partner ? <PartnerCTA {...partner} /> : <StaedteCTA city={city.city} />}

        {/* Andere Gewerke in der Stadt */}
        {otherGewerke.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-foreground/10">
              Weitere Gewerke in {city.city}
            </h2>
            <div className="flex flex-wrap gap-2">
              {otherGewerke.map((g) => {
                const d = gewerkDef(g.gewerk);
                if (!d) return null;
                return (
                  <Link
                    key={g.gewerk}
                    href={getCityGewerkUrl(bundesland, stadt, g.gewerk)}
                    className="px-3 py-1.5 rounded-full bg-surface border border-foreground/15 text-sm font-semibold text-foreground/75 hover:border-brand-orange/60 hover:text-brand-orange transition-colors"
                  >
                    {d.plural} ({g.count})
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-sm">
              <Link href={getCityUrl(bundesland, stadt)} className="text-brand-orange-text hover:underline font-semibold">
                Alle Handwerker &amp; Betriebe in {city.city} →
              </Link>
            </p>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Häufige Fragen</h2>
          <div className="space-y-4">
            {faqItems.map((f) => (
              <div key={f.question}>
                <p className="font-semibold text-foreground">{f.question}</p>
                <p className="text-foreground/70 text-sm mt-1">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quellen konsolidiert ganz unten (leserlich, nofollow) */}
        <StaedteSources citySlug={city.citySlug} />
      </div>
    </>
  );
}
