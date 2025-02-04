import { create } from 'zustand'

interface KeyMetrics {
  totalUsers: number
  activeUsers: number
  totalStreams: number
  revenue: number
  topArtist: string
}

interface RevenueSource {
  source: string
  amount: number
  percentage: number
}

interface UserGrowthData {
  date: Date
  totalUsers: number
  activeUsers: number
}

interface TopSong {
  songName: string
  artist: string
  streams: number
}

interface Stream {
  id: string
  songName: string
  artist: string
  dateStreamed: Date
  streamCount: number
  userId: string
}

interface DashboardStore {
  keyMetrics: KeyMetrics
  setKeyMetrics: (metrics: KeyMetrics) => void
  revenueSources: RevenueSource[]
  setRevenueSources: (sources: RevenueSource[]) => void
  userGrowthData: UserGrowthData[]
  setUserGrowthData: (data: UserGrowthData[]) => void
  topSongs: TopSong[]
  setTopSongs: (songs: TopSong[]) => void
  recentStreams: Stream[]
  setRecentStreams: (streams: Stream[] | ((prev: Stream[]) => Stream[])) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  keyMetrics: {
    totalUsers: 0,
    activeUsers: 0,
    totalStreams: 0,
    revenue: 0,
    topArtist: ''
  },
  setKeyMetrics: (metrics) => set({ keyMetrics: metrics }),
  revenueSources: [],
  setRevenueSources: (sources) => set({ revenueSources: sources }),
  userGrowthData: [],
  setUserGrowthData: (data) => set({ userGrowthData: data }),
  topSongs: [],
  setTopSongs: (songs: TopSong[]) => set({ topSongs: songs }),
  recentStreams: [],
  setRecentStreams: (streams: Stream[] | ((prev: Stream[]) => Stream[])) => 
    set((state) => ({ 
      recentStreams: typeof streams === 'function' ? streams(state.recentStreams) : streams 
    }))
}))