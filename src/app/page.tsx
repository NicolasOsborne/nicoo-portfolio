import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { i18nConfig } from '@/utils/i18n'
import { Locale } from '@/types/contentType'

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return i18nConfig.defaultLocale
  const preferred = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().slice(0, 2).toLowerCase())
    .find((lang) => i18nConfig.locales.includes(lang as Locale))
  return (preferred as Locale) ?? i18nConfig.defaultLocale
}

export default async function RootPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  const locale = detectLocale(acceptLanguage)
  redirect(`/${locale}`)
}
