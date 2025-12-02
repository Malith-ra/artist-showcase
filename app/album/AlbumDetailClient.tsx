'use client'

import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  HStack,
  Image,
  Button,
  AspectRatio,
} from '@chakra-ui/react'
import { useFavoritesStore } from '@/store/favoritesStore'
import { LuHeart } from 'react-icons/lu'
import { LastFMAlbumInfo } from '@/types/album'

interface AlbumDetailClientProps {
  albumInfo: LastFMAlbumInfo
}

export default function AlbumDetailClient({
  albumInfo,
}: Readonly<AlbumDetailClientProps>) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()

  const coverImage =
    albumInfo.image?.find((img) => img.size === 'extralarge')?.['#text'] || ''
  const tracks = albumInfo.tracks?.track || []

  return (
    <Container maxW="container.xl" py={10}>
      <HStack align="start" gap={8} mb={8}>
        <AspectRatio ratio={1} w="300px">
          <Image
            src={coverImage}
            alt={albumInfo.name}
            borderRadius="lg"
            objectFit="cover"
          />
        </AspectRatio>

        <VStack align="start" flex={1} gap={4}>
          <Heading size="2xl">{albumInfo.name}</Heading>
          <Text fontSize="xl" color="gray.600">
            by {albumInfo.artist}
          </Text>

          <HStack gap={6} mt={2}>
            <VStack align="start" gap={0}>
              <Text fontSize="sm" color="gray.500">
                Listeners
              </Text>
              <Text fontWeight="bold">
                {Number.parseInt(albumInfo.listeners).toLocaleString()}
              </Text>
            </VStack>
            <VStack align="start" gap={0}>
              <Text fontSize="sm" color="gray.500">
                Playcount
              </Text>
              <Text fontWeight="bold">
                {Number.parseInt(albumInfo.playcount).toLocaleString()}
              </Text>
            </VStack>
          </HStack>

          {albumInfo.wiki?.summary && (
            <Text
              mt={4}
              dangerouslySetInnerHTML={{
                __html: albumInfo.wiki.summary.split('<a')[0],
              }}
            />
          )}
        </VStack>
      </HStack>

      {tracks.length > 0 && (
        <Box>
          <Heading size="lg" mb={4}>
            Tracks
          </Heading>
          <VStack gap={2} align="stretch">
            {tracks.map((track, index) => {
              const trackId = `${albumInfo.artist}-${albumInfo.name}-${track.name}`
              const isFav = isFavorite(trackId)

              const handleToggleFavorite = () => {
                if (isFav) {
                  removeFavorite(trackId)
                } else {
                  addFavorite({
                    id: trackId,
                    name: track.name,
                    artist: albumInfo.artist,
                    album: albumInfo.name,
                    image: coverImage,
                    url: track.url,
                  })
                }
              }

              return (
                <Box
                  key={`${track.name}-${index}`}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  bg="white"
                  _hover={{ shadow: 'sm' }}
                  transition="0.2s"
                >
                  <HStack justify="space-between">
                    <HStack gap={4} flex={1}>
                      <Text fontWeight="bold" color="gray.500" minW="30px">
                        {index + 1}
                      </Text>
                      <VStack align="start" gap={0} flex={1}>
                        <Text fontWeight="semibold">{track.name}</Text>
                        {track.duration && (
                          <Text fontSize="sm" color="gray.500">
                            {Math.floor(Number.parseInt(track.duration) / 60)}:
                            {(Number.parseInt(track.duration) % 60)
                              .toString()
                              .padStart(2, '0')}
                          </Text>
                        )}
                      </VStack>
                    </HStack>

                    <Button
                      onClick={handleToggleFavorite}
                      variant="ghost"
                      colorScheme={isFav ? 'red' : 'gray'}
                      size="sm"
                    >
                      <LuHeart fill={isFav ? 'currentColor' : 'none'} />
                    </Button>
                  </HStack>
                </Box>
              )
            })}
          </VStack>
        </Box>
      )}
    </Container>
  )
}
