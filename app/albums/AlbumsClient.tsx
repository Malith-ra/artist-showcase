'use client'

import { useState, useMemo, useEffect } from 'react'
import { Container, Heading, Spinner, VStack } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import SearchBar from './SearchBar'
import SortBar from './SortBar'
import AlbumList from './AlbumList'
import { getAlbumsByArtist } from '@/lib/lastfm'
import { LastFMAlbum } from '@/types/album'

interface AlbumsClientProps {
  initialAlbums: LastFMAlbum[]
}

export default function AlbumsClient({ initialAlbums }: AlbumsClientProps) {
  const [artist, setArtist] = useState<string>('Eminem')
  const [albums, setAlbums] = useState<LastFMAlbum[]>(initialAlbums)
  const [loading, setLoading] = useState<boolean>(false)

  // Typed debounce function
  const debouncedFetch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) return

        setLoading(true)

        try {
          const data: LastFMAlbum[] = await getAlbumsByArtist(value)
          setAlbums(data)
        } catch (err) {
          console.error(err)
        }

        setLoading(false)
      }, 600),
    [],
  )

  // Trigger on artist change
  useEffect(() => {
    if (artist !== 'Eminem') {
      debouncedFetch(artist)
    }
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

      {loading ? <Spinner size="xl" mt={10} /> : <AlbumList albums={albums} />}
    </Container>
  )
}
