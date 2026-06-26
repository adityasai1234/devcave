import { render, screen } from '@testing-library/react'
import { About } from '@/components/About'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href}>{children}</a>,
}))

describe('About', () => {
  it('renders title and playful project line', () => {
    render(<About />)

    expect(screen.getByRole('heading', { name: 'about' })).toBeInTheDocument()
    expect(screen.getByText(/487238929202 projects/i)).toBeInTheDocument()
  })

  it('renders stack with logos', () => {
    render(<About />)

    expect(screen.getByText('os')).toBeInTheDocument()
    expect(screen.getByText('arch linux')).toBeInTheDocument()
    expect(screen.getByText('mac')).toBeInTheDocument()
    expect(screen.getByText('cursor')).toBeInTheDocument()
    expect(screen.getByText('nvim')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
    expect(screen.getByText('ml')).toBeInTheDocument()
    expect(document.querySelectorAll('.stack-icon').length).toBeGreaterThan(0)
  })

  it('renders asl and research copy', () => {
    render(<About />)

    expect(screen.getByText(/asl recognition pipeline/i)).toBeInTheDocument()
    expect(screen.getByText(/96% accuracy/i)).toBeInTheDocument()
    expect(screen.getByText(/facial microexpressions/i)).toBeInTheDocument()
  })

  it('renders home back-link', () => {
    render(<About />)

    expect(screen.getByRole('link', { name: '← home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
