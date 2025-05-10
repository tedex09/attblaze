import { Suspense } from 'react';
import { getLiveStreams, getVodStreams, getSeries } from '@/lib/api';
import ContentCarousel from '@/components/content-carousel';
import SkeletonCarousel from '@/components/skeleton-carousel';
import Loading from '@/components/loading';

function removeInvalidOrDuplicateStreamIds<T extends { stream_id: number }>(items: T[]): T[] {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (item.stream_id === 0 || seen.has(item.stream_id)) return false;
    seen.add(item.stream_id);
    return true;
  });
}


export default async function Home() {
  // Fetch data for home page app
  const [channels, movies, series] = await Promise.all([
    getLiveStreams(),
    getVodStreams(),
    getSeries()
  ]);
  
  // Sort by added/last_modified date
  const sortedChannels = removeInvalidOrDuplicateStreamIds(
    [...channels].sort((a, b) => b.stream_id - a.stream_id)
  ).slice(0, 20);
  
  const sortedMovies = removeInvalidOrDuplicateStreamIds(
    [...movies].sort((a, b) => b.stream_id - a.stream_id)
  ).slice(0, 20);
  
  const sortedSeries = [...series].sort((a, b) => 
    new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime()
  ).slice(0, 20);

  return (
    <main className="min-h-screen">

      <section className="pb-16">
        <Suspense fallback={<Loading />}>
          
          <Suspense fallback={<SkeletonCarousel title="Últimos Filmes" />}>
            <ContentCarousel 
              title="Últimos Filmes" 
              items={sortedMovies} 
              type="movie" 
            />
          </Suspense>
          
          <Suspense fallback={<SkeletonCarousel title="Últimas Series" />}>
            <ContentCarousel 
              title="Últimas Series" 
              items={sortedSeries} 
              type="series" 
            />
          </Suspense>

          <Suspense fallback={<SkeletonCarousel title="Últimos Canais" />}>
            <ContentCarousel 
              title="Últimos Canais" 
              items={sortedChannels} 
              type="channel" 
            />
          </Suspense>
        </Suspense>
      </section>
    </main>
  );
}