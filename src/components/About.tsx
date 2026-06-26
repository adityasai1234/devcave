import Link from 'next/link'
import { aboutSections } from '@/content/about'
import { SiteFooter } from '@/components/SiteFooter'
import { StackSection } from '@/components/StackSection'

export function About() {
  return (
    <main className="page">
      <nav className="page-nav">
        <Link href="/">← home</Link>
      </nav>

      <h1 className="page-title">about</h1>

      {aboutSections.map((section) => (
        <div key={section.id}>
          {section.id === 'origin' && (
            <>
              <p className="page-section">{section.text}</p>
              <StackSection />
            </>
          )}
          {section.id !== 'origin' && (
            <p className="page-section">{section.text}</p>
          )}
        </div>
      ))}

      <SiteFooter />
    </main>
  )
}
