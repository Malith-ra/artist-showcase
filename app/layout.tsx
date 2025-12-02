import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Provider from './provider'
import Navigation from '@/components/Navigation/Navigation'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Last.fm | Play music, find songs, and discover artists',
  description:
    "The world's largest online music service. Listen online, find out more about your favourite artists, and get music recommendations, only at Last.fm",

  metadataBase: new URL('https://artist-showcase-zeta.vercel.app/'),

  alternates: {
    canonical: 'https://artist-showcase-zeta.vercel.app/',
    languages: {
      en: 'https://artist-showcase-zeta.vercel.app/',
      'x-default': 'https://www.last.fm/',
    },
  },

  openGraph: {
    type: 'website',
    siteName: 'Last.fm',
    url: 'https://artist-showcase-zeta.vercel.app/',
    title: 'Last.fm | Play music, find songs, and discover artists',
    description:
      "The world's largest online music service. Listen online, find out more about your favourite artists, and get music recommendations, only at Last.fm",
    images: [
      {
        url: 'https://artist-showcase-zeta.vercel.app/lastfm_logo.png',
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: 'summary',
    site: '@lastfm',
    title: 'Last.fm | Play music, find songs, and discover artists',
    description:
      "The world's largest online music service. Listen online, find out more about your favourite artists, and get music recommendations, only at Last.fm",
    images: [
      'https://www.last.fm/static/images/lastfm_avatar_twitter.52a5d69a85ac.png',
    ],
  },

  icons: {
    icon: '/static/images/favicon.702b239b6194.ico',
    apple: [
      'https://www.last.fm/static/images/lastfm_avatar_applemusic.b06eb8ad89be.png',
    ],
  },

  other: {
    'apple-music-app-icon':
      'https://www.last.fm/static/images/lastfm_avatar_applemusic.b06eb8ad89be.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navigation />
          {children}
        </Provider>
      </body>
    </html>
  )
}
