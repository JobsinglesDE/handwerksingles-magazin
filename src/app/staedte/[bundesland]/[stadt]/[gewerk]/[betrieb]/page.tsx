import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, betriebJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { StaedteCTA } from '@/components/content/StaedteCTA';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { bundeslandName, BUNDESLAENDER } from '@/lib/bundeslaender';
import { listCities, getCityByBundesland, businessesByGewerk, getBusiness } from '@/lib/staedte-data';
import { gewerkDef, shouldIndexBetrieb } from '@/lib/staedte';
import { getCityUrl, getCityGewerkUrl, getBetriebUrl } from '@/lib/routes';

const BASE_URL = 'https://handwerksingles.de/magazin';
type Params = Promise<{ bundesland: string; stadt: string; gewerk: string; betrieb: string }>;

export async function generateStaticParams() {
  const params: { bundesland: string; stadt: string; gewerk: string; betrieb: string }[] = [];
  for (const c of listCities()) {
    for (const b of c.betriebe) {
      params.push({ bundesland: c.bundesland, stadt: c.citySlug, gewerk: b.gewerk, betrieb: b.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { bundesland, stadt, gewerk, betrieb } = await params;
  const city = getCityByBundesland(bundesland, stadt);
  const def = gewerkDef(gewerk);
  if (!city || !def) return {};
  const b = getBusiness(city, gewerk, betrieb);
  if (!b) return {};
  const url = `${BASE_URL}${getBetriebUrl(bundesland, stadt, gewerk, betrieb)}`;
  const title = `${b.name} – ${def.singular} in ${city.city}`;
  const description = `${b.name}, ${def.singular} in ${city.city}${b.street ? `, ${b.street}` : ''}. Adresse, Kontakt und Öffnungszeiten im Überblick.`;
  const index = shouldIndexBetrieb(b);
  return {
    title,
    description,
    alternates: { canonical: url },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BetriebPage({ params }: { params: Params }) {
  const { bundesland, stadt, gewerk, betrieb } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();
  const city = getCityByBundesland(bundesland, stadt);
  const def = gewerkDef(gewerk);
  if (!city || !def) notFound();
  const b = getBusiness(city, gewerk, betrieb);
  if (!b) notFound();

  const blName = bundeslandName(bundesland);
  const url = `${BASE_URL}${getBetriebUrl(bundesland, stadt, gewerk, betrieb)}`;
  const addr = [b.street, [b.plz, b.city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
  const osmUrl = `https://www.openstreetmap.org/${b.osmType}/${b.osmId}`;

  // Faktengetriebener, je Betrieb einzigartiger Einleitungssatz
  const introParts: string[] = [
    `${b.name} ist ein Betrieb aus dem Bereich ${def.singular} in ${city.city}${b.street ? `, ${b.street}` : ''}.`,
  ];
  if (b.openingHours) introParts.push(`Öffnungszeiten: ${b.openingHours}.`);
  if (b.phone) introParts.push(`Telefonisch erreichbar unter ${b.phone}.`);
  const intro = introParts.join(' ');

  // Ähnliche Betriebe (gleiches Gewerk, gleiche Stadt)
  const aehnliche = businessesByGewerk(city, gewerk).filter((x) => x.slug !== b.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={betriebJsonLd({
          name: b.name,
          url,
          street: b.street,
          plz: b.plz,
          city: b.city,
          region: blName,
          lat: b.lat,
          lon: b.lon,
          phone: b.phone,
          website: b.website,
          openingHours: b.openingHours,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Städte', url: `${BASE_URL}/staedte` },
          { name: blName, url: `${BASE_URL}/staedte/${bundesland}` },
          { name: city.city, url: `${BASE_URL}${getCityUrl(bundesland, stadt)}` },
          { name: def.plural, url: `${BASE_URL}${getCityGewerkUrl(bundesland, stadt, gewerk)}` },
          { name: b.name, url },
        ])}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Städte', href: '/staedte' },
            { label: blName, href: `/staedte/${bundesland}` },
            { label: city.city, href: getCityUrl(bundesland, stadt) },
            { label: def.plural, href: getCityGewerkUrl(bundesland, stadt, gewerk) },
            { label: b.name, href: getBetriebUrl(bundesland, stadt, gewerk, betrieb) },
          ]}
        />

        <header className="mt-6 mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-orange-text">
            {def.singular} · {city.city}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2">{b.name}</h1>
        </header>

        <p className="text-foreground/80 leading-relaxed mb-8">{intro}</p>

        {/* Fakten-Box */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-8">
          <div className="bg-surface-dark rounded-xl p-6 text-white/90 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div><span className="text-white/50">Gewerk:</span> {def.singular}</div>
            {addr && <div className="sm:col-span-2"><span className="text-white/50">Adresse:</span> {addr}</div>}
            {b.phone && (
              <div>
                <span className="text-white/50">Telefon:</span>{' '}
                <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="text-brand-orange-text hover:underline">{b.phone}</a>
              </div>
            )}
            {b.website && (
              <div className="truncate">
                <span className="text-white/50">Web:</span>{' '}
                <a href={b.website} target="_blank" rel="nofollow noopener noreferrer" className="text-brand-orange-text hover:underline">{b.website}</a>
              </div>
            )}
            {b.openingHours && <div className="sm:col-span-2"><span className="text-white/50">Öffnungszeiten:</span> {b.openingHours}</div>}
            {b.lat && b.lon && (
              <div className="sm:col-span-2">
                <a href={osmUrl} target="_blank" rel="nofollow noopener noreferrer" className="text-white/70 hover:text-white underline">
                  Auf der Karte ansehen (OpenStreetMap) ↗
                </a>
              </div>
            )}
          </div>
        </AnimatedGradientBorder>

        <p className="text-sm text-foreground/70">
          Zurück zu allen{' '}
          <Link href={getCityGewerkUrl(bundesland, stadt, gewerk)} className="text-brand-orange-text hover:underline font-semibold">
            {def.plural} in {city.city}
          </Link>
        </p>

        {/* Claim + Dating-Brücke */}
        <StaedteCTA city={city.city} claim businessName={b.name} />

        {aehnliche.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-foreground/10">
              Weitere {def.plural} in {city.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aehnliche.map((x) => (
                <Link
                  key={x.slug}
                  href={getBetriebUrl(bundesland, stadt, gewerk, x.slug)}
                  className="block p-4 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <span className="font-bold text-foreground">{x.name}</span>
                  {x.street && <span className="block text-sm text-foreground/55 mt-0.5">{x.street}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 text-xs text-foreground/40">
          Betriebsdaten:{' '}
          <a href={osmUrl} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
            © OpenStreetMap-Mitwirkende (ODbL)
          </a>
        </p>
      </div>
    </>
  );
}
