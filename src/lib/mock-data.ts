import { faker } from '@faker-js/faker'
import { format } from 'date-fns'

export const generateMockData = () => {
  // Generate mock artists
  const artists = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    monthlyStreams: faker.number.int({ min: 100000, max: 10000000 })
  }))

  // Generate mock songs
  const songs = Array.from({ length: 100 }, () => {
    const artist = faker.helpers.arrayElement(artists)
    return {
      id: faker.string.uuid(),
      name: faker.music.songName(),
      artist: artist.name,
      streams: faker.number.int({ min: 10000, max: 1000000 })
    }
  })

  // Generate mock users
  const users = Array.from({ length: 1000 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    lastActive: faker.date.recent({ days: 30 })
  }))

  // Generate mock streams
  const streams = Array.from({ length: 500 }, () => {
    const song = faker.helpers.arrayElement(songs)
    return {
      id: faker.string.uuid(),
      songName: song.name,
      artist: song.artist,
      dateStreamed: faker.date.recent({ days: 30 }),
      streamCount: faker.number.int({ min: 1, max: 1000 }),
      userId: faker.helpers.arrayElement(users).id
    }
  })

  // Calculate metrics
  const activeUsers = users.filter(user => 
    new Date(user.lastActive) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length

  const totalStreams = streams.reduce((acc, curr) => acc + curr.streamCount, 0)

  const topArtist = artists.reduce((prev, current) => 
    prev.monthlyStreams > current.monthlyStreams ? prev : current
  )

  return {
    metrics: {
      totalUsers: users.length,
      activeUsers,
      totalStreams,
      revenue: faker.number.int({ min: 1000000, max: 5000000 }),
      topArtist: topArtist.name
    },
    revenueSources: [
      { 
        source: 'Subscriptions', 
        amount: faker.number.int({ min: 800000, max: 4000000 }), 
        percentage: 80 
      },
      { 
        source: 'Advertisements', 
        amount: faker.number.int({ min: 200000, max: 1000000 }), 
        percentage: 20 
      }
    ],
    userGrowthData: Array.from({ length: 12 }, (_, i) => ({
      date: format(new Date(2024, i, 1), 'yyyy-MM-dd'),
      totalUsers: faker.number.int({ min: 800000, max: 1000000 }),
      activeUsers: faker.number.int({ min: 600000, max: 800000 })
    })),
    topSongs: songs
      .sort((a, b) => b.streams - a.streams)
      .slice(0, 5)
      .map(song => ({
        songName: song.name,
        artist: song.artist,
        streams: song.streams
      })),
    recentStreams: streams.sort((a, b) => 
      new Date(b.dateStreamed).getTime() - new Date(a.dateStreamed).getTime()
    )
  }
} 