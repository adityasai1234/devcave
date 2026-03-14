export interface Project {
  id: string
  name: string
  description: string
  tags: { label: string; color: 'cyan' | 'orange' | 'yellow' | 'green' }[]
  url: string
}

export const projects: Project[] = [
  {
    id: 'crash-signal',
    name: 'Crash-Signal',
    description: 'Real-time crash analytics & monitoring system',
    tags: [
      { label: 'next.js', color: 'cyan' },
      { label: 'rust', color: 'orange' },
      { label: 'websocket', color: 'yellow' },
    ],
    url: 'https://github.com/adityasai1234/crash-signal',
  },
  {
    id: 'dev-cave',
    name: 'Dev-Cave',
    description: 'Developer workspace management & automation',
    tags: [
      { label: 'typescript', color: 'cyan' },
      { label: 'docker', color: 'yellow' },
      { label: 'linux', color: 'orange' },
    ],
    url: 'https://github.com/adityasai1234/dev-cave',
  },
  {
    id: 'neural-canvas',
    name: 'Neural Canvas',
    description: 'ML-powered creative coding environment',
    tags: [
      { label: 'python', color: 'yellow' },
      { label: 'ml', color: 'cyan' },
      { label: 'webgl', color: 'green' },
    ],
    url: 'https://github.com/adityasai1234/neural-canvas',
  },
  {
    id: 'addyhacks',
    name: 'addyhacks.xyz',
    description: 'Personal portfolio & blog platform',
    tags: [
      { label: 'next.js', color: 'cyan' },
      { label: 'typescript', color: 'cyan' },
      { label: 'tailwind', color: 'cyan' },
    ],
    url: 'https://addyhacks.xyz',
  },
]

export const skills = [
  { name: 'python', level: 92 },
  { name: 'rust', level: 70 },
  { name: 'ml/ai', level: 85 },
  { name: 'react', level: 78 },
  { name: 'linux', level: 88 },
  { name: 'docker', level: 65 },
]
