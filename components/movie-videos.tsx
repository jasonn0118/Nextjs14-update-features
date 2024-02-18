import { MOVIES_URL } from '../app/(home)/page';

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await fetch(`${MOVIES_URL}/${id}/videos`);

  if (!response.ok) {
    throw new Error('Failed to fetch videos data');
  }

  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);

  return <h6>{JSON.stringify(videos)}</h6>;
}
