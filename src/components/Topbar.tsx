'use client'

import React from 'react'
import { useClock } from '@/hooks/useClock'

const menuItems = ['file', 'view', 'tools', 'help']

export function Topbar() {
  const { time } = useClock()

  return (
    <header
      className="fixed top-0 left-0 right-0 h-[26px] flex items-center justify-between px-3 z-50"
      style={{
        backgroundColor: 'rgba(13, 20, 13, 0.85)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0, 255, 100, 0.12)',
      }}
    >
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold" style={{ color: '#00ff64' }}>
          addy@arch
        </span>
        <nav className="flex items-center gap-3">
          {menuItems.map((item) => (
            <button
              key={item}
              className="text-2xs uppercase hover:text-green transition-colors"
              style={{ color: 'rgba(0, 255, 100, 0.4)' }}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#00ff64',
              animation: 'pulse 2s infinite',
            }}
          />
        </div>
        <span className="text-2xs tabular-nums" style={{ color: '#e8e4dc' }}>
          {time}
        </span>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </header>
  )
}
