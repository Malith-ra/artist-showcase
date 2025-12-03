import TrackList from '@/components/TrackList/TrackList'
import { useFavoritesStore } from '@/store/favoritesStore'
import { LastFMSearchTrack } from '@/types/album'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

// ───────────────────────────────
// Strongly typed Zustand mock
// ───────────────────────────────
jest.mock('@/store/favoritesStore', () => ({
  useFavoritesStore: jest.fn(),
}))

const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<
  typeof useFavoritesStore
>

const mockStore = {
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  isFavorite: jest.fn(() => false),
}

mockUseFavoritesStore.mockReturnValue(mockStore)

// ───────────────────────────────
// Strongly typed mock data
// ───────────────────────────────
const mockTracks: LastFMSearchTrack[] = [
  {
    name: 'Test Track',
    artist: 'Test Artist',
    url: 'http://example.com/track',
    listeners: '15000',
    mbid: '',
    image: [
      { size: 'small', '#text': '' },
      { size: 'large', '#text': 'https://example.com/cover.jpg' },
    ],
  },
]

// Wrapper to include Chakra theme

const renderWithChakra = (ui: React.ReactElement) =>
  render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)

describe('TrackList Component (Typed)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders track details correctly', () => {
    renderWithChakra(<TrackList tracks={mockTracks} />)

    expect(screen.getByText('Test Track')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
    expect(screen.getByText('15,000 listeners')).toBeInTheDocument()

    const img = screen.getByAltText('Test Track')
    expect(img).toHaveAttribute('src', 'https://example.com/cover.jpg')
  })

  test('calls addFavorite when clicking favorite button', () => {
    renderWithChakra(<TrackList tracks={mockTracks} />)

    const btn = screen.getByRole('button', { name: /add to favorites/i })
    fireEvent.click(btn)

    expect(mockStore.addFavorite).toHaveBeenCalledTimes(1)
    expect(mockStore.addFavorite).toHaveBeenCalledWith({
      id: 'http://example.com/track',
      name: 'Test Track',
      artist: 'Test Artist',
      image: 'https://example.com/cover.jpg',
      url: 'http://example.com/track',
    })
  })

  test('calls removeFavorite if track is already a favorite', () => {
    mockStore.isFavorite.mockReturnValueOnce(true)

    renderWithChakra(<TrackList tracks={mockTracks} />)

    const btn = screen.getByRole('button', { name: /remove from favorites/i })
    fireEvent.click(btn)

    expect(mockStore.removeFavorite).toHaveBeenCalledTimes(1)
    expect(mockStore.removeFavorite).toHaveBeenCalledWith(
      'http://example.com/track',
    )
  })

  test('shows Load More button when hasMore=true', () => {
    const loadMoreFn = jest.fn()

    renderWithChakra(
      <TrackList tracks={mockTracks} hasMore onLoadMore={loadMoreFn} />,
    )

    const loadMoreBtn = screen.getByRole('button', { name: /load more/i })
    expect(loadMoreBtn).toBeInTheDocument()

    fireEvent.click(loadMoreBtn)
    expect(loadMoreFn).toHaveBeenCalledTimes(1)
  })

  test('hides Load More when hasMore=false', () => {
    renderWithChakra(<TrackList tracks={mockTracks} hasMore={false} />)

    expect(screen.queryByText(/load more/i)).toBeNull()
  })
})
