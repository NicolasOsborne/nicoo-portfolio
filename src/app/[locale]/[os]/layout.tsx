import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { WindowsProvider } from '@/context/WindowContext'
import ThemeProvider from '@/context/ThemeContext'
import { isOsId, osConfigs } from '@/config/osThemes'
import { i18nConfig } from '@/utils/i18n'

type OsLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string; os: string }>
}

export function generateStaticParams() {
  return i18nConfig.locales.flatMap((locale) =>
    Object.keys(osConfigs).map((os) => ({ locale, os })),
  )
}

export default async function OsLayout({ children, params }: OsLayoutProps) {
  const { os } = await params

  if (!isOsId(os)) {
    notFound()
  }

  return (
    <ThemeProvider osId={os}>
      <WindowsProvider>{children}</WindowsProvider>
    </ThemeProvider>
  )
}
