import { getAlbumsByArtist } from '@/lib/lastfm'
import AlbumsClient from './AlbumsClient'
import { LastFMAlbum } from '@/types/album'

export default async function AlbumsPage() {
  const initialAlbums: LastFMAlbum[] = await getAlbumsByArtist('Eminem')

  return <AlbumsClient initialAlbums={initialAlbums} />
}
