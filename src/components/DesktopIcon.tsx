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
      className="desktop-icon"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-box">
        <span className="icon-symbol">{icon}</span>
      </div>
      <span className="icon-label">{label}</span>
    </motion.button>
  )
}
