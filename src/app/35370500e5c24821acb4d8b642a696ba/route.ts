export const runtime = 'edge';

export async function GET() {
  return new Response('35370500e5c24821acb4d8b642a696ba', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
