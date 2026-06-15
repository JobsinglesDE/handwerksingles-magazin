// "Quellen & Datenstand" — alle Quellen konsolidiert ganz unten, leserlich (Muster wie jobsingles CitySources).
// Externe Quell-Links = nofollow (Gesetz: extern immer nofollow). Stärkt E-E-A-T + AI-Citability.
import { cityStats } from '@/lib/staedte';

export function StaedteSources({ citySlug, withStats = false }: { citySlug: string; withStats?: boolean }) {
  const stats = cityStats(citySlug);
  return (
    <section className="my-10 rounded-2xl border border-foreground/10 bg-surface/50 p-5 text-sm text-foreground/70">
      <h2 className="text-base font-bold text-foreground mb-2">Quellen &amp; Datenstand</h2>
      <ul className="space-y-1.5 leading-relaxed list-none p-0 m-0">
        <li>
          <strong className="text-foreground/80">Betriebsdaten:</strong> OpenStreetMap-Mitwirkende (ODbL) — Adressen,
          Kontakt und Öffnungszeiten, laufend ergänzt.{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            rel="nofollow noopener"
            target="_blank"
            className="underline hover:text-brand-orange"
          >
            openstreetmap.org/copyright
          </a>
        </li>
        {withStats && stats && (
          <li>
            <strong className="text-foreground/80">Handwerk in Zahlen:</strong> Handwerkskammer Konstanz, Stand 31.12.2024.
            {stats.note ? ` ${stats.note}` : ''}{' '}
            <a
              href="https://www.hwk-konstanz.de/handwerk/"
              rel="nofollow noopener"
              target="_blank"
              className="underline hover:text-brand-orange"
            >
              hwk-konstanz.de
            </a>
          </li>
        )}
        <li className="text-foreground/50 text-xs">
          Angaben ohne Gewähr. Daten ändern sich; maßgeblich ist die jeweils originäre bzw. amtliche Quelle.
        </li>
      </ul>
    </section>
  );
}
