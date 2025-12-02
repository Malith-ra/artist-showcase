import { LastFMTopAlbumsResponse, LastFMAlbum } from '@/types/album'

const API_KEY = 'd732731be2f5f0ec4b10e5a3607d7090'

export async function getAlbumsByArtist(
  artist: string,
): Promise<LastFMAlbum[]> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&limit=50&api_key=${API_KEY}&format=json`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch albums')
  }

  const data: LastFMTopAlbumsResponse = await res.json()
  return data.topalbums.album.slice(0, 50) // ensure 50 items
}

export async function getAlbumInfo(artist: string, album: string) {
  const encodedArtist = encodeURIComponent(artist)
  const encodedAlbum = encodeURIComponent(album)

  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodedArtist}&album=${encodedAlbum}&autocorrect=1&api_key=${API_KEY}&format=json`,
    { cache: 'force-cache' },
  )

  const data = await res.json()

  // Sometimes API returns: { album: {} }
  if (!data.album || Object.keys(data.album).length === 0) {
    return null
  }

  return data.album
}
