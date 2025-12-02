import { useAlbumDate } from '@/hooks/useAlbumDate'
import { LastFMAlbum } from '@/types/album'
import {
  Box,
  Image,
  Text,
  Heading,
  VStack,
  Badge,
  AspectRatio,
} from '@chakra-ui/react'

interface Props {
  readonly album: LastFMAlbum
}

export default function AlbumCard({ album }: Props) {
  const cover = album.image.find((i) => i.size === 'large')?.['#text'] ?? ''
  const rank = album['@attr']?.rank ?? '-'
  const date = useAlbumDate(album.artist.name, album.name)

  return (
    <Box
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
        <Heading fontSize="lg" fontWeight="semibold">
          {album.name}
        </Heading>

        <Text fontSize="sm" color="gray.600">
          Artist: {album.artist.name}
        </Text>

        {date && (
          <Text fontSize="xs" color="gray.500">
            Released: {date}
          </Text>
        )}

        <Badge colorScheme="purple" mt={1}>
          Rank: {rank}
        </Badge>
      </VStack>
    </Box>
  )
}
