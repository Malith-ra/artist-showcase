'use client'

import { LastFMTrack } from '@/types/album'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import styles from './PlayCountGraph.module.css'

interface PlayCountGraphProps {
  tracks: LastFMTrack[]
}

interface CustomTooltipProps {
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

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload?.length) {
    const data = payload[0].payload
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>{data.name}</p>
        <p className={styles.tooltipPlaycount}>
          Plays: {data.playcount.toLocaleString()}
        </p>
        {data.duration && (
          <p className={styles.tooltipDuration}>
            Duration: {Math.floor(Number.parseInt(data.duration) / 60)}:
            {(Number.parseInt(data.duration) % 60).toString().padStart(2, '0')}
          </p>
        )}
      </div>
    )
  }
  return null
}

export default function PlayCountGraph({
  tracks,
}: Readonly<PlayCountGraphProps>) {
  // Transform data for the chart
  const chartData = tracks
    .map((track) => ({
      name:
        track.name.length > 20
          ? track.name.substring(0, 20) + '...'
          : track.name,
      fullName: track.name,
      playcount: Number.parseInt(
        (track as { playcount?: string }).playcount || '0',
      ),
      duration: track.duration,
    }))
    .filter((track) => track.playcount > 0)
    .sort((a, b) => b.playcount - a.playcount)

  if (chartData.length === 0) {
    return (
      <div className={styles.emptyState}>
        No play count data available for this album
      </div>
    )
  }

  // Generate colors based on play count (gradient from light to dark purple)
  const maxPlaycount = Math.max(...chartData.map((d) => d.playcount))
  const getColor = (playcount: number) => {
    const intensity = playcount / maxPlaycount
    // Purple gradient
    const r = Math.floor(139 + (255 - 139) * (1 - intensity))
    const g = Math.floor(92 + (255 - 92) * (1 - intensity))
    const b = Math.floor(246 + (255 - 246) * (1 - intensity))
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={120}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          label={{
            value: 'Play Count',
            angle: -90,
            position: 'insideLeft',
            style: { fontSize: 14 },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="playcount" radius={[8, 8, 0, 0]}>
          {chartData.map((entry) => (
            <Cell
              key={`cell-${entry.fullName}-${entry.playcount}`}
              fill={getColor(entry.playcount)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
