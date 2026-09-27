import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'aditya',
  description:
    'Aditya. Research in facial microexpressions. Coding since 7.',
  openGraph: {
    title: 'aditya',
    description:
      'Aditya. Research in facial microexpressions. Coding since 7.',
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
      <body className={jetbrainsMono.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
