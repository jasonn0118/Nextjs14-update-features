import { MOVIES_URL } from '../../constants';
import styles from './movie-video.module.css';

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

  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.name}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
          allowFullScreen
        />
      ))}
    </div>
  );
}
