export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface ContributionCalendar {
  total: number
  days: ContributionDay[]
  periodLabel: string
  gridYear?: number
}

export interface GridCell {
  date: string
  count: number
  level: number
  row: number
  col: number
  inYear: boolean
}

export interface MonthLabel {
  col: number
  label: string
}

export interface ContributionGridData {
  cells: GridCell[]
  cols: number
  monthLabels: MonthLabel[]
}

const USERNAME = 'adityasai1234'

export function getCurrentContributionYear() {
  return new Date().getFullYear()
}

export function getGithubUsername() {
  return USERNAME
}

export async function fetchContributions(
  username: string = USERNAME,
  period: number | 'last' = 'last'
): Promise<ContributionCalendar | null> {
  try {
    const query = period === 'last' ? 'last' : String(period)
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${query}`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) return null

    const data = await response.json()
    const days: ContributionDay[] = data.contributions ?? []
    const total =
      period === 'last'
        ? data.total?.lastYear
        : data.total?.[String(period)] ??
          days.reduce((sum, day) => sum + day.count, 0)

    if (total == null) return null

    return {
      total,
      days,
      periodLabel: period === 'last' ? 'the last year' : String(period),
      gridYear: period === 'last' ? undefined : period,
    }
  } catch {
    return null
  }
}

export function buildContributionGrid(
  days: ContributionDay[],
  gridYear?: number
): ContributionGridData {
  if (days.length === 0) {
    return { cells: [], cols: 0, monthLabels: [] }
  }

  const dayMap = new Map(days.map((day) => [day.date, day]))
  const isRollingYear = gridYear === undefined

  let gridStart: Date
  let gridEnd: Date

  if (isRollingYear) {
    gridStart = new Date(days[0].date)
    gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay())
    gridEnd = new Date(days[days.length - 1].date)
    gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - gridEnd.getUTCDay()))
  } else {
    const yearStart = new Date(Date.UTC(gridYear, 0, 1))
    gridStart = new Date(yearStart)
    gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay())

    const yearEnd = new Date(Date.UTC(gridYear, 11, 31))
    gridEnd = new Date(yearEnd)
    gridEnd.setUTCDate(gridEnd.getUTCDate() + (6 - gridEnd.getUTCDay()))
  }

  const cells: GridCell[] = []
  const monthLabels: MonthLabel[] = []
  const seenMonths = new Set<string>()

  const cursor = new Date(gridStart)
  let col = 0

  while (cursor <= gridEnd) {
    for (let row = 0; row < 7; row++) {
      const dateStr = cursor.toISOString().slice(0, 10)
      const inYear = isRollingYear
        ? dayMap.has(dateStr)
        : cursor.getUTCFullYear() === gridYear
      const day = dayMap.get(dateStr)

      if (row === 0 && (isRollingYear ? dayMap.has(dateStr) : inYear)) {
        const monthKey = `${cursor.getUTCFullYear()}-${cursor.getUTCMonth()}`
        if (!seenMonths.has(monthKey)) {
          seenMonths.add(monthKey)
          monthLabels.push({
            col,
            label: cursor.toLocaleString('en-US', {
              month: 'short',
              timeZone: 'UTC',
            }),
          })
        }
      }

      cells.push({
        date: dateStr,
        count: inYear ? (day?.count ?? 0) : 0,
        level: inYear ? (day?.level ?? 0) : 0,
        row,
        col,
        inYear,
      })

      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    col++
  }

  return { cells, cols: col, monthLabels }
}
