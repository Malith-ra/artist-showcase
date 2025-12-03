import { LastFMTopAlbumsResponse, LastFMAlbum } from '@/types/album'
import {
  LASTFM_BASE_URL,
  LASTFM_API_KEY,
  API_LIMITS,
} from '@/lib/constants/api'

export async function getAlbumsByArtist(
  artist: string,
  page: number = 1,
): Promise<{ albums: LastFMAlbum[]; totalPages: number }> {
  const limit = API_LIMITS.ALBUMS
  const url = `${LASTFM_BASE_URL}?method=artist.gettopalbums&artist=${encodeURIComponent(artist)}&limit=${limit}&page=${page}&api_key=${LASTFM_API_KEY}&format=json`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch albums')
  }

  const data: LastFMTopAlbumsResponse = await res.json()
  const totalPages = Math.ceil(
    Number.parseInt(data.topalbums['@attr']?.total || '0') / limit,
  )

  return {
    albums: data.topalbums.album || [],
    totalPages,
  }
}

export async function getAlbumInfo(artist: string, album: string) {
  const encodedArtist = encodeURIComponent(artist)
  const encodedAlbum = encodeURIComponent(album)

  const res = await fetch(
    `${LASTFM_BASE_URL}?method=album.getinfo&artist=${encodedArtist}&album=${encodedAlbum}&autocorrect=1&api_key=${LASTFM_API_KEY}&format=json`,
    { cache: 'force-cache' },
  )

  const data = await res.json()

  if (!data.album || Object.keys(data.album).length === 0) {
    return null
  }

  return data.album
}
