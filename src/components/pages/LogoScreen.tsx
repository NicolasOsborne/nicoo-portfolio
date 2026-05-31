'use client'

import { FC, useEffect } from 'react'
import classNames from 'classnames'
import { BootScreenProps } from '@/types/bootType'

const LogoScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, duration, onComplete } = props

  useEffect(() => {
    const timer = setTimeout(onComplete, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const componentsClass = 'p_LogoScreen'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      LogoScreen — {duration}ms
    </div>
  )
}

export default LogoScreen
