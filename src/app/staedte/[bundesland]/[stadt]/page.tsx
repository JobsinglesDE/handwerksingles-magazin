import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { StaedteCTA } from '@/components/content/StaedteCTA';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { StaedteSources } from '@/components/content/StaedteSources';
import { reader } from '@/lib/keystatic';
import { bundeslandName, BUNDESLAENDER } from '@/lib/bundeslaender';
import { listCities, getCityByBundesland, gewerkeInCity } from '@/lib/staedte-data';
import { gewerkDef, cityStats, CITY_INTROS } from '@/lib/staedte';
import { getCityUrl, getCityGewerkUrl } from '@/lib/routes';

const BASE_URL = 'https://handwerksingles.de/magazin';
type Params = Promise<{ bundesland: string; stadt: string }>;

export async function generateStaticParams() {
  return listCities().map((c) => ({ bundesland: c.bundesland, stadt: c.citySlug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { bundesland, stadt } = await params;
  const city = getCityByBundesland(bundesland, stadt);
  if (!city) return {};
  const url = `${BASE_URL}${getCityUrl(bundesland, stadt)}`;
  const title = `Handwerker & Betriebe in ${city.city}`;
  const description = `Handwerks- und Dienstleistungsbetriebe in ${city.city} nach Gewerk: Friseure, KFZ-Werkstätten, Optiker und mehr – mit Adresse und Kontakt.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: 'website',
      siteName: 'Handwerksingles Magazin', locale: 'de_DE',
      images: [{ url: `${BASE_URL}/logos/jobsingles-logo.png`, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function StadtHubPage({ params }: { params: Params }) {
  const { bundesland, stadt } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();
  const city = getCityByBundesland(bundesland, stadt);
  if (!city) notFound();

  const blName = bundeslandName(bundesland);
  const url = `${BASE_URL}${getCityUrl(bundesland, stadt)}`;
  const gewerke = gewerkeInCity(city);
  const stats = cityStats(city.citySlug);
  const intro = CITY_INTROS[city.citySlug];

  // Handwerkskammer derselben Stadt (falls publiziert) -> Cross-Link
  const kammern = await reader.collections.handwerkskammern.all();
  const kammer = kammern.find(
    (k) => k.entry.status === 'published' && k.entry.bundesland === bundesland && k.entry.stadt === stadt
  );

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `Handwerker & Betriebe in ${city.city}`,
          description: `Betriebe in ${city.city} nach Gewerk.`,
          url,
          items: gewerke.map((g) => ({
            name: gewerkDef(g.gewerk)?.plural ?? g.gewerk,
            url: `${BASE_URL}${getCityGewerkUrl(bundesland, stadt, g.gewerk)}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Städte', url: `${BASE_URL}/staedte` },
          { name: blName, url: `${BASE_URL}/staedte/${bundesland}` },
          { name: city.city, url },
        ])}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Städte', href: '/staedte' },
            { label: blName, href: `/staedte/${bundesland}` },
            { label: city.city, href: getCityUrl(bundesland, stadt) },
          ]}
        />

        <header className="mt-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Handwerker &amp; Betriebe in {city.city}
          </h1>
          <p className="text-foreground/60 mt-2">{city.betriebe.length} Betriebe in {gewerke.length} Gewerken</p>
        </header>

        {intro && <p className="text-foreground/80 leading-relaxed mb-8">{intro}</p>}

        {/* Handwerk in Zahlen */}
        {stats && (
          <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-8">
            <div className="bg-surface-dark rounded-xl p-6 text-white/90">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
                Handwerk in {city.city} &amp; Region — in Zahlen
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.facts.map((f) => (
                  <div key={f.label}>
                    <div className="text-2xl font-extrabold text-white">{f.value}</div>
                    <div className="text-xs text-white/55 mt-1">{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedGradientBorder>
        )}

        {/* Gewerk-Directory */}
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b-2 border-brand-orange">
            Betriebe nach Gewerk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gewerke.map((g) => {
              const d = gewerkDef(g.gewerk);
              if (!d) return null;
              return (
                <Link
                  key={g.gewerk}
                  href={getCityGewerkUrl(bundesland, stadt, g.gewerk)}
                  className="flex items-center justify-between p-4 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <span className="font-bold text-foreground">{d.plural}</span>
                  <span className="text-sm text-foreground/50">{g.count}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {kammer && (
          <p className="mt-8 text-sm text-foreground/70">
            Mehr zur Region:{' '}
            <Link
              href={`/singles-regional/handwerkskammern/${bundesland}/${stadt}`}
              className="text-brand-orange-text hover:underline font-semibold"
            >
              {kammer.entry.title}
            </Link>
          </p>
        )}

        <StaedteCTA city={city.city} />

        {/* Quellen konsolidiert ganz unten (leserlich, nofollow) */}
        <StaedteSources citySlug={city.citySlug} withStats />
      </div>
    </>
  );
}
