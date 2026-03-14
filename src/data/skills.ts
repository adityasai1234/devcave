export interface Skill {
  name: string
  level: number
}

export const skills: Skill[] = [
  { name: 'python', level: 92 },
  { name: 'pytorch', level: 85 },
  { name: 'rust', level: 70 },
  { name: 'next.js', level: 80 },
  { name: 'linux', level: 88 },
  { name: 'docker', level: 65 },
  { name: 'typescript', level: 78 },
]

export const learningTopics = [
  'reinforcement learning',
  'llm fine-tuning',
  'kernel development',
]
