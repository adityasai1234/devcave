import { renderHook, act } from '@testing-library/react'
import { useDraggable } from '@/hooks/useDraggable'

describe('useDraggable', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('position updates on mousemove during drag', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 0, y: 0 }, minY: 26 })
    )

    expect(result.current.position).toEqual({ x: 0, y: 0 })

    act(() => {
      result.current.dragHandlers.onMouseDown({ button: 0 } as React.MouseEvent)
    })

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }))
    })

    expect(result.current.position.x).toBe(100)
    expect(result.current.position.y).toBe(100)
  })

  it('drag stops on mouseup', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 0, y: 0 }, minY: 26 })
    )

    act(() => {
      result.current.dragHandlers.onMouseDown({ button: 0 } as React.MouseEvent)
    })

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }))
    })

    expect(result.current.isDragging).toBe(true)

    act(() => {
      window.dispatchEvent(new MouseEvent('mouseup'))
    })

    expect(result.current.isDragging).toBe(false)
  })

  it('position clamped to viewport bounds (no negative x/y above topbar)', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 50, y: 50 }, minY: 26, minX: 0 })
    )

    act(() => {
      result.current.dragHandlers.onMouseDown({ button: 0 } as React.MouseEvent)
    })

    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: -100, clientY: -100 }))
    })

    expect(result.current.position.x).toBe(0)
    expect(result.current.position.y).toBe(26)
  })

  it('does not drag on right click', () => {
    const { result } = renderHook(() => 
      useDraggable({ initialPosition: { x: 0, y: 0 }, minY: 26 })
    )

    act(() => {
      result.current.dragHandlers.onMouseDown({ button: 2 } as React.MouseEvent)
    })

    expect(result.current.isDragging).toBe(false)
  })
})
