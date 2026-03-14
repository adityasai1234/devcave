import { useState, useCallback } from 'react'

export interface WindowState {
  id: string
  zIndex: number
  isHidden: boolean
  isMinimized: boolean
}

export interface UseWindowManagerReturn {
  windows: WindowState[]
  focusWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  openWindow: (id: string) => void
  restoreWindow: (id: string) => void
  getHighestZIndex: () => number
}

const initialWindows: WindowState[] = [
  { id: 'about', zIndex: 100, isHidden: false, isMinimized: false },
  { id: 'projects', zIndex: 101, isHidden: false, isMinimized: false },
  { id: 'skills', zIndex: 102, isHidden: false, isMinimized: false },
  { id: 'terminal', zIndex: 103, isHidden: false, isMinimized: false },
  { id: 'contact', zIndex: 104, isHidden: true, isMinimized: false },
]

export function useWindowManager(): UseWindowManagerReturn {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows)

  const getHighestZIndex = useCallback(() => {
    return Math.max(...windows.map((w) => w.zIndex))
  }, [windows])

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const highestZ = Math.max(...prev.map((w) => w.zIndex))
        return prev.map((w) =>
          w.id === id ? { ...w, zIndex: highestZ + 1 } : w
        )
      })
    },
    []
  )

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isHidden: true } : w))
    )
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    )
  }, [])

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const highestZ = Math.max(...prev.map((w) => w.zIndex))
      return prev.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: highestZ + 1 } : w
      )
    })
  }, [])

  const openWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const highestZ = Math.max(...prev.map((w) => w.zIndex))
      return prev.map((w) =>
        w.id === id
          ? { ...w, isHidden: false, isMinimized: false, zIndex: highestZ + 1 }
          : w
      )
    })
  }, [])

  return {
    windows,
    focusWindow,
    closeWindow,
    minimizeWindow,
    openWindow,
    restoreWindow,
    getHighestZIndex,
  }
}
