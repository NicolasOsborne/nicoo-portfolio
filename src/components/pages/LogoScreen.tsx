'use client'

import { FC, useEffect } from 'react'
import classNames from 'classnames'
import { BootScreenProps } from '@/types/bootType'

import DesktopScreen from '../../../public/assets/themes/win95/images/win95-startup-desktop.jpg'
import MobileScreen from '../../../public/assets/themes/win95/images/win95-startup-mobile.png'
import Image from 'next/image'
import useMediaQuery, { ResponsiveSize } from '@/hooks/useMediaQuery'

const LogoScreen: FC<BootScreenProps> = (props) => {
  const { additionalClass, duration, onComplete } = props
  const isDesktop = useMediaQuery(ResponsiveSize.SCREEN_M_MIN)

  useEffect(() => {
    const timer = setTimeout(onComplete, duration)
    return () => clearTimeout(timer)
  }, [duration, onComplete])

  const componentsClass = 'p_LogoScreen'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <div className={`${componentsClass}_image-wrapper`}>
        <Image
          src={isDesktop ? DesktopScreen : MobileScreen}
          alt='Windows 95 Loading Screen'
          fill
          priority
          className={`${componentsClass}_image`}
        />
      </div>
      <div className={`${componentsClass}_loading`} />
    </div>
  )
}

export default LogoScreen