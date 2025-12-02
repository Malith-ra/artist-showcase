'use client'

import { Box, Container, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <Box bg="gray.600" color="white" py={4} mb={6}>
      <Container maxW="container.xl">
        <HStack gap={6}>
          <Link href="/">
            <Box
              fontWeight={isActive('/') ? 'bold' : 'normal'}
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              Home
            </Box>
          </Link>
          <Link href="/albums">
            <Box
              fontWeight={isActive('/albums') ? 'bold' : 'normal'}
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              Albums
            </Box>
          </Link>
          <Link href="/search">
            <Box
              fontWeight={isActive('/search') ? 'bold' : 'normal'}
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              Search
            </Box>
          </Link>
          <Link href="/favorites">
            <Box
              fontWeight={isActive('/favorites') ? 'bold' : 'normal'}
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              Favorites
            </Box>
          </Link>
          <Link href="/stats">
            <Box
              fontWeight={isActive('/stats') ? 'bold' : 'normal'}
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
            >
              Stats
            </Box>
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}
