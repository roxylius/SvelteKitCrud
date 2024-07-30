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
  const email = formData.get('email');

  if (typeof name !== 'string' || typeof email !== 'string') {
    return new Response('Invalid form data', { status: 400 });
  }

  try {
    await client.sql`INSERT INTO users (name, email) VALUES (${name}, ${email})`;
    return new Response('User added successfully', { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return new Response('Database error', { status: 500 });
  }
};