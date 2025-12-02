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
}
