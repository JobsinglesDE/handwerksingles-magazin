import Link from 'next/link';
import { reader } from '@/lib/keystatic';
import { getPersonHubUrl } from '@/lib/routes';
import { HeartButton } from '@/components/ui/HeartButton';

/**
 * Spoke → Hub Backlink: wird in der Artikel-Detailseite gerendert, wenn das
 * Artikel-Feld `person` auf einen Handwerker-Hub zeigt. Verlinkt zurück zum Personen-Hub.
 */
export async function HandwerkerBacklinkCard({ personSlug }: { personSlug: string }) {
  if (!personSlug) return null;
  const person = await reader.collections.persons.read(personSlug);
  if (!person || person.status === 'draft') return null;

  return (
    <div className="not-prose my-12 rounded-2xl bg-surface border border-foreground/10 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold mb-3">Mehr über {person.name}</h3>
      <p className="text-foreground/70 leading-relaxed mb-6">
        {person.intro ||
          `Alle Artikel, der Steckbrief und die Hintergründe zu ${person.name} im Überblick.`}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={getPersonHubUrl(personSlug)}
          className="inline-block px-5 py-2.5 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition"
        >
          Zum {person.name}-Hub →
        </Link>
        <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
          Jetzt mitmachen
        </HeartButton>
      </div>
    </div>
  );
}
