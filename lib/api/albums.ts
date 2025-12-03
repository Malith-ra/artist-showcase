import { LastFMTopAlbumsResponse, LastFMAlbum } from '@/types/album'
import { API_LIMITS } from '@/lib/constants/api'
import axiosInstance from '@/lib/axios'

export async function getAlbumsByArtist(
  artist: string,
  page: number = 1,
): Promise<{ albums: LastFMAlbum[]; totalPages: number }> {
  const limit = API_LIMITS.ALBUMS

  const { data } = await axiosInstance.get<LastFMTopAlbumsResponse>('', {
    params: {
      method: 'artist.gettopalbums',
      artist: artist,
      limit: limit,
      page: page,
    },
  })

  const totalPages = Math.ceil(
    Number.parseInt(data.topalbums['@attr']?.total || '0') / limit,
  )

  return {
    albums: data.topalbums.album || [],
    totalPages,
  }
}

export async function getAlbumInfo(artist: string, album: string) {
  const { data } = await axiosInstance.get('', {
    params: {
      method: 'album.getinfo',
      artist: artist,
      album: album,
      autocorrect: 1,
    },
  })

  if (!data.album || Object.keys(data.album).length === 0) {
    return null
  }

  return data.album
}
