'use client'

import React from 'react'
import { projects } from '@/data/projects'

const tagColors = {
  cyan: 'rgba(0, 200, 255, 0.2)',
  orange: 'rgba(255, 159, 10, 0.2)',
  yellow: 'rgba(232, 196, 106, 0.2)',
  green: 'rgba(0, 255, 100, 0.2)',
}

const tagTextColors = {
  cyan: 'rgba(0, 200, 255, 0.85)',
  orange: '#ff9f0a',
  yellow: '#e8c46a',
  green: '#00ff64',
}

export function ProjectsWindow() {
  return (
    <div className="p-3 text-xs" style={{ color: '#e8e4dc' }}>
      <div className="mb-2" style={{ color: 'rgba(0, 255, 100, 0.4)' }}>
        $ ls -la ./projects
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <span style={{ color: '#00ff64' }}>▸</span>
              <span className="font-medium">{project.name}</span>
            </div>
            <div
              className="ml-4 text-2xs"
              style={{ color: 'rgba(0, 255, 100, 0.4)' }}
            >
              {project.description}
            </div>
            <div className="flex gap-1 ml-4 mt-1 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="px-1.5 py-0.5 text-2xs rounded"
                  style={{
                    backgroundColor: tagColors[tag.color],
                    color: tagTextColors[tag.color],
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <div
        className="mt-4 pt-2 text-2xs"
        style={{ color: 'rgba(0, 255, 100, 0.4)', borderTop: '1px solid rgba(0, 255, 100, 0.1)' }}
      >
        $ {projects.length} repos · github.com/adityasai1234
      </div>
    </div>
  )
}
