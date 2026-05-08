'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  FC,
  ReactNode,
} from 'react'
import { Content, Locale } from '@/types/contentType'
import { getContent, i18nConfig } from '@/utils/i18n/i18n'

type ContentContextType = {
  content: Content
  locale: Locale
  setLocale: (locale: Locale) => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

type ContentProviderProps = {
  children: ReactNode
  initialLocale: Locale
}

const ContentProvider: FC<ContentProviderProps> = (props) => {
  const { children, initialLocale } = props

  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [content, setContent] = useState<Content>(() =>
    getContent(initialLocale),
  )

  const setLocale = (next: Locale) => {
    if (!i18nConfig.locales.includes(next)) return
    setLocaleState(next)
    setContent(getContent(next))
    document.documentElement.lang = next
  }

  const value = useMemo(
    () => ({ content, locale, setLocale }),
    [content, locale],
  )

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}

export default ContentProvider

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context)
    throw new Error('useContent must be used within ContentProvider')
  return context
}
