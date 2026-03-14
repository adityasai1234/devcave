import { useState, useCallback, useRef, useEffect } from 'react'

interface Position {
  x: number
  y: number
}

interface UseDraggableOptions {
  initialPosition: Position
  minY?: number
  minX?: number
}

interface UseDraggableReturn {
  position: Position
  isDragging: boolean
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
  }
}

export function useDraggable({
  initialPosition,
  minY = 26,
  minX = 0,
}: UseDraggableOptions): UseDraggableReturn {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number }>({
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0,
  })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return
      setIsDragging(true)
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }
    },
    [position.x, position.y]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      setIsDragging(true)
      dragRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startPosX: position.x,
        startPosY: position.y,
      }
    },
    [position.x, position.y]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragRef.current.startX
      const deltaY = e.clientY - dragRef.current.startY
      const newX = Math.max(minX, dragRef.current.startPosX + deltaX)
      const newY = Math.max(minY, dragRef.current.startPosY + deltaY)
      setPosition({ x: newX, y: newY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      const touch = e.touches[0]
      const deltaX = touch.clientX - dragRef.current.startX
      const deltaY = touch.clientY - dragRef.current.startY
      const newX = Math.max(minX, dragRef.current.startPosX + deltaX)
      const newY = Math.max(minY, dragRef.current.startPosY + deltaY)
      setPosition({ x: newX, y: newY })
    }

    const handleEnd = () => {
      setIsDragging(false)
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
  }, [isDragging, minX, minY])

  return {
    position,
    isDragging,
    dragHandlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    },
  }
}
