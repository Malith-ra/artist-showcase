'use client'

import { useState, useEffect, useMemo } from 'react'
import debounce from 'lodash.debounce'
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
import { useSearchTracks, useSearchAlbums } from '@/hooks/useApi'
import { LastFMSearchTrack, LastFMSearchAlbum } from '@/types/album'
import TrackList from '../TrackList/TrackList'
import AlbumSearchList from '../AlbumSearchList/AlbumSearchList'

export default function SearchClient({
  initialQuery,
  initialTracks,
  initialAlbums,
}: Readonly<{
  initialQuery: string
  initialTracks: LastFMSearchTrack[]
  initialAlbums: LastFMSearchAlbum[]
}>) {
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState<'tracks' | 'albums'>('tracks')
  const [page, setPage] = useState(1)

  // React Query hooks
  const {
    data: tracksData,
    isLoading: isLoadingTracks,
    isFetching: isFetchingTracks,
  } = useSearchTracks(debouncedQuery, searchType === 'tracks' ? page : 1)

  const {
    data: albumsData,
    isLoading: isLoadingAlbums,
    isFetching: isFetchingAlbums,
  } = useSearchAlbums(debouncedQuery, searchType === 'albums' ? page : 1)

  // Use initial data or fetched data
  const tracks = tracksData?.tracks || (page === 1 ? initialTracks : [])
  const albums = albumsData?.albums || (page === 1 ? initialAlbums : [])
  const hasMoreTracks = tracksData ? page < tracksData.totalPages : false
  const hasMoreAlbums = albumsData ? page < albumsData.totalPages : false

  const debouncedSearch = useMemo(
    () =>
      debounce((searchQuery: string) => {
        setDebouncedQuery(searchQuery)
        setPage(1)
      }, 1500),
    [],
  )

  useEffect(() => {
    if (query !== debouncedQuery) {
      debouncedSearch(query)
    }
  }, [query, debouncedQuery, debouncedSearch])

  const loadMore = () => setPage((prev) => prev + 1)

  const loading = searchType === 'tracks' ? isLoadingTracks : isLoadingAlbums
  const loadingMore =
    searchType === 'tracks' ? isFetchingTracks : isFetchingAlbums
  const hasMore = searchType === 'tracks' ? hasMoreTracks : hasMoreAlbums

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
            const newType = e.value as 'tracks' | 'albums'
            setSearchType(newType)
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
