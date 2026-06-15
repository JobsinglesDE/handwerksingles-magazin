// Weiche Dating-Bruecke fuer das Stadt-Verzeichnis.
// Grün #429A45 (Gesetz: Anmelde-CTAs im JS-Network grün) — nur hier gescoped.
// Steht IMMER nach dem Primaerinhalt (Liste), nie above-the-fold -> kein Intent-Mismatch.

const REG_URL = 'https://handwerksingles.de/registration/?AID=HandwerksinglesMagazinStaedte';

export function StaedteCTA({
  city,
  claim = false,
  businessName,
}: {
  city: string;
  claim?: boolean;
  businessName?: string;
}) {
  return (
    <section className="my-12">
      <div className="rounded-2xl border border-foreground/10 bg-surface px-6 py-8 text-center">
        <p className="text-base font-semibold text-foreground mb-1">
          {claim
            ? `Ist das dein Betrieb${businessName ? ` – ${businessName}` : ''}?`
            : `Arbeitest du selbst im Handwerk in ${city}?`}
        </p>
        <p className="text-sm text-foreground/60 mb-5">
          {claim
            ? 'Übernimm deinen Eintrag und lerne nebenbei Singles kennen, die deinen Berufsalltag verstehen.'
            : 'Auf Handwerksingles triffst du Menschen, die wissen, wie dein Tag aussieht.'}
        </p>
        <a
          href={REG_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#429A45' }}
        >
          {claim ? 'Profil übernehmen & mitmachen' : 'Jetzt kostenfrei mitmachen'}
        </a>
      </div>
    </section>
  );
}
