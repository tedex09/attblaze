"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Loading from '@/components/loading';

interface WatchPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function WatchPage({ params }: WatchPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { type, id } = params;
  const episodeId = searchParams.get('episode');
  
  const [streamUrl, setStreamUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function getStreamUrl() {
      setIsLoading(true);
      setError(null);
      
      try {
        const baseUrl = 'https://clintkz.xyz/player_api.php';
        const authParams = 'username=josemar2024&password=987973496';
        let url = '';
        
        if (type === 'channel') {
          url = `${baseUrl}?${authParams}&action=get_live_streams&stream_id=${id}`;
        } else if (type === 'movie') {
          url = `${baseUrl}?${authParams}&action=get_vod_streams&stream_id=${id}`;
        } else if (type === 'series' && episodeId) {
          url = `${baseUrl}?${authParams}&action=get_series_info&series_id=${id}&episode_id=${episodeId}`;
        } else {
          throw new Error('Invalid content type or missing episode ID for series');
        }
        
        // In a real app, you'd make a proper API call to get the actual streaming URL
        // For this example, we'll use a placeholder URL
        const streamingUrl = `https://clintkz.xyz/streaming/${type}/${id}${episodeId ? `/${episodeId}` : ''}`;
        setStreamUrl(streamingUrl);
      } catch (err) {
        setError('Failed to load stream URL');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    getStreamUrl();
  }, [type, id, episodeId]);
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (error) {
    return (
      <div className="fixed inset-0 bg-zinc-900 flex flex-col items-center justify-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="p-4">
        <button
          onClick={() => router.back()}
          className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-md transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full max-w-5xl mx-auto">
          {/* Video player */}
          <div className="relative w-full h-0 pb-[56.25%]">
            {/* In a real app, you would use the actual stream URL */}
            <video
              className="absolute top-0 left-0 w-full h-full"
              controls
              autoPlay
              playsInline
              src={streamUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}