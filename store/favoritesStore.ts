'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteTrack {
  id: string // unique identifier (mbid or url)
  name: string
  artist: string
  album?: string
  image?: string
  url?: string
  duration?: string
}

interface FavoritesState {
  favorites: FavoriteTrack[]
  addFavorite: (track: FavoriteTrack) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (track) =>
        set((state) => {
          // Check if already exists
          if (state.favorites.some((f) => f.id === track.id)) {
            return state
          }
          return { favorites: [...state.favorites, track] }
        }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
    },
  ),
)
