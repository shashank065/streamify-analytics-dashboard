import { create } from 'zustand';
import { KeyMetrics, RevenueSource, StreamData, TopSong, UserGrowthData } from '../types';

interface DashboardStore {
  // Key Metrics
  keyMetrics: KeyMetrics;
  setKeyMetrics: (metrics: KeyMetrics) => void;

  // Revenue Sources
  revenueSources: RevenueSource[];
  setRevenueSources: (sources: RevenueSource[]) => void;

  // User Growth Data
  userGrowthData: UserGrowthData[];
  setUserGrowthData: (data: UserGrowthData[]) => void;

  // Top Songs
  topSongs: TopSong[];
  setTopSongs: (songs: TopSong[]) => void;

  // Recent Streams
  recentStreams: StreamData[];
  setRecentStreams: (streams: StreamData[]) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  keyMetrics: {
    totalUsers: 0,
    activeUsers: 0,
    totalStreams: 0,
    revenue: 0,
    topArtist: '',
  },
  setKeyMetrics: (metrics) => set({ keyMetrics: metrics }),

  revenueSources: [],
  setRevenueSources: (sources) => set({ revenueSources: sources }),

  userGrowthData: [],
  setUserGrowthData: (data) => set({ userGrowthData: data }),

  topSongs: [],
  setTopSongs: (songs) => set({ topSongs: songs }),

  recentStreams: [],
  setRecentStreams: (streams) => set({ recentStreams: streams }),
})); 