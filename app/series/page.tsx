import { Suspense } from 'react';
import { getSeries } from '@/lib/api';
import ContentCarousel from '@/components/content-carousel';
import SkeletonCarousel from '@/components/skeleton-carousel';
import Navbar from '@/components/navbar';
import Loading from '@/components/loading';

export default async function SeriesPage() {
  // Fetch all series
  const series = await getSeries();
  
  // Group series by category
  const seriesByCategory: Record<string, any[]> = {};
  
  series.forEach(item => {
    const categoryId = item.category_id;
    const categoryName = item.genre || 'Uncategorized';
    
    if (!seriesByCategory[categoryName]) {
      seriesByCategory[categoryName] = [];
    }
    seriesByCategory[categoryName].push(item);
  });

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      <Navbar />
      
      <section className="pt-4 pb-16">
        <Suspense fallback={<Loading />}>
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold mb-2">TV Series</h1>
            <p className="text-zinc-400 text-sm mb-6">Browse our collection of TV series by genre</p>
          </div>
          
          {Object.entries(seriesByCategory).map(([category, categorySeries]) => (
            <Suspense key={category} fallback={<SkeletonCarousel title={category} />}>
              <ContentCarousel 
                title={category} 
                items={categorySeries} 
                type="series" 
              />
            </Suspense>
          ))}
        </Suspense>
      </section>
    </main>
  );
}