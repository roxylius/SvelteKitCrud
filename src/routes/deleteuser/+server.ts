import 'dotenv/config';
import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@vercel/postgres';

export const POST: RequestHandler = async ({ request }) => {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL
  });
  await client.connect();
  const formData = await request.formData();
  const name = formData.get('name');

  if (typeof name !== 'string') {
    return new Response('Invalid form data', { status: 400 });
  }

  try {
    await client.sql`DELETE FROM table_name WHERE name=${name};`;
    return new Response('User delete successfully', { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new Response('Database error', { status: 500 });
  }
};