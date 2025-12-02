'use client'

import { LastFMSearchTrack } from '@/types/album'
import {
  VStack,
  Box,
  Text,
  HStack,
  Image,
  Button,
  Center,
} from '@chakra-ui/react'

interface TrackListProps {
  tracks: LastFMSearchTrack[]
  onLoadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
}

export default function TrackList({
  tracks,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: Readonly<TrackListProps>) {
  return (
    <VStack gap={4} align="stretch" mt={6}>
      {tracks.map((track, index) => {
        const image =
          track.image.find((img) => img.size === 'large')?.['#text'] || ''

        return (
          <Box
            key={`${track.mbid || track.url}-${index}`}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: 'md' }}
            transition="0.2s"
          >
            <HStack gap={4}>
              {image && (
                <Image
                  src={image}
                  alt={track.name}
                  boxSize="80px"
                  borderRadius="md"
                  objectFit="cover"
                />
              )}
              <VStack align="start" flex={1} gap={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {track.name}
                </Text>
                <Text color="gray.600">{track.artist}</Text>
                <Text fontSize="sm" color="gray.500">
                  {Number.parseInt(track.listeners).toLocaleString()} listeners
                </Text>
              </VStack>
            </HStack>
          </Box>
        )
      })}

      {hasMore && onLoadMore && (
        <Center mt={6}>
          <Button
            onClick={onLoadMore}
            colorScheme="purple"
            size="lg"
            loading={loadingMore}
            loadingText="Loading more..."
          >
            Load More
          </Button>
        </Center>
      )}
    </VStack>
  )
}
