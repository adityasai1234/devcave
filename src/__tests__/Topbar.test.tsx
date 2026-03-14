import { render, screen } from '@testing-library/react'
import { Topbar } from '@/components/Topbar'

describe('Topbar', () => {
  it('renders menu items', () => {
    render(<Topbar />)
    
    expect(screen.getByText('Finder')).toBeInTheDocument()
    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('View')).toBeInTheDocument()
  })

  it('renders Apple menu', () => {
    render(<Topbar />)
    expect(screen.getByText('')).toBeInTheDocument()
  })

  it('renders clock', () => {
    render(<Topbar />)
    const clock = document.querySelector('.clock')
    expect(clock).toBeInTheDocument()
  })
})
