'use client'

import { FC, useEffect } from 'react'
import classNames from 'classnames'
import { BootScreenProps } from '@/types/bootType'
import Image from 'next/image'
import { ResponsiveSize } from '@/enums/ResponsiveSize'
import { osConfigs } from '@/config/osThemes'

const LogoScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, osId, duration, onComplete } = props
  const { desktop, mobile } = osConfigs[osId].startupScreenImages

  useEffect(() => {
    if (duration === undefined) return

    const timer = setTimeout(onComplete, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const componentsClass = 'p_LogoScreen'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <picture>
        {mobile && (
          <source
            media={ResponsiveSize.SCREEN_M_MAX}
            srcSet={mobile}
          />
        )}
        <Image
          src={desktop}
          alt={`${osConfigs[osId].label} startup screen`}
          fill
          loading='eager'
          fetchPriority='high'
          sizes='100vw'
          className={`${componentsClass}_image`}
        />
      </picture>
      <div className={`${componentsClass}_loading`}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}

export default LogoScreen