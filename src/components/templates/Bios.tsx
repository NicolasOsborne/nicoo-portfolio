'use client'

import React, { FC, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { OsId } from '@/enums/OsId'
import { useContent } from '@/context/ContentContext'
import useMediaQuery, { ResponsiveSize } from '@/hooks/useMediaQuery'
import { i18nConfig } from '@/utils/i18n'

type FocusSection = 'os' | 'locale'

const Bios: FC = () => {
  const { content, locale, setLocale } = useContent()

  const locales = i18nConfig.locales

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [localeIndex, setLocaleIndex] = useState(
    () => locales.indexOf(locale) ?? 0,
  )
  const [focusSection, setFocusSection] = useState<FocusSection>('os')

  const router = useRouter()
  const currentLocale = useCurrentLocale()
  const isDesktop = useMediaQuery(ResponsiveSize.SCREEN_S_MIN)

  const componentsClass = 't_Bios'

  const boot = useCallback(
    (id: OsId) => {
      router.push(`/${currentLocale}/${id}`)
    },
    [router, currentLocale],
  )

  const applyLocale = useCallback(
    (index: number) => {
      const next = locales[index]
      setLocale(next)
      const segments = globalThis.location.pathname.split('/')
      segments[1] = next
      router.replace(segments.join('/'))
    },
    [setLocale, router, locales],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent | React.KeyboardEvent) => {
      if (focusSection === 'os') {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            setSelectedIndex((i) =>
              i === 0 ? content.bios.list.length - 1 : i - 1,
            )
            break
          case 'ArrowDown':
            e.preventDefault()
            setSelectedIndex((i) =>
              i === content.bios.list.length - 1 ? 0 : i + 1,
            )
            break
          case 'Enter':
            boot(content.bios.list[selectedIndex].id)
            break
          case 'Tab':
            e.preventDefault()
            setFocusSection('locale')
            break
        }
      }

      if (focusSection === 'locale') {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            setLocaleIndex((i) => (i === 0 ? locales.length - 1 : i - 1))
            break
          case 'ArrowRight':
            e.preventDefault()
            setLocaleIndex((i) => (i === locales.length - 1 ? 0 : i + 1))
            break
          case 'Enter':
            applyLocale(localeIndex)
            setFocusSection('os')
            break
          case 'Tab':
          case 'Escape':
            e.preventDefault()
            setFocusSection('os')
            break
        }
      }
    },
    [
      focusSection,
      content.bios.list,
      selectedIndex,
      localeIndex,
      boot,
      applyLocale,
      locales,
    ],
  )

  useEffect(() => {
    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <main className={componentsClass}>
      <div className={`${componentsClass}_wrapper`}>
        <div className={`${componentsClass}_header`}>
          <h1 className={`${componentsClass}_title`}>{content.bios.title}</h1>
          <h2 className={`${componentsClass}_subtitle`}>
            {content.bios.subtitle}
          </h2>
        </div>
        <div className={`${componentsClass}_inner`}>
          <div className={`${componentsClass}_menu`}>
            <ul className={`${componentsClass}_list`}>
              {content.bios.list.map((entry, index) => (
                <li className={`${componentsClass}_item`} key={entry.id}>
                  <button
                    type='button'
                    aria-current={index === selectedIndex ? 'true' : undefined}
                    className={`${componentsClass}_entry ${
                      index === selectedIndex
                        ? `${componentsClass}_entry-selected`
                        : ''
                    }`}
                    onClick={() => boot(entry.id)}
                    onMouseEnter={() => {
                      setSelectedIndex(index)
                      setFocusSection('os')
                    }}
                  >
                    {entry.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${componentsClass}_locale`}
            aria-label='Language selection'
          >
            {locales.map((locale, index) => (
              <button
                key={locale}
                type='button'
                className={`${componentsClass}_locale-entry${
                  index === localeIndex
                    ? ` ${componentsClass}_locale-entry-selected`
                    : ''
                }${
                  focusSection === 'locale'
                    ? ` ${componentsClass}_locale-entry-active`
                    : ''
                }`}
                onClick={() => applyLocale(index)}
                onMouseEnter={() => {
                  setLocaleIndex(index)
                  setFocusSection('locale')
                }}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
          <div className={`${componentsClass}_footer`}>
            <p className={`${componentsClass}_hint`}>
              {isDesktop ? content.bios.navigation : content.bios.mobile}
            </p>
            {isDesktop && (
              <p className={`${componentsClass}_hint`}>{content.bios.boot}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Bios
