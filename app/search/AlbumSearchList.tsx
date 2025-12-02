'use client'

import { LastFMSearchAlbum } from '@/types/album'
import {
  SimpleGrid,
  Box,
  Image,
  Text,
  VStack,
  Button,
  Center,
  AspectRatio,
} from '@chakra-ui/react'

interface AlbumSearchListProps {
  albums: LastFMSearchAlbum[]
  onLoadMore?: () => void
  hasMore?: boolean
  loadingMore?: boolean
}

export default function AlbumSearchList({
  albums,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
}: Readonly<AlbumSearchListProps>) {
  return (
    <VStack gap={6} align="stretch" mt={6}>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={6}>
        {albums.map((album, index) => {
          const cover =
            album.image.find((img) => img.size === 'large')?.['#text'] || ''

          return (
            <Box
              key={`${album.mbid || album.url}-${index}`}
              borderWidth="1px"
              rounded="lg"
              overflow="hidden"
              shadow="sm"
              _hover={{ shadow: 'xl', transform: 'scale(1.03)' }}
              transition="0.2s"
              bg="white"
              p={3}
            >
              <AspectRatio ratio={1} w="100%" mb={4}>
                <Image
                  src={cover}
                  alt={album.name}
                  borderRadius="md"
                  objectFit="cover"
                />
              </AspectRatio>

              <VStack align="start" gap={1}>
                <Text fontSize="lg" fontWeight="semibold" lineClamp={2}>
                  {album.name}
                </Text>
                <Text fontSize="sm" color="gray.600" lineClamp={1}>
                  {album.artist}
                </Text>
              </VStack>
            </Box>
          )
        })}
      </SimpleGrid>

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
