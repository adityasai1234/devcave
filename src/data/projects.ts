export interface Project {
  id: string
  name: string
  description: string
  tags: { label: string; color: 'cyan' | 'orange' | 'yellow' | 'green' }[]
  url: string
}

export const projects: Project[] = [
  {
    id: 'accelerate-c',
    name: 'Accelerate-C',
    description: 'C language learning platform with interactive exercises and progress tracking',
    tags: [
      { label: 'next.js', color: 'cyan' },
      { label: 'typescript', color: 'cyan' },
      { label: 'react', color: 'cyan' },
    ],
    url: 'https://github.com/adityasai1234/Accelerate-C',
  },
  {
    id: 'crash-signal',
    name: 'Crash-Signal',
    description: 'real-time crash analytics & monitoring system with websocket alerts',
    tags: [
      { label: 'next.js', color: 'cyan' },
      { label: 'rust', color: 'orange' },
      { label: 'websocket', color: 'yellow' },
    ],
    url: 'https://github.com/adityasai1234/Crash-Signal',
  },
  {
    id: 'addyhacks-xyz',
    name: 'addyhacks.xyz',
    description: 'personal portfolio & blog — the site you are looking at right now',
    tags: [
      { label: 'next.js', color: 'cyan' },
      { label: 'typescript', color: 'cyan' },
      { label: 'tailwind', color: 'cyan' },
    ],
    url: 'https://github.com/adityasai1234',
  },
]
