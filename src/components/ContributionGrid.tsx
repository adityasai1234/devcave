import {
  buildContributionGrid,
  type ContributionCalendar,
  getGithubUsername,
} from '@/lib/github-contributions'

const LEVEL_COLORS = ['#1a1a1a', '#333333', '#555555', '#888888', '#cccccc']
const OUT_OF_YEAR_COLOR = '#111111'
const CELL_STROKE = '#2a2a2a'
const CELL = 11
const GAP = 3
const STEP = CELL + GAP
const LABEL_LEFT = 30
const LABEL_TOP = 18
const DAY_LABELS = [
  { row: 1, label: 'Mon' },
  { row: 3, label: 'Wed' },
  { row: 5, label: 'Fri' },
]

interface ContributionGridProps {
  calendar: ContributionCalendar
  username?: string
}

export function ContributionGrid({ calendar, username }: ContributionGridProps) {
  const githubUser = username ?? getGithubUsername()
  const { cells, cols, monthLabels } = buildContributionGrid(
    calendar.days,
    calendar.year
  )

  const gridWidth = cols * STEP - GAP
  const gridHeight = 7 * STEP - GAP
  const width = LABEL_LEFT + gridWidth
  const height = LABEL_TOP + gridHeight

  return (
    <a
      href={`https://github.com/${githubUser}`}
      target="_blank"
      rel="noopener noreferrer"
      className="contribution-grid-link"
      aria-label={`${calendar.total} GitHub contributions in ${calendar.year}`}
    >
      <p className="contribution-total">
        {calendar.total.toLocaleString()} contributions in {calendar.year}
      </p>
      <div className="contribution-graph">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="contribution-grid"
          role="img"
          aria-hidden="true"
        >
          {monthLabels.map((month) => (
            <text
              key={`${month.col}-${month.label}`}
              x={LABEL_LEFT + month.col * STEP}
              y={10}
              className="contribution-month-label"
            >
              {month.label}
            </text>
          ))}

          {DAY_LABELS.map((day) => (
            <text
              key={day.label}
              x={0}
              y={LABEL_TOP + day.row * STEP + CELL - 1}
              className="contribution-day-label"
            >
              {day.label}
            </text>
          ))}

          {cells.map((cell) => (
            <rect
              key={cell.date}
              x={LABEL_LEFT + cell.col * STEP}
              y={LABEL_TOP + cell.row * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              stroke={CELL_STROKE}
              strokeWidth={1}
              fill={
                cell.inYear
                  ? (LEVEL_COLORS[cell.level] ?? LEVEL_COLORS[0])
                  : OUT_OF_YEAR_COLOR
              }
            >
              <title>
                {cell.inYear
                  ? `${cell.count} contributions on ${cell.date}`
                  : cell.date}
              </title>
            </rect>
          ))}
        </svg>
      </div>
    </a>
  )
}
