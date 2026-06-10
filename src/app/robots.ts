import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // VERCEL_ENV ist nur auf Production-Deployments 'production' (Previews/Branches: 'preview')
  const isProduction = process.env.VERCEL_ENV === 'production';

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/keystatic/'],
    },
    sitemap: [
      'https://handwerksingles.de/magazin/sitemap.xml',
      'https://handwerksingles.de/magazin/news-sitemap.xml',
    ],
  };
}
