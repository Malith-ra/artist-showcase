'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Container,
  Heading,
  VStack,
  Input,
  Tabs,
  Center,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { searchTracks, searchAlbums } from '@/lib/lastfm'
import { LastFMSearchTrack, LastFMSearchAlbum } from '@/types/album'
import TrackList from './TrackList'
import AlbumSearchList from './AlbumSearchList'

export default function SearchClient() {
  const [query, setQuery] = useState('The Way I Am')
  const [searchType, setSearchType] = useState<'tracks' | 'albums'>('tracks')
  const [tracks, setTracks] = useState<LastFMSearchTrack[]>([])
  const [albums, setAlbums] = useState<LastFMSearchAlbum[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const performSearch = async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) {
      setTracks([])
      setAlbums([])
      return
    }

    if (pageNum === 1) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      if (searchType === 'tracks') {
        const { tracks: newTracks, totalPages } = await searchTracks(
          searchQuery,
          pageNum,
        )
        if (pageNum === 1) {
          setTracks(newTracks)
        } else {
          setTracks((prev) => [...prev, ...newTracks])
        }
        setHasMore(pageNum < totalPages)
      } else {
        const { albums: newAlbums, totalPages } = await searchAlbums(
          searchQuery,
          pageNum,
        )
        if (pageNum === 1) {
          setAlbums(newAlbums)
        } else {
          setAlbums((prev) => [...prev, ...newAlbums])
        }
        setHasMore(pageNum < totalPages)
      }
      setPage(pageNum)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Debounced search
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      if (query) {
        setPage(1)
        performSearch(query, 1)
      }
    }, 600)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query, searchType])

  const loadMore = () => {
    performSearch(query, page + 1)
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>Search Music</Heading>

      <VStack align="stretch" gap={6}>
        <Input
          placeholder="Search for tracks or albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          bg="white"
          borderRadius="md"
        />

        <Tabs.Root
          value={searchType}
          onValueChange={(e) => {
            setSearchType(e.value as 'tracks' | 'albums')
            setPage(1)
          }}
          variant="enclosed"
        >
          <Tabs.List>
            <Tabs.Trigger value="tracks">Tracks</Tabs.Trigger>
            <Tabs.Trigger value="albums">Albums</Tabs.Trigger>
          </Tabs.List>

          {/* Extracted tracks tab content logic into a variable */}
          {(() => {
            let tracksContent
            if (loading) {
              tracksContent = (
                <Center mt={10}>
                  <Spinner size="xl" />
                </Center>
              )
            } else if (tracks.length > 0) {
              tracksContent = (
                <TrackList
                  tracks={tracks}
                  onLoadMore={loadMore}
                  hasMore={hasMore}
                  loadingMore={loadingMore}
                />
              )
            } else if (query) {
              tracksContent = (
                <Center mt={10}>
                  <Text color="gray.500">No tracks found</Text>
                </Center>
              )
            } else {
              tracksContent = (
                <Center mt={10}>
                  <Text color="gray.500">
                    Start typing to search for tracks
                  </Text>
                </Center>
              )
            }
            return <Tabs.Content value="tracks">{tracksContent}</Tabs.Content>
          })()}

          {/* Extracted albums tab content logic into a variable */}
          {(() => {
            let albumsContent
            if (loading) {
              albumsContent = (
                <Center mt={10}>
                  <Spinner size="xl" />
                </Center>
              )
            } else if (albums.length > 0) {
              albumsContent = (
                <AlbumSearchList
                  albums={albums}
                  onLoadMore={loadMore}
                  hasMore={hasMore}
                  loadingMore={loadingMore}
                />
              )
            } else if (query) {
              albumsContent = (
                <Center mt={10}>
                  <Text color="gray.500">No albums found</Text>
                </Center>
              )
            } else {
              albumsContent = (
                <Center mt={10}>
                  <Text color="gray.500">
                    Start typing to search for albums
                  </Text>
                </Center>
              )
            }
            return <Tabs.Content value="albums">{albumsContent}</Tabs.Content>
          })()}
        </Tabs.Root>
      </VStack>
    </Container>
  )
}
