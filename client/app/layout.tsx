import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'CyberRanger Pro - Security Dashboard',
  description: 'Professional network security scanning and monitoring dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
