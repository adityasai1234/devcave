'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillTooltips } from '@/data/asciiArt'

interface SkillsRainProps {
  isOpen: boolean
  onClose: () => void
}

interface PositionedSkill {
  name: string
  category: string
  x: number
  finalY: number
  rotate: number
  delay: number
}

export function SkillsRain({ isOpen, onClose }: SkillsRainProps) {
  const [positionedSkills, setPositionedSkills] = useState<PositionedSkill[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const generatePositions = () => {
      const placed: PositionedSkill[] = []
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000

      skills.forEach((skill, index) => {
        let x: number
        let validPosition = false
        let attempts = 0

        do {
          x = Math.random() * (viewportWidth * 0.85) + viewportWidth * 0.05
          validPosition = true

          for (const placedSkill of placed) {
            const xDiff = Math.abs(x - placedSkill.x)
            if (xDiff < 80) {
              validPosition = false
              break
            }
          }
          attempts++
        } while (!validPosition && attempts < 50)

        const finalY = Math.random() * 70 + 15
        const rotate = Math.random() * 12 - 6
        const delay = index * 0.07

        placed.push({
          name: skill.name,
          category: skill.category,
          x,
          finalY,
          rotate,
          delay,
        })
      })

      setPositionedSkills(placed)
    }

    generatePositions()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cyan':
        return { border: 'rgba(94, 196, 232, 0.3)', bg: 'rgba(94, 196, 232, 0.08)', text: '#5ec4e8' }
      case 'orange':
        return { border: 'rgba(232, 124, 78, 0.3)', bg: 'rgba(232, 124, 78, 0.08)', text: '#e87c4e' }
      case 'yellow':
        return { border: 'rgba(232, 196, 106, 0.3)', bg: 'rgba(232, 196, 106, 0.08)', text: '#e8c46a' }
      default:
        return { border: 'rgba(0, 255, 100, 0.3)', bg: 'rgba(0, 255, 100, 0.08)', text: '#00ff64' }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="skills-rain-overlay"
          onClick={onClose}
        >
          <div className="skills-rain-container">
            {positionedSkills.map((skill) => {
              const colors = getCategoryColor(skill.category)

              return (
                <motion.div
                  key={skill.name}
                  className="skill-pill"
                  initial={{
                    y: -80,
                    opacity: 0,
                    rotate: skill.rotate + (Math.random() * 30 - 15),
                  }}
                  animate={{
                    y: skill.finalY,
                    opacity: 1,
                    rotate: skill.rotate,
                  }}
                  transition={{
                    duration: Math.random() * 0.5 + 0.6,
                    delay: skill.delay,
                    ease: 'easeOut',
                  }}
                  style={{
                    left: skill.x,
                    borderColor: colors.border,
                    backgroundColor: colors.bg,
                    color: colors.text,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.08, borderColor: colors.text }}
                >
                  <span className="skill-name">{skill.name}</span>
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="skill-tooltip"
                      >
                        {skillTooltips[skill.name]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="dismiss-hint"
          >
            press any key or click to dismiss
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
