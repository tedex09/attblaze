import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getLiveStreams, getVodStreams, getSeries, getSeriesInfo, getStreamUrl } from '@/lib/api';
import Navbar from '@/components/navbar';
import Loading from '@/components/loading';
import { Tv, Film, PlayCircle, Calendar, Clock, Star } from 'lucide-react';

interface DetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { type, id } = params;
  const itemId = parseInt(id, 10);
  
  if (isNaN(itemId)) {
    return notFound();
  }
  
  let item: any = null;
  let streamUrl = '';
  
  // Fetch the specific item based on type
  if (type === 'channel') {
    const channels = await getLiveStreams();
    item = channels.find(channel => channel.stream_id === itemId);
    if (item) {
      streamUrl = getStreamUrl(itemId, 'live');
    }
  } else if (type === 'movie') {
    const movies = await getVodStreams();
    item = movies.find(movie => movie.stream_id === itemId);
    if (item) {
      streamUrl = getStreamUrl(itemId, 'movie');
    }
  } else if (type === 'series') {
    const seriesList = await getSeries();
    item = seriesList.find(series => series.series_id === itemId);
    
    if (item) {
      // Get detailed series info
      const seriesInfo = await getSeriesInfo(itemId);
      if (seriesInfo) {
        item = {
          ...item,
          ...seriesInfo.info,
          episodes: seriesInfo.episodes
        };
      }
    }
  } else {
    return notFound();
  }
  
  if (!item) {
    return notFound();
  }
  
  // Determine image source
  const imageSrc = type === 'series' ? item.cover : item.stream_icon;
  const title = item.name;
  const description = type === 'series' ? item.plot : (item.description || 'No description available');
  const category = type === 'channel' ? item.category_name : (item.genre || item.category_name);
  
  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      <Navbar />
      
      <Suspense fallback={<Loading />}>
        <div className="relative">
          {/* Background header image */}
          <div className="w-full h-48 md:h-64 relative overflow-hidden">
            {imageSrc ? (
              <Image 
                src={imageSrc}
                alt={title}
                fill
                className="object-cover blur-sm opacity-30"
                priority
              />
            ) : (
              <div className="w-full h-full bg-zinc-800"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-20 relative z-10">
              {/* Poster */}
              <div className="w-32 md:w-48 flex-shrink-0 aspect-[2/3] rounded-md overflow-hidden shadow-xl border border-zinc-800">
                {imageSrc ? (
                  <Image 
                    src={imageSrc}
                    alt={title}
                    width={192}
                    height={288}
                    className="object-cover w-full h-full"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    {type === 'channel' ? (
                      <Tv className="w-12 h-12 text-zinc-600" />
                    ) : (
                      <Film className="w-12 h-12 text-zinc-600" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  <span className="px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300">
                    {type === 'channel' ? 'Live Channel' : type === 'movie' ? 'Movie' : 'TV Series'}
                  </span>
                  {category && (
                    <span className="px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300">
                      {category}
                    </span>
                  )}
                  {item.rating && (
                    <span className="px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300 flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {item.rating}
                    </span>
                  )}
                  {item.release_date && (
                    <span className="px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.release_date}
                    </span>
                  )}
                  {item.episode_run_time && (
                    <span className="px-2 py-1 bg-zinc-800 rounded-md text-xs text-zinc-300 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.episode_run_time} min
                    </span>
                  )}
                </div>
                
                <p className="text-zinc-300 text-sm md:text-base mb-6">{description}</p>
                
                {/* Action buttons */}
                {type !== 'series' && streamUrl && (
                  <Link 
                    href={`/watch/${type}/${id}`}
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Watch Now
                  </Link>
                )}
              </div>
            </div>
            
            {/* Episodes (for series) */}
            {type === 'series' && item.episodes && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Episodes</h2>
                
                <div className="space-y-4">
                  {Object.entries(item.episodes).map(([season, episodes]: [string, any[]]) => (
                    <div key={season} className="bg-zinc-800 rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">Season {season}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {episodes.map((episode) => (
                          <Link 
                            key={episode.id} 
                            href={`/watch/series/${id}?episode=${episode.id}`}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-zinc-700 transition-colors"
                          >
                            <div className="w-16 h-16 bg-zinc-700 rounded-md flex-shrink-0 flex items-center justify-center">
                              {episode.info?.movie_image ? (
                                <Image 
                                  src={episode.info.movie_image}
                                  alt={`Episode ${episode.episode_num}`}
                                  width={64}
                                  height={64}
                                  className="object-cover rounded-md"
                                />
                              ) : (
                                <span className="text-xl font-bold text-zinc-500">{episode.episode_num}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">Episode {episode.episode_num}</p>
                              <p className="text-sm text-zinc-400 line-clamp-1">{episode.title}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </main>
  );
}