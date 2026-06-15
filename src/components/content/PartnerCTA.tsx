import Image from 'next/image';
import type { PartnerCta } from '@/lib/staedte';

/**
 * Gewerk-spezifische Partner-CTA (Cross-Network, z.B. Tattoo → dich-mit-stich.de).
 * Externer Partner-/Affiliate-Link = rel="sponsored nofollow" (GESETZ: extern nofollow).
 * Grafik bewusst klein (max-w-[340px]) als Card, nicht als Hero.
 */
export function PartnerCTA({ headline, sub, buttonLabel, url, image }: PartnerCta) {
  return (
    <section className="my-12 text-center">
      {image ? (
        <a
          href={url}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="block max-w-[340px] mx-auto rounded-2xl overflow-hidden border border-foreground/10 ambient-shadow hover:opacity-95 transition-opacity"
        >
          <Image src={image} alt={headline} width={680} height={680} sizes="340px" className="w-full h-auto" />
        </a>
      ) : (
        <div className="rounded-2xl border border-foreground/10 bg-surface px-6 py-8 max-w-xl mx-auto">
          <p className="text-base font-semibold text-foreground mb-1">{headline}</p>
          <p className="text-sm text-foreground/60">{sub}</p>
        </div>
      )}
      <a
        href={url}
        target="_blank"
        rel="sponsored nofollow noopener"
        className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 mt-4"
        style={{ backgroundColor: '#429A45' }}
      >
        {buttonLabel}
      </a>
    </section>
  );
}
