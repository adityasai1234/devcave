'use client'

import React from 'react'
import { useClock } from '@/hooks/useClock'

const menuItems = [
  { name: '', label: 'Apple' },
  { name: 'Finder', label: 'Finder' },
  { name: 'File', label: 'File' },
  { name: 'Edit', label: 'Edit' },
  { name: 'View', label: 'View' },
  { name: 'Go', label: 'Go' },
  { name: 'Window', label: 'Window' },
  { name: 'Help', label: 'Help' },
]

export function Topbar() {
  const { time } = useClock()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <nav className="topbar-menu">
          {menuItems.map((item) => (
            <button key={item.name} className="menu-item" title={item.label}>
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="topbar-right">
        <div className="status-icons">
          <span className="status-icon">􀙇</span>
          <span className="status-icon">􀙒</span>
          <span className="status-icon">􀛨</span>
        </div>
        <span className="clock">{time}</span>
      </div>
    </header>
  )
}
