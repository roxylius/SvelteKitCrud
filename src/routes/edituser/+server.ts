import "dotenv/config";
import type { RequestHandler } from "@sveltejs/kit";
import { createClient } from "@vercel/postgres";

export const POST: RequestHandler = async ({ request }) => {
  const client = createClient({
    connectionString: process.env.POSTGRES_URL
  });
  await client.connect();
  
  //@ts-ignore
  const body = await request.json();

  const id = await body.id;
  const name = await body.name;
  const email = await  body.email;


  if (typeof name !== "string" || typeof email !== "string" || typeof id !== "number") {
    console.log("bad request!");
    return new Response("Invalid form data", { status: 400 });
  }

  try {
    await client.sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id};`;
    console.error("user edited successfull");
    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return new Response("Database error", { status: 500 });
  }
};