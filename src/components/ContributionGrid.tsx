import {
  buildContributionGrid,
  type ContributionCalendar,
  getGithubUsername,
} from '@/lib/github-contributions'

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
const EMPTY_COLOR = '#161b22'
const LEGEND_COLORS = LEVEL_COLORS
const CELL = 10
const GAP = 3
const STEP = CELL + GAP
const LABEL_TOP = 20

interface ContributionGridProps {
  calendar: ContributionCalendar
  username?: string
}

export function ContributionGrid({ calendar, username }: ContributionGridProps) {
  const githubUser = username ?? getGithubUsername()
  const { cells, cols, monthLabels } = buildContributionGrid(
    calendar.days,
    calendar.gridYear
  )

  const gridWidth = cols * STEP - GAP
  const gridHeight = 7 * STEP - GAP
  const width = gridWidth
  const height = LABEL_TOP + gridHeight

  return (
    <a
      href={`https://github.com/${githubUser}`}
      target="_blank"
      rel="noopener noreferrer"
      className="contribution-grid-link"
      aria-label={`${calendar.total} GitHub contributions in ${calendar.periodLabel}`}
    >
      <div className="contribution-card">
        <h2 className="contribution-heading">GitHub Activity</h2>

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
                x={month.col * STEP}
                y={12}
                className="contribution-month-label"
              >
                {month.label}
              </text>
            ))}

            {cells.map((cell) => (
              <rect
                key={cell.date}
                x={cell.col * STEP}
                y={LABEL_TOP + cell.row * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                fill={
                  cell.inYear
                    ? (LEVEL_COLORS[cell.level] ?? LEVEL_COLORS[0])
                    : EMPTY_COLOR
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

        <div className="contribution-footer">
          <p className="contribution-total">
            {calendar.total.toLocaleString()} contributions in{' '}
            {calendar.periodLabel}
          </p>
          <div className="contribution-legend" aria-hidden="true">
            <span>Less</span>
            {LEGEND_COLORS.map((color) => (
              <span
                key={color}
                className="contribution-legend-box"
                style={{ backgroundColor: color }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </a>
  )
}
