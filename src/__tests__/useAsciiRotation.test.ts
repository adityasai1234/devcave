import { renderHook } from '@testing-library/react'
import { useAsciiRotation } from '@/hooks/useAsciiRotation'
import { asciiArtStyles } from '@/data/asciiArt'

describe('useAsciiRotation', () => {
  const originalGetDay = Date.prototype.getDay

  afterEach(() => {
    Date.prototype.getDay = originalGetDay
  })

  it('returns a non-empty string', () => {
    Date.prototype.getDay = jest.fn(() => 0)
    const { result } = renderHook(() => useAsciiRotation())
    expect(result.current).toBeTruthy()
    expect(typeof result.current).toBe('string')
  })

  it('Sunday (day 0) returns first entry', () => {
    Date.prototype.getDay = jest.fn(() => 0)
    const { result } = renderHook(() => useAsciiRotation())
    expect(result.current).toBe(asciiArtStyles[0])
  })

  it('Saturday (day 6) returns last entry', () => {
    Date.prototype.getDay = jest.fn(() => 6)
    const { result } = renderHook(() => useAsciiRotation())
    expect(result.current).toBe(asciiArtStyles[6])
  })

  it('never returns undefined for any day 0-6', () => {
    for (let day = 0; day <= 6; day++) {
      Date.prototype.getDay = jest.fn(() => day)
      const { result } = renderHook(() => useAsciiRotation())
      expect(result.current).toBeDefined()
    }
  })
})
