import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '@/../sass/main.scss'

export const metadata: Metadata = {
  title: 'Nicoo | Portfolio',
  description:
    "Nicoo c'est qui ? Découvrez le portfolio de Nicolas Osborne, Développeur Front-End à Grenoble.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
