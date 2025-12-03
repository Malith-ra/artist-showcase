import { useQuery } from '@tanstack/react-query'
import { getAlbumsByArtist, getAlbumInfo } from '@/lib/api/albums'
import { searchTracks, searchAlbums } from '@/lib/api/search'

// Query keys factory
export const albumKeys = {
  all: ['albums'] as const,
  byArtist: (artist: string, page: number) =>
    [...albumKeys.all, 'artist', artist, page] as const,
  info: (artist: string, album: string) =>
    [...albumKeys.all, 'info', artist, album] as const,
}

export const searchKeys = {
  all: ['search'] as const,
  tracks: (query: string, page: number) =>
    [...searchKeys.all, 'tracks', query, page] as const,
  albums: (query: string, page: number) =>
    [...searchKeys.all, 'albums', query, page] as const,
}

// Albums hooks
export function useAlbumsByArtist(artist: string, page: number = 1) {
  return useQuery({
    queryKey: albumKeys.byArtist(artist, page),
    queryFn: () => getAlbumsByArtist(artist, page),
    enabled: !!artist,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useAlbumInfo(artist: string, album: string) {
  return useQuery({
    queryKey: albumKeys.info(artist, album),
    queryFn: () => getAlbumInfo(artist, album),
    enabled: !!artist && !!album,
    staleTime: 10 * 60 * 1000, // 10 minutes (album info rarely changes)
  })
}

// Search hooks
export function useSearchTracks(query: string, page: number = 1) {
  return useQuery({
    queryKey: searchKeys.tracks(query, page),
    queryFn: () => searchTracks(query, page),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useSearchAlbums(query: string, page: number = 1) {
  return useQuery({
    queryKey: searchKeys.albums(query, page),
    queryFn: () => searchAlbums(query, page),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}
