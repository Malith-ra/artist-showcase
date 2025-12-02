import Link from 'next/link'
import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import styles from '../styles/not-found.module.css'

export default function NotFound() {
  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={6} textAlign="center" className={styles.notFoundContainer}>
        <div className={styles.errorCode}>404</div>
        <Heading size="2xl" className={styles.heading}>
          Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.600" className={styles.description}>
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </Text>
        <Link href="/albums" passHref>
          <Button colorScheme="blue" size="lg" className={styles.button}>
            Go to Albums
          </Button>
        </Link>
      </VStack>
    </Container>
  )
}
