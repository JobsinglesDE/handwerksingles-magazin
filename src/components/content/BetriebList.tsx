import Link from 'next/link';
import type { Betrieb } from '@/lib/staedte-data';
import { getBetriebUrl } from '@/lib/routes';
import { hasProfile } from '@/lib/staedte';

/**
 * Betriebsliste für eine Gewerk×Stadt-Seite (Server-Komponente, alles im SSR-HTML).
 * Betriebe mit Adresse/Kontakt verlinken auf ihr Profil (Vanity-Such-Einstieg).
 * Reine Namens-/Nur-Öffnungszeiten-Einträge bleiben inline (keine leere Profil-Seite).
 * Externe Website-Links: rel="nofollow" (Gesetz: extern = nofollow).
 */
export function BetriebList({
  bundesland,
  stadt,
  betriebe,
}: {
  bundesland: string;
  stadt: string;
  betriebe: Betrieb[];
}) {
  if (betriebe.length === 0) {
    return (
      <p className="text-foreground/60 py-8">
        Für dieses Gewerk liegen in unserem Verzeichnis aktuell keine Einträge vor.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
      {betriebe.map((b) => {
        const linked = hasProfile(b);
        const addr = [b.street, [b.plz, b.city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
        return (
          <li
            key={b.slug}
            className={`group relative rounded-2xl bg-surface border border-foreground/10 p-5 ambient-shadow transition-colors ${
              linked ? 'hover-lift hover:border-brand-orange/40' : ''
            }`}
          >
            <h3 className="text-lg font-bold text-foreground">
              {linked ? (
                <Link
                  href={getBetriebUrl(bundesland, stadt, b.gewerk, b.slug)}
                  className="group-hover:text-brand-orange transition-colors after:absolute after:inset-0"
                >
                  {b.name}
                </Link>
              ) : (
                <span>{b.name}</span>
              )}
            </h3>
            {addr && <p className="text-sm text-foreground/60 mt-1">{addr}</p>}

            <div className="relative z-10 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {b.phone && (
                <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="text-brand-orange-text hover:underline">
                  {b.phone}
                </a>
              )}
              {b.website && (
                <a
                  href={b.website}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-foreground/70 hover:text-brand-orange transition-colors"
                >
                  Website ↗
                </a>
              )}
            </div>

            {b.openingHours && (
              <p className="text-xs text-foreground/45 mt-2">Öffnungszeiten: {b.openingHours}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
