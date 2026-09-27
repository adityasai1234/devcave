import { SiteFooter } from '@/components/SiteFooter'
import { SiteNav } from '@/components/SiteNav'
import { StackSection } from '@/components/StackSection'
import { aboutSections } from '@/content/about'

export function About() {
  return (
    <>
      <SiteNav />
      <main className="about">
        <div className="wrap">
          <h1 className="page-title">yo im aditya.</h1>
          <div className="about-log">
            {aboutSections.map((section) => (
              <section key={section.id} className="log-row">
                <h2 className="log-label">{section.id}</h2>
                <div>
                  <p className="log-text">{section.text}</p>
                  {section.id === 'origin' && <StackSection />}
                </div>
              </section>
            ))}
          </div>
        </div>
        <SiteFooter />
      </main>
    </>
  )
}
