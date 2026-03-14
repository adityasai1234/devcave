'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { skills } from '@/data/projects'

export function SkillsWindow() {
  return (
    <div className="p-3 text-xs" style={{ color: '#e8e4dc' }}>
      <div className="mb-3" style={{ color: 'rgba(0, 255, 100, 0.4)' }}>
        # proficiency levels
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={skill.name} className="flex items-center gap-2">
            <span
              className="w-14 text-right shrink-0"
              style={{ color: 'rgba(0, 255, 100, 0.4)' }}
            >
              {skill.name}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-surface">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: '#00ff64',
                  boxShadow: '0 0 8px rgba(0, 255, 100, 0.5)',
                }}
              />
            </div>
            <span
              className="w-8 text-right"
              style={{ color: 'rgba(0, 255, 100, 0.6)' }}
            >
              {skill.level}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
