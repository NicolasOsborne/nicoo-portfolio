import { ReactNode } from 'react'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import classNames from 'classnames'

import '@/../sass/main.scss'

export const metadata: Metadata = {
  title: 'Nicoo | Portfolio',
  description: 'Nicolas Osborne, Développeur Front-End à Grenoble.',
}

type LayoutProps = {
  children: ReactNode
}

const perfectDOS = localFont({
  src: '../../public/fonts/bios/perfectDOS.ttf',
  display: 'swap',
  variable: '--font-perfectDOS',
})

const win95 = localFont({
  src: '../../public/fonts/Win95/w95fa.woff2',
  display: 'swap',
  variable: '--font-win95',
})

const RootLayout = async (props: Readonly<LayoutProps>) => {
  const { children } = props

  return (
    <html lang={'fr'} suppressHydrationWarning={true}>
      <body className={classNames(perfectDOS.variable, win95.variable)}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
