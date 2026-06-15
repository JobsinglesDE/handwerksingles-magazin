import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, collectionPageJsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { bundeslandName, bundeslandEmoji, BUNDESLAENDER } from '@/lib/bundeslaender';
import { listCities } from '@/lib/staedte-data';
import { getCityUrl } from '@/lib/routes';

const BASE_URL = 'https://handwerksingles.de/magazin';
type Params = Promise<{ bundesland: string }>;

export async function generateStaticParams() {
  const set = new Set(listCities().map((c) => c.bundesland));
  return [...set].map((bundesland) => ({ bundesland }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { bundesland } = await params;
  if (!BUNDESLAENDER[bundesland]) return {};
  const cities = listCities().filter((c) => c.bundesland === bundesland);
  const blName = bundeslandName(bundesland);
  const url = `${BASE_URL}/staedte/${bundesland}`;
  const title = `Handwerker-Betriebe in ${blName}`;
  const description = `Handwerks- und Dienstleistungsbetriebe in ${blName} nach Stadt und Gewerk – mit Adresse und Kontakt.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // Bei nur 1 Stadt zu duenn fuer Index (Pilot)
    ...(cities.length >= 2 ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BundeslandHubPage({ params }: { params: Params }) {
  const { bundesland } = await params;
  if (!BUNDESLAENDER[bundesland]) notFound();
  const cities = listCities().filter((c) => c.bundesland === bundesland);
  if (cities.length === 0) notFound();

  const blName = bundeslandName(bundesland);
  const url = `${BASE_URL}/staedte/${bundesland}`;

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: `Handwerker-Betriebe in ${blName}`,
          description: `Städte in ${blName}.`,
          url,
          items: cities.map((c) => ({ name: c.city, url: `${BASE_URL}${getCityUrl(bundesland, c.citySlug)}` })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Städte', url: `${BASE_URL}/staedte` },
          { name: blName, url },
        ])}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: 'Städte', href: '/staedte' }, { label: blName, href: `/staedte/${bundesland}` }]} />

        <header className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            {bundeslandEmoji(bundesland)} Handwerker-Betriebe in {blName}
          </h1>
          <p className="text-foreground/60 mt-2">{cities.length} {cities.length === 1 ? 'Stadt' : 'Städte'} im Verzeichnis</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cities.map((c) => (
            <Link
              key={c.citySlug}
              href={getCityUrl(bundesland, c.citySlug)}
              className="flex items-center justify-between p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
            >
              <span className="text-lg font-bold text-foreground">{c.city}</span>
              <span className="text-sm text-foreground/50">{c.betriebe.length} Betriebe</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
