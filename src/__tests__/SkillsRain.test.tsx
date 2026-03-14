import { render, screen, fireEvent } from '@testing-library/react'
import { SkillsRain } from '@/components/SkillsRain'
import { skills } from '@/data/asciiArt'

describe('SkillsRain', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    mockOnClose.mockClear()
  })

  it('renders when isOpen is true', () => {
    render(<SkillsRain isOpen={true} onClose={mockOnClose} />)
    jest.advanceTimersByTime(100)
    expect(screen.getByText('press any key or click to dismiss')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<SkillsRain isOpen={false} onClose={mockOnClose} />)
    expect(screen.queryByText('press any key or click to dismiss')).not.toBeInTheDocument()
  })

  it('all 12 skills are present in the DOM', () => {
    render(<SkillsRain isOpen={true} onClose={mockOnClose} />)
    jest.advanceTimersByTime(2000)
    
    skills.forEach(skill => {
      expect(screen.getByText(skill.name)).toBeInTheDocument()
    })
  })

  it('pressing Escape calls onClose', () => {
    render(<SkillsRain isOpen={true} onClose={mockOnClose} />)
    jest.advanceTimersByTime(100)
    
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('clicking overlay calls onClose', () => {
    render(<SkillsRain isOpen={true} onClose={mockOnClose} />)
    jest.advanceTimersByTime(100)
    
    const overlay = screen.getByText('press any key or click to dismiss').closest('.skills-rain-overlay')
    if (overlay) {
      fireEvent.click(overlay)
    }
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('dismiss text is visible', () => {
    render(<SkillsRain isOpen={true} onClose={mockOnClose} />)
    jest.advanceTimersByTime(100)
    expect(screen.getByText('press any key or click to dismiss')).toBeInTheDocument()
  })
})
