import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@vercel/postgres';

export const GET: RequestHandler = async ({ request }) => {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL
  });
  await client.connect();

  try {
    const data = await client.sql`select * from users`;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new Response('Database error', { status: 500 });
  }
};