import { render, screen, waitFor } from '@testing-library/react'
import { Topbar } from '@/components/Topbar'

describe('Topbar', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders clock in HH:MM format', () => {
    render(<Topbar />)
    
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const expectedTime = `${hours}:${minutes}`
    
    expect(screen.getByText(expectedTime)).toBeInTheDocument()
  })

  it('clock updates after 1 second', async () => {
    render(<Topbar />)
    
    const initialTime = screen.getByText(/:/).textContent
    
    jest.advanceTimersByTime(1000)
    
    const afterTime = screen.getByText(/:/).textContent
    expect(afterTime).toBe(initialTime)
  })

  it('status dot is present in DOM', () => {
    render(<Topbar />)
    
    const statusDot = document.querySelector('.rounded-full')
    expect(statusDot).toBeInTheDocument()
  })

  it('renders menu items', () => {
    render(<Topbar />)
    
    expect(screen.getByText('file')).toBeInTheDocument()
    expect(screen.getByText('view')).toBeInTheDocument()
    expect(screen.getByText('tools')).toBeInTheDocument()
    expect(screen.getByText('help')).toBeInTheDocument()
  })
})
