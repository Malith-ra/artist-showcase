import { renderHook, act } from '@testing-library/react'
import { useFavoritesStore } from '../store/favoritesStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset store state
    useFavoritesStore.setState({ favorites: [] })
  })

  it('initializes with empty favorites', () => {
    const { result } = renderHook(() => useFavoritesStore())
    expect(result.current.favorites).toEqual([])
  })

  it('adds a favorite track', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.addFavorite({
        id: 'track-1',
        name: 'Lose Yourself',
        artist: 'Eminem',
        album: 'The Eminem Show',
        duration: '326',
        url: 'http://example.com',
      })
    })

    expect(result.current.favorites).toHaveLength(1)
    expect(result.current.favorites[0]).toEqual({
      id: 'track-1',
      name: 'Lose Yourself',
      artist: 'Eminem',
      album: 'The Eminem Show',
      duration: '326',
      url: 'http://example.com',
    })
  })

  it('removes a favorite track', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.addFavorite({
        id: 'track-1',
        name: 'Lose Yourself',
        artist: 'Eminem',
        album: 'The Eminem Show',
        duration: '326',
        url: 'http://example.com',
      })
    })

    expect(result.current.favorites).toHaveLength(1)

    act(() => {
      result.current.removeFavorite('track-1')
    })

    expect(result.current.favorites).toHaveLength(0)
  })

  it('checks if a track is favorite', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.addFavorite({
        id: 'track-1',
        name: 'Lose Yourself',
        artist: 'Eminem',
        album: 'The Eminem Show',
        duration: '326',
        url: 'http://example.com',
      })
    })

    expect(result.current.isFavorite('track-1')).toBe(true)
    expect(result.current.isFavorite('track-2')).toBe(false)
  })

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavoritesStore())

    const track = {
      id: 'track-1',
      name: 'Lose Yourself',
      artist: 'Eminem',
      album: 'The Eminem Show',
      duration: '326',
      url: 'http://example.com',
    }

    act(() => {
      result.current.addFavorite(track)
      result.current.addFavorite(track)
    })

    expect(result.current.favorites).toHaveLength(1)
  })

  it('handles multiple favorites', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.addFavorite({
        id: 'track-1',
        name: 'Lose Yourself',
        artist: 'Eminem',
        album: 'The Eminem Show',
        duration: '326',
        url: 'http://example.com',
      })

      result.current.addFavorite({
        id: 'track-2',
        name: 'Without Me',
        artist: 'Eminem',
        album: 'The Eminem Show',
        duration: '290',
        url: 'http://example.com/2',
      })
    })

    expect(result.current.favorites).toHaveLength(2)
  })

  it('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavoritesStore())

    act(() => {
      result.current.addFavorite({
        id: 'track-1',
        name: 'Lose Yourself',
        artist: 'Eminem',
        album: 'The Eminem Show',
        duration: '326',
        url: 'http://example.com',
      })
    })

    const stored = localStorage.getItem('favorites-storage')
    expect(stored).toBeTruthy()

    const parsed = JSON.parse(stored!)
    expect(parsed.state.favorites).toHaveLength(1)
  })
})
