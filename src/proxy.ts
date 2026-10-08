import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')?.toLowerCase()
  const preferredLanguage = acceptLanguage?.split(',')[0]?.trim()
  const locale = preferredLanguage?.startsWith('fr') ? 'fr' : 'en'

  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

export const config = {
  matcher: '/',
}
