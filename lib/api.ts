import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// API endpoints
const BASE_URL = 'https://clintkz.xyz/player_api.php';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    username: 'josemar2024',
    password: '987973496'
  }
});

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

// API functions with React Query hooks
export function useLiveStreams() {
  return useQuery({
    queryKey: ['live-streams'],
    queryFn: async () => {
      const { data } = await api.get('', { params: { action: 'get_live_streams' } });
      return data as Channel[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useVodStreams() {
  return useQuery({
    queryKey: ['vod-streams'],
    queryFn: async () => {
      const { data } = await api.get('', { params: { action: 'get_vod_streams' } });
      return data as Movie[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useSeries() {
  return useQuery({
    queryKey: ['series'],
    queryFn: async () => {
      const { data } = await api.get('', { params: { action: 'get_series' } });
      return data as Series[];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useSeriesInfo(seriesId: number) {
  return useQuery({
    queryKey: ['series-info', seriesId],
    queryFn: async () => {
      const { data } = await api.get('', {
        params: {
          action: 'get_series_info',
          series_id: seriesId
        }
      });
      return data as SeriesInfo;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!seriesId,
  });
}

export function useEPG() {
  return useQuery({
    queryKey: ['epg'],
    queryFn: async () => {
      const { data } = await api.get('', {
        params: {
          action: 'get_simple_data_table',
          stream_id: 'ALL'
        }
      });
      return data as EPGEntry[];
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function getStreamUrl(streamId: number, streamType: 'live' | 'movie' | 'series', episodeId?: string): string {
  const baseUrl = 'https://clintkz.xyz/';
  const params = new URLSearchParams({
    username: 'josemar2024',
    password: '987973496'
  });

  if (streamType === 'live') {
    params.append('action', 'get_live_streams');
    params.append('stream_id', streamId.toString());
  } else if (streamType === 'movie') {
    params.append('action', 'get_vod_streams');
    params.append('stream_id', streamId.toString());
  } else {
    params.append('action', 'get_series_info');
    params.append('series_id', streamId.toString());
    if (episodeId) {
      params.append('episode_id', episodeId);
    }
  }

  return `${baseUrl}?${params.toString()}`;
}