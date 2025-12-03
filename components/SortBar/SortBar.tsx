'use client'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { SortOption, useAlbumStore } from '@/store/albumStore'

export default function SortBar() {
  const sortBy = useAlbumStore((s) => s.sortBy)
  const setSort = useAlbumStore((s) => s.setSort)

  const isActive = (v: SortOption) => (sortBy === v ? 'solid' : 'outline')

  return (
    <ButtonGroup mb={8} gap={4}>
      <Button
        colorScheme="purple"
        variant={isActive('name')}
        onClick={() => setSort('name')}
      >
        Sort by Name
      </Button>

      <Button
        colorScheme="purple"
        variant={isActive('year')}
        onClick={() => setSort('year')}
      >
        Sort by Year
      </Button>
    </ButtonGroup>
  )
}
