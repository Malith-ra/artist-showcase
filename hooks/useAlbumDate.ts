'use client'

import { useEffect, useState } from 'react'
import { getAlbumInfo } from '@/lib/lastfm'
import { formatFullDate } from '@/utils/formatFullDate'

export function useAlbumDate(artist: string, album: string) {
  const [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    async function run() {
      const info = await getAlbumInfo(artist, album)
      if (!info) return setDate(null)

      // 1. Try releasedate
      if (info.releasedate && info.releasedate.trim() !== '') {
        setDate(formatFullDate(info.releasedate))
        return
      }

      // 2. Try wiki.published
      if (info.wiki?.published) {
        setDate(formatFullDate(info.wiki.published))
        return
      }

      // No valid date → return null
      setDate(null)
    }

    run()
  }, [artist, album])

  return date
}
