import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { getArticleUrl } from '@/lib/routes';
import { ArticleBody } from '@/components/content/ArticleBody';
import { ClusterHero } from '@/components/content/ClusterHero';
import { TableOfContents } from '@/components/content/TableOfContents';
import { PillarBacklinkCard } from '@/components/content/PillarBacklinkCard';
import { BerufsbildBacklinkCard } from '@/components/content/BerufsbildBacklinkCard';
import { BerufIntentNav } from '@/components/content/BerufIntentNav';
import { HandwerkerBacklinkCard } from '@/components/content/HandwerkerBacklinkCard';
import { CalloutBox } from '@/components/ui/CalloutBox';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { HeartButton } from '@/components/ui/HeartButton';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { CarouselCards } from '@/components/ui/CarouselCards';
import { MatchQuiz } from '@/components/ui/MatchQuiz';
import { AnimatedGradientBorder } from '@/components/ui/AnimatedGradientBorder';
import { StickyTOC } from '@/components/content/StickyTOC';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleByline } from '@/components/content/ArticleByline';
import { JsonLd, articleJsonLd, faqJsonLd, videoJsonLd, extractYoutubeEmbed, occupationSalaryJsonLd } from '@/components/seo/JsonLd';
import { HANDWERK_GEHALT_REGISTRY } from '@/lib/handwerk-gehalt-registry';
import { SECTION_HUBS, SINGLE_HUB } from '@/lib/hubs';

const BASE_URL = 'https://handwerksingles.de/magazin';

// Top-Suchvolumen-Berufe (DFS 2026-06-12) — bekommen sitewide das meiste interne Link-Gewicht
const TOP_BERUFE = [
  'friseur', // 550k/mo
  'schornsteinfeger', // 27.1k
  'gebaeudereiniger', // 22.2k
  'goldschmied', // 22.2k
  'metallbauer', // 22.2k
  'fliesenleger', // 18.1k
  'kfz-mechatroniker',
  'elektriker',
  'anlagenmechaniker-shk',
  'dachdecker',
];

function toId(text: string) {
  return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function collectText(n: any): string {
  if (typeof n === 'string') return n;
  if (n?.type === 'text') return n.attributes?.content ?? '';
  return (n?.children ?? []).map(collectText).join('');
}
function extractH2s(content: any): { label: string; id: string }[] {
  const node = 'node' in content ? content.node : content;
  const items: { label: string; id: string }[] = [];
  function walk(n: any) {
    if (n?.type === 'heading' && n?.attributes?.level === 2) {
      const text = collectText(n);
      if (text) items.push({ label: text, id: toId(text) });
    }
    (n?.children ?? []).forEach(walk);
  }
  walk(node);
  return items;
}

// Sektion → Breadcrumb-Label + Hub-Href
function sectionCrumb(category: string): { label: string; href: string } {
  if (category === 'handwerk-news') return { label: 'Handwerk-News', href: '/handwerk-news' };
  if (category === 'handwerksberufe') return { label: 'Handwerksberufe', href: '/handwerksberufe' };
  return { label: 'Singles & Partnersuche', href: `/${SINGLE_HUB.slug}` };
}

export async function buildArticleMetadata(slug: string) {
  const article = await reader.collections.articles.read(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = `${BASE_URL}${getArticleUrl(slug, article.category)}`;
  const image = article.featuredImage
    ? `${BASE_URL}${article.featuredImage}`
    : `${BASE_URL}/logos/jobsingles-logo.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: image, width: 1256, height: 710, alt: title }],
      siteName: 'Handwerksingles Magazin',
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticleView({ slug }: { slug: string }) {
  const article = await reader.collections.articles.read(slug, { resolveLinkedFiles: true });
  if (!article) notFound();

  const author = article.author
    ? await reader.collections.authors.read(article.author)
    : null;

  const allArticles = await reader.collections.articles.all();
  // Deterministische Rotation pro Slug: jeder Artikel zeigt andere "Weitere Artikel",
  // damit interne Links über alle Spokes verteilt werden statt immer auf dieselben 6.
  const slugHash = [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pool = allArticles.filter(
    (a) =>
      a.slug !== slug &&
      a.entry.status === 'published' &&
      a.entry.category === article.category &&
      (a.entry.type === 'cluster' || a.entry.type === 'berufsbild') &&
      (article.category !== 'handwerksberufe' || a.entry.beruf !== article.beruf)
  );
  // Top-Volumen-Berufe (DFS) bekommen das meiste interne Gewicht: bis zu 3 feste Slots
  const topPool = TOP_BERUFE.filter((b) => b !== article.beruf);
  const topOffset = topPool.length > 0 ? slugHash % topPool.length : 0;
  const topBerufsbilder =
    article.category === 'handwerksberufe'
      ? [...topPool.slice(topOffset), ...topPool.slice(0, topOffset)]
          .map((b) => pool.find((a) => a.slug === b))
          .filter((a): a is NonNullable<typeof a> => Boolean(a))
          .slice(0, 3)
      : [];
  const rest = pool.filter((a) => !topBerufsbilder.includes(a));
  const offset = rest.length > 0 ? slugHash % rest.length : 0;
  const rotated = [...rest.slice(offset), ...rest.slice(0, offset)];
  const relatedArticles = [...topBerufsbilder, ...rotated]
    .slice(0, 6)
    .map((a) => ({
      title: a.entry.title,
      excerpt: a.entry.excerpt,
      href: getArticleUrl(a.slug, a.entry.category),
      image: a.entry.featuredImage || undefined,
      category: a.entry.category,
    }));

  const canonicalPath = getArticleUrl(slug, article.category);
  const crumb = sectionCrumb(article.category);
  const ytEmbed = extractYoutubeEmbed(article.content);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `${BASE_URL}${canonicalPath}`,
          image: article.featuredImage ? `${BASE_URL}${article.featuredImage}` : undefined,
          datePublished: article.publishedAt || undefined,
          authorName: author?.name,
          authorUrl: author?.socialLinks?.find((l) => l.platform === 'Website')?.url ?? undefined,
          isNews: article.category === 'handwerk-news',
        })}
      />
      {article.faqItems && article.faqItems.length > 0 && (
        <JsonLd data={faqJsonLd(article.faqItems)} />
      )}
      {HANDWERK_GEHALT_REGISTRY[slug] && (() => {
        const e = HANDWERK_GEHALT_REGISTRY[slug];
        const s = occupationSalaryJsonLd({
          name: e.name,
          description: e.description,
          url: `${BASE_URL}${canonicalPath}`,
          rows: e.rows,
          quelle: e.quelle,
        });
        return s ? <JsonLd data={s} /> : null;
      })()}
      {ytEmbed && (
        <JsonLd data={videoJsonLd({ name: article.title, description: article.excerpt, videoId: ytEmbed.videoId, uploadDate: article.publishedAt || '2026-05-30' })} />
      )}

      <ClusterHero
        title={article.title}
        excerpt={article.excerpt}
        category={article.category}
        image={article.featuredImage || undefined}
        imageAlt={article.featuredImageAlt || undefined}
        imageCredit={article.featuredImageCredit || undefined}
        date={article.publishedAt || undefined}
      />

      <StickyTOC items={extractH2s(article.content)} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: crumb.label, href: crumb.href },
          { label: article.title, href: canonicalPath },
        ]} />

        {article.category === 'handwerksberufe' && article.beruf && (
          <BerufIntentNav
            beruf={article.beruf}
            activeSlug={slug}
            availableSlugs={allArticles
              .filter((a) => a.entry.category === 'handwerksberufe' && a.entry.status === 'published')
              .map((a) => a.slug)}
          />
        )}

        <ArticleByline publishedAt={article.publishedAt || undefined} />

        <TableOfContents items={extractH2s(article.content)} />

        {article.calloutQuestion && (
          <CalloutBox question={article.calloutQuestion}>
            {article.calloutAnswer}
          </CalloutBox>
        )}

        <ArticleBody
          content={article.content}
          insertAfterH2={2}
          insertElement={
            <AnimatedGradientBorder borderRadius={12} borderWidth={2} className="my-8">
              <div className="p-6 text-center">
                <p className="text-sm text-foreground/70 mb-3">Du suchst Singles aus dem Handwerk?</p>
                <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
                  Jetzt kostenfrei anmelden
                </HeartButton>
              </div>
            </AnimatedGradientBorder>
          }
        />

        {/* CTA Stopper nach Content */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-10 px-6 bg-surface-dark text-white text-center">
            <p className="text-lg font-bold mb-2">Genug gelesen?</p>
            <p className="text-white/60 text-sm mb-5">Finde Singles, die deinen Alltag verstehen.</p>
            <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
              Jetzt kostenfrei mitmachen
            </HeartButton>
          </div>
        </AnimatedGradientBorder>

        {article.takeaways && article.takeaways.length > 0 && (
          <TakeawayBox items={article.takeaways} />
        )}

        {/* Mini Quiz */}
        <AnimatedGradientBorder borderRadius={16} borderWidth={2} className="my-12">
          <div className="py-8 px-6">
            <p className="text-center text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">Finde deinen Match-Typ</p>
            <MatchQuiz />
          </div>
        </AnimatedGradientBorder>

        {article.faqItems && article.faqItems.length > 0 && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">Häufige Fragen</h2>
            <FAQAccordion items={article.faqItems} />
          </>
        )}

        {/* Author Bio */}
        {author && (
          <AuthorBio
            name={author.name}
            slug={article.author || undefined}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        {/* Pillar Backlink — Partnersuche-Spokes → Singles-Pillar (mit Sektions-Anker) */}
        {article.category === 'partnersuche' && article.type !== 'pillar' && (
          <PillarBacklinkCard
            specialization={article.beruf || undefined}
            anchor={article.cluster || undefined}
          />
        )}

        {/* Berufsbild Backlink — Gehalt/Ausbildung-Spokes → Beruf-Hub, Beruf-Hubs → Übersicht */}
        {article.category === 'handwerksberufe' && (
          <BerufsbildBacklinkCard
            beruf={article.beruf || undefined}
            isHub={article.type === 'berufsbild'}
          />
        )}

        {/* Handwerker-Hub Backlink (Spoke → Hub) */}
        {article.person && <HandwerkerBacklinkCard personSlug={article.person} />}
      </div>

      {/* Related Articles Carousel */}
      {relatedArticles.length > 0 && (
        <CarouselCards title="Weitere Artikel" items={relatedArticles} />
      )}

      {/* Bottom CTA */}
      <section className="text-center py-16 px-6">
        <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
          Jetzt kostenfrei mitmachen
        </HeartButton>
      </section>
    </>
  );
}
