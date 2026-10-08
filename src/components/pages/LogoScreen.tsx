'use client'

import { FC, useEffect } from 'react'
import classNames from 'classnames'
import { BootScreenProps } from '@/types/bootType'
import Image from 'next/image'
import useMediaQuery from '@/hooks/useMediaQuery'
import { ResponsiveSize } from '@/enums/ResponsiveSize'

import DesktopScreen from '../../../public/assets/themes/win95/images/win95-startup-desktop.jpg'
import MobileScreen from '../../../public/assets/themes/win95/images/win95-startup-mobile.png'


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
          alt='Loading Screen'
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