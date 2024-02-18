import { Suspense } from 'react';
import { MOVIES_URL } from '../../../(home)/page';
import MovieInfo from '../../../../components/movie-info';
import MovieVideos from '../../../../components/movie-videos';

export const metadata = {
  title: 'Movie',
};

// async function getMovie(id: string) {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const response = await fetch(`${MOVIES_URL}/${id}`);
//   return response.json();
// }

// async function getVideos(id: string) {
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   const response = await fetch(`${MOVIES_URL}/${id}/videos`);
//   return response.json();
// }

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  // const movieData = getMovie(id);
  // const videoData = getVideos(id);
  // The problem of below line is if user wants to see the UI, two fetches has to be done.
  // const [movie, video] = await Promise.all([movieData, videoData]);
  return (
    <div>
      <h3>Movie Detail Page</h3>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
