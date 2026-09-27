import type { Metadata } from 'next'
import { About } from '@/components/About'

export const metadata: Metadata = {
  title: 'about',
  description: 'coding since 7. research.',
}

export default function AboutPage() {
  return <About />
}
