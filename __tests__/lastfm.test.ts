import { searchTracks, searchAlbums, getAlbumInfo } from '../lib/lastfm'

// Mock fetch globally
globalThis.fetch = jest.fn()

describe('lastfm API functions', () => {
  const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_LASTFM_API_KEY = 'test-api-key'
  })

  describe('searchTracks', () => {
    it('fetches and returns track search results', async () => {
      const mockResponse = {
        results: {
          trackmatches: {
            track: [
              {
                name: 'Lose Yourself',
                artist: 'Eminem',
                url: 'http://example.com',
                duration: '326',
                listeners: '5000000',
                image: [{ '#text': 'image.jpg', size: 'large' }],
              },
            ],
          },
          '@attr': {
            totalResults: '100',
          },
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await searchTracks('Lose Yourself', 1)

      expect(result.tracks).toHaveLength(1)
      expect(result.tracks[0].name).toBe('Lose Yourself')
      expect(result.totalPages).toBe(4) // 100 / 30 = 3.33 -> 4
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('method=track.search'),
        expect.any(Object),
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('track=Lose'),
        expect.any(Object),
      )
    })

    it('returns empty array when no tracks found', async () => {
      const mockResponse = {
        results: {
          trackmatches: { track: [] },
          '@attr': {
            totalResults: '0',
          },
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await searchTracks('NonExistentTrack', 1)

      expect(result.tracks).toHaveLength(0)
      expect(result.totalPages).toBe(0)
    })

    it('handles API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response)

      await expect(searchTracks('test', 1)).rejects.toThrow(
        'Failed to search tracks',
      )
    })
  })

  describe('searchAlbums', () => {
    it('fetches and returns album search results', async () => {
      const mockResponse = {
        results: {
          albummatches: {
            album: [
              {
                name: 'The Eminem Show',
                artist: 'Eminem',
                url: 'http://example.com',
                image: [{ '#text': 'image.jpg', size: 'large' }],
              },
            ],
          },
          '@attr': {
            totalResults: '50',
          },
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await searchAlbums('The Eminem Show', 1)

      expect(result.albums).toHaveLength(1)
      expect(result.albums[0].name).toBe('The Eminem Show')
      expect(result.totalPages).toBe(2) // 50 / 30 = 1.66 -> 2
    })
  })

  describe('getAlbumInfo', () => {
    it('fetches and returns album information with tracks', async () => {
      const mockResponse = {
        album: {
          name: 'The Eminem Show',
          artist: 'Eminem',
          url: 'http://example.com',
          image: [{ '#text': 'image.jpg', size: 'large' }],
          tracks: {
            track: [
              {
                name: 'Without Me',
                duration: '290',
                url: 'http://example.com/track',
                '@attr': { rank: '1' },
              },
            ],
          },
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await getAlbumInfo('Eminem', 'The Eminem Show')

      expect(result.name).toBe('The Eminem Show')
      expect(result.tracks?.track).toHaveLength(1)
      expect(result.tracks?.track[0].name).toBe('Without Me')
    })

    it('handles albums without tracks', async () => {
      const mockResponse = {
        album: {
          name: 'Test Album',
          artist: 'Test Artist',
          url: 'http://example.com',
          image: [],
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await getAlbumInfo('Test Artist', 'Test Album')

      expect(result.name).toBe('Test Album')
      expect(result.tracks).toBeUndefined()
    })
  })
})
