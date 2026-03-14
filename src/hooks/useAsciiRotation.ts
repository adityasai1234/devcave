'use client'

import { useMemo } from 'react'
import { asciiArtStyles } from '@/data/asciiArt'

const REFERENCE_DATE = new Date('2024-01-01T02:00:00')

export function useAsciiRotation(): string {
  const art = useMemo(() => {
    const now = new Date()
    const currentDayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 0, 0)
    const refDate = new Date(REFERENCE_DATE)
    
    const diffTime = currentDayStart.getTime() - refDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    const index = ((diffDays % asciiArtStyles.length) + asciiArtStyles.length) % asciiArtStyles.length
    return asciiArtStyles[index] ?? asciiArtStyles[0]
  }, [])

  return art
}
