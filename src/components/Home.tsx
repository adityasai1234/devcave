import { ContributionGrid } from '@/components/ContributionGrid'
import { SignalField } from '@/components/SignalField'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteNav } from '@/components/SiteNav'
import { fetchContributions } from '@/lib/github-contributions'

export async function Home() {
  const calendar = await fetchContributions()

  return (
    <>
      <SiteNav />
      <main>
        <section className="hero">
          <div className="wrap hero-layout">
            <div className="hero-copy">
              <h1 className="hero-title">yo im aditya.</h1>
              <p className="hero-sub">
                research in facial microexpressions. i&apos;ve been coding since
                7.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="mailto:adityasai3230@gmail.com">
                  email
                </a>
                <a className="btn btn-ghost" href="https://getomnism.xyz">
                  join waitlist
                </a>
              </div>
            </div>
            <SignalField />
          </div>
        </section>

        <section className="milestones reveal">
          <div className="wrap milestones-row">
            <article className="milestone">
              <p className="milestone-figure">13</p>
              <p className="milestone-label">
                yc startup school india. got in at 13.
              </p>
            </article>
            <article className="milestone">
              <p className="milestone-figure">2025</p>
              <p className="milestone-label">
                sf, 2025. hacker house. two months, all expenses paid. did
                research in facial microexpressions.
              </p>
            </article>
          </div>
        </section>

        {calendar && (
          <section className="activity reveal">
            <div className="wrap">
              <ContributionGrid calendar={calendar} />
            </div>
          </section>
        )}

        <SiteFooter />
      </main>
    </>
  )
}
