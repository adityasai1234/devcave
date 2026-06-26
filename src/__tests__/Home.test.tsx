import { render, screen } from '@testing-library/react'
import { Home } from '@/components/Home'

jest.mock('@/lib/github-contributions', () => ({
  fetchContributions: jest.fn().mockResolvedValue(null),
}))

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

async function renderHome() {
  render(await Home())
}

describe('Home', () => {
  it('renders site title and key copy', async () => {
    await renderHome()

    expect(screen.getByText(/yo im aditya/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /getomnism waitlist/i,
      })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'getomnism' })).toHaveAttribute(
      'href',
      'https://getomnism.xyz'
    )
    expect(screen.getByText(/facial microexpressions/i)).toBeInTheDocument()
    expect(screen.getByText(/yc startup school india/i)).toBeInTheDocument()
    expect(screen.getByText(/sf, 2025/i)).toBeInTheDocument()
  })

  it('renders contact links', async () => {
    await renderHome()

    expect(screen.getByRole('link', { name: 'aditya@getomnism.xyz' })).toHaveAttribute(
      'href',
      'mailto:aditya@getomnism.xyz'
    )
    expect(screen.getByRole('link', { name: 'x.com/vectorspace21' })).toHaveAttribute(
      'href',
      'https://x.com/vectorspace21'
    )
    expect(screen.getByRole('link', { name: 'github.com/adityasai1234' })).toHaveAttribute(
      'href',
      'https://github.com/adityasai1234'
    )
  })

  it('renders about link in footer', async () => {
    await renderHome()

    expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute(
      'href',
      '/about'
    )
  })
})
