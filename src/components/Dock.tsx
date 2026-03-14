'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { WindowState } from '@/hooks/useWindowManager'

interface DockProps {
  windows: WindowState[]
  onOpenWindow: (id: string) => void
  onRestoreWindow: (id: string) => void
}

const dockItems = [
  { id: 'about', icon: '~', label: 'about.sh' },
  { id: 'projects', icon: '⌥', label: 'projects/' },
  { id: 'skills', icon: 'λ', label: 'skills.cfg' },
  { id: 'terminal', icon: '$', label: 'terminal' },
  { id: 'contact', icon: '✉', label: 'contact.sh' },
]

const socialLinks = [
  { icon: '⬡', label: 'GitHub', url: 'https://github.com/adityasai1234' },
  { icon: '✉', label: 'Email', url: 'mailto:adityasai3230@gmail.com' },
]

export function Dock({ windows, onOpenWindow, onRestoreWindow }: DockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleClick = (id: string) => {
    const window = windows.find((w) => w.id === id)
    if (!window) return

    if (window.isHidden) {
      onOpenWindow(id)
    } else if (window.isMinimized) {
      onRestoreWindow(id)
    }
  }

  return (
    <div className="dock">
      <div className="dock-items">
        {dockItems.map((item) => {
          const window = windows.find((w) => w.id === item.id)
          const isActive = window && !window.isHidden && !window.isMinimized

          return (
            <div key={item.id} className="dock-item-wrapper">
              <motion.button
                onClick={() => handleClick(item.id)}
                className={`dock-item ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ translateY: -6, scale: 1.18 }}
                transition={{ duration: 0.15 }}
              >
                {item.icon}
                {window?.isMinimized && !window.isHidden && (
                  <span className="minimized-indicator" />
                )}
              </motion.button>
              {hoveredItem === item.id && (
                <div className="dock-tooltip">{item.label}</div>
              )}
            </div>
          )
        })}

        <div className="dock-separator" />

        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-item"
            onMouseEnter={() => setHoveredItem(link.label)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ translateY: -6, scale: 1.18 }}
            transition={{ duration: 0.15 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  )
}
