import { render, screen, waitFor } from '@testing-library/react'
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
})
