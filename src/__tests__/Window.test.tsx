import { render, screen, fireEvent } from '@testing-library/react'
import { Window } from '@/components/Window'

describe('Window', () => {
  const defaultProps = {
    id: 'test-window',
    title: 'Test Window',
    defaultPosition: { x: 100, y: 100 },
    defaultSize: { width: 300, height: 200 },
    zIndex: 100,
    isMinimized: false,
    onClose: jest.fn(),
    onFocus: jest.fn(),
    onMinimize: jest.fn(),
    children: <div>Window content</div>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with correct title', () => {
    render(<Window {...defaultProps} />)
    expect(screen.getByText('Test Window')).toBeInTheDocument()
  })

  it('close button calls onClose', () => {
    render(<Window {...defaultProps} />)
    const closeButton = screen.getByLabelText('Close window')
    fireEvent.click(closeButton)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('minimize button calls onMinimize', () => {
    render(<Window {...defaultProps} />)
    const minimizeButton = screen.getByLabelText('Minimize window')
    fireEvent.click(minimizeButton)
    expect(defaultProps.onMinimize).toHaveBeenCalled()
  })

  it('clicking window calls onFocus', () => {
    render(<Window {...defaultProps} />)
    const windowContent = screen.getByText('Window content')
    fireEvent.click(windowContent)
    expect(defaultProps.onFocus).toHaveBeenCalled()
  })

  it('minimizes content area when isMinimized is true', () => {
    render(<Window {...defaultProps} isMinimized={true} />)
    expect(screen.queryByText('Window content')).not.toBeInTheDocument()
  })
})
