import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig } from '@/utils/i18n'
import { Locale } from '@/types/contentType'

function detectLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return i18nConfig.defaultLocale

  const preferred = acceptLanguage
    .split(',')
    .map((entry) => entry.split(';')[0].trim().slice(0, 2).toLowerCase())
    .find((language) => i18nConfig.locales.includes(language as Locale))

  return (preferred as Locale) ?? i18nConfig.defaultLocale
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${detectLocale(request)}`, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
