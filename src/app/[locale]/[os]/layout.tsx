import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { WindowsProvider } from '@/context/WindowContext'
import ThemeProvider from '@/context/ThemeContext'
import { OsId } from '@/enums/OsId'
import { osConfigs } from '@/config/OSThemes'

type OsLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string; os: string }>
}

export function generateStaticParams() {
  return Object.keys(osConfigs).map((os) => ({ os }))
}

export default async function OsLayout({ children, params }: OsLayoutProps) {
  const { os } = await params

  if (!Object.keys(osConfigs).includes(os)) {
    notFound()
  }

  return (
    <ThemeProvider osId={os as OsId}>
      <WindowsProvider>{children}</WindowsProvider>
    </ThemeProvider>
  )
}
