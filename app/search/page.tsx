import SearchClient from '../../components/SearchClient/SearchClient'
import { searchTracks, searchAlbums } from '@/lib/lastfm'

export default async function SearchPage() {
  const initialQuery = 'The Way I Am'

  const { tracks: initialTracks } = await searchTracks(initialQuery, 1)
  const { albums: initialAlbums } = await searchAlbums(initialQuery, 1)

  return (
    <SearchClient
      initialQuery={initialQuery}
      initialTracks={initialTracks}
      initialAlbums={initialAlbums}
    />
  )
}
