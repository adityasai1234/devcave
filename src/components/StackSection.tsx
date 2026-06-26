import { stackRows } from '@/content/stack'

export function StackSection() {
  return (
    <div className="stack-section">
      {stackRows.map((row) => (
        <div key={row.label} className="stack-row">
          <span className="stack-label">{row.label}</span>
          <div className="stack-items">
            {row.items.map((item) => (
              <span key={item.name} className="stack-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.icon}
                  alt=""
                  width={14}
                  height={14}
                  className="stack-icon"
                />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
