import Link from 'next/link';
import { HeartButton } from '@/components/ui/HeartButton';
import { BERUF_HUBS } from '@/lib/hubs';

const OVERVIEW = {
  heading: 'Alle Berufsbilder im Handwerk',
  text: 'Elektriker, KFZ-Mechatroniker, Dachdecker, Tischler, Zimmermann und Maurer: Ausbildung, Gehalt und Karriere im Überblick.',
  href: '/berufsbilder',
  cta: 'Zur Berufsbilder-Übersicht →',
};

/**
 * Backlink Spoke → Beruf-Hub (z.B. elektriker-gehalt → /berufsbilder/elektriker).
 * Ohne beruf (oder Hub-Artikel selbst) → Link auf die /berufsbilder-Übersicht.
 */
export function BerufsbildBacklinkCard({ beruf, isHub }: { beruf?: string; isHub?: boolean }) {
  const hub = !isHub && beruf ? BERUF_HUBS[beruf] : undefined;
  const card = hub
    ? {
        heading: hub.title.replace(' ❤️', ''),
        text: hub.description,
        href: `/${hub.slug}`,
        cta: 'Zum kompletten Berufsbild →',
      }
    : OVERVIEW;
  return (
    <div className="not-prose my-12 rounded-2xl bg-surface border border-foreground/10 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold mb-3">{card.heading}</h3>
      <p className="text-foreground/70 leading-relaxed mb-6">{card.text}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={card.href}
          className="inline-block px-5 py-2.5 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition"
        >
          {card.cta}
        </Link>
        <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
          Jetzt mitmachen
        </HeartButton>
      </div>
    </div>
  );
}
