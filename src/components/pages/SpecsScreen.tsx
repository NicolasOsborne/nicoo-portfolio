'use client'

import { FC, useEffect, useState, useRef, useCallback } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import useMediaQuery, { ResponsiveSize } from '@/hooks/useMediaQuery'
import { BootScreenProps } from '@/types/bootType'
import { useSpecsLines } from '@/hooks/useSpecsLines'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import SpecsLine from '@/components/atoms/SpecsLine'

import BlueMan from '../../../public/assets/images/bios/energy-star-blue-man.png'
import EnergyStar from '../../../public/assets/images/bios/energy-star-logo.png'

const SpecsScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, osId, duration, onComplete } = props

  const router = useRouter()
  const locale = useCurrentLocale()
  const isDesktop = useMediaQuery(ResponsiveSize.SCREEN_S_MIN)
  const lines = useSpecsLines(osId)

  const [visibleCount, setVisibleCount] = useState(0)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const componentsClass = 'p_SpecsScreen'

  const handleBackToBios = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Escape') router.push(`/${locale}`)
    },
    [router, locale],
  )

  useEffect(() => {
    globalThis.addEventListener('keydown', handleBackToBios)
    return () => globalThis.removeEventListener('keydown', handleBackToBios)
  }, [handleBackToBios])

  useEffect(() => {
    setCurrentTime(new Date())
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000)

    lines.forEach((line, index) => {
      const t = setTimeout(() => setVisibleCount(index + 1), line.delay)
      timeoutsRef.current.push(t)
    })

    const completion = setTimeout(onComplete, duration)
    timeoutsRef.current.push(completion)

    return () => {
      clockInterval && clearInterval(clockInterval)
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const now = currentTime ?? new Date()

  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
  const timeStr = currentTime
    ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    : '--:--:--'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <div className={`${componentsClass}_screen`}>
        <div className={`${componentsClass}_header`}>
          <div className={`${componentsClass}_title`}>
            <Image
              src={BlueMan}
              alt='Energy Star Blue Man'
              width={isDesktop ? 42 : 21}
              height={isDesktop ? 58 : 29}
            />
            <p className={`${componentsClass}_line`}>
              Copyright (C) 1992-{now.getFullYear()}
              <br />
              Nicolas Osborne
            </p>
          </div>
          <div className={`${componentsClass}_logo`}>
            <Image
              src={EnergyStar}
              alt='Energy Star Logo'
              width={isDesktop ? 266 : 133}
              height={isDesktop ? 168 : 84}
            />
          </div>
        </div>

        <div className={`${componentsClass}_lines`}>
          {lines.slice(0, visibleCount).map((line, index) => (
            <SpecsLine
              key={line.id}
              line={line}
              showCursor={index === visibleCount - 1}
            />
          ))}
          {visibleCount >= lines.length && (
            <p className={`${componentsClass}_line`}>
              <span
                className={`${componentsClass}_cursor`}
                aria-hidden='true'
              />
            </p>
          )}
        </div>
      </div>

      <div className={`${componentsClass}_footer`}>
        <p className={`${componentsClass}_line`}>
          Press <span className={`${componentsClass}_highlight`}>DEL</span> to
          go back to BIOS
        </p>
        <p className={`${componentsClass}_line`}>
          {dateStr} | {timeStr}
        </p>
      </div>
    </div>
  )
}

export default SpecsScreen
