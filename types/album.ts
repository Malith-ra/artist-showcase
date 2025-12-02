export interface LastFMArtist {
  name: string
  mbid: string
  url: string
}

export interface LastFMImage {
  '#text': string
  size: 'small' | 'medium' | 'large' | 'extralarge'
}

export interface AlbumAttributes {
  rank: string
}

export interface LastFMTopAlbumsResponse {
  topalbums: {
    album: LastFMAlbum[]
    '@attr'?: {
      page: string
      perPage: string
      total: string
      totalPages: string
    }
  }
}

export interface LastFMRank {
  rank: string
}

export interface LastFMArtistInfo {
  name: string
  mbid?: string
  url?: string
}

export interface LastFMAlbum {
  name: string
  playcount: string
  mbid?: string
  url: string
  artist: LastFMArtistInfo
  image: LastFMImage[]
  ['@attr']?: LastFMRank
  releasedate?: string // Added for client-side enrichment
}

export interface LastFMTrack {
  name: string
  duration?: string
  url?: string
}

export interface LastFMAlbumInfo {
  name: string
  artist: string
  listeners: string
  playcount: string
  image?: Array<{ '#text': string; size: string }>
  tracks?: { track: LastFMTrack[] }
  wiki?: { summary: string }
}

export interface LastFMSearchTrack {
  name: string
  artist: string
  url: string
  listeners: string
  image: LastFMImage[]
  mbid?: string
}

export interface LastFMSearchAlbum {
  name: string
  artist: string
  url: string
  image: LastFMImage[]
  mbid?: string
  streamable?: string
}

export interface LastFMTrackSearchResponse {
  results: {
    trackmatches: {
      track: LastFMSearchTrack[]
    }
    '@attr': {
      for: string
      page: string
      perPage: string
      totalResults: string
      total: string
    }
  }
}

export interface LastFMAlbumSearchResponse {
  results: {
    albummatches: {
      album: LastFMSearchAlbum[]
    }
    '@attr': {
      for: string
      page: string
      perPage: string
      totalResults: string
      total: string
    }
  }
}
