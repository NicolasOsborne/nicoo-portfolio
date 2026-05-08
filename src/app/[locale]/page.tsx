import { i18nConfig } from '@/utils/i18n/i18n'
import { Locale } from '@/types/contentType'
import { notFound } from 'next/navigation'
import BiosScreen from '@/components/templates/BiosScreen'

type HomePageProps = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function BiosPage({ params }: HomePageProps) {
  const { locale } = await params

  if (!i18nConfig.locales.includes(locale as Locale)) {
    notFound()
  }

  return <BiosScreen />
}
