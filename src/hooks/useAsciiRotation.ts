'use client'

import { useMemo } from 'react'
import { asciiArtStyles } from '@/data/asciiArt'

export function useAsciiRotation(): string {
  const art = useMemo(() => {
    const day = new Date().getDay()
    return asciiArtStyles[day] ?? asciiArtStyles[0]
  }, [])

  return art
}
