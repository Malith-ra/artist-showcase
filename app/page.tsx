import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={8} textAlign="center">
        <Heading size="2xl" fontWeight="bold">
          Artist Showcase
        </Heading>

        <Text fontSize="lg" color="gray.600">
          Explore artists, view their top albums, and discover music easily.
        </Text>

        <Box pt={6}>
          <Link href="/albums">
            <Button size="lg" colorScheme="purple" borderRadius="full">
              Browse Albums
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  )
}
