import { Providers } from './providers'
import Layout from '@/components/ui/Layout'

export const metadata = {
  title: 'Portfolio - Minimal 3D Website',
  description: 'A minimalist 3D portfolio website built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "'Courier New', 'Courier', monospace" }}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}

