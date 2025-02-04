export interface StreamData {
  id: string;
  songName: string;
  artist: string;
  dateStreamed: Date;
  streamCount: number;
  userId: string;
}

export interface KeyMetrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface RevenueSource {
  source: string;
  amount: number;
  percentage: number;
}

export interface UserGrowthData {
  date: Date;
  totalUsers: number;
  activeUsers: number;
}

export interface TopSong {
  songName: string;
  artist: string;
  streams: number;
} 