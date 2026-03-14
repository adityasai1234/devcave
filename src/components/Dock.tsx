'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DockProps {
  windows: { id: string; isHidden: boolean; isMinimized: boolean }[]
  onOpenWindow: (id: string) => void
  onRestoreWindow: (id: string) => void
}

const dockItems = [
  { id: 'about', icon: '~', label: 'About' },
  { id: 'projects', icon: '⌥', label: 'Projects' },
  { id: 'skills', icon: 'λ', label: 'Skills' },
  { id: 'terminal', icon: '$', label: 'Terminal' },
  { id: 'contact', icon: '✉', label: 'Contact' },
]

const externalLinks = [
  { icon: '⬡', label: 'GitHub', url: 'https://github.com/adityasai1234' },
  { icon: '✉', label: 'Email', url: 'mailto:adityasai3230@gmail.com' },
]

export function Dock({ windows, onOpenWindow, onRestoreWindow }: DockProps) {
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
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
      style={{
        backgroundColor: 'rgba(13, 20, 13, 0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        padding: '6px 12px',
        border: '1px solid rgba(0, 255, 100, 0.12)',
      }}
    >
      {dockItems.map((item) => {
        const window = windows.find((w) => w.id === item.id)
        const isActive = window && !window.isHidden && !window.isMinimized

        return (
          <motion.button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="relative w-10 h-10 flex items-center justify-center text-lg mx-1 rounded-md transition-colors"
            style={{
              color: isActive ? '#00ff64' : 'rgba(0, 255, 100, 0.4)',
              backgroundColor: isActive ? 'rgba(0, 255, 100, 0.1)' : 'transparent',
            }}
            whileHover={{
              translateY: -5,
              scale: 1.15,
              color: '#00ff64',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {item.icon}
            {window?.isMinimized && !window.isHidden && (
              <span
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: '#00ff64' }}
              />
            )}
          </motion.button>
        )
      })}

      <div
        className="w-px h-6 mx-2"
        style={{ backgroundColor: 'rgba(0, 255, 100, 0.2)' }}
      />

      {externalLinks.map((link) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center text-lg mx-1 rounded-md"
          style={{ color: 'rgba(0, 255, 100, 0.4)' }}
          whileHover={{
            translateY: -5,
            scale: 1.15,
            color: '#00ff64',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  )
}
