'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DesktopIconProps {
  id: string
  icon: string
  label: string
  onClick: () => void
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 w-20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="w-9 h-9 flex items-center justify-center text-lg rounded border"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(0, 255, 100, 0.2)',
          color: '#00ff64',
        }}
      >
        {icon}
      </div>
      <span
        className="text-2xs truncate w-full text-center"
        style={{ color: '#e8e4dc' }}
      >
        {label}
      </span>
    </motion.button>
  )
}
