import {
  LastFMTrackSearchResponse,
  LastFMAlbumSearchResponse,
  LastFMSearchTrack,
  LastFMSearchAlbum,
} from '@/types/album'
import { API_LIMITS } from '@/lib/constants/api'
import axiosInstance from '@/lib/axios'

export async function searchTracks(
  query: string,
  page: number = 1,
): Promise<{ tracks: LastFMSearchTrack[]; totalPages: number }> {
  const limit = API_LIMITS.SEARCH

  const { data } = await axiosInstance.get<LastFMTrackSearchResponse>('', {
    params: {
      method: 'track.search',
      track: query,
      limit: limit,
      page: page,
    },
  })

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

  const { data } = await axiosInstance.get<LastFMAlbumSearchResponse>('', {
    params: {
      method: 'album.search',
      album: query,
      limit: limit,
      page: page,
    },
  })

  const totalResults = Number.parseInt(
    data.results['@attr']?.totalResults || '0',
  )
  const totalPages = Math.ceil(totalResults / limit)

  return {
    albums: data.results.albummatches?.album || [],
    totalPages,
  }
}
