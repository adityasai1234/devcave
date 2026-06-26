import {
  buildContributionGrid,
  type ContributionDay,
} from '@/lib/github-contributions'

describe('buildContributionGrid', () => {
  it('maps days into week rows and columns', () => {
    const days: ContributionDay[] = [
      { date: '2025-01-05', count: 0, level: 0 },
      { date: '2025-01-06', count: 1, level: 1 },
      { date: '2025-01-12', count: 2, level: 2 },
    ]

    const { cells } = buildContributionGrid(days, 2025)
    const jan5 = cells.find((cell) => cell.date === '2025-01-05')
    const jan6 = cells.find((cell) => cell.date === '2025-01-06')
    const jan12 = cells.find((cell) => cell.date === '2025-01-12')

    expect(jan5).toMatchObject({ row: 0, col: 1, inYear: true })
    expect(jan6).toMatchObject({ row: 1, col: 1, inYear: true })
    expect(jan12).toMatchObject({ row: 0, col: 2, inYear: true })
  })

  it('fills padding weeks with empty boxes', () => {
    const days: ContributionDay[] = [
      { date: '2026-01-01', count: 1, level: 1 },
    ]

    const { cells, cols } = buildContributionGrid(days, 2026)

    expect(cols).toBeGreaterThanOrEqual(52)
    expect(cells.length).toBe(cols * 7)
    expect(cells.some((cell) => !cell.inYear)).toBe(true)
    expect(cells.filter((cell) => cell.inYear)).toHaveLength(365)
  })

  it('includes month labels', () => {
    const days: ContributionDay[] = [
      { date: '2026-01-01', count: 0, level: 0 },
      { date: '2026-02-01', count: 0, level: 0 },
    ]

    const { monthLabels } = buildContributionGrid(days, 2026)

    expect(monthLabels.map((month) => month.label)).toEqual(
      expect.arrayContaining(['Jan', 'Feb'])
    )
  })
})
