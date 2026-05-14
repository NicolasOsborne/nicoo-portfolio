import { i18nConfig } from '@/utils/i18n'
import { Locale } from '@/types/contentType'
import { notFound } from 'next/navigation'
import Bios from '@/components/templates/Bios'

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

  return <Bios />
}
