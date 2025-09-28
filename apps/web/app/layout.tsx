import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TravelKnowledge',
  description: 'Explore interesting places around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-8">
          {children}
        </main>
      </body>
    </html>
  )
}