export interface UserGrowthData {
  date: string
  totalUsers: number
  activeUsers: number
}

export interface RevenueSource {
  source: string
  amount: number
  percentage: number
}

export interface TopSong {
  songName: string
  artist: string
  streams: number
}

export interface Stream {
  id: string
  songName: string
  artist: string
  dateStreamed: Date
  streamCount: number
  userId: string
}

export interface KeyMetrics {
  totalUsers: number
  activeUsers: number
  totalStreams: number
  revenue: number
  topArtist: string
} 