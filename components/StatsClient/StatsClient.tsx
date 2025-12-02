'use client'

import { getAlbumInfo } from '@/lib/lastfm'
import { LastFMAlbumInfo } from '@/types/album'
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import PlayCountGraph from '../PlayCountGraph/PlayCountGraph'

export default function StatsClient() {
  const [artist, setArtist] = useState('Eminem')
  const [albumName, setAlbumName] = useState('The Way I Am')
  const [albumInfo, setAlbumInfo] = useState<LastFMAlbumInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!artist.trim() || !albumName.trim()) {
      setError('Please enter both artist and album name')
      return
    }

    setLoading(true)
    setError('')
    setAlbumInfo(null)

    try {
      const info = await getAlbumInfo(artist, albumName)
      if (info) {
        setAlbumInfo(info)
      } else {
        setError('Album not found. Please check the artist and album name.')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch album information')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const coverImage =
    albumInfo?.image?.find((img) => img.size === 'extralarge')?.['#text'] || ''

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>Album Play Count Statistics</Heading>

      <VStack align="stretch" gap={6}>
        {/* Search Section */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
          <VStack gap={4}>
            <HStack gap={4} w="full">
              <Input
                placeholder="Artist name..."
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                onKeyPress={handleKeyPress}
                size="lg"
              />
              <Input
                placeholder="Album name..."
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                onKeyPress={handleKeyPress}
                size="lg"
              />
              <Button
                onClick={handleSearch}
                colorScheme="purple"
                size="lg"
                minW="120px"
                loading={loading}
              >
                <LuSearch size={20} />
                Search
              </Button>
            </HStack>

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
          </VStack>
        </Box>

        {/* Loading State */}
        {loading && (
          <Center py={20}>
            <Spinner size="xl" color="purple.500" />
          </Center>
        )}

        {/* Album Details and Graph */}
        {albumInfo && !loading && (
          <VStack align="stretch" gap={6}>
            {/* Album Header */}
            <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
              <HStack gap={6} align="start">
                <AspectRatio ratio={1} w="200px">
                  <Image
                    src={coverImage}
                    alt={albumInfo.name}
                    borderRadius="md"
                    objectFit="cover"
                  />
                </AspectRatio>

                <VStack align="start" flex={1} gap={2}>
                  <Heading size="xl">{albumInfo.name}</Heading>
                  <Text fontSize="lg" color="gray.600">
                    by {albumInfo.artist}
                  </Text>

                  <HStack gap={8} mt={4}>
                    <VStack align="start" gap={0}>
                      <Text fontSize="sm" color="gray.500">
                        Listeners
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">
                        {Number.parseInt(albumInfo.listeners).toLocaleString()}
                      </Text>
                    </VStack>
                    <VStack align="start" gap={0}>
                      <Text fontSize="sm" color="gray.500">
                        Total Plays
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">
                        {Number.parseInt(albumInfo.playcount).toLocaleString()}
                      </Text>
                    </VStack>
                    {albumInfo.tracks?.track && (
                      <VStack align="start" gap={0}>
                        <Text fontSize="sm" color="gray.500">
                          Tracks
                        </Text>
                        <Text fontWeight="bold" fontSize="lg">
                          {albumInfo.tracks.track.length}
                        </Text>
                      </VStack>
                    )}
                  </HStack>
                </VStack>
              </HStack>
            </Box>

            {/* Play Count Graph */}
            {albumInfo.tracks?.track && albumInfo.tracks.track.length > 0 && (
              <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
                <Heading size="lg" mb={6}>
                  Track Play Counts
                </Heading>
                <PlayCountGraph tracks={albumInfo.tracks.track} />
              </Box>
            )}

            {/* Track Details Table */}
            {albumInfo.tracks?.track && albumInfo.tracks.track.length > 0 && (
              <Box bg="white" p={6} borderRadius="lg" borderWidth="1px">
                <Heading size="lg" mb={4}>
                  All Tracks
                </Heading>
                <VStack gap={2} align="stretch">
                  {[...albumInfo.tracks.track]
                    .sort((a, b) => {
                      const aPlaycount = Number.parseInt(
                        (a as { playcount?: string }).playcount || '0',
                      )
                      const bPlaycount = Number.parseInt(
                        (b as { playcount?: string }).playcount || '0',
                      )
                      return bPlaycount - aPlaycount
                    })
                    .map((track, index) => {
                      const playcount = Number.parseInt(
                        (track as { playcount?: string }).playcount || '0',
                      )

                      return (
                        <HStack
                          key={`${track.name}-${index}`}
                          p={3}
                          borderWidth="1px"
                          borderRadius="md"
                          justify="space-between"
                          _hover={{ bg: 'gray.50' }}
                        >
                          <HStack gap={3}>
                            <Text
                              fontWeight="bold"
                              color="gray.400"
                              minW="30px"
                            >
                              #{index + 1}
                            </Text>
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold">{track.name}</Text>
                              {track.duration && (
                                <Text fontSize="sm" color="gray.500">
                                  {Math.floor(
                                    Number.parseInt(track.duration) / 60,
                                  )}
                                  :
                                  {(Number.parseInt(track.duration) % 60)
                                    .toString()
                                    .padStart(2, '0')}
                                </Text>
                              )}
                            </VStack>
                          </HStack>
                          <VStack align="end" gap={0}>
                            <Text fontWeight="bold" fontSize="lg">
                              {playcount > 0
                                ? playcount.toLocaleString()
                                : 'N/A'}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              plays
                            </Text>
                          </VStack>
                        </HStack>
                      )
                    })}
                </VStack>
              </Box>
            )}
          </VStack>
        )}

        {/* Empty State */}
        {!albumInfo && !loading && (
          <Center py={20}>
            <VStack gap={4}>
              <LuSearch size={64} color="gray" />
              <Text fontSize="xl" color="gray.500">
                Search for an album to view statistics
              </Text>
              <Text color="gray.400">
                Enter artist and album name above to see play count graphs
              </Text>
            </VStack>
          </Center>
        )}
      </VStack>
    </Container>
  )
}
