// remix
import { json } from "@remix-run/node";
import { useLoaderData, useCatch } from "@remix-run/react";

// db
import { db } from "~/utils/db.server";

export const loader = async () => {
  const count = await db.joke.count();
  const index = Math.floor(Math.random() * count);
  const randomJoke = await db.joke.findFirst({
    take: 1,
    skip: index,
  });

  if (!randomJoke) {
    throw new Response("No random joke found", {
      status: 404,
    });
  }

  return json(randomJoke);
};

export default function JokeIndexRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Here's a random joke:</h2>
      <br />
      <h3>{data.title}</h3>
      <p>{data.content}</p>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="error-container">There are no jokes to display.</div>
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary() {
  return <div className="error-container">Ruh Roh...</div>;
}
