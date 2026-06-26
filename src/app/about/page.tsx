import type { Metadata } from 'next'
import { About } from '@/components/About'

export const metadata: Metadata = {
  title: 'about — getomnism',
  description:
    'coding since 7. asl pipeline. research. building getomnism.xyz.',
}

export default function AboutPage() {
  return <About />
}
