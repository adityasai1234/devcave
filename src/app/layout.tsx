import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'addy@arch — portfolio',
  description: 'teenage engineer into ml, systems & web',
  openGraph: {
    title: 'addy@arch — portfolio',
    description: 'teenage engineer into ml, systems & web',
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
      </body>
    </html>
  )
}
