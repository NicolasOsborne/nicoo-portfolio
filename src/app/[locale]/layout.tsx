import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n'
import { Locale } from '@/types/contentType'
import ContentProvider from '@/context/ContentContext'

type LocaleLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

const LocaleLayout = async (props: Readonly<LocaleLayoutProps>) => {
  const { children, params } = props
  const { locale } = await params

  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <ContentProvider initialLocale={locale as Locale}>
      {children}
    </ContentProvider>
  )
}

export default LocaleLayout
