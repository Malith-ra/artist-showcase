import { LastFMTrack } from './album'

export interface PlayCountGraphProps {
  tracks: LastFMTrack[]
}

export interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    payload: {
      name: string
      playcount: number
      duration?: string
    }
  }>
}
