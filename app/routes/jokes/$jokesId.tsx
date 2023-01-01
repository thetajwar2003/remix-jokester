// remix
import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

// db
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const joke = await db.joke.findUnique({
    where: { id: params.jokesId },
  });

  if (!joke) throw new Error("Joke Not Found");

  return json(joke);
};

export default function JokeIdRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  );
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}
