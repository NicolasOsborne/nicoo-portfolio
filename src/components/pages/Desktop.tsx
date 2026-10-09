'use client'

import { FC } from 'react'

import { useWindows } from '@/context/WindowContext'
import { useContent } from '@/context/ContentContext'
import WindowContainer from '../organisms/WindowContainer'
import TaskBar from '../organisms/TaskBar'
import DesktopShortcuts from '../molecules/DesktopShortcuts'
import DesktopIcon from '../atoms/DesktopIcon'
import classNames from 'classnames'
import { OsId } from '@/enums/OsId'
import Image from 'next/image'
import { osConfigs } from '@/config/osThemes'
import { ResponsiveSize } from '@/enums/ResponsiveSize'

export type DesktopProps = {
  additionalClass?: string
  osId: OsId
}

const Desktop: FC<DesktopProps> = (props) => {
  const { additionalClass, osId } = props
  const { openWindows } = useWindows()
  const { content } = useContent()
  const wallpaper = osConfigs[osId].wallpaper

  const componentsClass = 'p_Desktop'

  return (
    <div className={classNames(componentsClass, additionalClass)}>
      <div className={`${componentsClass}_background`}>
        {wallpaper && (
          <picture className={`${componentsClass}_wallpaper`}>
            <source
              media={ResponsiveSize.SCREEN_M_MAX}
              srcSet={wallpaper.mobile}
            />
            <Image
              src={wallpaper.desktop}
              alt=''
              fill
              priority
              sizes='100vw'
              className={`${componentsClass}_wallpaper-image`}
            />
          </picture>
        )}
        {openWindows.map((window) => (
          <WindowContainer key={window.id} windowData={window} />
        ))}
      </div>
      <TaskBar />
      <DesktopShortcuts />
      <DesktopIcon entry={content.desktop.recycle} isRecycle={true} />
    </div>
  )
}

export default Desktop
