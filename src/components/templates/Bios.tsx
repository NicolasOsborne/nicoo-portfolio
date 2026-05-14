'use client'

import { FC, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { OsId } from '@/enums/OsId'
import { useContent } from '@/context/ContentContext'

const Bios: FC = () => {
  const { content } = useContent()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const locale = useCurrentLocale()

  const componentsClass = 't_Bios'

  const boot = useCallback(
    (id: OsId) => {
      router.push(`/${locale}/${id}`)
    },
    [router, locale],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, boot])

  return (
    <main className={componentsClass}>
      <div className={`${componentsClass}_inner`}>
        <div className={`${componentsClass}_menu`}>
          <ul
            className={`${componentsClass}_list`}
            aria-label='Select operating system'
          >
            {content.bios.list.map((entry, index) => (
              <li
                key={entry.id}
                aria-selected={index === selectedIndex}
                className={`${componentsClass}_entry ${index === selectedIndex ? ` ${componentsClass}_entry-selected` : ''}`}
                onClick={() => boot(entry.id)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {entry.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${componentsClass}_footer`}>
          <p className={`${componentsClass}_hint`}>{content.bios.navigation}</p>
          <p className={`${componentsClass}_hint`}>{content.bios.boot}</p>
        </div>
      </div>
    </main>
  )
}

export default Bios
