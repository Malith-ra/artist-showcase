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
  Center,
} from '@chakra-ui/react'
import { useFavoritesStore } from '@/store/favoritesStore'
import { LuHeart } from 'react-icons/lu'

export default function FavoritesClient() {
  const { favorites, removeFavorite } = useFavoritesStore()

  if (favorites.length === 0) {
    return (
      <Container maxW="container.xl" py={10}>
        <Heading mb={6}>My Favorites</Heading>
        <Center mt={20}>
          <VStack gap={4}>
            <LuHeart size={64} color="gray" />
            <Text fontSize="xl" color="gray.500">
              No favorites yet
            </Text>
            <Text color="gray.400">
              Add tracks from search results or album details
            </Text>
          </VStack>
        </Center>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={10}>
      <HStack justify="space-between" mb={6}>
        <Heading>My Favorites</Heading>
        <Text color="gray.600">{favorites.length} tracks</Text>
      </HStack>

      <VStack gap={4} align="stretch">
        {favorites.map((track) => (
          <Box
            key={track.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            _hover={{ shadow: 'md' }}
            transition="0.2s"
          >
            <HStack gap={4} justify="space-between">
              <HStack gap={4} flex={1}>
                {track.image && (
                  <Image
                    src={track.image}
                    alt={track.name}
                    boxSize="60px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                )}
                <VStack align="start" gap={1}>
                  <Text fontWeight="bold" fontSize="lg">
                    {track.name}
                  </Text>
                  <Text color="gray.600">{track.artist}</Text>
                  {track.album && (
                    <Text fontSize="sm" color="gray.500">
                      Album: {track.album}
                    </Text>
                  )}
                </VStack>
              </HStack>

              <Button
                onClick={() => removeFavorite(track.id)}
                colorScheme="red"
                variant="ghost"
                size="sm"
              >
                <LuHeart fill="currentColor" />
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  )
}
