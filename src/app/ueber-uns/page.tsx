import { HeartButton } from '@/components/ui/HeartButton';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { JsonLd, faqJsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata = {
  alternates: { canonical: '/ueber-uns' },
  title: 'Über uns — Handwerksingles Magazin',
  description: 'Thomas Honold: Gründer des größten Berufs-Dating-Netzwerks und passionierter Unternehmer. Die Geschichte hinter Handwerksingles.de — und warum es Handwerker-Singles hilft.',
  openGraph: {
    title: 'Über uns — Die Geschichte hinter Handwerksingles',
    description: 'Thomas Honold: Gründer des größten Berufs-Dating-Netzwerks. Die Geschichte hinter Handwerksingles.de.',
    url: 'https://handwerksingles.de/magazin/ueber-uns',
    type: 'website' as const,
    siteName: 'Handwerksingles Magazin',
    locale: 'de_DE',
  },
};

const faqItems = [
  {
    question: 'Wer steckt hinter Handwerksingles.de?',
    answer: 'Handwerksingles.de wurde von Thomas Honold gegründet. Er ist ausgebildeter Küchenmeister und Unternehmer, war CEO des Online-Bewertungssiegels Ausgezeichnet.org und hat 2008 das Jobsingles-Netzwerk ins Leben gerufen. Heute betreibt er zusätzlich seeside.ai — KI-Agentenlösungen für Solopreneure und Unternehmen.',
  },
  {
    question: 'Warum eine Dating-Plattform speziell für Handwerksberufe?',
    answer: 'Elektriker, Dachdecker, Tischler und Maurer arbeiten oft in Frühschicht, auf Montage oder im Familienbetrieb und haben wenig planbare Freizeit. Normale Dating-Plattformen berücksichtigen das nicht. Handwerksingles.de verbindet Menschen, die diese Realität aus eigener Erfahrung kennen — und deshalb besser zueinander passen.',
  },
  {
    question: 'Gehört Handwerksingles.de zu einem größeren Netzwerk?',
    answer: 'Ja. Handwerksingles.de ist Teil des Jobsingles-Netzwerks mit über 15 berufsspezifischen Dating-Portalen, darunter FarmerSingles.de, BlaulichtSingles.ch und MedicSingles.de. Seit 2018 läuft die Technik über den bewährten Icony-Verbund mit deutschen Servern.',
  },
  {
    question: 'Wie schützt Handwerksingles.de meine Daten?',
    answer: 'Alle Daten liegen auf deutschen Servern und sind DSGVO-konform geschützt. Profile sind nicht öffentlich einsehbar, und du entscheidest selbst, welche Informationen du teilst. Gerade im Handwerk ist Diskretion wichtig — das respektieren wir.',
  },
  {
    question: 'Was kostet Handwerksingles.de?',
    answer: 'Die Registrierung und das Erstellen eines Profils sind kostenlos. Du kannst dich umschauen, Profile ansehen und erste Kontakte knüpfen, ohne etwas zu bezahlen. Für erweiterte Funktionen wie unbegrenztes Messaging gibt es Premium-Optionen.',
  },
];

export default function UeberUns() {
  return (
    <div data-theme="dark" className="min-h-screen" style={{ background: '#0F1318', color: '#E8E8E8' }}>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 particle-overlay opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 particle-text">Über uns</h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Vom Küchenmeister zum Dating-Unternehmer — die Geschichte hinter Handwerksingles.de
          </p>
        </div>
      </section>

      {/* Story */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Die Geschichte</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              <strong>Handwerksingles.de</strong> ist kein Zufallsprodukt. Hinter der Plattform steht <strong>Thomas Honold</strong> — ein Mann, der selbst weiß, was es heißt, in einem Beruf zu arbeiten, der das Privatleben bestimmt.
            </p>
            <p>
              Thomas wuchs in Radolfzell am Bodensee auf und lernte das Handwerk im elterlichen Restaurant <strong>Mettnaustube</strong> — schon als Schüler stand er in den Ferien und an Wochenenden im Betrieb seines Vaters Manfred. Mit 19 begann er die Berufsausbildung im Hotel- und Gaststättengewerbe, arbeitete sich vom <em>Commis de Cuisine</em> über den <em>Chef de Partie</em> bis zum <strong>Küchenmeister</strong> hoch.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Marine, Sternehäuser und die Schweiz</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              Dazwischen lag der <strong>Wehrdienst bei der Marine</strong> — in der Truppenverpflegung auf Sylt und im Offiziersrestaurant des Marine-Hauptquartiers in Glücksburg. Danach die <strong>Deutsch-Französische Brigade</strong> in Donaueschingen, wo er in der Feldverpflegung ausgebildet wurde. Thomas kennt den militärischen Schichtdienst und die Belastung aus eigener Erfahrung.
            </p>
            <p>
              Seine kulinarische Reise führte ihn ins legendäre <strong>Hotel Traube Tonbach</strong> in Baiersbronn — eines der besten Restaurants Deutschlands. Und in die <strong>Hummer Bar des Hotel St. Gotthard</strong> in Zürich — seine erste Station in der Schweiz.
            </p>
            <p>
              2003 legte er die <strong>Meisterprüfung</strong> an der IHK Villingen ab und übernahm als <em>Chef de Cuisine</em> die Küchenleitung der Mettnaustube. Von 2009 bis 2015 führte er das Restaurant als selbständiger Geschäftsführer und Küchenchef.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Von der Küche ins Internet</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              Parallel zum Unternehmensaufbau gründete Thomas <strong>2008 das Jobsingles-Netzwerk</strong> — mit einer einfachen Idee: Menschen, die den gleichen Beruf teilen, verstehen einander besser. Wer weiß, wie sich eine 14-Stunden-Schicht anfühlt, muss das dem Partner nicht erklären.
            </p>
            <p>
              Was als kleines Projekt begann, wuchs zu <strong>Deutschlands und der Schweiz größtem berufsspezifischen Dating-Netzwerk</strong> — mit über 15 spezialisierten Portalen: FarmerSingles.de, BlaulichtSingles.ch, MedicSingles.de und eben Handwerksingles.de.
            </p>
            <p>
              Von 2018 bis 2022 war Thomas zusätzlich <strong>Geschäftsführer (CEO) der Aubii GmbH</strong> — dem Unternehmen hinter <strong>Ausgezeichnet.org</strong>, einem der führenden Online-Bewertungssiegel im deutschsprachigen Raum. Dort baute er das B2B-Geschäft auf, führte ein Team und lernte, wie man digitale Plattformen skaliert.
            </p>
            <p>
              Heute baut Thomas nicht nur das Jobsingles-Netzwerk weiter aus, sondern betreibt mit <strong><a href="https://seeside.ai" target="_blank" rel="nofollow noopener" className="text-brand-orange hover:underline">seeside.ai</a></strong> auch KI-Agentenlösungen für Solopreneure und Unternehmen. Die gesamte Infrastruktur hinter Handwerksingles.de — von der automatisierten Content-Erstellung bis zur SEO-Optimierung — läuft auf seiner eigenen KI-Plattform.
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Warum Handwerksingles.de?</h2>
          <div className="prose prose-lg text-foreground/80 space-y-4">
            <p>
              Elektriker, Dachdecker, Tischler und Maurer teilen eine Realität, die Außenstehende selten verstehen: Frühschicht, Montage, Familienbetrieb und kaum planbare Freizeit. Normale Dating-Plattformen ignorieren das.
            </p>
            <p>
              <strong>Handwerksingles.de</strong> ist anders. Hier treffen sich Menschen, die wissen, was es heißt, nach einer langen Schicht wieder aufzutanken. Die verstehen, warum ein freies Wochenende kein selbstverständlicher Luxus ist. Die wissen, dass der beste Partner jemand ist, der diese Welt kennt.
            </p>
            <p>
              <strong>Deutsche Server. DSGVO-konform. Diskret.</strong> Weil gerade Handwerksberufe besonderen Schutz verdienen.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Netzwerk-Übersicht */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Unser Netzwerk</h2>
          <p className="text-foreground/70 mb-8">
            Seit 2008 verbinden wir Menschen nach Beruf — mit spezialisierten Dating-Portalen für jede Branche. Alle Portale laufen auf der bewährten Icony-Technologie mit deutschen Servern und DSGVO-konformem Datenschutz.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://farmersingles.de" rel="nofollow noopener" target="_blank" className="flex items-center gap-3 rounded-xl p-4 border border-foreground/10 hover:border-brand-orange/50 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <div><p className="font-semibold text-sm text-white group-hover:text-brand-orange transition-colors">FarmerSingles.de</p><p className="text-xs text-foreground/50">Singles in der Landwirtschaft</p></div>
            </a>
            <a href="https://singlebuure.ch" rel="nofollow noopener" target="_blank" className="flex items-center gap-3 rounded-xl p-4 border border-foreground/10 hover:border-brand-orange/50 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <div><p className="font-semibold text-sm text-white group-hover:text-brand-orange transition-colors">SingleBuure.ch</p><p className="text-xs text-foreground/50">Bauern-Singles in der Schweiz</p></div>
            </a>
            <a href="https://blaulichtsingles.ch" rel="nofollow noopener" target="_blank" className="flex items-center gap-3 rounded-xl p-4 border border-foreground/10 hover:border-brand-orange/50 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <div><p className="font-semibold text-sm text-white group-hover:text-brand-orange transition-colors">BlaulichtSingles.ch</p><p className="text-xs text-foreground/50">Polizei, Feuerwehr & Sanität</p></div>
            </a>
            <a href="https://medicsingles.de" rel="nofollow noopener" target="_blank" className="flex items-center gap-3 rounded-xl p-4 border border-foreground/10 hover:border-brand-orange/50 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <div><p className="font-semibold text-sm text-white group-hover:text-brand-orange transition-colors">MedicSingles.de</p><p className="text-xs text-foreground/50">Singles im Gesundheitswesen</p></div>
            </a>
            <a href="https://jobsingles.de" rel="nofollow noopener" target="_blank" className="flex items-center gap-3 rounded-xl p-4 border border-foreground/10 hover:border-brand-orange/50 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <div><p className="font-semibold text-sm text-white group-hover:text-brand-orange transition-colors">Jobsingles.de</p><p className="text-xs text-foreground/50">Das Netzwerk — Partnersuche nach Beruf</p></div>
            </a>
            <a href="https://gastrosingles.de" rel="nofollow noopener" target="_blank" className="flex items-center gap-3 rounded-xl p-4 border border-foreground/10 hover:border-brand-orange/50 transition-all group" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <div><p className="font-semibold text-sm text-white group-hover:text-brand-orange transition-colors">Hotellerie-Singles.de</p><p className="text-xs text-foreground/50">Singles in Hotellerie & Service</p></div>
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ */}
      <ScrollReveal>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h2 id="haeufige-fragen" className="text-2xl font-bold mb-6 scroll-mt-24">Häufige Fragen</h2>
          <FAQAccordion items={faqItems} />
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="text-center py-12 px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Bereit für die Partnersuche?</h2>
          <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
            Tausende Handwerker-Singles warten auf dich.
          </p>
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </section>
      </ScrollReveal>
    </div>
  );
}
