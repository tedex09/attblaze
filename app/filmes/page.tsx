"use client";

import { useEffect, useState } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import { getVodStreams } from '@/lib/api';
import { SkeletonImage } from '@/components/skeletonImage';
import Loading from '@/components/loading';
import Link from 'next/link';

function removeInvalidOrDuplicateStreamIds<T extends { stream_id: number }>(items: T[]): T[] {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (item.stream_id === 0 || seen.has(item.stream_id)) return false;
    seen.add(item.stream_id);
    return true;
  });
}
export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getVodStreams();
      const sortedMovies = removeInvalidOrDuplicateStreamIds(
        [...data].sort((a, b) => b.stream_id - a.stream_id)
      ).slice(0, 50);
      setMovies(sortedMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(2);
      else if (width < 768) setColumnCount(3);
      else if (width < 1024) setColumnCount(4);
      else setColumnCount(5);
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  const cellRenderer = ({ columnIndex, key, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= movies.length) return null;

    const movie = movies[index];

    return (
      <div key={key} style={style}>
        <Link 
          href={`/details/movie/${movie.stream_id}`}
          className="group block p-2"
        >
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
            {movie.stream_icon ? (
              <SkeletonImage
                src={movie.stream_icon}
                alt={movie.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-zinc-500 text-sm px-2 text-center">{movie.name}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  };

  if (loading) return <Loading />;

  const rowCount = Math.ceil(movies.length / columnCount);

  return (
    <main className="min-h-screen">
      <section className="pt-4 pb-16">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold mb-2">Últimos filmes adicionados</h1>
          <p className="text-zinc-400 text-sm font-light mb-6">Os filmes mais recentes adicionados à nossa coleção</p>
        </div>
        
        <div className="relative h-[calc(100vh-200px)]">
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                cellRenderer={cellRenderer}
                columnCount={columnCount}
                columnWidth={width / columnCount}
                height={height}
                rowCount={rowCount}
                rowHeight={((width / columnCount) * 3) / 2}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </section>
    </main>
  );
}