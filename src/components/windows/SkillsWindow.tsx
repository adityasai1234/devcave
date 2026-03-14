'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { skills, learningTopics } from '@/data/skills'

export function SkillsWindow() {
  return (
    <div className="skills-window">
      <div className="skills-comment"># proficiency levels</div>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={skill.name} className="skill-row">
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar-track">
              <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
              />
            </div>
            <span className="skill-percent">{skill.level}%</span>
          </div>
        ))}
      </div>
      <div className="skills-divider" />
      <div className="learning-section">
        <div className="learning-comment"># currently learning</div>
        {learningTopics.map((topic) => (
          <div key={topic} className="learning-item">
            <span className="green">▸ </span>
            <span className="text">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
