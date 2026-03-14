import { renderHook, act } from '@testing-library/react'
import { useDraggable } from '@/hooks/useDraggable'

describe('useDraggable', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('has initial position', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 50, y: 50 }, minY: 26 })
    )

    expect(result.current.position).toEqual({ x: 50, y: 50 })
  })

  it('isDragging starts as false', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 0, y: 0 }, minY: 26 })
    )

    expect(result.current.isDragging).toBe(false)
  })

  it('does not start drag on right click', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 0, y: 0 }, minY: 26 })
    )

    act(() => {
      result.current.dragHandlers.onMouseDown({ button: 2 } as unknown as React.MouseEvent)
    })

    expect(result.current.isDragging).toBe(false)
  })

  it('returns drag handlers', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 0, y: 0 }, minY: 26 })
    )

    expect(result.current.dragHandlers).toHaveProperty('onMouseDown')
    expect(result.current.dragHandlers).toHaveProperty('onTouchStart')
  })
})
