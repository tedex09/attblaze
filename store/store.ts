import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Channel, Movie, Series, SeriesInfo, getLiveStreams, getVodStreams, getSeries, getSeriesInfo } from '@/lib/api';

interface AppState {
  channels: Channel[];
  movies: Movie[];
  seriesList: Series[];
  selectedSeriesInfo: SeriesInfo | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchChannels: () => Promise<void>;
  fetchMovies: () => Promise<void>;
  fetchSeries: () => Promise<void>;
  fetchSeriesInfo: (seriesId: number) => Promise<void>;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      channels: [],
      movies: [],
      seriesList: [],
      selectedSeriesInfo: null,
      isLoading: false,
      error: null,
      
      fetchChannels: async () => {
        set({ isLoading: true, error: null });
        try {
          const channels = await getLiveStreams();
          set({ channels, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch channels', isLoading: false });
        }
      },
      
      fetchMovies: async () => {
        set({ isLoading: true, error: null });
        try {
          const movies = await getVodStreams();
          set({ movies, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch movies', isLoading: false });
        }
      },
      
      fetchSeries: async () => {
        set({ isLoading: true, error: null });
        try {
          const seriesList = await getSeries();
          set({ seriesList, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch series', isLoading: false });
        }
      },
      
      fetchSeriesInfo: async (seriesId: number) => {
        set({ isLoading: true, error: null });
        try {
          const seriesInfo = await getSeriesInfo(seriesId);
          set({ selectedSeriesInfo: seriesInfo, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch series info', isLoading: false });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'iptv-app-storage',
    }
  )
);