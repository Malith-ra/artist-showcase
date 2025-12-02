'use client'

import { LastFMAlbum } from '@/types/album'
import { useAlbumStore } from '@/store/albumStore'
import AlbumCard from './AlbumCard'
import { SimpleGrid } from '@chakra-ui/react'

export default function AlbumList({
  albums,
}: Readonly<{ albums: LastFMAlbum[] }>) {
  const sortBy = useAlbumStore((s) => s.sortBy)

  const sorted = [...albums].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'year') return 0 // topalbums has no year
    return 0
  })

  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={6} mt={4}>
      {sorted.map((album) => (
        <AlbumCard key={album.mbid || album.url} album={album} />
      ))}
    </SimpleGrid>
  )
}
