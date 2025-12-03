'use client'

import { useEffect } from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function AppError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={6} align="center" textAlign="center">
        <Box>
          <Heading size="4xl" color="red.500" mb={4}>
            Oops!
          </Heading>
          <Heading size="xl" mb={2}>
            Something went wrong
          </Heading>
          <Text color="gray.600" fontSize="lg">
            We encountered an unexpected error. Please try again or return to
            the homepage.
          </Text>
        </Box>

        {process.env.NODE_ENV === 'development' && error.message && (
          <Box
            p={4}
            bg="red.50"
            borderRadius="md"
            borderWidth="1px"
            borderColor="red.200"
            maxW="full"
          >
            <Text
              fontFamily="mono"
              fontSize="sm"
              color="red.800"
              whiteSpace="pre-wrap"
              wordBreak="break-word"
            >
              {error.message}
            </Text>
            {error.digest && (
              <Text fontSize="xs" color="gray.600" mt={2}>
                Error ID: {error.digest}
              </Text>
            )}
          </Box>
        )}

        <VStack gap={3} pt={4}>
          <Button onClick={reset} colorScheme="blue" size="lg" px={8}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="ghost" size="lg">
              Go to Homepage
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Container>
  )
}
