import { render, screen } from '@testing-library/react'
import { ContributionGrid } from '@/components/ContributionGrid'

const mockCalendar = {
  year: 2026,
  total: 42,
  days: [
    { date: '2025-01-05', count: 0, level: 0 },
    { date: '2025-01-06', count: 3, level: 2 },
    { date: '2025-01-07', count: 8, level: 4 },
  ],
}

describe('ContributionGrid', () => {
  it('renders github-style contribution grid', () => {
    render(<ContributionGrid calendar={mockCalendar} username="adityasai1234" />)

    expect(screen.getByText(/42 contributions in 2026/i)).toBeInTheDocument()
    expect(document.querySelector('.contribution-grid')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://github.com/adityasai1234'
    )
  })
})
