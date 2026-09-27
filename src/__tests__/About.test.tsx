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
  it('renders title and origin line', () => {
    render(<About />)

    expect(screen.getByRole('heading', { name: /yo im aditya/i })).toBeInTheDocument()
    expect(screen.getByText(/i like to code\. started at 7/i)).toBeInTheDocument()
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

  it('renders research copy', () => {
    render(<About />)

    expect(screen.getByText(/facial microexpressions/i)).toBeInTheDocument()
  })

  it('renders home back-link', () => {
    render(<About />)

    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
