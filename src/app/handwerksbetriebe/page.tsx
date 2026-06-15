import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/JsonLd';
import { bundeslandName, bundeslandEmoji } from '@/lib/bundeslaender';
import { listCities } from '@/lib/staedte-data';

const BASE_URL = 'https://handwerksingles.de/magazin';

export async function generateMetadata() {
  const url = `${BASE_URL}/handwerksbetriebe`;
  return {
    title: 'Handwerker & Betriebe nach Stadt',
    description: 'Finde Handwerks- und Dienstleistungsbetriebe nach Stadt und Gewerk. Pilot: Konstanz.',
    alternates: { canonical: url },
    // Pilot mit 1 Stadt -> noindex bis das Verzeichnis waechst
    robots: { index: false, follow: true },
  };
}

export default function StaedtePillarPage() {
  const cities = listCities();
  const byBundesland = new Map<string, typeof cities>();
  for (const c of cities) {
    const arr = byBundesland.get(c.bundesland) ?? [];
    arr.push(c);
    byBundesland.set(c.bundesland, arr);
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Magazin', url: BASE_URL },
          { name: 'Handwerksbetriebe', url: `${BASE_URL}/handwerksbetriebe` },
        ])}
      />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: 'Handwerksbetriebe', href: '/handwerksbetriebe' }]} />

        <header className="mt-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Handwerker &amp; Betriebe nach Stadt
          </h1>
          <p className="text-foreground/70 mt-3 leading-relaxed">
            Hier findest du Handwerks- und Dienstleistungsbetriebe nach Stadt und Gewerk –
            mit Adresse, Kontakt und Lage. Wir starten mit einem Pilot in Konstanz und bauen das
            Verzeichnis Schritt für Schritt aus.
          </p>
        </header>

        {[...byBundesland.entries()].map(([bl, cs]) => (
          <section key={bl} className="mb-8">
            <h2 className="text-xl font-bold mb-3">
              {bundeslandEmoji(bl)} {bundeslandName(bl)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.map((c) => (
                <Link
                  key={c.citySlug}
                  href={`/handwerksbetriebe/${bl}/${c.citySlug}`}
                  className="flex items-center justify-between p-5 rounded-xl bg-surface border border-foreground/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-colors"
                >
                  <span className="text-lg font-bold text-foreground">{c.city}</span>
                  <span className="text-sm text-foreground/50">{c.betriebe.length} Betriebe</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
