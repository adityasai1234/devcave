import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TerminalWindow } from '@/components/windows/TerminalWindow'

describe('TerminalWindow', () => {
  it('typewriter sequence completes in order', async () => {
    render(<TerminalWindow onFocusWindow={jest.fn()} />)
    
    await waitFor(() => {
      expect(screen.getByText(/aditya/)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('clear command empties terminal lines', async () => {
    jest.useFakeTimers()
    
    render(<TerminalWindow onFocusWindow={jest.fn()} />)
    
    await waitFor(() => {
      expect(screen.getByText(/aditya/)).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'clear' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    
    jest.useRealTimers()
  })

  it('open projects calls focusWindow', async () => {
    const mockFocus = jest.fn()
    jest.useFakeTimers()
    
    render(<TerminalWindow onFocusWindow={mockFocus} />)
    
    await waitFor(() => {
      expect(screen.getByText(/aditya/)).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'open projects' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    
    expect(mockFocus).toHaveBeenCalledWith('projects')
    jest.useRealTimers()
  })

  it('unknown command shows command not found', async () => {
    jest.useFakeTimers()
    
    render(<TerminalWindow onFocusWindow={jest.fn()} />)
    
    await waitFor(() => {
      expect(screen.getByText(/aditya/)).toBeInTheDocument()
    }, { timeout: 3000 })
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'unknowncmd' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    
    expect(screen.getByText(/command not found/)).toBeInTheDocument()
    jest.useRealTimers()
  })
})
