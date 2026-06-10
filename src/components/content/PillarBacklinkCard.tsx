import Link from 'next/link';
import { HeartButton } from '@/components/ui/HeartButton';

type Specialization = string;

const PILLARS: Record<string, { heading: string; text: string; href: string; cta: string }> = {
  elektriker: {
    heading: 'Partnersuche für Elektriker — der komplette Guide',
    text: 'Dating-Tipps für Elektro-Singles: Baustelle, Kundendienst und Schaltanlagen — und trotzdem die große Liebe finden.',
    href: '/singles-partnersuche',
    cta: 'Zum Partnersuche-Guide →',
  },
  'kfz-mechatroniker': {
    heading: 'Partnersuche für KFZ-Mechatroniker',
    text: 'Werkstatt-Alltag, Ölhände und Schichtdienst — Dating-Guide für Schrauber-Singles.',
    href: '/singles-partnersuche',
    cta: 'Zum Partnersuche-Guide →',
  },
  dachdecker: {
    heading: 'Partnersuche für Dachdecker',
    text: 'Höhenluft, Frühschicht und Saisonarbeit — Dating-Tipps für Dachdecker-Singles.',
    href: '/singles-partnersuche',
    cta: 'Zum Partnersuche-Guide →',
  },
  tischler: {
    heading: 'Partnersuche für Tischler & Schreiner',
    text: 'Holzhandwerk, Familienbetrieb und Handwerker-Alltag — Dating für Tischler-Singles.',
    href: '/singles-partnersuche',
    cta: 'Zum Partnersuche-Guide →',
  },
  zimmermann: {
    heading: 'Partnersuche für Zimmermann',
    text: 'Walz, Holzbau und Montage — Partnersuche-Tipps für Zimmerleute.',
    href: '/singles-partnersuche',
    cta: 'Zum Partnersuche-Guide →',
  },
  maurer: {
    heading: 'Partnersuche für Maurer',
    text: 'Baustelle, Rohbau und Frühschicht — Dating-Guide für Bau-Singles.',
    href: '/singles-partnersuche',
    cta: 'Zum Partnersuche-Guide →',
  },
};

const DEFAULT_PILLAR = {
  heading: 'Partnersuche im Handwerk — der komplette Guide',
  text: 'Handwerker-Singles: Elektriker, Dachdecker, Tischler und Maurer finden die große Liebe trotz Montage und Frühschicht.',
  href: '/singles-partnersuche',
  cta: 'Zum Partnersuche-Guide →',
};

export function PillarBacklinkCard({ specialization }: { specialization?: Specialization }) {
  const pillar = (specialization && PILLARS[specialization]) || DEFAULT_PILLAR;
  return (
    <div className="not-prose my-12 rounded-2xl bg-surface border border-foreground/10 p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-bold mb-3">{pillar.heading}</h3>
      <p className="text-foreground/70 leading-relaxed mb-6">{pillar.text}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={pillar.href}
          className="inline-block px-5 py-2.5 rounded-lg bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition"
        >
          {pillar.cta}
        </Link>
        <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
          Jetzt mitmachen
        </HeartButton>
      </div>
    </div>
  );
}
