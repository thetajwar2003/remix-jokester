// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// db
import { db } from "~/utils/db.server";

export const loader = async () => {
  const count = await db.joke.count();
  const index = Math.floor(Math.random() * count);
  const randomJoke = await db.joke.findFirst({
    take: 1,
    skip: index,
  });

  if (!randomJoke) throw new Error(`Random Joke Not Found at index ${index}`);

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
