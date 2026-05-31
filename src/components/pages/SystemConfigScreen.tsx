'use client'

import { FC, useEffect, useState, useRef, useCallback } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import { BootScreenProps } from '@/types/bootType'
import { useSystemConfigRows } from '@/hooks/useSystemConfig'
import SystemConfigTable from '@/components/molecules/SystemConfigTable'
import SystemConfigDeviceTable from '@/components/molecules/SystemConfigDeviceTable'

const SystemConfigScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, osId, duration, onComplete } = props

  const router = useRouter()
  const locale = useCurrentLocale()
  const config = useSystemConfigRows(osId)

  const [showDevices, setShowDevices] = useState(false)
  const [showStarting, setShowStarting] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const componentsClass = 'p_SystemConfigScreen'

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Escape') router.push(`/${locale}`)
    },
    [router, locale],
  )

  useEffect(() => {
    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const t1 = setTimeout(() => setShowDevices(true), duration! * 0.45)
    const t2 = setTimeout(() => setShowStarting(true), duration! * 0.8)
    const t3 = setTimeout(onComplete, duration)

    timeoutsRef.current = [t1, t2, t3]
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [])

  if (!config) return null

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <h1 className={`${componentsClass}_title`}>{config.title}</h1>

      <SystemConfigTable
        leftSections={config.leftSections}
        rightSections={config.rightSections}
      />

      {showDevices && (
        <SystemConfigDeviceTable
          title={config.deviceTableTitle}
          headers={config.deviceTableHeaders}
          rows={config.deviceTableRows}
        />
      )}

      <span className={`${componentsClass}_cursor`} aria-hidden='true' />

      {showStarting && (
        <p className={`${componentsClass}_starting`}>
          {config.startingMessage}
        </p>
      )}
    </div>
  )
}

export default SystemConfigScreen
