'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Center, Container, Heading, Spinner, VStack } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import SearchBar from '../SearchBar/SearchBar'
import SortBar from '../SortBar/SortBar'
import AlbumList from '../AlbumList/AlbumList'
import { getAlbumsByArtist } from '@/lib/lastfm'
import { LastFMAlbum } from '@/types/album'

interface AlbumsClientProps {
  initialAlbums: LastFMAlbum[]
  initialTotalPages: number
}

export default function AlbumsClient({
  initialAlbums,
  initialTotalPages,
}: Readonly<AlbumsClientProps>) {
  const [artist, setArtist] = useState<string>('Eminem')
  const [albums, setAlbums] = useState<LastFMAlbum[]>(initialAlbums)
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(initialTotalPages > 1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const isInitialMount = useRef(true)

  // Typed debounce function
  const debouncedFetch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) return

        setLoading(true)
        setPage(1)

        try {
          const { albums: data, totalPages } = await getAlbumsByArtist(value, 1)
          setAlbums(data)
          setHasMore(totalPages > 1)
        } catch (err) {
          console.error(err)
        }

        setLoading(false)
      }, 2000),
    [],
  )

  // Load more function
  const loadMore = async () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const { albums: newAlbums, totalPages } = await getAlbumsByArtist(
        artist,
        nextPage,
      )
      setAlbums((prev) => [...prev, ...newAlbums])
      setPage(nextPage)
      setHasMore(nextPage < totalPages)
    } catch (err) {
      console.error(err)
    }
    setLoadingMore(false)
  }

  // Trigger on artist change (skip initial render since we have SSR data)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    debouncedFetch(artist)
  }, [artist, debouncedFetch])

  // Cleanup
  useEffect(() => {
    return () => debouncedFetch.cancel()
  }, [debouncedFetch])

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>Albums</Heading>

      <VStack align="stretch" gap={6}>
        <SearchBar value={artist} onChange={setArtist} />
        <SortBar />
      </VStack>

      {loading ? (
        <Center mt={10}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <AlbumList
          albums={albums}
          onLoadMore={loadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      )}
    </Container>
  )
}
