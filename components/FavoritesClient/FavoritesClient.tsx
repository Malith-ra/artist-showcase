'use client'

import { useState, useMemo } from 'react'
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
  Input,
  Table,
  IconButton,
} from '@chakra-ui/react'
import { useFavoritesStore } from '@/store/favoritesStore'
import { LuHeart, LuSearch } from 'react-icons/lu'
import Link from 'next/link'

export default function FavoritesClient() {
  const { favorites, removeFavorite } = useFavoritesStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter favorites based on search query
  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites

    const query = searchQuery.toLowerCase()
    return favorites.filter(
      (track) =>
        track.name.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album?.toLowerCase().includes(query),
    )
  }, [favorites, searchQuery])

  const formatDuration = (duration?: string) => {
    if (!duration) return '-'
    const seconds = Number.parseInt(duration)
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

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
      <VStack align="stretch" gap={6}>
        <HStack justify="space-between">
          <Heading>My Favorites</Heading>
          <Text color="gray.600">
            {filteredFavorites.length} of {favorites.length} tracks
          </Text>
        </HStack>

        {/* Search Bar */}
        <HStack>
          <Input
            placeholder="Search favorites by title, artist, or album..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            bg="white"
          />
          <Box p={3}>
            <LuSearch size={24} color="gray" />
          </Box>
        </HStack>

        {/* Favorites Table */}
        {filteredFavorites.length === 0 ? (
          <Center mt={10}>
            <Text color="gray.500">No favorites match your search</Text>
          </Center>
        ) : (
          <Box overflowX="auto" bg="white" borderRadius="md" borderWidth="1px">
            <Table.Root variant="line" size="md">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w="50%">Title</Table.ColumnHeader>
                  <Table.ColumnHeader w="15%">Duration</Table.ColumnHeader>
                  <Table.ColumnHeader w="25%">Album</Table.ColumnHeader>
                  <Table.ColumnHeader w="10%" textAlign="center">
                    Favorite
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredFavorites.map((track) => {
                  const albumLink =
                    track.album && track.artist
                      ? `/album?artist=${encodeURIComponent(track.artist)}&album=${encodeURIComponent(track.album)}`
                      : null

                  return (
                    <Table.Row
                      key={track.id}
                      _hover={{ bg: 'gray.50' }}
                      cursor={albumLink ? 'pointer' : 'default'}
                    >
                      <Table.Cell>
                        {albumLink ? (
                          <Link href={albumLink}>
                            <HStack gap={3}>
                              {track.image && (
                                <Image
                                  src={track.image}
                                  alt={track.name}
                                  boxSize="50px"
                                  borderRadius="md"
                                  objectFit="cover"
                                />
                              )}
                              <VStack align="start" gap={0}>
                                <Text
                                  fontWeight="semibold"
                                  _hover={{ textDecoration: 'underline' }}
                                >
                                  {track.name}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                  {track.artist}
                                </Text>
                              </VStack>
                            </HStack>
                          </Link>
                        ) : (
                          <HStack gap={3}>
                            {track.image && (
                              <Image
                                src={track.image}
                                alt={track.name}
                                boxSize="50px"
                                borderRadius="md"
                                objectFit="cover"
                              />
                            )}
                            <VStack align="start" gap={0}>
                              <Text fontWeight="semibold">{track.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {track.artist}
                              </Text>
                            </VStack>
                          </HStack>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <Text color="gray.600">
                          {formatDuration(track.duration)}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        {track.album ? (
                          albumLink ? (
                            <Link href={albumLink}>
                              <Text
                                color="purple.600"
                                _hover={{ textDecoration: 'underline' }}
                              >
                                {track.album}
                              </Text>
                            </Link>
                          ) : (
                            <Text>{track.album}</Text>
                          )
                        ) : (
                          <Text color="gray.400">-</Text>
                        )}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <IconButton
                          onClick={() => removeFavorite(track.id)}
                          aria-label="Remove from favorites"
                          variant="ghost"
                          colorScheme="red"
                          size="sm"
                        >
                          <LuHeart fill="currentColor" />
                        </IconButton>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        )}

        {/* Clear All Button */}
        {favorites.length > 0 && (
          <HStack justify="flex-end">
            <Button
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to remove all ${favorites.length} favorites?`,
                  )
                ) {
                  favorites.forEach((track) => removeFavorite(track.id))
                }
              }}
              variant="outline"
              colorScheme="red"
              size="sm"
            >
              Clear All Favorites
            </Button>
          </HStack>
        )}
      </VStack>
    </Container>
  )
}
