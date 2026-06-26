import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'getomnism',
  description:
    'Facial microexpressions. YC and a16z backed startups on the waitlist.',
  openGraph: {
    title: 'getomnism',
    description:
      'Facial microexpressions. YC and a16z backed startups on the waitlist.',
    url: 'https://getomnism.xyz',
    type: 'website',
  },
}

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} font-mono`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
