import { render, screen } from '@testing-library/react'
import { ProjectsWindow } from '@/components/windows/ProjectsWindow'
import { projects } from '@/data/projects'

describe('ProjectsWindow', () => {
  it('renders all projects from data file', () => {
    render(<ProjectsWindow />)
    
    projects.forEach(project => {
      expect(screen.getByText(project.name)).toBeInTheDocument()
    })
  })

  it('each project shows name, desc, and tags', () => {
    render(<ProjectsWindow />)
    
    const project = projects[0]
    expect(screen.getByText(project.name)).toBeInTheDocument()
    expect(screen.getByText(project.description)).toBeInTheDocument()
    
    project.tags.forEach(tag => {
      expect(screen.getByText(tag.label)).toBeInTheDocument()
    })
  })

  it('shows correct repo count', () => {
    render(<ProjectsWindow />)
    expect(screen.getByText(`${projects.length} repos`)).toBeInTheDocument()
  })
})
