'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type BerufEntry = {
  beruf: string;
  name: string;
  gehalt: string;
  href: string;
  image?: string;
  imageAlt?: string;
  ausbildungHref?: string;
  gehaltHref?: string;
};

/** Umlaut-Folding für Suche + A–Z-Gruppierung: "gerust" findet Gerüstbauer. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function BerufRow({ entry }: { entry: BerufEntry }) {
  return (
    <div className="group relative flex items-center gap-4 rounded-2xl bg-surface border border-foreground/10 p-3 ambient-shadow hover-lift hover:border-brand-orange/40 transition-colors">
      {entry.image && (
        <Image
          src={entry.image}
          alt={entry.imageAlt || entry.name}
          width={160}
          height={160}
          loading="lazy"
          sizes="80px"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover flex-shrink-0"
          style={{ objectPosition: '50% 20%' }}
        />
      )}
      <div className="min-w-0">
        {/* Stretched Link: ganze Karte klickt aufs Berufsbild, Pills liegen mit z-10 darüber */}
        <Link
          href={entry.href}
          className="font-bold text-foreground group-hover:text-brand-orange transition-colors after:absolute after:inset-0"
        >
          {entry.name}
        </Link>
        <p className="text-sm text-foreground/60 mt-0.5">
          <span className="font-semibold text-brand-orange-text">{entry.gehalt}</span> brutto/Monat
        </p>
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-2">
          {entry.ausbildungHref && (
            <Link
              href={entry.ausbildungHref}
              className="px-2.5 py-1 rounded-full bg-background border border-foreground/15 text-xs font-semibold text-foreground/70 hover:border-brand-orange/60 hover:text-brand-orange transition-colors"
            >
              Ausbildung
            </Link>
          )}
          {entry.gehaltHref && (
            <Link
              href={entry.gehaltHref}
              className="px-2.5 py-1 rounded-full bg-background border border-foreground/15 text-xs font-semibold text-foreground/70 hover:border-brand-orange/60 hover:text-brand-orange transition-colors"
            >
              Gehalt
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Berufe-Directory: Suche + A–Z-Register + ein kompakter Eintrag pro Beruf.
 * Die volle Liste wird immer aus den Props gerendert (SSR) — alle Spoke-Links
 * stehen damit im statischen HTML; die Suche filtert nur clientseitig.
 */
export function BerufDirectory({ entries }: { entries: BerufEntry[] }) {
  const [query, setQuery] = useState('');
  const q = normalize(query.trim());

  const prepared = entries.map((e) => ({
    ...e,
    searchKey: `${normalize(e.name)} ${e.beruf}`,
    letter: normalize(e.name[0]).toUpperCase(),
  }));
  const filtered = q ? prepared.filter((e) => e.searchKey.includes(q)) : prepared;
  const letters = [...new Set(prepared.map((e) => e.letter))];

  return (
    <div>
      {/* Suche */}
      <div className="relative max-w-md mb-6">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Beruf suchen — z. B. Elektriker, SHK, Friseur…"
          aria-label="Handwerksberuf suchen"
          className="w-full rounded-2xl bg-surface border border-foreground/15 pl-11 pr-5 py-3 text-foreground placeholder:text-foreground/40 focus:border-brand-orange focus:outline-none transition-colors"
        />
      </div>

      {/* A–Z-Register (nur ohne aktive Suche, sonst tote Anker) */}
      {!q && (
        <nav aria-label="Berufe A bis Z" className="flex flex-wrap items-center gap-1.5 mb-10">
          {letters.map((l) => (
            <a
              key={l}
              href={`#beruf-${l}`}
              className="w-8 h-8 grid place-items-center rounded-full text-sm font-semibold text-foreground/70 bg-surface border border-foreground/10 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
            >
              {l}
            </a>
          ))}
          <a
            href="#gehaltsvergleich"
            className="h-8 px-3 grid place-items-center rounded-full text-sm font-semibold text-foreground/70 bg-surface border border-foreground/10 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
          >
            Gehaltsvergleich
          </a>
        </nav>
      )}

      {q ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => (
              <BerufRow key={e.beruf} entry={e} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60 mb-4">
              Kein Beruf gefunden für &bdquo;{query.trim()}&ldquo;.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="px-4 py-2 rounded-full bg-brand-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Suche zurücksetzen
            </button>
          </div>
        )
      ) : (
        letters.map((l) => (
          <section key={l} className="mb-10">
            <h2
              id={`beruf-${l}`}
              className="scroll-mt-24 text-xl font-bold text-brand-orange-text mb-4 pb-1 border-b border-foreground/10"
            >
              {l}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {prepared
                .filter((e) => e.letter === l)
                .map((e) => (
                  <BerufRow key={e.beruf} entry={e} />
                ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
