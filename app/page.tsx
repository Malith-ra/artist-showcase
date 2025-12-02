'use client'

import { useAppStore } from '@/store/useAppStore'

export default function Counter() {
  const count = useAppStore((s) => s.count)
  const increase = useAppStore((s) => s.increase)

  return <button onClick={increase}>Count: {count}</button>
}
