export const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
export const LASTFM_API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY

export const API_LIMITS = {
  ALBUMS: 50,
  SEARCH: 30,
} as const
