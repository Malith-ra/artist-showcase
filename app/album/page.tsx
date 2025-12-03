import { getAlbumInfo } from '@/lib/lastfm'
import AlbumDetailClient from '../../components/AlbumDetailClient/AlbumDetailClient'
import { notFound } from 'next/navigation'

interface AlbumPageProps {
  searchParams: Promise<{
    artist: string
    album: string
  }>
}

export default async function AlbumPage({
  searchParams,
}: Readonly<AlbumPageProps>) {
  const params = await searchParams
  const { artist, album } = params

  if (!artist || !album) {
    notFound()
  }

  const albumInfo = await getAlbumInfo(artist, album)

  if (!albumInfo) {
    notFound()
  }

  return <AlbumDetailClient albumInfo={albumInfo} />
}
