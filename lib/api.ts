import axios from 'axios';

// API endpoints
const BASE_URL = 'https://clintkz.xyz/player_api.php';

// API parameters
const API_PARAMS = {
  username: 'josemar2024',
  password: '987973496'
};

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

// API functions
export async function getLiveStreams(): Promise<Channel[]> {
  const { data } = await axios.get(BASE_URL, {
    params: {
      ...API_PARAMS,
      action: 'get_live_streams'
    }
  });
  return data;
}

export async function getVodStreams(): Promise<Movie[]> {
  const { data } = await axios.get(BASE_URL, {
    params: {
      ...API_PARAMS,
      action: 'get_vod_streams'
    }
  });
  return data;
}

export async function getSeries(): Promise<Series[]> {
  const { data } = await axios.get(BASE_URL, {
    params: {
      ...API_PARAMS,
      action: 'get_series'
    }
  });
  return data;
}

export async function getSeriesInfo(seriesId: number): Promise<SeriesInfo> {
  const { data } = await axios.get(BASE_URL, {
    params: {
      ...API_PARAMS,
      action: 'get_series_info',
      series_id: seriesId
    }
  });
  return data;
}

export async function getEPG(): Promise<EPGEntry[]> {
  const { data } = await axios.get(BASE_URL, {
    params: {
      ...API_PARAMS,
      action: 'get_simple_data_table',
      stream_id: 'ALL'
    }
  });
  return data;
}

export function getStreamUrl(streamId: number, streamType: 'live' | 'movie' | 'series', episodeId?: string): string {
  const params = new URLSearchParams({
    ...API_PARAMS,
    stream_id: streamId.toString()
  });

  if (streamType === 'live') {
    params.append('action', 'get_live_streams');
  } else if (streamType === 'movie') {
    params.append('action', 'get_vod_streams');
  } else {
    params.append('action', 'get_series_info');
    if (episodeId) {
      params.append('episode_id', episodeId);
    }
  }

  return `${BASE_URL}?${params.toString()}`;
}