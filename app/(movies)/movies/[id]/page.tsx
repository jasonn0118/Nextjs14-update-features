import { Suspense } from 'react';
import MovieInfo, {
  getMovie,
} from '../../../../components/movie-info/movie-info';
import MovieVideos from '../../../../components/movie-video/movie-videos';

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  // It is okay to use fetch here and movie-info in both, because of beauty of caching.
  const movie = await getMovie(id);
  return { title: movie.title };
}

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

export default async function MovieDetailPage({ params: { id } }: IParams) {
  // const movieData = getMovie(id);
  // const videoData = getVideos(id);
  // The problem of below line is if user wants to see the UI, two fetches has to be done.
  // const [movie, video] = await Promise.all([movieData, videoData]);
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
