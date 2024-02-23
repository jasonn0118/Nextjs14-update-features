import Movie from '../../components/movie/movie';
import styles from './page.module.css';

export const metadata = { title: 'Home' };

export const MOVIES_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(MOVIES_URL);
  const json = await response.json();
  return json;
}

// Server component: Caching fetch url.

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  );
}
