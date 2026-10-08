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
  src: '../../../public/fonts/bios/PerfectDOS.ttf',
  display: 'swap',
  variable: '--font-bios',
})

const win95 = localFont({
  src: '../../../public/fonts/Win95/w95fa.woff2',
  display: 'swap',
  variable: '--font-win95',
})

const win98 = localFont({
  src: [
    {
      path: '../../../public/fonts/win98/MSSansSerif.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/win98/MSSansSerifBold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-win98',
})

const winXP = localFont({
  src: [
    {
      path: '../../../public/fonts/winXP/Tahoma.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/winXP/TahomaBold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-winXP',
})

const ubuntu = localFont({
  src: [
    {
      path: '../../../public/fonts/linux/UbuntuRegular.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/linux/UbuntuBold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-linux',
})

const ubuntuMono = localFont({
  src: [
    {
      path: '../../../public/fonts/linux/UbuntuMonoRegular.ttf',
      weight: '400',
    },
    {
      path: '../../../public/fonts/linux/UbuntuMonoBold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-linux-mono',
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
    title: 'Nicoo | Portfolio',
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
      <body
        className={classNames(
          perfectDOS.variable,
          win95.variable,
          win98.variable,
          winXP.variable,
          ubuntu.variable,
          ubuntuMono.variable,
        )}
      >
        <ContentProvider initialLocale={locale as Locale}>
          <AuthProvider>{children}</AuthProvider>
        </ContentProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
