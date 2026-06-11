import { reader } from '@/lib/keystatic';
import { notFound } from 'next/navigation';
import { JsonLd, personJsonLd, faqJsonLd, collectionPageJsonLd } from '@/components/seo/JsonLd';
import { ClusterHero } from '@/components/content/ClusterHero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleBody } from '@/components/content/ArticleBody';
import { SteckbriefTable } from '@/components/content/SteckbriefTable';
import { SeriesCard } from '@/components/content/SeriesCard';
import { TakeawayBox } from '@/components/ui/TakeawayBox';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { AuthorBio } from '@/components/ui/AuthorBio';
import { HeartButton } from '@/components/ui/HeartButton';
import { articleHref, getPersonHubUrl } from '@/lib/routes';

const BASE = 'https://handwerksingles.de/magazin';

/**
 * Handwerker-Personen-Hub. Aggregiert automatisch alle Artikel mit passendem `person`-Feld
 * (Hub → Spoke). Der Rück-Link (Spoke → Hub) kommt aus <HandwerkerBacklinkCard> in der ArticleView.
 */
export async function PersonHubPage({ slug }: { slug: string }) {
  const person = await reader.collections.persons.read(slug, { resolveLinkedFiles: true });
  if (!person || person.status === 'draft') notFound();

  const personUrl = `${BASE}${getPersonHubUrl(slug)}`;

  const allArticles = await reader.collections.articles.all();
  const related = allArticles
    .filter((a) => a.entry.person === slug && a.entry.status === 'published')
    .sort((a, b) =>
      String(b.entry.publishedAt ?? '').localeCompare(String(a.entry.publishedAt ?? '')),
    );

  const author = (person as any).author
    ? await reader.collections.authors.read((person as any).author)
    : null;

  const hasFaq = !!person.faqItems && person.faqItems.length > 0;
  const hasTakeaways = !!person.takeaways && (person.takeaways as string[]).length > 0;
  const hasSteckbrief = !!person.steckbrief && person.steckbrief.length > 0;

  const articleListItems = related.map((a) => ({
    name: a.entry.title,
    url: `${BASE}${articleHref({ slug: a.slug, entry: a.entry })}`,
  }));

  return (
    <>
      <JsonLd
        data={personJsonLd({
          name: person.name,
          role: person.role || undefined,
          image: person.featuredImage || undefined,
          url: personUrl,
        })}
      />
      {hasFaq && (
        <JsonLd data={faqJsonLd(person.faqItems as { question: string; answer: string }[])} />
      )}
      {articleListItems.length > 0 && (
        <JsonLd
          data={collectionPageJsonLd({
            name: `Alle Artikel zu ${person.name}`,
            description: person.intro || `Artikel über ${person.name}`,
            url: personUrl,
            items: articleListItems,
          })}
        />
      )}

      <ClusterHero
        title={person.name}
        excerpt={person.intro || undefined}
        category="Handwerker"
        image={person.featuredImage || undefined}
        imageAlt={person.featuredImageAlt || undefined}
        imageCredit={person.featuredImageCredit || undefined}
      />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Promi-Handwerker', href: '/handwerker' },
            { label: person.name, href: getPersonHubUrl(slug) },
          ]}
        />

        {person.featuredImageCredit && (
          <p className="text-xs text-foreground/40 mt-3 mb-0">{person.featuredImageCredit}</p>
        )}

        {hasSteckbrief && (
          <SteckbriefTable rows={person.steckbrief as { label: string; value: string }[]} />
        )}

        <ArticleBody content={person.bio} />

        {hasTakeaways && <TakeawayBox items={person.takeaways as string[]} />}

        {related.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6">Alle Artikel zu {person.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((a) => (
                <SeriesCard
                  key={a.slug}
                  title={a.entry.title}
                  excerpt={a.entry.excerpt}
                  href={articleHref({ slug: a.slug, entry: a.entry })}
                  image={a.entry.featuredImage || undefined}
                  imageAlt={a.entry.featuredImageAlt || undefined}
                  seriesLabel="Handwerker"
                />
              ))}
            </div>
          </section>
        )}

        {hasFaq && (
          <>
            <h2 id="haeufige-fragen" className="text-2xl font-bold mt-16 mb-2 scroll-mt-24">
              Häufige Fragen
            </h2>
            <FAQAccordion items={person.faqItems as { question: string; answer: string }[]} />
          </>
        )}

        {author && (
          <AuthorBio
            name={author.name}
            slug={(person as any).author || undefined}
            role={author.role}
            bio={author.bio}
            avatar={author.avatar || undefined}
            socialLinks={author.socialLinks}
          />
        )}

        <div className="text-center py-8">
          <HeartButton href="https://handwerksingles.de/registration/?AID=HandwerksinglesMagazin">
            Jetzt kostenfrei mitmachen
          </HeartButton>
        </div>
      </div>
    </>
  );
}
