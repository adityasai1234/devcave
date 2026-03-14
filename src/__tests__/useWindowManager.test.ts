import { renderHook, act } from '@testing-library/react'
import { useWindowManager } from '@/hooks/useWindowManager'

describe('useWindowManager', () => {
  it('focusWindow updates zIndex correctly', () => {
    const { result } = renderHook(() => useWindowManager())
    
    const initialZIndexes = result.current.windows.map(w => w.zIndex)
    const maxInitialZ = Math.max(...initialZIndexes)
    
    act(() => {
      result.current.focusWindow('about')
    })
    
    const aboutWindow = result.current.windows.find(w => w.id === 'about')
    expect(aboutWindow?.zIndex).toBeGreaterThan(maxInitialZ)
  })

  it('closeWindow removes window from active list', () => {
    const { result } = renderHook(() => useWindowManager())
    
    act(() => {
      result.current.closeWindow('about')
    })
    
    const aboutWindow = result.current.windows.find(w => w.id === 'about')
    expect(aboutWindow?.isHidden).toBe(true)
  })

  it('minimizeWindow sets isMinimized true', () => {
    const { result } = renderHook(() => useWindowManager())
    
    act(() => {
      result.current.minimizeWindow('about')
    })
    
    const aboutWindow = result.current.windows.find(w => w.id === 'about')
    expect(aboutWindow?.isMinimized).toBe(true)
  })

  it('openWindow restores hidden window', () => {
    const { result } = renderHook(() => useWindowManager())
    
    act(() => {
      result.current.closeWindow('about')
    })
    
    let aboutWindow = result.current.windows.find(w => w.id === 'about')
    expect(aboutWindow?.isHidden).toBe(true)
    
    act(() => {
      result.current.openWindow('about')
    })
    
    aboutWindow = result.current.windows.find(w => w.id === 'about')
    expect(aboutWindow?.isHidden).toBe(false)
  })
})
