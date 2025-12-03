'use client'

import { useEffect, useState, useMemo } from 'react'
import { LastFMAlbum } from '@/types/album'
import { useAlbumStore } from '@/store/albumStore'
import AlbumCard from '../AlbumCard/AlbumCard'
import { SimpleGrid, Spinner, Center, Button, VStack } from '@chakra-ui/react'
import { getAlbumInfo } from '@/lib/lastfm'

interface AlbumListProps {
  albums: LastFMAlbum[]
  onLoadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
}

export default function AlbumList({
  albums,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: Readonly<AlbumListProps>) {
  const sortBy = useAlbumStore((s) => s.sortBy)
  const [enrichedAlbums, setEnrichedAlbums] = useState<LastFMAlbum[]>([])
  const [loading, setLoading] = useState(false)

  // Enrich albums with release dates when sorting by year
  useEffect(() => {
    if (sortBy !== 'year') {
      return
    }

    async function enrichAlbums() {
      setLoading(true)
      const enriched = await Promise.all(
        albums.map(async (album) => {
          if (album.releasedate) return album // Already enriched

          const info = await getAlbumInfo(album.artist.name, album.name)
          const releasedate = info?.releasedate || info?.wiki?.published || ''

          return { ...album, releasedate }
        }),
      )
      setEnrichedAlbums(enriched)
      setLoading(false)
    }

    enrichAlbums()
  }, [albums, sortBy])

  const sorted = useMemo(() => {
    const albumsToSort = sortBy === 'year' ? enrichedAlbums : albums

    return [...albumsToSort].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'year') {
        const dateA = a.releasedate || ''
        const dateB = b.releasedate || ''

        // Extract year from date string (format: "31 Dec 2010, 00:00" or similar)
        const yearA = dateA ? new Date(dateA).getFullYear() || 0 : 0
        const yearB = dateB ? new Date(dateB).getFullYear() || 0 : 0

        // Sort newest first, push albums without dates to end
        if (yearA === 0 && yearB === 0) return 0
        if (yearA === 0) return 1
        if (yearB === 0) return -1
        return yearB - yearA
      }
      return 0
    })
  }, [albums, enrichedAlbums, sortBy])

  if (loading && sortBy === 'year') {
    return (
      <Center mt={10}>
        <Spinner size="lg" />
      </Center>
    )
  }

  return (
    <VStack gap={6} align="stretch">
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={6} mt={4}>
        {sorted.map((album) => (
          <AlbumCard key={album.mbid || album.url} album={album} />
        ))}
      </SimpleGrid>

      {hasMore && sorted?.length > 0 && onLoadMore && (
        <Center mt={6}>
          <Button
            onClick={onLoadMore}
            colorScheme="purple"
            size="lg"
            loading={loadingMore}
            loadingText="Loading more..."
          >
            Load More
          </Button>
        </Center>
      )}
    </VStack>
  )
}
