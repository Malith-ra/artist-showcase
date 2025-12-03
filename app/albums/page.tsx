import { getAlbumsByArtist } from '@/lib/lastfm'
import AlbumsClient from '../../components/AlbumsClient/AlbumsClient'

export default async function AlbumsPage() {
  const { albums: initialAlbums, totalPages: initialTotalPages } =
    await getAlbumsByArtist('Eminem', 1)

  return (
    <AlbumsClient
      initialAlbums={initialAlbums}
      initialTotalPages={initialTotalPages}
    />
  )
}
