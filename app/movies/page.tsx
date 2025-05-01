import { Suspense } from 'react';
import { getVodStreams } from '@/lib/api';
import ContentCarousel from '@/components/content-carousel';
import SkeletonCarousel from '@/components/skeleton-carousel';
import Navbar from '@/components/navbar';
import Loading from '@/components/loading';

export default async function MoviesPage() {
  // Fetch all movies
  const movies = await getVodStreams();
  
  // Group movies by category
  const moviesByCategory: Record<string, any[]> = {};
  
  movies.forEach(movie => {
    if (!moviesByCategory[movie.category_name]) {
      moviesByCategory[movie.category_name] = [];
    }
    moviesByCategory[movie.category_name].push(movie);
  });

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      <Navbar />
      
      <section className="pt-4 pb-16">
        <Suspense fallback={<Loading />}>
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold mb-2">Movies</h1>
            <p className="text-zinc-400 text-sm mb-6">Browse our collection of movies by category</p>
          </div>
          
          {Object.entries(moviesByCategory).map(([category, categoryMovies]) => (
            <Suspense key={category} fallback={<SkeletonCarousel title={category} />}>
              <ContentCarousel 
                title={category} 
                items={categoryMovies} 
                type="movie" 
              />
            </Suspense>
          ))}
        </Suspense>
      </section>
    </main>
  );
}