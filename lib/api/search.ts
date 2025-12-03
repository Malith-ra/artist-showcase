import {
  LastFMTrackSearchResponse,
  LastFMAlbumSearchResponse,
  LastFMSearchTrack,
  LastFMSearchAlbum,
} from '@/types/album'
import {
  LASTFM_BASE_URL,
  LASTFM_API_KEY,
  API_LIMITS,
} from '@/lib/constants/api'

export async function searchTracks(
  query: string,
  page: number = 1,
): Promise<{ tracks: LastFMSearchTrack[]; totalPages: number }> {
  const limit = API_LIMITS.SEARCH
  const url = `${LASTFM_BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&limit=${limit}&page=${page}&api_key=${LASTFM_API_KEY}&format=json`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to search tracks')
  }

  const data: LastFMTrackSearchResponse = await res.json()
  const totalResults = Number.parseInt(
    data.results['@attr']?.totalResults || '0',
  )
  const totalPages = Math.ceil(totalResults / limit)

  return {
    tracks: data.results.trackmatches?.track || [],
    totalPages,
  }
}

export async function searchAlbums(
  query: string,
  page: number = 1,
): Promise<{ albums: LastFMSearchAlbum[]; totalPages: number }> {
  const limit = API_LIMITS.SEARCH
  const url = `${LASTFM_BASE_URL}?method=album.search&album=${encodeURIComponent(query)}&limit=${limit}&page=${page}&api_key=${LASTFM_API_KEY}&format=json`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to search albums')
  }

  const data: LastFMAlbumSearchResponse = await res.json()
  const totalResults = Number.parseInt(
    data.results['@attr']?.totalResults || '0',
  )
  const totalPages = Math.ceil(totalResults / limit)

  return {
    albums: data.results.albummatches?.album || [],
    totalPages,
  }
}
