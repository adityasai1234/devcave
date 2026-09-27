import { render, screen } from '@testing-library/react'
import { ContributionGrid } from '@/components/ContributionGrid'

const mockCalendar = {
  periodLabel: 'the last year',
  total: 1844,
  days: [
    { date: '2025-01-05', count: 0, level: 0 },
    { date: '2025-01-06', count: 3, level: 2 },
    { date: '2025-01-07', count: 8, level: 4 },
  ],
}

describe('ContributionGrid', () => {
  it('renders github-style contribution card', () => {
    render(<ContributionGrid calendar={mockCalendar} username="adityasai1234" />)

    expect(screen.getByRole('heading', { name: 'GitHub Activity' })).toBeInTheDocument()
    expect(
      screen.getByText(/1,844 contributions in the last year/i)
    ).toBeInTheDocument()
    expect(screen.getByText('Less')).toBeInTheDocument()
    expect(screen.getByText('More')).toBeInTheDocument()
    expect(document.querySelector('.contribution-grid')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/adityasai1234'
    )
  })
})
