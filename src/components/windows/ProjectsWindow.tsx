'use client'

import React from 'react'
import { projects } from '@/data/projects'

export function ProjectsWindow() {
  return (
    <div className="projects-window">
      <div className="projects-header">
        <span className="muted">$ </span>
        <span className="text">ls -la ./projects</span>
      </div>
      <div className="projects-list">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
          >
            <div className="project-name">
              <span className="green">▸ </span>
              {project.name}
            </div>
            <div className="project-desc">{project.description}</div>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag.label} className={`tag tag-${tag.color}`}>
                  {tag.label}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <div className="projects-footer">
        <span className="muted">$ </span>
        <span className="green">3 repos · </span>
        <a
          href="https://github.com/adityasai1234"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          github.com/adityasai1234
        </a>
      </div>
    </div>
  )
}
