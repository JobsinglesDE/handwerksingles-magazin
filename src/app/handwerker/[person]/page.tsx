import { reader } from '@/lib/keystatic';
import { PersonHubPage } from '@/components/content/PersonHubPage';
import { getPersonHubUrl } from '@/lib/routes';

const BASE = 'https://handwerksingles.de/magazin';

export const dynamicParams = false;

export async function generateStaticParams() {
  const persons = await reader.collections.persons.all();
  return persons
    .filter((p) => p.entry.status !== 'draft')
    .map((p) => ({ person: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ person: string }> }) {
  const { person: slug } = await params;
  const person = await reader.collections.persons.read(slug);
  if (!person) return {};
  const url = `${BASE}${getPersonHubUrl(slug)}`;
  const title = person.seoTitle || `${person.name} — Steckbrief, Karriere & alle Artikel`;
  const description = person.seoDescription || person.intro || undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      siteName: 'Handwerksingles Magazin',
      locale: 'de-DE',
      images: person.featuredImage ? [person.featuredImage] : [],
    },
  };
}

export default async function HandwerkerHub({ params }: { params: Promise<{ person: string }> }) {
  const { person } = await params;
  return <PersonHubPage slug={person} />;
}
