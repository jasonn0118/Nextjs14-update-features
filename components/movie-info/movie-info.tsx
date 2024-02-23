import { MOVIES_URL } from '../../app/(home)/page';
import styles from './movie-info.module.css';

export async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`${MOVIES_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch movie detail data');
  }

  return response.json();
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  return (
    <div className={styles.container}>
      <img
        className={styles.poster}
        src={movie.poster_path}
        alt={movie.title}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3> ⭐️ {movie.vote_average.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target='_blank' rel='noreferrer'>
          Homepage &rarr;
        </a>
      </div>
    </div>
  );
}
