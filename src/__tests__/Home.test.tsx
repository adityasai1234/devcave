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

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = () => null
})

async function renderHome() {
  render(await Home())
}

describe('Home', () => {
  it('renders site title and key copy', async () => {
    await renderHome()

    expect(screen.getByText(/yo im aditya/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /yo im aditya/i,
      })
    ).toBeInTheDocument()
    expect(screen.getAllByText(/research in facial microexpressions/i).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: 'join waitlist' })).toHaveAttribute(
      'href',
      'https://getomnism.xyz'
    )
    expect(screen.getByText(/yc startup school india/i)).toBeInTheDocument()
    expect(screen.getByText(/sf, 2025/i)).toBeInTheDocument()
  })

  it('renders contact links', async () => {
    await renderHome()

    expect(screen.getByRole('link', { name: 'adityasai3230@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:adityasai3230@gmail.com'
    )
    expect(screen.getByRole('link', { name: 'email' })).toHaveAttribute(
      'href',
      'mailto:adityasai3230@gmail.com'
    )
    expect(screen.getAllByRole('link', { name: 'x' })[0]).toHaveAttribute(
      'href',
      'https://x.com/vectorspace21'
    )
    expect(screen.getAllByRole('link', { name: 'github' })[0]).toHaveAttribute(
      'href',
      'https://github.com/adityasai1234'
    )
  })

  it('renders about link in footer', async () => {
    await renderHome()

    expect(
      screen.getAllByRole('link', { name: 'about' }).some(
        (link) => link.getAttribute('href') === '/about'
      )
    ).toBe(true)
  })
})
