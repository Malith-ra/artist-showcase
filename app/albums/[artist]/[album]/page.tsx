import { getAlbumInfo } from '@/lib/lastfm'
import { LastFMTrack, LastFMAlbumInfo } from '@/types/album'
import { notFound } from 'next/navigation'
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Separator,
} from '@chakra-ui/react'

interface AlbumPageProps {
  params: Promise<{
    artist: string
    album: string
  }>
}

export default async function AlbumPage(props: AlbumPageProps) {
  const { artist, album } = await props.params

  const decodedArtist = decodeURIComponent(artist)
  const decodedAlbum = decodeURIComponent(album)

  const data: LastFMAlbumInfo | null = await getAlbumInfo(
    decodedArtist,
    decodedAlbum,
  )

  if (!data) return notFound()

  const tracks: LastFMTrack[] = data.tracks?.track ?? []

  return (
    <Box maxW="5xl" mx="auto" py={10} px={4}>
      {/* Header section */}
      <Flex gap={8} align="flex-start" flexDir={{ base: 'column', md: 'row' }}>
        {/* Album cover */}
        <Image
          src={data.image?.[3]?.['#text'] || ''}
          alt={data.name}
          borderRadius="lg"
          boxSize="290px"
          objectFit="cover"
          shadow="xl"
        />

        {/* Album text info */}
        <VStack align="flex-start" gap={4} flex="1">
          <Heading fontSize="3xl" fontWeight="bold">
            {data.artist} — {data.name}
          </Heading>

          <Text color="gray.400" fontSize="md">
            Listeners: <b>{data.listeners}</b> • Plays: <b>{data.playcount}</b>
          </Text>

          {data.wiki?.summary && (
            <Box
              fontSize="md"
              lineHeight="tall"
              color="gray.600"
              dangerouslySetInnerHTML={{ __html: data.wiki.summary }}
            />
          )}
        </VStack>
      </Flex>

      <Separator my={10} />

      {/* Tracklist */}
      <Heading fontSize="2xl" mb={4}>
        Tracklist
      </Heading>

      <VStack gap={2} align="stretch">
        {tracks.map((track, idx) => {
          const duration = track.duration
            ? `${Math.floor(Number(track.duration) / 60)}:${(
                Number(track.duration) % 60
              )
                .toString()
                .padStart(2, '0')}`
            : '--:--'

          return (
            <Flex
              key={idx}
              bg="gray.100"
              p={3}
              borderRadius="md"
              justify="space-between"
              align="center"
              _hover={{ bg: 'gray.300', shadow: 'sm', cursor: 'pointer' }}
              transition="0.2s"
            >
              <HStack gap={3}>
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  whiteSpace="nowrap"
                  maxW="280px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {idx + 1}. {track.name}
                </Text>
              </HStack>

              <Text fontSize="sm" color="gray.400">
                {duration}
              </Text>
            </Flex>
          )
        })}
      </VStack>
    </Box>
  )
}
