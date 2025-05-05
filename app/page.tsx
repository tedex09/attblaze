import { Suspense } from 'react';
import { getLiveStreams, getVodStreams, getSeries } from '@/lib/api';
import ContentCarousel from '@/components/content-carousel';
import SkeletonCarousel from '@/components/skeleton-carousel';
import Navbar from '@/components/navbar';
import Loading from '@/components/loading';

export default async function Home() {
  // Fetch data for home page app
  const [channels, movies, series] = await Promise.all([
    getLiveStreams(),
    getVodStreams(),
    getSeries()
  ]);
  
  // Sort by added/last_modified date
  const sortedChannels = [...channels].sort((a, b) => 
    new Date(b.added).getTime() - new Date(a.added).getTime()
  ).slice(0, 20);
  
  const sortedMovies = [...movies].sort((a, b) => 
    new Date(b.added).getTime() - new Date(a.added).getTime()
  ).slice(0, 20);
  
  const sortedSeries = [...series].sort((a, b) => 
    new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime()
  ).slice(0, 20);

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      <Navbar />
      
      <section className="pt-4 pb-16">
        <Suspense fallback={<Loading />}>
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold mb-2">Welcome to IPTV</h1>
            <p className="text-zinc-400 text-sm mb-6">Discover the latest channels, movies, and series</p>
          </div>
          
          <Suspense fallback={<SkeletonCarousel title="Latest Channels" />}>
            <ContentCarousel 
              title="Latest Channels" 
              items={sortedChannels} 
              type="channel" 
            />
          </Suspense>
          
          <Suspense fallback={<SkeletonCarousel title="Latest Movies" />}>
            <ContentCarousel 
              title="Latest Movies" 
              items={sortedMovies} 
              type="movie" 
            />
          </Suspense>
          
          <Suspense fallback={<SkeletonCarousel title="Latest Series" />}>
            <ContentCarousel 
              title="Latest Series" 
              items={sortedSeries} 
              type="series" 
            />
          </Suspense>
        </Suspense>
      </section>
    </main>
  );
}