import Link from 'next/link'

export function SiteNav() {
  return (
    <header className="site-nav">
      <div className="wrap site-nav-inner">
        <Link href="/" className="nav-home">
          home
        </Link>
        <nav className="site-nav-links" aria-label="primary">
          <Link href="/about">about</Link>
          <a
            href="https://github.com/adityasai1234"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            href="https://x.com/vectorspace21"
            target="_blank"
            rel="noopener noreferrer"
          >
            x
          </a>
        </nav>
      </div>
    </header>
  )
}
