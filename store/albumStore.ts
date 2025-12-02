'use client'

import { create } from 'zustand'

export type SortOption = 'name' | 'year'

interface AlbumStoreState {
  sortBy: SortOption
  setSort: (option: SortOption) => void
}

export const useAlbumStore = create<AlbumStoreState>((set) => ({
  sortBy: 'name',
  setSort: (option) => set({ sortBy: option }),
}))
