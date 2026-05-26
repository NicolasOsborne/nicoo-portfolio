'use client'

import { FC, useEffect } from 'react'
import { BootScreenProps } from '@/types/bootType'
import classNames from 'classnames'

const SystemConfigScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, duration, onComplete } = props

  useEffect(() => {
    const timer = setTimeout(onComplete, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const componentsClass = 'p_SystemConfigScreen'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      SystemConfigScreen — {duration}ms
    </div>
  )
}

export default SystemConfigScreen
