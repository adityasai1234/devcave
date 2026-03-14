import { useState, useEffect, useCallback } from 'react'

interface UseClockReturn {
  time: string
}

export function useClock(): UseClockReturn {
  const [time, setTime] = useState<string>('')

  const updateTime = useCallback(() => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    setTime(`${hours}:${minutes}`)
  }, [])

  useEffect(() => {
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [updateTime])

  return { time }
}
