import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { TerminalWindow } from '@/components/windows/TerminalWindow'

describe('TerminalWindow', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders terminal content after typewriter completes', async () => {
    render(<TerminalWindow onFocusWindow={jest.fn()} />)
    
    await waitFor(() => {
      expect(screen.getByText(/addy/)).toBeInTheDocument()
    }, { timeout: 5000 })
  })

  it('"skills" command calls openSkillsRain', async () => {
    const mockOpenSkillsRain = jest.fn()
    render(
      <TerminalWindow 
        onFocusWindow={jest.fn()} 
        onOpenSkillsRain={mockOpenSkillsRain} 
      />
    )
    
    // Wait for terminal to be ready
    await waitFor(() => {
      expect(screen.getByText(/macbook/)).toBeInTheDocument()
    }, { timeout: 5000 })

    // Advance timers to let input appear
    jest.advanceTimersByTime(5000)

    const input = document.querySelector('input') as HTMLInputElement
    expect(input).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'skills' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    jest.advanceTimersByTime(100)
    expect(mockOpenSkillsRain).toHaveBeenCalled()
  })

  it('"skills" command prints "launching skills matrix..." to output', async () => {
    render(
      <TerminalWindow 
        onFocusWindow={jest.fn()} 
        onOpenSkillsRain={jest.fn()} 
      />
    )
    
    // Wait for terminal to be ready
    await waitFor(() => {
      expect(screen.getByText(/macbook/)).toBeInTheDocument()
    }, { timeout: 5000 })

    // Advance timers to let input appear
    jest.advanceTimersByTime(5000)

    const input = document.querySelector('input') as HTMLInputElement
    expect(input).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'skills' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    jest.advanceTimersByTime(100)
    expect(screen.getByText('launching skills matrix...')).toBeInTheDocument()
  })
})
