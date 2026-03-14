import { useState, useCallback, useRef, useEffect } from 'react'

interface Size {
  width: number
  height: number
}

interface UseResizableOptions {
  initialSize: Size
  minWidth?: number
  minHeight?: number
}

interface UseResizableReturn {
  size: Size
  isResizing: boolean
  resizeHandleProps: {
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
  }
}

export function useResizable({
  initialSize,
  minWidth = 220,
  minHeight = 120,
}: UseResizableOptions): UseResizableReturn {
  const [size, setSize] = useState<Size>(initialSize)
  const [isResizing, setIsResizing] = useState(false)
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number }>({
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
  })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return
      e.preventDefault()
      setIsResizing(true)
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: size.width,
        startH: size.height,
      }
    },
    [size.width, size.height]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      setIsResizing(true)
      resizeRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startW: size.width,
        startH: size.height,
      }
    },
    [size.width, size.height]
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeRef.current.startX
      const deltaY = e.clientY - resizeRef.current.startY
      const newWidth = Math.max(minWidth, resizeRef.current.startW + deltaX)
      const newHeight = Math.max(minHeight, resizeRef.current.startH + deltaY)
      setSize({ width: newWidth, height: newHeight })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      const deltaX = touch.clientX - resizeRef.current.startX
      const deltaY = touch.clientY - resizeRef.current.startY
      const newWidth = Math.max(minWidth, resizeRef.current.startW + deltaX)
      const newHeight = Math.max(minHeight, resizeRef.current.startH + deltaY)
      setSize({ width: newWidth, height: newHeight })
    }

    const handleEnd = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isResizing, minWidth, minHeight])

  return {
    size,
    isResizing,
    resizeHandleProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    },
  }
}
