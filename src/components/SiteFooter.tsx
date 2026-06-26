import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="page-footer">
      <Link href="/about">about</Link>
      <a href="mailto:aditya@getomnism.xyz">aditya@getomnism.xyz</a>
      <a
        href="https://x.com/vectorspace21"
        target="_blank"
        rel="noopener noreferrer"
      >
        x.com/vectorspace21
      </a>
      <a
        href="https://github.com/adityasai1234"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/adityasai1234
      </a>
    </footer>
  )
}
