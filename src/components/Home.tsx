import { ContributionGrid } from '@/components/ContributionGrid'
import { SiteFooter } from '@/components/SiteFooter'
import { fetchContributions } from '@/lib/github-contributions'

export async function Home() {
  const calendar = await fetchContributions()

  return (
    <main className="page">
      <p className="page-intro">yo im aditya</p>

      <h1 className="page-title">
        <a href="https://getomnism.xyz">getomnism</a> waitlist. yc and a16z
        backed startups.
      </h1>

      <p className="page-section">
        facial microexpressions. built a model that outperforms
        multi-billion-dollar labs.
      </p>

      <p className="page-section">
        yc startup school india. got in at 13.
      </p>

      <p className="page-section">
        sf, 2025. hacker house. two months. all expenses paid.
      </p>

      {calendar && <ContributionGrid calendar={calendar} />}

      <SiteFooter />
    </main>
  )
}
