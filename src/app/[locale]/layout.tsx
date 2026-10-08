import { ReactNode } from 'react'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import classNames from 'classnames'
import { notFound } from 'next/navigation'
import '@/../sass/main.scss'
import { i18nConfig } from '@/utils/i18n'
import { Locale } from '@/types/contentType'
import ContentProvider from '@/context/ContentContext'
import AuthProvider from '@/context/AuthContext'

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

const perfectDOS = localFont({
  src: '../../../public/fonts/bios/perfectDOS.ttf',
  display: 'swap',
  variable: '--font-perfectDOS',
})

const win95 = localFont({
  src: '../../../public/fonts/Win95/w95fa.woff2',
  display: 'swap',
  variable: '--font-win95',
})

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const isFrench = locale === 'fr'

  return {
    title: isFrench ? 'Nicoo | Portfolio' : 'Nicoo | Portfolio',
    description: isFrench
      ? 'Nicolas Osborne, Développeur Front-End à Grenoble.'
      : 'Nicolas Osborne, Front-End Developer in Grenoble.',
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
  }
}

const LocaleLayout = async (props: Readonly<LocaleLayoutProps>) => {
  const { children, params } = props
  const { locale } = await params

  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={classNames(perfectDOS.variable, win95.variable)}>
        <ContentProvider initialLocale={locale as Locale}>
          <AuthProvider>{children}</AuthProvider>
        </ContentProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
