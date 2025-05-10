"use client";

import { useEffect, useState } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import { getSeries } from '@/lib/api';
import { SkeletonImage } from '@/components/skeletonImage';
import Loading from '@/components/loading';
import Link from 'next/link';

export default function SeriesPage() {
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const fetchSeries = async () => {
      const data = await getSeries();
      const sortedSeries = [...data]
        .sort((a, b) => new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime())
        .slice(0, 50);
      setSeries(sortedSeries);
      setLoading(false);
    };

    fetchSeries();
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
    if (index >= series.length) return null;

    const item = series[index];

    return (
      <div key={key} style={style}>
        <Link 
          href={`/details/series/${item.series_id}`}
          className="group block p-2"
        >
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800">
            {item.cover ? (
              <SkeletonImage
                src={item.cover}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-zinc-500 text-sm px-2 text-center">{item.name}</span>
              </div>
            )}
          </div>
          <h3 className="mt-2 text-sm font-medium line-clamp-2 px-2">{item.name}</h3>
        </Link>
      </div>
    );
  };

  if (loading) return <Loading />;

  const rowCount = Math.ceil(series.length / columnCount);

  return (
    <main className="min-h-screen">
      <section className="pt-4 pb-16">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold mb-2">Últimas séries adicionadas</h1>
          <p className="text-zinc-400 text-sm mb-6">As séries mais recentes adicionadas à nossa coleção</p>
        </div>
        
        <div className="h-[calc(100vh-200px)]">
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                cellRenderer={cellRenderer}
                columnCount={columnCount}
                columnWidth={width / columnCount}
                height={height}
                rowCount={rowCount}
                rowHeight={((width / columnCount) * 3) / 2 + 48} // Extra height for title
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </section>
    </main>
  );
}