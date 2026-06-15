// Dating-Brücke fürs Stadt-Verzeichnis (klar EIN Pitch, kein Vermischen mit "Eintrag übernehmen").
// Grün #429A45 (Gesetz: Anmelde-CTAs grün). Steht NACH dem Primärinhalt -> kein Intent-Mismatch.

const REG_URL = 'https://handwerksingles.de/registration/?AID=HandwerksinglesMagazinStaedte';

export function StaedteCTA({ city }: { city: string }) {
  return (
    <section className="my-12">
      <div className="rounded-2xl border border-foreground/10 bg-surface px-6 py-8 text-center">
        <p className="text-base font-semibold text-foreground mb-1">
          Arbeitest du selbst im Handwerk in {city}?
        </p>
        <p className="text-sm text-foreground/60 mb-5">
          Auf Handwerksingles triffst du Menschen, die wissen, wie dein Arbeitstag aussieht.
        </p>
        <a
          href={REG_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#429A45' }}
        >
          Jetzt kostenfrei mitmachen
        </a>
      </div>
    </section>
  );
}
