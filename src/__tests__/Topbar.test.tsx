import { render, screen } from '@testing-library/react'
import { Topbar } from '@/components/Topbar'

describe('Topbar', () => {
  it('renders menu items', () => {
    render(<Topbar />)
    
    expect(screen.getByText('file')).toBeInTheDocument()
    expect(screen.getByText('view')).toBeInTheDocument()
    expect(screen.getByText('tools')).toBeInTheDocument()
    expect(screen.getByText('help')).toBeInTheDocument()
  })

  it('renders logo text', () => {
    render(<Topbar />)
    expect(screen.getByText('addy@arch')).toBeInTheDocument()
  })

  it('status dot is present', () => {
    render(<Topbar />)
    const statusDot = document.querySelector('.status-dot')
    expect(statusDot).toBeInTheDocument()
  })
})
