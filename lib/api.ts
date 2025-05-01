// API endpoints
const BASE_URL = 'https://clintkz.xyz/player_api.php';
const AUTH_PARAMS = 'username=josemar2024&password=987973496';

// Types
export interface Channel {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string;
  added: string;
  category_id: string;
  category_name: string;
  is_adult: string;
  custom_sid: string;
}

export interface Movie {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  added: string;
  category_id: string;
  category_name: string;
  container_extension: string;
  custom_sid: string;
  direct_source: string;
}

export interface Series {
  num: number;
  name: string;
  series_id: number;
  cover: string;
  plot: string;
  cast: string;
  director: string;
  genre: string;
  release_date: string;
  last_modified: string;
  rating: string;
  rating_5based: number;
  backdrop_path: string;
  youtube_trailer: string;
  episode_run_time: string;
  category_id: string;
}

export interface SeriesInfo {
  info: {
    name: string;
    cover: string;
    plot: string;
    cast: string;
    director: string;
    genre: string;
    release_date: string;
    last_modified: string;
    rating: string;
    rating_5based: number;
    backdrop_path: string;
    youtube_trailer: string;
    episode_run_time: string;
    category_id: string;
  };
  episodes: Record<string, Episode[]>;
}

export interface Episode {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: {
    movie_image: string;
    plot: string;
    releasedate: string;
    duration: string;
  };
}

export interface EPGEntry {
  id: string;
  channel_id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  start_timestamp: number;
  stop_timestamp: number;
}

// API functions with ISR caching
export async function getLiveStreams(): Promise<Channel[]> {
  try {
    const response = await fetch(`${BASE_URL}?${AUTH_PARAMS}&action=get_live_streams`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch live streams');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching live streams:', error);
    return [];
  }
}

export async function getVodStreams(): Promise<Movie[]> {
  try {
    const response = await fetch(`${BASE_URL}?${AUTH_PARAMS}&action=get_vod_streams`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch VOD streams');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching VOD streams:', error);
    return [];
  }
}

export async function getSeries(): Promise<Series[]> {
  try {
    const response = await fetch(`${BASE_URL}?${AUTH_PARAMS}&action=get_series`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch series');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
}

export async function getSeriesInfo(seriesId: number): Promise<SeriesInfo | null> {
  try {
    const response = await fetch(`${BASE_URL}?${AUTH_PARAMS}&action=get_series_info&series_id=${seriesId}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch series info');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching series info for ID ${seriesId}:`, error);
    return null;
  }
}

export async function getEPG(): Promise<EPGEntry[]> {
  try {
    const response = await fetch(`${BASE_URL}?${AUTH_PARAMS}&action=get_simple_data_table&stream_id=ALL`, {
      next: { revalidate: 900 } // Cache for 15 minutes for more up-to-date game info
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch EPG data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching EPG data:', error);
    return [];
  }
}

export function getStreamUrl(streamId: number, streamType: 'live' | 'movie' | 'series', episodeId?: string): string {
  if (streamType === 'live') {
    return `https://clintkz.xyz/${AUTH_PARAMS}&action=get_live_streams&stream_id=${streamId}`;
  } else if (streamType === 'movie') {
    return `https://clintkz.xyz/${AUTH_PARAMS}&action=get_vod_streams&stream_id=${streamId}`;
  } else {
    return `https://clintkz.xyz/${AUTH_PARAMS}&action=get_series_info&series_id=${streamId}&episode_id=${episodeId}`;
  }
}