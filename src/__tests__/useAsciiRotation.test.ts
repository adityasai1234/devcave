import { renderHook } from '@testing-library/react'
import { useAsciiRotation } from '@/hooks/useAsciiRotation'
import { asciiArtStyles } from '@/data/asciiArt'

describe('useAsciiRotation', () => {
  const originalDate = global.Date

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    global.Date = originalDate
  })

  it('returns a non-empty string', () => {
    jest.setSystemTime(new Date('2024-01-02T10:00:00'))
    const { result } = renderHook(() => useAsciiRotation())
    expect(result.current).toBeTruthy()
    expect(typeof result.current).toBe('string')
  })

  it('returns different art for different days', () => {
    jest.setSystemTime(new Date('2024-01-02T10:00:00'))
    const { result: day1 } = renderHook(() => useAsciiRotation())
    
    jest.setSystemTime(new Date('2024-01-03T10:00:00'))
    const { result: day2 } = renderHook(() => useAsciiRotation())
    
    expect(day1.current).not.toBe(day2.current)
  })

  it('rotates consecutively every day', () => {
    jest.setSystemTime(new Date('2024-01-01T10:00:00'))
    const { result: day0 } = renderHook(() => useAsciiRotation())
    
    jest.setSystemTime(new Date('2024-01-02T10:00:00'))
    const { result: day1 } = renderHook(() => useAsciiRotation())
    
    jest.setSystemTime(new Date('2024-01-03T10:00:00'))
    const { result: day2 } = renderHook(() => useAsciiRotation())
    
    jest.setSystemTime(new Date('2024-01-04T10:00:00'))
    const { result: day3 } = renderHook(() => useAsciiRotation())
    
    expect(day0.current).toBe(asciiArtStyles[0])
    expect(day1.current).toBe(asciiArtStyles[1])
    expect(day2.current).toBe(asciiArtStyles[2])
    expect(day3.current).toBe(asciiArtStyles[3])
  })

  it('wraps around after all styles are used', () => {
    const totalStyles = asciiArtStyles.length
    
    jest.setSystemTime(new Date('2024-01-01T10:00:00'))
    const { result: first } = renderHook(() => useAsciiRotation())
    
    const futureDate = new Date('2024-01-01')
    futureDate.setDate(futureDate.getDate() + totalStyles)
    jest.setSystemTime(futureDate)
    const { result: wrap } = renderHook(() => useAsciiRotation())
    
    expect(wrap.current).toBe(first.current)
  })

  it('never returns undefined', () => {
    jest.setSystemTime(new Date('2024-01-02T10:00:00'))
    const { result } = renderHook(() => useAsciiRotation())
    expect(result.current).toBeDefined()
    expect(asciiArtStyles).toContain(result.current)
  })
})
