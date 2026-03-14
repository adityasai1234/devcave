'use client'

import React from 'react'
import { useClock } from '@/hooks/useClock'

const menuItems = ['file', 'view', 'tools', 'help']

export function Topbar() {
  const { time } = useClock()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="username">addy@arch</span>
        <nav className="topbar-menu">
          {menuItems.map((item) => (
            <button key={item} className="menu-item">
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="topbar-right">
        <div className="status-dot" />
        <span className="clock">{time}</span>
      </div>
    </header>
  )
}
