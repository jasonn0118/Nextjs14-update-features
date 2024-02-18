import { MOVIES_URL } from '../app/(home)/page';

async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${MOVIES_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie detail data');
  }

  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return <h1>{movie.title}</h1>;
}
